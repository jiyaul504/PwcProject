using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UserPWC.Models
{
    [Table("FIMS_M_Vendor")]
    public class FIMS_M_Vendor
    {
        [Key]
        public long Vendor_ID { get; set; }
        public string Vendor_Name { get; set; }
        public string Vendor_Contact_Person { get; set; }
        public string Vendor_Email { get; set; } 
        public string Vendor_Mobile { get; set; }
        public string Vendor_Location { get; set; }
        public string Vendor_Address { get; set; }
        public string Vendor_LOS_Code { get; set; }
        public string Vendor_LOS_Name { get; set; }
        public string Vendor_SBU_Code { get; set; }
        public string Vendor_SBU_Name { get; set; }
        public string Status { get; set; }
        public string Action_By { get; set; }
        public DateTime? Action_On { get; set; }
    }
}
