using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using UserPWC.Dto;
using UserPWC.Models;

namespace UserPWC.Interface
{
    public interface IRequestService
    {
       
      
        public List<FIMS_LOS_DTO> GetLOS();
        public List<FIMS_SBU_DTO> GetSBU(string losCode);
        public List<FIMS_Status> GetStatus();
        public List<FIMS_Users> FIMS_Users();
       
      
    }
}
