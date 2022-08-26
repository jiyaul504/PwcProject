using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace UserPWC.Models
{
    
    public class TblStaff
    {
        public string EmployeeID { get; set; }
        public string EmployeePartyID { get; set; }
        public string oldempid { get; set; }
        public string empguid { get; set; }
        public string EmployeeName { get; set; }
        public string First_Name { get; set; }
        public string Last_Name { get; set; }
        public string EntityName { get; set; }
        public string Organisation_SBU { get; set; }
        public string Organisation_SBU1 { get; set; }
        public string SubSBU { get; set; }
        public string Office { get; set; }
        public string GroupCode { get; set; }
        public string OfficeCode { get; set; }
        public string City { get; set; }
        public string LOS { get; set; }
        public string Email { get; set; }
        public string LotusNotesEmail { get; set; }
        public string Management_Level_Reference { get; set; }
        public string Designation { get; set; }
      
        public string Legacy_Position_Title { get; set; }
        public string Status { get; set; }
        public DateTime? JoiningDate { get; set; }
        public DateTime? TerminationDate { get; set; }
        public string UpdateBy { get; set; }
        public string UpdatedDatetime { get; set; }
        public string EntityCode { get; set; }
        public string LOSCode { get; set; }
        public string SBUCode { get; set; }
        public string PracticeEntityName { get; set; }
        public string PracticeEntityCode { get; set; }
        public string ServiceSupportFlag { get; set; }
        public string SubSBUCode { get; set; }
        public string Mobile_no { get; set; }
        public string AD_Id { get; set; }
        public string SMTPID { get; set; }
        public string NOTESID { get; set; }
        public string Gender { get; set; }
        public string People_Manager_ID { get; set; }
        public string People_Manager_Name { get; set; }
        public DateTime? Date_Of_Birth { get; set; }
        public string OfficeLocation { get; set; }
        public string CompetencyCode { get; set; }
        public string CompetencyName { get; set; }
        public string Industry { get; set; }
        public string Gender_Reference_Descriptor { get; set; }
        public double? State_Code { get; set; }
        public string State_Name { get; set; }
        public string OracleEntityCode { get; set; }
        public string OracleLOSCode { get; set; }
        public string OracleSBUCode { get; set; }
        public string OracleSubSBUCode { get; set; }
        public string OracleCompetencyCode { get; set; }
        public string OracleLocationCode { get; set; }
        public string BloodGroup { get; set; }
        public string OracleDesignationID { get; set; }
        public string OracleDesignation { get; set; }
        public string Full_Name { get; set; }
        public string Oracle_Job_Description { get; set; }
        public string USER_PERSON_TYPE { get; set; }
        public string Contract_Type_Reference { get; set; }
        public string Nationality { get; set; }
        public int Id_Ref { get; set; }
        public string people_manager_notesid { get; set; }
        public string people_manager_desg { get; set; }
        public string pwcgmailid { get; set; }
        public string Matrix_Manager_Reference_Descriptor { get; set; }
        public string Matrix_Manager_Reference_D { get; set; }
        public int EmployeeNumber { get; set; }
        public DateTime? expectedterminationdate { get; set; }
        public DateTime? datetimeinitiated { get; set; }
        public string primaryterminationreason { get; set; }
        public string localterminationreason { get; set; }
        public string terminationcategory { get; set; }
        public DateTime? notificationdate { get; set; }
        public string noticegiven { get; set; }
        [NotMapped]
        public string UserType { get; set; }
    }
}
