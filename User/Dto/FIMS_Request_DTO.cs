using UserPWC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace UserPWC.Models
{
    public class FIMS_Request_DTO
    {
        public int TotalCount { get; set; }
        public IQueryable<FIMS_Request> Requests { get; set; }
    }
}
