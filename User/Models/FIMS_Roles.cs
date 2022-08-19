using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UserPWC.Models
{
    [Table("FIMS_Roles")]
    public class FIMS_Roles
    {
        [Key]
        public long Role_ID { get; set; }
        public string Role_Description { get; set; }
        public byte Status_ID { get; set; }
        public string Action_By { get; set; }
        public DateTime Action_On { get; set; }
    }
}
