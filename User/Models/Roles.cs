using System;
using System.Collections.Generic;
using System.Text;

namespace UserPWC.Models
{
    public class Roles
    {
        public string Id { get; set; }

        public int FormTypeId { get; set; }

        public string RoleName { get; set; }

        public string RoleDescription { get; set; }

        public bool IsActive { get; set; }

        public bool IsDeleted { get; set; }
    }

    public static class RoleIds
    {
        public static readonly string AdminACC = "EE894EB9-8068-48F5-9023-2DADD2148CB2";
        public static readonly string AdminCCL = "04D5D275-9E72-4196-AA2F-4B1A147F6C81";
        public static readonly string AdminCCR = "72762874-F752-4DDB-B25A-3D21A55403D6";
    }
}
