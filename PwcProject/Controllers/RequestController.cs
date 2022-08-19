using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using UserPWC.Interface;
using UserPWC.Context;
using UserPWC.Utilities;
using UserPWC.Dto;
using UserPWC.Models;

namespace PwcProject.Controllers
{
    [Authorize]
    [AutoValidateAntiforgeryToken]
    public class RequestController : Controller
    {
        
        private readonly IRequestService _requestService;
       
        private readonly FIMSDbContext _FIMSDbContext;
        
        private string GetClaimValue(string claimType)
        {
            var claim = HttpContext?.User?.Claims?.FirstOrDefault(c => c.Type == claimType);
            return claim?.Value;
        }
        
       

        public RequestController(IRequestService requestService, FIMSDbContext FIMSDbContext)
        {
            _requestService = requestService;
          
            _FIMSDbContext = FIMSDbContext;
            
        }

        public IActionResult Index(int Pagetype, string status, long statusID, string requestType, bool isFromDashboard, string los, string sbu)
        {
            ViewBag.PageType = Pagetype;
            ViewBag.status = status;
            ViewBag.RequestType = requestType;
            ViewBag.isFromDashboard = isFromDashboard;
            ViewBag.userRole = Convert.ToInt32(GetClaimValue(UserPWC.Utilities.ApplicationConstants.Claims.USER_ROLE_ID));
            ViewBag.FltrLOS = los;
            ViewBag.FltrSBU = sbu;
            ViewBag.FltrStatusID = statusID;

            var userRoleID = GetClaimValue(UserPWC.Utilities.ApplicationConstants.Claims.USER_ROLE_ID);
            var designationID = GetClaimValue(UserPWC.Utilities.ApplicationConstants.Claims.DESIGNATION_ID);
            var isSuperAdmin = GetClaimValue(UserPWC.Utilities.ApplicationConstants.Claims.IS_SUPER_ADMIN);
            if (Pagetype == PageTypes.MyRequest || Pagetype == PageTypes.Historical)
            {
                return View();
            }
            else if (Pagetype == PageTypes.MyApproval)
            {
                if (userRoleID == UserPWC.Utilities.UserRoles.Manager.ToString() ||
                designationID == UserPWC.Utilities.UserRoles.Manager.ToString() ||
                userRoleID == UserPWC.Utilities.UserRoles.Partner.ToString() ||
                designationID == UserPWC.Utilities.UserRoles.Partner.ToString() ||
                userRoleID == UserPWC.Utilities.UserRoles.R_Q_RM.ToString() ||
                userRoleID == UserPWC.Utilities.UserRoles.OGC_Risk_Team.ToString())
                {
                    return View();
                }
                else
                {
                    return RedirectToAction("AccessDenied", "Login");
                }
            }
            else if(Pagetype == PageTypes.ManageRequest)
            {
                if (userRoleID == UserPWC.Utilities.UserRoles.Auditor.ToString() ||
                userRoleID == UserPWC.Utilities.UserRoles.Admin.ToString() ||
                isSuperAdmin == "Yes" ||
                userRoleID == UserPWC.Utilities.UserRoles.FileCoordinator.ToString())
                {
                    return View();
                }
                else
                {
                    return RedirectToAction("AccessDenied", "Login");
                }
            }
            else if (Pagetype == PageTypes.VendorSubmission)
            {
                if (userRoleID == UserPWC.Utilities.UserRoles.Business_Service_Coordinator.ToString())
                {
                    return View();
                }
                else
                {
                    return RedirectToAction("AccessDenied", "Login");
                }
            }
            else
            {
                return RedirectToAction("AccessDenied", "Login");
            }                        
        }
        //GET: Request/GetLOS
        [HttpGet]
        public List<FIMS_LOS_DTO> GetLOS()
        {
            return _requestService.GetLOS();
        }
        //GET: Request/GetSBU
        [HttpGet]
        public List<FIMS_SBU_DTO> GetSBU(string losCode)
        {
            return _requestService.GetSBU(losCode);
        }
        //GET: Request/GetStatus
        [HttpGet]
        public List<FIMS_Status> GetStatus()
        {
            return _requestService.GetStatus();
        }



        [HttpGet]
        // GET: Request/RequestsPartialView
        public IActionResult RequestsPartialView(int Pagetype, string status, long statusID, string requestType, bool isFromDashboard, string los, string sbu)
        {
            return RedirectToAction("Index", "Request", new { Pagetype = Pagetype, status = status, statusID = statusID, requestType = requestType, isFromDashboard = isFromDashboard, los = los, sbu = sbu });
        }

     
    }
}
