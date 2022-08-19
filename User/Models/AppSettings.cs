using System;
using System.Collections.Generic;
using System.Text;

namespace UserPWC.Models
{
    public class AppSettings
    {
        public string EnableDirectAdLogin { get; set; }
        public string MasterPassword { get; set; }
        public string ApttusUserName { get; set; }
        public string ApttusPassword { get; set; }

        public string IsProdEnv { get; set; }
    }
}
