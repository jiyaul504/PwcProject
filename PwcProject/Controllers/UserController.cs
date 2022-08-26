using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using UserPWC.Models;
using UserPWC.Context;
using UserPWC.Interface;
using System.Collections.Generic;
using System.Linq;
using UserPWC.Utilities;
using UserPWC.Dto;

namespace UserPWC.Controllers
{

    public class UserController : Controller
    {

        #region PrivateVariable
        private readonly IUserService _userService;
        private readonly FIMSDbContext _FIMSDbContext;
        private readonly string ROOT_PATH;
        private readonly string TimeStampFormat = "yyyyMMddHHmmssfff";
        //private readonly ILoggerService _loggerService;
        private static object _lock = new object();
        #endregion
        private string GetClaimValue(string claimType)
        {
            var claim = HttpContext?.User?.Claims?.FirstOrDefault(c => c.Type == claimType);
            return claim?.Value;
        }

        public UserController(IUserService userService, FIMSDbContext FIMSDbContext /*ILoggerService loggerService*/)
        {
            _userService = userService;
            _FIMSDbContext = FIMSDbContext;
            //_loggerService = loggerService;

        }
        public IActionResult Index(string status, string role, string los, string sbu, bool isFromDashboard, string title)
        {

            var getroles = _FIMSDbContext.Roles.ToList();
            ViewBag.Status = status;
            ViewBag.Role = role;
            ViewBag.LOS = los;
            ViewBag.SBU = sbu;
            ViewBag.Title = title;
            ViewBag.IsFromDashboard = isFromDashboard;
            ViewBag.Title = title;
            var userRoleID = GetClaimValue(UserPWC.Utilities.ApplicationConstants.Claims.USER_ROLE_ID);
            var isSuperAdmin = GetClaimValue(UserPWC.Utilities.ApplicationConstants.Claims.IS_SUPER_ADMIN);
            if (userRoleID == UserPWC.Utilities.UserRoles.Admin.ToString() ||
                isSuperAdmin == "Yes")
            {
                return View();
            }
            else
            {
                return View();
            }
           

        }
        //GET: User/GetLOS
        [HttpGet]
        public List<FIMS_LOS_DTO> GetLOS()
        {
            var los = GetClaimValue(UserPWC.Utilities.ApplicationConstants.Claims.USER_LOS_CODE);
            var UserRole = GetClaimValue(UserPWC.Utilities.ApplicationConstants.Claims.USER_ROLE_ID);
            var UserId = GetClaimValue(UserPWC.Utilities.ApplicationConstants.Claims.EMPLOYEE_ID);
            return _userService.GetLOS(UserId, UserRole);
        }
        //GET: User/GetSBU?losCode?"40000,70000"
        [HttpGet]
        public List<FIMS_SBU_DTO> GetSBU(string losCode)
        {
            if(losCode!=""&&losCode!=null)
            {
                losCode = losCode.Replace("NaN,", "");
            }
            var Sbu = GetClaimValue(UserPWC.Utilities.ApplicationConstants.Claims.USER_SBU_CODE);
            var UserRole = GetClaimValue(UserPWC.Utilities.ApplicationConstants.Claims.USER_ROLE_ID);
            var UserId = GetClaimValue(UserPWC.Utilities.ApplicationConstants.Claims.EMPLOYEE_ID);
            return _userService.GetSBU(losCode, UserId, UserRole);
        }
        //GET: User/GetRoles
        [HttpGet]
        public List<FIMS_Roles> GetRoles()
        {
            var userRole = GetClaimValue(UserPWC.Utilities.ApplicationConstants.Claims.USER_ROLE_ID);
            var isSuperAdmin = GetClaimValue(UserPWC.Utilities.ApplicationConstants.Claims.IS_SUPER_ADMIN);
            return _userService.GetRoles(userRole, isSuperAdmin);
        }
        //GET: User/GetAllUsers
        [HttpGet]
        public FIMS_Add_Users_DTO GetAllUsers(string UserId, string UserRoleId)
        {
            var los = GetClaimValue(UserPWC.Utilities.ApplicationConstants.Claims.USER_LOS_CODE);
            var result = _userService.GetAllUsers(UserId, UserRoleId);
            return result;
        }
        //GET: User/GetUsers
        [HttpGet]
        public List<FIMS_Eng_Partner_Manager_DTO> GetUsers(string losCode, string sbuCode)
        {
            losCode = GetClaimValue(UserPWC.Utilities.ApplicationConstants.Claims.LOS_CODE);
            sbuCode = GetClaimValue(UserPWC.Utilities.ApplicationConstants.Claims.SBU_CODE);
            var result = _userService.GetUsers(losCode, sbuCode);
            return result;
        }



