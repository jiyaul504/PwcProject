using UserPWC.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace UserPWC.Models
{
    public class FIMS_User_Info_DTO
    {
        public TblStaff UserInfo { get; set; }
        public string IsSuperAdmin { get; set; }
        public string IsAdmin { get; set; }
        public string UserRoleID { get; set; }
        public string UserRole { get; set; }
        public string DesignationID { get; set; }
        public string Designation { get; set; }
        public string IdToken { get; set; }
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public List<Roles> Roles { get; set; }
        public string LOS { get; set; }
        public string LOSCode { get; set; }
        public string SBU { get; set; }
        public string SBUCode { get; set; }
        public FIMS_User_Info_DTO()
        {
            Roles = new List<Roles>();
        }

        public static List<string> GetRoleIds(List<Roles> userRoles)
        {
            var roles = new List<string>();

            foreach (Roles role in userRoles)
            {
                roles.Add(role.Id);
            }
            return roles;
        }
    }

    public static class ApplicationMessages
    {
        public static string USER_UNAUTHORIZED = "User is unauthorized to view this section";

        public static string USER_DOESNT_EXIST = "User does not exist";
    }
}
