using UserPWC.Models;

using System;
using System.Collections.Generic;
using System.Text;

namespace UserPWC.Interface
{
    public interface ILoginService
    {
        public Roles GetUserRoles(string userId);
        public FIMS_User_Info_DTO GetLoginUserDetails(string loginKey);
    }
}
