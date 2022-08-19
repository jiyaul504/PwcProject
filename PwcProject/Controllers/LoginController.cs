using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using UserPWC.Context;
using UserPWC.Interface;
using UserPWC.Models;
using UserPWC.Utilities;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;

namespace Pwc.FIMS.Web.Controllers
{
    public class LoginController : Controller
    {
        private readonly FIMSDbContext _FIMSDbContext;
        private readonly IConfiguration _configuration;
        private readonly ILoginService _loginSerivce;

        public LoginController(FIMSDbContext MDContext, IConfiguration configuration, ILoginService loginService)
        {
            _FIMSDbContext = MDContext;
            _configuration = configuration;
            _loginSerivce = loginService;
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult AccessDenied()
        {
            return View();
        }

        public IActionResult Logout()
        {
            var EnableOpenAMLogin = _configuration.GetSection("AppSettings:EnableDirectAdLogin");
            if (EnableOpenAMLogin != null && EnableOpenAMLogin.Value == "Y")
            {
                 HttpContext.SignOutAsync(OpenIdConnectDefaults.AuthenticationScheme).ConfigureAwait(false);
            }

             HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme).ConfigureAwait(false);

            return RedirectToAction("Index", "Login");
        }

        #region LoginWithoutAD
        private string GetClaimValue(string claimType)
        {
            var claim = HttpContext?.User?.Claims?.FirstOrDefault(c => c.Type == claimType);
            return claim?.Value;
        }

        private bool IsAuthenticated()
        {
            return !string.IsNullOrEmpty(GetClaimValue(UserPWC.Utilities.ApplicationConstants.Claims.EMPLOYEE_ID));
        }

        private void CreateAuthCookie(FIMS_User_Info_DTO userInfoDTO, string pwcguid)
        {
            var claims = new List<Claim>
            {
                new Claim(ApplicationConstants.Claims.PWC_GUID, pwcguid),
                new Claim(ApplicationConstants.Claims.FULL_NAME, userInfoDTO.UserInfo.Full_Name),
                new Claim(ApplicationConstants.Claims.EMPLOYEE_ID, userInfoDTO.UserInfo.EmployeeID),
                new Claim(ApplicationConstants.Claims.USERADID, userInfoDTO.UserInfo.AD_Id),
                new Claim(ApplicationConstants.Claims.USER_ROLE, userInfoDTO.UserRole),
                new Claim(ApplicationConstants.Claims.USER_ROLE_ID, userInfoDTO.UserRoleID),
                new Claim(ApplicationConstants.Claims.DESIGNATION, userInfoDTO.Designation),
                new Claim(ApplicationConstants.Claims.DESIGNATION_ID, userInfoDTO.DesignationID),
                new Claim(ApplicationConstants.Claims.LOS, userInfoDTO.UserInfo.LOS),
                new Claim(ApplicationConstants.Claims.SBU, userInfoDTO.UserInfo.Organisation_SBU),
                new Claim(ApplicationConstants.Claims.LOS_CODE, userInfoDTO.UserInfo.LOSCode),
                new Claim(ApplicationConstants.Claims.SBU_CODE, userInfoDTO.UserInfo.SBUCode),
                new Claim(ApplicationConstants.Claims.USER_LOS, userInfoDTO.LOS),
                new Claim(ApplicationConstants.Claims.USER_SBU, userInfoDTO.SBU),
                new Claim(ApplicationConstants.Claims.USER_LOS_CODE, userInfoDTO.LOSCode),
                new Claim(ApplicationConstants.Claims.USER_SBU_CODE, userInfoDTO.SBUCode),
                new Claim(ApplicationConstants.Claims.IS_SUPER_ADMIN, userInfoDTO.IsSuperAdmin),
            };

            var userIdentity = new ClaimsIdentity(claims, "pwclogin");

            ClaimsPrincipal principal = new ClaimsPrincipal(userIdentity);
            var authProperties = new AuthenticationProperties
            {
                IssuedUtc = DateTime.UtcNow,
                AllowRefresh = true,
                IsPersistent = true,
            };

            HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal, authProperties).Wait();
        }

        [HttpPost]
        [AutoValidateAntiforgeryToken]

        public IActionResult Login(IFormCollection formCollection)
        {
            var EnableOpenAMLogin = _configuration.GetSection("AppSettings:EnableDirectAdLogin");
            if (EnableOpenAMLogin != null)
            {
                if (IsAuthenticated())
                {
                    return RedirectToAction("Index", "Home");
                }
                string username = formCollection["Email"];
                var pwcGuid = _FIMSDbContext.TblStaff.Where(_ => _.Email == username).Select(_ => _.empguid).FirstOrDefault();

                if (ModelState.IsValid && !String.IsNullOrEmpty(pwcGuid))
                {
                    var result = _loginSerivce.GetLoginUserDetails(pwcGuid);

                    if (result != null && result.UserInfo != null)
                    {
                        this.CreateAuthCookie(result, pwcGuid);
                        return RedirectToAction("Index", "Home");
                    }
                    else
                    {
                        return RedirectToAction("AccessDenied", "Login");
                    }
                }
            }
            return View();
        }
        #endregion LoginWithoutAD

    }
}
