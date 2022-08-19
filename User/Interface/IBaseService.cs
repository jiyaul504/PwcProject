using UserPWC.Models;
using System.Linq;
namespace UserPWC.Interface
{
    public interface IBaseService
    {
        
        public IQueryable<FIMS_Request> GetRequest(string userID = null, string userRoleID = null, string isSuperAdmin = null, int? pageType = null);
        public long GetStatusID(long requestID, long RequestType_ID, string user, string userRoleID, string isSuperAdmin, long Status_ID, string Approved_By, string Requested_By, int? Is_Content_Modified, long? Role_ID, int? pageType = null, string ownerID = null, string balnketDocumnets = null, long ? SwitchRequesterRoleID = null, string SwitchLegalRequester = null, string requestManager = null);
        public string IsActiveEmployee(string user);  
       
    }
}
