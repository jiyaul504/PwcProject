using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UserPWC.Models
{
    [Table("FIMS_Request_Type")]
    public class FIMS_Request_Type
    {
        [Key]
        public long Request_Type_ID { get; set; }
        public string Request_Type_Name { get; set; }
        [NotMapped]
        public string EmailSubject { get; set; }
        [NotMapped]
        public string EmailContent { get; set; }
    }
}
