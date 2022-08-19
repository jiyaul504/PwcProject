using UserPWC.Context;
using UserPWC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using UserPWC.Interface;
using UserPWC.Utilities;
using UserPWC.Dto;
using EFCore.BulkExtensions;
 
namespace UserPWC.Service
{
    
        public class UserService : IUserService
        {
            private readonly FIMSDbContext _FIMSDbContext;
            //private readonly ILoggerService _loggerService;

            public UserService(FIMSDbContext MDContext)
            {
                this._FIMSDbContext = MDContext;
              
            }

           
            private List<FIMS_Users> GetUsers()
            {
                var result = (from user in _FIMSDbContext.Users
                              join role in _FIMSDbContext.Roles on user.Role_ID equals role.Role_ID
                              select new FIMS_Users
                              {
                                  Employee_Name = user.Employee_Name,
                                  Employee_ID = user.Employee_ID,
                                  Role_ID = user.Role_ID,
                                  Role_Description = role.Role_Description,
                                  LOSCode = user.LOSCode,
                                  SBU_Code = user.SBU_Code,
                                  LOS = user.LOS,
                                  SBU = user.SBU,
                                  Status_Key = user.Status_ID == 1 ? "Active" : "In Active",
                                  Action_On = user.Action_On,
                                  Status_ID = user.Status_ID,
                                  IS_SuperAdmin = user.IS_SuperAdmin
                              }).Distinct().ToList();
                return result;
            }
           

