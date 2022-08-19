using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using UserPWC.Context;
using UserPWC.Dto;
using UserPWC.Interface;
using UserPWC.Models;
using UserPWC.Utilities;

namespace UserPWC.Service
{
    public class RequestService : IRequestService
    {
        private readonly FIMSDbContext _FIMSDbContext;

        public RequestService(FIMSDbContext MDContext)                     
        {
            this._FIMSDbContext = MDContext;
        }
        private string getUserName(string employeeId)
        {

            return string.IsNullOrEmpty(employeeId)
                            ? null
                            : _FIMSDbContext.TblStaff
                                 .Where(_ => _.Status == "Active"
                                         && _.EmployeeID.ToLower().Contains(employeeId.ToLower()))
                                 .FirstOrDefault()?.EmployeeName;
        }
        private string getStatusColor(string Status)
        {
            string result = string.Empty;

            if (Status == "Draft")
            {
                result = StatusColorCode.Draft;
            }
            //else if (Status == "Submitted")
            //{
            //    result = StatusColorCode.Submitted;
            //}
            else if (Status == "Pending")
            {
                result = StatusColorCode.Pending;
            }
            else if (Status == "In-Progress")
            {
                result = StatusColorCode.InProgress;
            }
            else if (Status == "On Hold")
            {
                result = StatusColorCode.OnHold;
            }
            else if (Status == "Archived")
            {
                result = StatusColorCode.Archived;
            }
            else if (Status == "Re-achived")
            {
                result = StatusColorCode.Reachived;
            }
            else if (Status == "Retrieved")
            {
                result = StatusColorCode.Retrieved;
            }
            else if (Status == "Rejected")
            {
                result = StatusColorCode.Rejected;
            }
            else if (Status == "Disposed")
            {
                result = StatusColorCode.Disposed;
            }

            return result;
        }
        public List<FIMS_LOS_DTO> GetLOS()
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
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }
        public List<FIMS_SBU_DTO> GetSBU(string losCode)
        {
            List<FIMS_SBU_DTO> result = new List<FIMS_SBU_DTO>();
            try
            {
                result = _FIMSDbContext.TblStaff.Where(_ => _.LOSCode == losCode && _.SBUCode != null)
                         .Select((x) => new FIMS_SBU_DTO
                         {
                             SBU_Code = x.SBUCode,
                             SBU_Name = x.Organisation_SBU
                         }).OrderBy(_ => _.SBU_Name).Distinct().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }

        public List<FIMS_Status> GetStatus()
        {
            List<FIMS_Status> result = new List<FIMS_Status>();
            try
            {
                result = _FIMSDbContext.Statuses.Where(_ => _.Status_ID != Statuses.Draft)
                         .Select((x) => new FIMS_Status
                         {
                             Status_Name = x.Status_Name,
                             Status_ID = x.Status_ID
                         }).OrderBy(_ => _.Status_Name).ToList();

                result.Add(new FIMS_Status { Status_ID = 12, Status_Name = "Preservation" });
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }

        public List<FIMS_Users> FIMS_Users()
        {
            throw new NotImplementedException();
        }
    }
}
