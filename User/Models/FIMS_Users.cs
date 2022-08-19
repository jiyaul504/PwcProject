using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UserPWC.Models
{
    [Table("FIMS_Users")]
    public class FIMS_Users
    {
        [Key]
        public long ID { get; set; }
        public string Employee_ID { get; set; }
        public string Employee_Name { get; set; }
        public long Role_ID { get; set; }
        public string LOSCode { get; set; }
        public string LOS { get; set; }
        public string SBU_Code { get; set; }
        public string SBU { get; set; }
        public byte Status_ID { get; set; }
        public byte IS_SuperAdmin { get; set; }
        public string Action_By { get; set; }
        public DateTime Action_On { get; set; }
        [NotMapped]
        public string Role_Description { get; set; }
        [NotMapped]
        public string Status_Key { get; set; }
        [NotMapped]
        public List<string> LOS_Code_List { get; set; }
        [NotMapped]
        public List<string> SBU_Code_List { get; set; }
        [NotMapped]
        public List<string> LOS_Name_List { get; set; }
        [NotMapped]
        public List<string> SBU_Name_List { get; set; }
    }
}