            public FIMS_Add_Users_DTO GetAllUsers(string UserId, string UserRoleId) 
            {
                var result = new FIMS_Add_Users_DTO();
                try
                {
                //var resukt = _FIMSDbContext.TblStaff.ToList().Distinct();
                    //var TblStaff = _FIMSDbContext.TblStaff.Where(_ => _.Status == "Active").ToList();
                var TblStaff = _FIMSDbContext.TblStaff.Select(m => new TblStaff
                {
                   EmployeeID=m.EmployeeID,
                   EmployeePartyID=m.EmployeePartyID,
                   oldempid=m.oldempid,
                   empguid=m.empguid,   
                   EmployeeName=m.EmployeeName,
                   First_Name=m.First_Name,
                   Last_Name=m.Last_Name,
                   EntityName=m.EntityName,
                   Organisation_SBU=m.Organisation_SBU,
                   Organisation_SBU1 = m.Organisation_SBU1, 
                   SubSBU=m.SubSBU,
                   Office=m.Office,
                   GroupCode=m.GroupCode,
                   OfficeCode=m.OfficeCode,
                   City=m.City,
                   LOS=m.LOS,
                   Email=m.Email,
                   LotusNotesEmail=m.LotusNotesEmail,
                   Management_Level_Reference=m.Management_Level_Reference,
                   Designation=m.Designation,
                   Legacy_Position_Title=m.Legacy_Position_Title,
                   Status=m.Status,
                   JoiningDate=m.JoiningDate,
                   TerminationDate=m.TerminationDate,   
                   UpdateBy=m.UpdateBy, 
                   UpdatedDatetime=m.UpdatedDatetime,
                   EntityCode=m.EntityCode,
                   LOSCode=m.LOSCode,
                   SBUCode=m.SBUCode,
                   PracticeEntityName=m.PracticeEntityName,
                   PracticeEntityCode=m.PracticeEntityCode,
                   ServiceSupportFlag=m.ServiceSupportFlag,
                   SubSBUCode=m.SubSBUCode, 
                   Mobile_no=m.Mobile_no,
                   AD_Id=m.AD_Id,
                   SMTPID=m.SMTPID,
                   NOTESID=m.NOTESID,   
                   Gender=m.Gender, 
                   People_Manager_ID=m.People_Manager_ID,
                   People_Manager_Name=m.People_Manager_Name,
                   Date_Of_Birth=m.Date_Of_Birth,
                   OfficeLocation=m.OfficeLocation,
                   CompetencyCode=m.CompetencyCode,
                   CompetencyName=m.CompetencyName,
                   Industry=m.Industry,
                   Gender_Reference_Descriptor=m.Gender_Reference_Descriptor,
                   State_Code=m.State_Code,
                   State_Name=m.State_Name,
                   OracleEntityCode=m.OracleEntityCode,
                   OracleLOSCode=m.OracleLOSCode,
                   OracleSBUCode=m.OracleSBUCode,
                   OracleSubSBUCode= m.OracleSubSBUCode,
                   OracleCompetencyCode= m.OracleCompetencyCode,
                   OracleLocationCode=m.OracleLocationCode,
                   BloodGroup=m.BloodGroup,
                   OracleDesignationID=m.OracleDesignationID,
                   OracleDesignation=m.OracleDesignation,
                   Full_Name=m.Full_Name,
                   Oracle_Job_Description=m.Oracle_Job_Description,
                   USER_PERSON_TYPE=m.USER_PERSON_TYPE,
                   Contract_Type_Reference=m.Contract_Type_Reference,
                   Nationality=m.Nationality,
                   Id_Ref=m.Id_Ref,
                   people_manager_notesid=m.people_manager_notesid,
                   people_manager_desg=m.people_manager_desg,
                   pwcgmailid=m.pwcgmailid,
                   Matrix_Manager_Reference_Descriptor=m.Matrix_Manager_Reference_Descriptor,
                   Matrix_Manager_Reference_D=m.Matrix_Manager_Reference_D,
                   EmployeeNumber=m.EmployeeNumber,
                   expectedterminationdate =m.expectedterminationdate,
                   datetimeinitiated=m.datetimeinitiated,
                   primaryterminationreason=m.primaryterminationreason,
                   localterminationreason=m.localterminationreason,
                   terminationcategory=m.terminationcategory,
                   notificationdate=m.notificationdate,
                   noticegiven=m.noticegiven,
                   UserType=m.UserType,


                }).ToList();
                //var sampleresult = TblStaff.GroupBy(i => i.Employee).Select(i => i.FirstOrDefault()).ToList();
                //if (UserRoleId == UserRoles.Admin.ToString())
                //{
                //    var UserDetail = _FIMSDbContext.Users.Where(_ => _.Employee_ID == UserId).FirstOrDefault();
                //    var LosList = new List<string>(UserDetail.LOSCode.Split(',').Select(s => s));
                //    result.LosList = (from loslist in LosList
                //              join tbl in tblStaff.Where(_ => _.LOS != null) on loslist equals tbl.LOSCode
                //              select new FIMS_LOS_DTO
                //              {
                //                  LOS_Code = tbl.LOSCode,
                //                  LOS_Name = tbl.LOS
                //              }).OrderBy(_ => _.LOS_Name).DistinctBy(_ => _.LOS_Name).ToList();
                //}
                //else
                //{
                //var Test=TblStaff.GroupBy(i=>i.EmployeeName).Select(i=>i.FirstOrDefault()).ToList();
                result.LosList = TblStaff.Where(_ => _.LOS != null).DistinctBy(_=>_.LOS)
                                 .Select((x) => new FIMS_LOS_DTO
                                 {
                                     LOS_Code = x.LOSCode,
                                     LOS_Name = x.LOS
                                 }).OrderBy(_ => _.LOS_Name).Distinct().ToList();
                    //}
                    //if (UserRoleId == UserRoles.Admin.ToString())
                    //{
                    //    var UserDetail = _FIMSDbContext.Users.Where(_ => _.Employee_ID == UserId).FirstOrDefault();
                    //    var LosList = new List<string>(UserDetail.LOSCode.Split(',').Select(s => s));

                    //    result.LosList = (from loslist in LosList
                    //              join res_loslist in result.LosList on loslist equals res_loslist.LOS_Code
                    //              select new FIMS_LOS_DTO
                    //              {
                    //                  LOS_Code = res_loslist.LOS_Code,
                    //                  LOS_Name = res_loslist.LOS_Name
                    //              }).OrderBy(_ => _.LOS_Name).DistinctBy(_ => _.LOS_Name).ToList();

                    //}


                    var res = (from user in TblStaff
                               select new FIMS_Eng_Partner_Manager_DTO
                               {
                                   ID = user.EmployeeID,
                                   Name = user.Full_Name + "(" + user.EmployeeID + ")",
                                   FullName = user.Full_Name
                               }).ToList();

                    var existuser = (from user in res
                                     join users in _FIMSDbContext.Users on user.ID equals users.Employee_ID
                                     select user).ToList();

                    result.UserList = res.Except(existuser).ToList();
                    return result;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

            public List<FIMS_LOS_DTO> GetLOS(string UserId, string UserRoleId)
            {
                List<FIMS_LOS_DTO> result = new List<FIMS_LOS_DTO>();
                try
                {
                result = _FIMSDbContext.TblStaff.Where(_ => _.LOS != null)
                         .Select((x) => new FIMS_LOS_DTO
                         {
                             LOS_Code = x.LOSCode,
                             LOS_Name = x.LOS
                         }).OrderBy(_ => _.LOS_Name).DistinctBy(_ => _.LOS_Name).ToList();
                    //if (UserRoleId == UserRoles.Admin.ToString())
                    //{
                    //    var UserDetail = _FIMSDbContext.Users.Where(_ => _.Employee_ID == UserId).FirstOrDefault();
                    //    var LosList = new List<string>(UserDetail.LOSCode.Split(',').Select(s => s));

                    //    result = (from loslist in LosList
                    //              join tbl in result on loslist equals tbl.LOS_Code
                    //              select new FIMS_LOS_DTO
                    //              {
                    //                  LOS_Code = tbl.LOS_Code,
                    //                  LOS_Name = tbl.LOS_Name
                    //              }).OrderBy(_ => _.LOS_Name).DistinctBy(_ => _.LOS_Name).ToList();

                    //}
                }
                catch (Exception ex)
                {
                    throw ex;
                }

                return result;
            }
            public List<FIMS_SBU_DTO> GetSBU(string losCode, string UserId, string UserRole)
             {
                List<FIMS_SBU_DTO> result = new List<FIMS_SBU_DTO>();
                try
                {
                    if (losCode != null && losCode != "")
                    {
                        var TblStaff = _FIMSDbContext.TblStaff.Where(_ => _.SBUCode != null).DistinctBy(_ => _.SBUCode).ToList();
                        TblStaff = TblStaff.Where(_ => losCode.Split(',').Contains(_.LOSCode)).ToList();
                        result = TblStaff
                                 .Select((x) => new FIMS_SBU_DTO
                                 {
                                     SBU_Code = x.SBUCode,
                                     SBU_Name = x.Organisation_SBU,
                                     LOS_Name = x.LOS,
                                     LOS_Code = x.LOSCode,     
                                 }).OrderBy(_ => _.SBU_Name).Distinct().ToList();
                   
                    //if (UserRole == UserRoles.Admin.ToString())
                    //{
                    //  //  var LosList = new List<string>(Los_Code.Split(',').Select(s => s));
                    //    var UserDetail = _FIMSDbContext.Users.Where(_ => _.Employee_ID == UserId).FirstOrDefault();
                    //    var SbuList = new List<string>(UserDetail.SBU_Code.Split(',')).ToList();
                    //    result = (from sbulist in SbuList
                    //              join res in result on sbulist equals res.SBU_Code
                    //              select new FIMS_SBU_DTO
                    //              {
                    //                  SBU_Code = res.SBU_Code,
                    //                  SBU_Name = res.SBU_Name,
                    //                  LOS_Name = res.LOS_Name,
                    //                  LOS_Code = res.LOS_Code
                    //              }).OrderBy(_ => _.SBU_Name).Distinct().ToList();

                    //}


                }
                }
                catch (Exception ex)
                {
                    throw ex;
                }

                return result;
            }

            public FIMS_User_DTO GetUsersList(FIMS_User_Input_DTO input_DTO, string los = null, string sbu = null)
            {
                try
                {
                    var filterByStatus = input_DTO.status == "Active" ? 1 : 0;

                    Expression<Func<FIMS_Users, dynamic>> sortExpression;
                    switch (input_DTO.sort)
                    {
                        case "employeeName":
                            sortExpression = x => x.Employee_Name;
                            break;
                        case "employeeId":
                            sortExpression = x => x.Employee_ID;
                            break;
                        case "role":
                            sortExpression = x => x.Role_Description;
                            break;
                        case "los":
                            sortExpression = x => x.LOS;
                            break;
                        case "sbu":
                            sortExpression = x => x.SBU;
                            break;
                        case "status":
                            sortExpression = x => x.Status_Key;
                            break;
                        default:
                            sortExpression = x => x.Action_On;
                            break;
                    }

                    int skipCount = (input_DTO.page - 1) * input_DTO.limit;
                    var result = GetUsers().ToList();

                    if (los != null && sbu != null)
                    {
                        result = result.Where(_ => (_.LOSCode.Split(',').Contains(los) && _.SBU_Code.Split(',').Contains(sbu)) ||
                                                   (_.LOSCode == los && _.SBU_Code == sbu)).ToList();
                        result = result.Where(_ => _.Role_ID != UserRoles.SuperAdmin).ToList();
                    }
                    //else
                    //{
                    //    result = result.Where(_ => _.Role_ID == UserRoles.SuperAdmin || _.Role_ID == UserRoles.Admin || _.Role_ID == UserRoles.DataAnalytics).ToList();
                    //}

                    var res = result.Where(_ =>
                         (input_DTO.employee_Name == null || input_DTO.employee_Name == "undefined" || (input_DTO.employee_Name != null && _.Employee_Name.ToString().ToLower().Trim().Contains(input_DTO.employee_Name.ToLower().Trim()))) &&
                         (input_DTO.employee_ID == null || input_DTO.employee_ID == "undefined" || (input_DTO.employee_ID != null && _.Employee_ID.ToLower().Trim().Contains(input_DTO.employee_ID.ToLower().Trim()))) &&
                         (input_DTO.role == null || input_DTO.role == "undefined" || (input_DTO.role != null && _.Role_Description.ToLower().Trim().Contains(input_DTO.role.ToLower().Trim()))) &&
                         (input_DTO.los == null || input_DTO.los == "undefined" || (input_DTO.los != null && _.LOS.ToLower().Trim().Contains(input_DTO.los.ToLower().Trim()))) &&
                         (input_DTO.sbu == null || input_DTO.sbu == "undefined" || (input_DTO.sbu != null && _.SBU.ToLower().Trim().Contains(input_DTO.sbu.ToLower().Trim()))) &&
                         (input_DTO.status == null || input_DTO.status == "undefined" || (input_DTO.status != null && _.Status_Key.ToLower().Trim().Contains(input_DTO.status.ToLower().Trim()))) &&
                         (filterByStatus == 0 || (filterByStatus != 0 && filterByStatus == _.Status_ID))
                         )
                         .OrderByDescending(_ => _.Action_On).AsQueryable();

                    FIMS_User_DTO fIMS_User_DTO = new FIMS_User_DTO();
                    var data = res;

                    if (input_DTO.order == "ASC")
                    {
                        data = res.OrderBy(sortExpression).Skip(skipCount).Take(input_DTO.limit);
                    }
                    else
                    {
                        data = res.OrderByDescending(sortExpression).Skip(skipCount).Take(input_DTO.limit);
                    }

                    fIMS_User_DTO.TotalCount = res.Count();
                    fIMS_User_DTO.Users = data;
                    return fIMS_User_DTO;
                }
                catch (Exception ex)
                {
                    throw ex;
                }

            }

            public List<FIMS_Eng_Partner_Manager_DTO> GetUsers(string losCode, string sbuCode)
            {
                //List<FIMS_Eng_Partner_Manager_DTO> result = new List<FIMS_Eng_Partner_Manager_DTO>();
                //List<FIMS_Eng_Partner_Manager_DTO> existuser = new List<FIMS_Eng_Partner_Manager_DTO>();
                try
                {
                    var res = (from user in _FIMSDbContext.TblStaff.Where(_ => _.Status == "Active" && _.LOSCode == losCode && _.SBUCode == sbuCode)
                               select new FIMS_Eng_Partner_Manager_DTO
                               {
                                   ID = user.EmployeeID,
                                   Name = user.Full_Name + "(" + user.EmployeeID + ")"
                               }).ToList();

                    var existuser = (from user in res
                                     join users in _FIMSDbContext.Users on user.ID equals users.Employee_ID
                                     select user).ToList();

                    var result = res.Except(existuser).ToList();
                    return result;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }


            public List<FIMS_Roles> GetRoles(string userRole, string isSuperAdmin)
            {
                List<FIMS_Roles> result = new List<FIMS_Roles>();
                try
                {
                    if (isSuperAdmin == "Yes")
                    {
                        result = _FIMSDbContext.Roles.Where(x => x.Status_ID == 1 && (x.Role_ID == UserRoles.Admin || x.Role_ID == UserRoles.SuperAdmin || x.Role_ID == UserRoles.DataAnalytics))
                                 .Select((x) => new FIMS_Roles
                                 {
                                     Role_ID = x.Role_ID,
                                     Role_Description = x.Role_Description
                                 }).OrderBy(_ => _.Role_Description).ToList();
                    }
                    else if (Convert.ToInt32(userRole) == UserRoles.Admin)
                    {
                        result = _FIMSDbContext.Roles.Where(x => x.Status_ID == 1 && x.Role_ID != UserRoles.Admin && x.Role_ID != UserRoles.SuperAdmin && x.Role_ID != UserRoles.DataAnalytics)
                                 .Select((x) => new FIMS_Roles
                                 {
                                     Role_ID = x.Role_ID,
                                     Role_Description = x.Role_Description
                                 }).OrderBy(_ => _.Role_Description).ToList();
                    }
                else {
                    result = _FIMSDbContext.Roles.Where(x => x.Status_ID == 1)
                                 .Select((x) => new FIMS_Roles
                                 {
                                     Role_ID = x.Role_ID,
                                     Role_Description = x.Role_Description
                                 }).OrderBy(_ => _.Role_Description).ToList();
                }
                }
                catch (Exception ex)
                {
                    throw ex;
                }

                return result;
            }

            public void AddUsers(List<FIMS_Users> users)
            {
                try
                {
                    var user = (from u in users
                                    //join t in _FIMSDbContext.TblStaff on u.Employee_ID equals t.EmployeeID
                                select new FIMS_Users
                                {
                                    Employee_ID = u.Employee_ID,
                                    Employee_Name = u.Employee_Name,
                                    Role_ID = u.Role_ID,
                                    LOSCode = u.LOSCode,
                                    LOS = u.LOS,
                                    SBU_Code = u.SBU_Code,
                                    SBU = u.SBU,
                                    Status_ID = u.Status_ID,
                                    IS_SuperAdmin = (byte)(u.Role_ID == UserRoles.SuperAdmin ? 1 : 0),
                                    Action_By = u.Action_By,
                                    Action_On = Convert.ToDateTime(TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time")))
                                }).ToList();

                    _FIMSDbContext.BulkInsert(user);
                    _FIMSDbContext.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

            public FIMS_Users GetUserByID(string userID)
            {
                try
                {
                    var user = _FIMSDbContext.Users.Where(_ => _.Employee_ID == userID).FirstOrDefault();
                    //var userDetail = _FIMSDbContext.TblStaff.Where(_ => _.EmployeeID == userID).FirstOrDefault();
                    var role = _FIMSDbContext.Roles.Where(_ => _.Role_ID == user.Role_ID).FirstOrDefault();

                    //user.Employee_Name = userDetail.Full_Name + "(" + userID + ")";
                    user.Employee_Name = user.Employee_Name;
                    user.LOS_Code_List = user.LOSCode.Split(',').ToList();
                    user.SBU_Code_List = user.SBU_Code.Split(',').ToList();
                    user.Role_Description = role.Role_Description;
                    user.Role_ID = user.Role_ID;
                    return user;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

            public void UpdateUsers(string userID, string actionBy, int statusID, string losName, string sbuName, string losCode, string sbuCode, long roleID)
            {
                try
                {
                    var currentDate = Convert.ToDateTime(TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time")));
                    var user = _FIMSDbContext.Users.Where(_ => _.Employee_ID == userID).FirstOrDefault();
                    user.LOS = losName;
                    user.SBU = sbuName;
                    user.LOSCode = losCode;
                    user.SBU_Code = sbuCode;
                    user.Action_On = currentDate;
                    user.Action_By = actionBy;
                    user.Status_ID = (byte)statusID;
                    user.Role_ID = roleID;
                    user.IS_SuperAdmin = (byte)(roleID == UserRoles.SuperAdmin ? 1 : 0);
                    _FIMSDbContext.Users.Update(user);
                    _FIMSDbContext.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }
    }

//
