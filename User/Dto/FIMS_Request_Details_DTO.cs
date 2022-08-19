using System.Linq;
using UserPWC.Models;

namespace UserPWC.Dto
{
    public class FIMS_Request_Details_DTO
    {
        public FIMS_Request Request { get; set; }
        //public IQueryable<FIMS_Request_Approval_History> approval_History{ get; set; }
        public IQueryable<FIMS_File_Owners> owners{ get; set; }
        //public FIMS_Request_Reason retrivalReason { get; set; }
        //public FIMS_Request_Reason rearchivalReason { get; set; }
    }
}
