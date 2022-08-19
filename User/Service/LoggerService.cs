//using NLog;
//using UserPWC.Interface;
//using System;
//using System.Collections.Generic;
//using System.Text;
//using System.Web;

//namespace UserPWC.Service
//{
//    public class Logger1 : NLog.Logger
//    {
//        protected override void OnLoggerReconfigured(EventArgs e)
//        {
//            base.OnLoggerReconfigured(e);
//        }
//    }

//    public class LoggerService : ILoggerService
//    {
//        private readonly NLog.Logger logger;

//        public LoggerService()
//        {
//            logger = LogManager.GetLogger("log");
//        }

//        public void Error(string message, Exception exception)
//        {
//            string clean = HttpUtility.HtmlEncode(message.Replace('\n', '_').Replace('\r', '_'));

//            logger.Info(HttpUtility.UrlEncode(clean));
//            logger.Error(exception, clean);
//        }

//        public void Trace(string message)
//        {
//            string clean = HttpUtility.HtmlEncode(message.Replace('\n', '_').Replace('\r', '_'));
//            logger.Info(HttpUtility.UrlEncode(clean));
//            logger.Trace(clean);
//        }
//    }
//}
