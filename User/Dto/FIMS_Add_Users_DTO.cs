using System;
using System.Collections.Generic;
using System.Text;

namespace UserPWC.Dto
{
    public class FIMS_Add_Users_DTO
    {
        public List<FIMS_Eng_Partner_Manager_DTO> UserList { get; set; }
        public List<FIMS_LOS_DTO> LosList { get; set; }
    }
}
