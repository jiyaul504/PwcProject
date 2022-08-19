using System;
using System.Collections.Generic;
using System.Text;

namespace UserPWC.Dto
{
    public class FIMS_Request_Input_DTO
    {
        public string requestId { get; set; }
        public string createdDate { get; set; }
        public string createdBy { get; set; }
        public string engagementManager { get; set; }
        public string engagementPartner { get; set; }
        public string clientName { get; set; }
        public string entityName { get; set; }
        public string vendorName { get; set; }
        public string fileType { get; set; }
        public string requestType { get; set; }
        public string status { get; set; }
        public string approverName { get; set; }
        public string approverDesignation { get; set; }
        public string lastRequestApproval { get; set; }
        public bool isFromDashboard { get; set; }
        public bool isFromSwitchLegal { get; set; }
        public int DashboardTabType { get; set; }
        public string fltrRequestId { get; set; }
        public string fltrBarcode { get; set; }
        public string fltrContainercode { get; set; }
        public string fltrFilecode { get; set; }
        public string fltrengPartner { get; set; }
        public string fltrengManager { get; set; }
        public string fltrLocation { get; set; }
        public string fltrLos { get; set; }
        public string fltrSbu { get; set; }
        public string fltrProjectCode { get; set; }
        public string fltrStatus { get; set; }
        public string redirectionFltrStatusID { get; set; }
        public string chartStatus { get; set; }
        public string fltrFileType { get; set; }
        public string fltrReqType { get; set; }
        public string fltrclient { get; set; }
        public string fltrentity { get; set; }
        //Reports
        public string fltrActive_File_Date { get; set; }
        public string fltractiveStartDate { get; set; }
        public string fltractiveEndDate { get; set; }
        public string fltrClientDocs { get; set; }
        public string fltrReqStatus { get; set; }
        public string fltr_Disposal_Due_Date { get; set; }
        public string fltrReturnDate { get; set; }
        public string returnDateSearch { get; set; }
        public bool IsExport { get; set; }
        public string fltrFinancialYr { get; set; }
        public string finacial_Yr_Search { get; set; }
        public string page_Search { get; set; }
        public string fltr_R_Start_Date { get; set; }
        public string fltr_R_End_Date { get; set; }
        public string fltr_return_Start_Date { get; set; }
        public string fltr_return_End_Date { get; set; }

        public string userID { get; set; }
        public string userRoleId { get; set; }
        public string Designation { get; set; }
        public string losCode { get; set; }
        public string sbuCode { get; set; }
        public string isSuperAdmin { get; set; }
        public string R_StartDateSearch { get; set; }
        public string R_YrSearch { get; set; }
        public string R_CompletedDateSearch { get; set; }
        public string fltr_R_CompleteYear { get; set; }
        public string fltr_R_Complete_Date { get; set; }
        public byte Is_Government_Client { get; set; }
        public int pageType { get; set; }
        public int page { get; set; }
        public int limit { get; set; }
        public string sort { get; set; }
        public string order { get; set; }
    }
}
