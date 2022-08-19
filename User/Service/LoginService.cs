using UserPWC.Dto;
using UserPWC.Context;
using UserPWC.Interface;
using UserPWC.Models;
using UserPWC.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace UserPWC.Service
{
    public class LoginService : ILoginService
    {
        private readonly FIMSDbContext _FIMSDbContext;
        //private readonly ILoggerService _loggerService;

        private bool isManager(string designation, string oracleDesignation)
        {
            if (designation == "IND Director" || designation == "IND Executive Director" ||
                designation == "IND Managing Director" || designation == "IND Senior Director" ||
                oracleDesignation == "Director" || oracleDesignation == "Executive Director" ||
                oracleDesignation == "Managing Director" || oracleDesignation == "Senior Director")
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        private bool isPartner(string designation, string oracleDesignation)
        {
            if (designation == "IND Partner" || oracleDesignation == "Partner")
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public LoginService(FIMSDbContext MDContext
                               /*ILoggerService loggerService*/)
        {
            this._FIMSDbContext = MDContext;
            //_loggerService = loggerService;
        }

        public Roles GetUserRoles(string userId)
        {
            return null;
        }

        public FIMS_User_Info_DTO GetLoginUserDetails(string loginKey)
        {
            if (string.IsNullOrWhiteSpace(loginKey.ToString()))
            {
                throw new ArgumentException(
                    $"'{nameof(loginKey)}' cannot be null or whitespace",
                    nameof(loginKey));
            }
            try
            {
                FIMS_User_Info_DTO userInfo = new FIMS_User_Info_DTO();

                var user = _FIMSDbContext.TblStaff.Where(_ => _.empguid == loginKey && _.Status == "Active").FirstOrDefault();

                if (user != null)
                {
                    var userDetail = _FIMSDbContext.Users.Where(_ => _.Employee_ID == user.EmployeeID && _.Status_ID == 1).FirstOrDefault();
                    var manager = isManager(user.Designation, user.OracleDesignation);
                    var partner = isPartner(user.Designation, user.OracleDesignation);
                    if (userDetail != null)
                    {
                        userInfo.LOSCode = userDetail.LOSCode;
                        userInfo.SBUCode = userDetail.SBU_Code;
                        userInfo.LOS = userDetail.LOS;
                        userInfo.SBU = userDetail.SBU;
                        userInfo.UserInfo = user;
                        userInfo.IsSuperAdmin = userDetail.IS_SuperAdmin == 1 || userDetail.Role_ID == UserRoles.SuperAdmin ? "Yes" : "No";
                        userInfo.UserRoleID = userDetail.Role_ID.ToString();
                        userInfo.UserRole = userDetail.IS_SuperAdmin == 1 ? "SuperAdmin" : _FIMSDbContext.Roles.Where(_ => _.Role_ID == userDetail.Role_ID).Select(_ => _.Role_Description).FirstOrDefault();
                    }
                    else if (manager)
                    {
                        userInfo.LOSCode = "";
                        userInfo.SBUCode = "";
                        userInfo.LOS = "";
                        userInfo.SBU = "";
                        userInfo.UserInfo = user;
                        userInfo.IsSuperAdmin = "No";
                        userInfo.UserRoleID = UserRoles.Manager.ToString();
                        userInfo.UserRole = "Manager";
                    }
                    else if (partner)
                    {
                        userInfo.LOSCode = "";
                        userInfo.SBUCode = "";
                        userInfo.LOS = "";
                        userInfo.SBU = "";
                        userInfo.UserInfo = user;
                        userInfo.IsSuperAdmin = "No";
                        userInfo.UserRoleID = UserRoles.Partner.ToString();
                        userInfo.UserRole = "Partner";
                    }
                    else
                    {
                        userInfo.LOSCode = "";
                        userInfo.SBUCode = "";
                        userInfo.LOS = "";
                        userInfo.SBU = "";
                        userInfo.UserInfo = user;
                        userInfo.IsSuperAdmin = "No";
                        userInfo.UserRoleID = UserRoles.Requestor.ToString();
                        userInfo.UserRole = "Requestor";
                    }

                    if (manager && userInfo.UserRoleID != UserRoles.DataAnalytics.ToString())
                    {
                        userInfo.DesignationID = UserRoles.Manager.ToString();
                        userInfo.Designation = "Manager";
                    }
                    else if (partner && userInfo.UserRoleID != UserRoles.DataAnalytics.ToString())
                    {
                        userInfo.DesignationID = UserRoles.Partner.ToString();
                        userInfo.Designation = "Partner";
                    }
                    else
                    {
                        userInfo.DesignationID = userInfo.UserRoleID;
                        userInfo.Designation = userInfo.UserRole;
                    }
                }
                return userInfo;
            }
            catch (Exception ex)
            {
                //_loggerService.Error(ex.Message, ex);
                throw;
            }
        }
    }
}