        // POST: User/GetUsersList
        [HttpPost]
        public FIMS_User_DTO GetUsersList()
        {
            var data = Request.Form["UserInput"];
            var isSuperAdmin = GetClaimValue(UserPWC.Utilities.ApplicationConstants.Claims.IS_SUPER_ADMIN);
            var los = GetClaimValue(UserPWC.Utilities.ApplicationConstants.Claims.LOS_CODE);
            var sbu = GetClaimValue(UserPWC.Utilities.ApplicationConstants.Claims.SBU_CODE);
            var InputData = JsonConvert.DeserializeObject<FIMS_User_Input_DTO>(data);
            if (isSuperAdmin == "Yes")
            {
                return _userService.GetUsersList(InputData);
            }
            else
            {
                return _userService.GetUsersList(InputData, los, sbu);
            }
        }

        //POST: User/AddUser
        [HttpPost]
        public IActionResult AddUser()
        {
            var data = Request.Form["users"];
            var losCode = Request.Form["losCode"].ToString();
            var sbuCode = Request.Form["sbuCode"].ToString();
            var user_List = JsonConvert.DeserializeObject<List<FIMS_Users>>(data);

            var list = _FIMSDbContext.TblStaff.Where(_ => _.Status == "Active").DistinctBy(_ => _.SBUCode).ToList();
            var losName = list.Where(_ => losCode.Split(',').Contains(_.LOSCode)).DistinctBy(_ => _.LOSCode).Select(_ => _.LOS).ToList();
            var sbuName = list.Where(_ => sbuCode.Split(',').Contains(_.SBUCode)).DistinctBy(_ => _.SBUCode).Select(_ => _.Organisation_SBU).ToList();

            user_List.ForEach(_ => { _.LOS = string.Join(",", losName); _.SBU = string.Join(",", sbuName); });

            _userService.AddUsers(user_List);
            return Ok();
        }

        //GET: /User/GetUserByID?userID=5,
        [HttpGet]
        public FIMS_Users GetUserByID(string userID)
        {
            return _userService.GetUserByID(userID);
        }

        //POST: /User/UpdateUser?userID=5
        [HttpPost]
        public IActionResult UpdateUser(string userID, string actionBy, int statusID, long roleID)
        {
            var losCode = Request.Form["losCode"].ToString();
            var sbuCode = Request.Form["sbuCode"].ToString();

            var list = _FIMSDbContext.TblStaff.Where(_ => _.Status == "Active").DistinctBy(_ => _.SBUCode).ToList();
            var losName = list.Where(_ => losCode.Split(',').Contains(_.LOSCode)).DistinctBy(_ => _.LOSCode).Select(_ => _.LOS).ToList();
            var sbuName = list.Where(_ => sbuCode.Split(',').Contains(_.SBUCode)).DistinctBy(_ => _.SBUCode).Select(_ => _.Organisation_SBU).ToList();

            _userService.UpdateUsers(userID, actionBy, statusID, string.Join(",", losName), string.Join(",", sbuName), losCode, sbuCode, roleID);
            return Ok();
        }
    }
}
