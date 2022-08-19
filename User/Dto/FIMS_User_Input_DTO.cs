using System;
using System.Collections.Generic;
using System.Text;

namespace UserPWC.Models
{
    public class FIMS_User_Input_DTO
    {
        public string employee_Name { get; set; }
        public string employee_ID { get; set; }
        public string role { get; set; }
        public string los { get; set; }
        public string sbu { get; set; }
        public string status { get; set; }
        public int page { get; set; }
        public int limit { get; set; }
        public string sort { get; set; }
        public string order { get; set; }
    }
}
