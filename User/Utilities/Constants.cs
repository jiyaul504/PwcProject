using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;

namespace UserPWC.Utilities
{
    public class Status
    {
        public static int InActive = 0;
        public static int Active = 1;
    }
    public class PageTypes
    {
        public static int MyRequest = 1;
        public static int MyApproval = 2;
        public static int MyDraft = 3;
        public static int ManageRequest = 4;
        public static int DisposalRequest = 5;
        public static int VendorSubmission = 6;
        public static int MyReports = 7;
        public static int SwitchLegalHold = 8;
        public static int Historical = 9;
    }
    public class EmailTemplateType
    {
        public static int Create = 1;
       
    }
   
    public class PageName
    {
        public static string MyRequest = "My Request";
        public static string MyApproval = "My Approval";
        public static string MyDraft = "My Draft";
        public static string ManageRequest = "Manage Request";
        public static string DisposalRequest = "Disposal Request";
        public static string VendorSubmission = "Vendor Submission";
        public static string MyReports = "My Reports";
    }

    public class TeamsRequestType
    {
        public static int Total_Requests = 0;
        public static int Retention_Period_Completed = 1;
        public static int Due_For_Disposal_In_One_year = 2;
        public static int Disposed_Request = 3;
        public static int Request_With_Client_Original_Docs = 4;
        public static int Request_On_Legal_Holds = 5;
    }

    public class DashboardTabType
    {
        public static int Teams_Request = 1;
        public static int Vendor_request = 2;
    }

    public class DashboardWidgetTabType
    {
        public static int My_Request = 1;
        public static int My_Action = 2;
    }

    public class RequestType
    {
        public static int Archivalrequest = 1;
        public static int Rearchival_request = 2;
        public static int Retrival_request = 3;
        public static int Disposal_request = 4;
        public static int SwitchLegal_request = 5;
    }
    public class UserRoles
    {
        public static int Requestor = 1;
        public static int Manager = 2;
        public static int Partner = 3;
        [Description("File Coordinator")]
        public static int FileCoordinator = 4;
        [Description("Location Archival Manager")]
        public static int Location_Archival_Manager = 5;
        public static int Auditor = 6;
        public static int Admin = 7;
        [Description("R&Q RM")]
        public static int R_Q_RM = 8;
        [Description("OGC & Risk Team")]
        public static int OGC_Risk_Team = 9;
        [Description("Business Service Coordinator")]
        public static int Business_Service_Coordinator = 10;
        public static int SuperAdmin = 11;
        public static int DataAnalytics = 12;
    }

    public class Connections
    {
        public static int New = 1;
        public static int Progress = 2;
        public static int Mature = 3;
    }

    public class ChartType
    {
        public static int AdminRelation = 1;
        public static int PartnerRelation = 2;
    }

    public class FileType
    {
        public static int OriginalDocs = 1;
        public static int SoftCopyDocs = 2;
        public static int LegalHoldDocs = 3;
        public static int ReasonDocs = 4;
        public static int AckDocs = 5;
        public static int BlanketDocs = 6;
    }
    public class FileTypeColorCode
    {
        public static string Legal = "#e0301e";
        public static string NonLegal = "#175d2d";
    }
    public class FileTypeName {
        public static string Legal = "Preserve";
        public static string NonLegal = "Normal";
    }

    public class ExcelSheetType
    {
        public static int Archival = 0;
        public static int Retrieval = 1;
        public static int ReArchival = 2;
        public static int Disposal = 3;
    }
    public static class Statuses
    {
        [Description("Draft")]
        public static int Draft = 1;
       
        [Description("Pending")]
        public static int Pending = 2;
        [Description("In-Progress")]
        public static int InProgress = 3;
        [Description("On Hold")]
        public static int OnHold = 4;
        [Description("Archived")]
        public static int Archived = 5;
        [Description("Re-achived")]
        public static int Reachived = 6;
        [Description("Retrieved")]
        public static int Retrieved = 7;
        [Description("Approved")]
        public static int Approved = 8;
        [Description("Rejected")]
        public static int Rejected = 9;
        [Description("Disposed")]
        public static int Disposed = 10;
        [Description("Waiting")]
        public static int Waiting = 11;
    }
    public static class HistoricalStatuses
    {
        public static int Pending = 1;
        public static int Assigned = 2;
        public static int Completed = 3;
    }

