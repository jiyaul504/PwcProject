using UserPWC.Models;
using System.Collections.Generic;
using UserPWC.Dto;

namespace UserPWC.Interface
{
    public interface IUserService
    {
        public List<FIMS_LOS_DTO> GetLOS(string UserId, string UserRole);
        public List<FIMS_SBU_DTO> GetSBU(string losCode, string UserId, string UserRole);
        public FIMS_User_DTO GetUsersList(FIMS_User_Input_DTO input_DTO, string los = null, string sbu = null);
        public List<FIMS_Roles> GetRoles(string userRole, string isSuperAdmin);
        public FIMS_Add_Users_DTO GetAllUsers(string UserId, string UserRoleId);
        public List<FIMS_Eng_Partner_Manager_DTO> GetUsers(string losCode, string sbuCode);
        public void AddUsers(List<FIMS_Users> users);
        public FIMS_Users GetUserByID(string userID);
        public void UpdateUsers(string userID, string actionBy, int statusID, string losName, string sbuName, string losCode, string sbuCode, long roleID);
    }
}
