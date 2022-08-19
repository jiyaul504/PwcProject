using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace UserPWC.Models
{
    [Table("FIMS_Status")]
    public class FIMS_Status
    {
        [Key]
        public long Status_ID { get; set; }
        public string Status_Name { get; set; }
        [NotMapped]
        public string Color { get; set; }
        [NotMapped]
        public int Count { get; set; }
    }
}