    public static class StatusColorCode
    {
        [Description("Draft")]
        public static string Draft = "#4B06B2";
        //[Description("Submitted")]
        //public static string Submitted = "#EB8C00";
        [Description("Pending")]
        public static string Pending = "#EB8C00";
        [Description("In-Progress")]
        public static string InProgress = "#175C2C";
        [Description("On Hold")]
        public static string OnHold = "#464646";
        [Description("Archived")]
        public static string Archived = "#175D2D";
        [Description("Re-achived")]
        public static string Reachived = "#D04A02";
        [Description("Retrieved")]
        public static string Retrieved = "#464646";
        [Description("Approved")]
        public static string Approved = "#175C2C ";
        [Description("Rejected")]
        public static string Rejected = "#E0301E ";
        [Description("Disposed")]
        public static string Disposed = "#FFB600 ";
        [Description("Waiting")]
        public static string Waiting = "#A43E50";
    }
    public class EmailType
    {
        public static int Reminder = 1;
        public static int Escalate = 2;
    }
    public class Event
    {
        public static int Daily = 1;
        public static int Weekly = 2;
    }
    public class RequestAction
    {
        public static int Create = 1;
        public static int Update = 2;
        public static int Resubmit = 3;
        public static int Approved = 4;
        public static int Rejected = 5;
        public static int Onhold = 6;
        public static int Submit = 7;
        public static int VendorSubmission = 8;
        public static int Archived = 9;
        public static int Retrieved = 10;
        public static int Rearchived = 11;
        public static int Disposed = 12;
      
    }
   
    public static class Distinct
    {
        public static IEnumerable<T> DistinctBy<T, TKey>(this IEnumerable<T> items, Func<T, TKey> property)
        {
            return items.GroupBy(property).Select(x => x.First());
        }
    }

    public class ApplicationConstants
    {
        public static int DefaultPageSize { get; set; } = 10;

        public static DateTime MinDateValue = new DateTime(1800, 01, 01);

        public static string ObjectSplitter = "###";

        public static string PropertySplitter = ";;;";

        public static string BlankEnvironmentName = "- New -";

        public static class RedirectionSource
        {
            public static string Application = "app";
            public static string Server = "svr";
        }

        public static class RedirectionAction
        {
            public static string Edit = "edit";
            public static string Create = "create";
            public static string Delete = "delete";
        }

        public static class ReturnMessageType
        {
            public static string Success = "success";
            public static string Failure = "failure";
        }

        public static class ConfigurationType
        {
            public static string CONTACT_TYPE = "CONTACT_TYPE";
            public static string ENVIRONMENT_TYPE = "ENVIRONMENT_TYPE";
            public static string SERVER_TYPE = "SERVER_TYPE";
            public static string LOCATION_TYPE = "LOCATION_TYPE";
        }

        public static class ApplicationMessages
        {
            public static string USER_UNAUTHORIZED = "User is unauthorized to view this section";

            public static string USER_DOESNT_EXIST = "User does not exist";
        }

        public static class Claims
        {
            public static string PWC_GUID = "PwcGuId";
            public static string EMPLOYEE_ID = "EmployeeId";
            public static string FULL_NAME = "FullName";
            public static string AUTHORIZATION_LEVEL = "AuthorizationLevel";
            public static string USERADID = "UserADId";
            public static string USER_ROLE = "UserRole";
            public static string USER_ROLE_ID = "UserRoleID";
            public static string DESIGNATION = "Designtion";
            public static string DESIGNATION_ID = "DesignationID";
            public static string LOS_CODE = "LOSCode";
            public static string SBU_CODE = "SBUCode";
            public static string LOS = "LOS";
            public static string SBU = "SBU";
            public static string USER_LOS_CODE = "UserLOSCode";
            public static string USER_SBU_CODE = "UserSBUCode";
            public static string USER_LOS = "UserLOS";
            public static string USER_SBU = "UserSBU";
            public static string IS_SUPER_ADMIN = "SuperAdmin";
        }

        public static class ViewKeys
        {
            public static string USERNAME_KEY = "_PwcUserName";

            public static string USERACCESS_KEY = "_UserAccessLevel";
        }

        public static class AuthorizationLevels
        {
            public static string UNAUTHORIZED = "Unauthorized";

            public static string USER = "User";

            public static string ADMIN = "Admin";
        }

        public static class FollowUpStatus
        {
            public static byte Completed = 1;

            public static byte Pending = 0;
        }
        public static class ModuleType
        {
            public static string Dashboard = "Dashboard";
            public static string Report = "Report";
        }
        public static class TemplateType
        {
            public static int BirthDay = 1;
            public static int Anniversary = 2;
            public static int Meeting = 3;
            public static int FollowUp = 4;
        }
        public static class RequestType
        {
            public static int Insert = 1;
            public static int Update = 2;
        }
       
    }
}
