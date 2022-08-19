using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace UserPWC.Models
{
    [Table("FIMS_File_Owners")]
    public class FIMS_File_Owners
    {
        [Key]
        public long Owner_ID { get; set; }
        public long Request_ID { get; set; }
        public string Owner_Employee_ID { get; set; }
        public string Action_By { get; set; }
        public DateTime? Action_On { get; set; }
        [NotMapped]
        public Guid? Guid { get; set; }
        [NotMapped]
        public string EAF_No { get; set; }
        [NotMapped]
        public string Project_Code { get; set; }
        [NotMapped]
        public string Task_Code { get; set; }
        //[NotMapped]
        //public string Requester_ID { get; set; }
    }
}
