using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UserPWC.Models
{
    [Table("FIMS_Request")]
    public class FIMS_Request
    {
        [Key]
        public long Request_ID { get; set; }
        public string EAF_No { get; set; }
        public string Project_Code { get; set; }
        public string Task_Code { get; set; }
        public string Engagement_Name { get; set; }
        public string Engagement_Description { get; set; }
        public string Financial_Year { get; set; }
        public string Engagement_Manager_ID { get; set; }
        public string Engagement_Partner_ID { get; set; }
        public string BU_Lead_ID { get; set; }
        public string Engagement_Manager { get; set; }
        public string Engagement_Partner { get; set; }
        public string BU_Lead { get; set; }
        public string Client_Name { get; set; }
        public string LOS_Code { get; set; }
        public string SBU_Code { get; set; }
        public string Signing_Firm { get; set; }
        public string Save_IT_Reference { get; set; }
        public long DRS_Classification_Type_ID { get; set; }
        public DateTime Engagement_Start_date { get; set; }
        public DateTime? LOS_Report_Signing_Date { get; set; }
        public DateTime? Engagement_End_Date { get; set; }
        public DateTime? Engagement_Terminated { get; set; }
        public int Retention_Period_Compeltion { get; set; }
        public string Location { get; set; }
        public long? Vendor_ID { get; set; }
        public string Container_Code { get; set; }
        public long? Batch_Number { get; set; }
        public string Acknowledgement_File { get; set; }
        public string Bar_Code { get; set; }
        public string File_Code { get; set; }
        public string Description { get; set; }
        public long Status_ID { get; set; }
        public DateTime? Created_Date { get; set; }
        public string Action_By { get; set; }
        public DateTime? Action_On { get; set; }
        public string Approved_By { get; set; }
        public string Approver_Name { get; set; }
        public long? Approver_Role_ID { get; set; }

        public string Requested_By { get; set; }
        public long Requester_Role_ID { get; set; }
        public string Requester_Name { get; set; }
        public byte Is_Active { get; set; }
        public string LOS { get; set; }
        public string SBU { get; set; }
        public string Entity_Name { get; set; }
        public byte Is_Government_Client { get; set; }
        public byte Is_Vendor_Modified { get; set; }

        //Historical Fields

        public string Archival_Location { get; set; }
        public string Code { get; set; }
        public string Status_Date { get; set; }
        public string Department { get; set; }
        public string Item_Status { get; set; }
        public string Field_17 { get; set; }
        public string Field_18 { get; set; }
        public string Field_19 { get; set; }
        public string Field_20 { get; set; }
        public string Field_21 { get; set; }
        public string Field_22 { get; set; }
        public string Field_23 { get; set; }
        public string Field_24 { get; set; }
        public string Field_25 { get; set; }
        public string Field_26 { get; set; }
        public string Field_27 { get; set; }
        public string Field_28 { get; set; }
        public string Field_29 { get; set; }
        public string Historical_Comments { get; set; }
        public string Historical_Description { get; set; }
        public string Account_Code { get; set; }
        public string Account_Description { get; set; }
        public string Add_Date { get; set; }
        public byte? Is_Historical { get; set; }
        public long? Latest_RequestTypeID { get; set; }
        public string Contract_Code { get; set; }
        public string Reason_For_Retention_Period_Change { get; set; }
        //
        [NotMapped]
        public string Blanket_Document { get; set; }
        [NotMapped]
        public string FileType { get; set; }
        [NotMapped]
        public long RequestType_ID { get; set; }
        [NotMapped]
        public string RequestType { get; set; }
        [NotMapped]
        public string Status { get; set; }
        [NotMapped]
        public string ApproverID { get; set; }
        [NotMapped]
        public string ApproverDesignation { get; set; }

        [NotMapped]
        public string? LastRequestApproval { get; set; }
        [NotMapped]
        public string? CreatedDate_Formatted { get; set; }

        [NotMapped]
        public Guid? Guid { get; set; }
        [NotMapped]
        public string Status_Code { get; set; }
        [NotMapped]
        public string Request_Color_Code { get; set; }
        [NotMapped]
        public string Vendor_Name { get; set; }
        [NotMapped]
        public string File_Name { get; set; }
        [NotMapped]
        public long Request_File_ID { get; set; }
        [NotMapped]
        public string Breif_Description { get; set; }
        [NotMapped]
        public int No_Of_Files { get; set; }
        [NotMapped]
        public string File_Description { get; set; }
        [NotMapped]
        public byte isAssociatedOriginalClientDoc { get; set; }
        [NotMapped]
        public string OriginalClentDocs { get; set; }
        [NotMapped]
        public byte ISSoftCopyAvailable { get; set; }
        [NotMapped]
        public string SoftCopyDocs { get; set; }
        [NotMapped]
        public byte IsFilelegalHold { get; set; }
        [NotMapped]
        public string LegalFileDescription { get; set; }
        [NotMapped]
        public string Comments { get; set; }
        [NotMapped]
        public string Financial_Year_Formatted { get; set; }
        [NotMapped]
        public string Engagement_Start_date_Formatted { get; set; }
        [NotMapped]
        public string LOS_Report_Signing_Date_Formatted { get; set; }
        [NotMapped]
        public string Engagement_End_Date_Formatted { get; set; }
        [NotMapped]
        public string Engagement_Terminated_Formatted { get; set; }
        [NotMapped]
        public string LegalHoldDocuments { get; set; }
        [NotMapped]
        public string Request_Type { get; set; }
        [NotMapped]
        public string Action { get; set; }
        [NotMapped]
        public string Name { get; set; }
        [NotMapped]
        public string ActionOn_Formatted { get; set; }
        [NotMapped]
        public string ActionOn_Date { get; set; }
        [NotMapped]
        public string ActionOn_Month { get; set; }
        [NotMapped]
        public string Type { get; set; }
        [NotMapped]
        public string Requester_Role { get; set; }
        [NotMapped]
        public long Next_Role_ID { get; set; }
        [NotMapped]
        public string Next_Role { get; set; }
        [NotMapped]
        public long Next_Status_ID { get; set; }
        [NotMapped]
        public string Next_Status { get; set; }
        [NotMapped]
        public string Next_Status_Color_Code { get; set; }
        [NotMapped]
        public long Over_All_Status_ID { get; set; }
        [NotMapped]
        public string Over_All_Status { get; set; }
        [NotMapped]
        public string Over_All_Status_Code { get; set; }
        [NotMapped]
        public long AuditHistoryId { get; set; }
        [NotMapped]
        public string? R_StartDate_Formatted { get; set; }
        [NotMapped]
        public string R_CompletedDate_Formatted { get; set; }
        [NotMapped]
        public DateTime R_CompletedDate { get; set; }
        [NotMapped]
        public string RetentionYear { get; set; }
        [NotMapped]
        public bool IsOwnerRequest { get; set; }
        [NotMapped]
        public bool IsContentModified { get; set; }
        [NotMapped]
        public int Mode { get; set; }
        [NotMapped]
        public string RequestType_code { get; set; }
        [NotMapped]
        public bool IsRetentionCompleted { get; set; }
        [NotMapped]
        public bool IsOGC_RQRM_Request { get; set; }
        [NotMapped]
        public DateTime? ReturnDate { get; set; }
        [NotMapped]
        public string ReturnDate_Formatted { get; set; }
        [NotMapped]
        public string PageType { get; set; }
        [NotMapped]
        public string RedirectUrlEmail { get; set; }
        [NotMapped]
        public string EmailContent { get; set; }
        [NotMapped]
        public string Approver { get; set; }
        [NotMapped]
        public string Req_Name { get; set; }
        [NotMapped]
        public bool IsBlanketApprovalRequest { get; set; }
        [NotMapped]
        public string switchLegalRequester { get; set; }
        [NotMapped]
        public long switchLegalRequesterRoleID { get; set; }
        [NotMapped]
         public List<long> Request_Ids { get; set; }
        [NotMapped]
        public string Retrieval_CCID { get; set; }
        [NotMapped]
        public string Have_The_Contents_Of_The_File_Been_Modified { get; set; }

    }

}
