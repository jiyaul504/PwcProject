using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using UserPWC.Context;
using UserPWC.Interface;
using UserPWC.Models;
using UserPWC.Service;
using UserPWC.Utilities;

namespace PwcProject
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddControllersWithViews();
            //services.AddDbContext<FIMSDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            //services.AddScoped<IUserService, UserService>();
            //services.AddScoped<ILoginService, LoginService>();
            //services.AddScoped<IRequestService, RequestService>();
            //services.AddScoped<ILoggerService, LoggerService>();
            var supportedCultures = new[] { "en-US", "fr" };
            var localizationOptions = new RequestLocalizationOptions().SetDefaultCulture(supportedCultures[0])
                .AddSupportedCultures(supportedCultures)
                .AddSupportedUICultures(supportedCultures);

            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            var mvcBuilder = services.AddMvc();


            var EnableDirectAdLogin = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(EnableDirectAdLogin);

            services.AddDbContext<FIMSDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            //services.AddScoped<ILoggerService, LoggerService>();
            services.AddScoped<ILoginService, LoginService>();
            //services.AddScoped<IDashboardService, DashboardService>();
            services.AddScoped<IRequestService, RequestService>();
            services.AddScoped<IUserService, UserService>();
            //services.AddScoped<IBaseService, BaseService>();
            //services.AddScoped<IConfigurationService, ConfigurationService>();
            //services.AddScoped<IReportService, ReportService>();
            //services.AddScoped<IEmailService, EmailService>();
            //services.AddScoped<IEmailContentGeneratorService, EmailContentGeneratorService>();
            //services.AddScoped<IHistoricalService, HistoricalService>();

            services.AddControllersWithViews();

            #region Open AM
            var EnableOpenAMLogin = Configuration.GetSection("AppSettings:EnableDirectAdLogin");
            if (EnableOpenAMLogin.Value == "Y")
            {
                services.AddAuthentication(options =>
                {
                    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
                })
                .AddCookie()
                .AddOpenIdConnect(options =>
                {
                    options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    options.ResponseType = OpenIdConnectResponseType.Code;
                    options.RequireHttpsMetadata = true;
                    options.CallbackPath = Configuration["Identity:CallbackUrl"];
                    options.Authority = Configuration["Identity:AuthorizationUrl"];
                    options.MetadataAddress = Configuration["Identity:MetadataUrl"];
                    options.ClientId = Configuration["Identity:ClientId"];
                    options.ClientSecret = Configuration["Identity:ClientSecret"];
                    options.Scope.Add(Configuration["Identity:Scope"]);
                    options.Events = new OpenIdConnectEvents
                    {
                        OnTokenValidated = context =>
                        {
                            var pwcguid = context.Principal.FindFirst(Configuration["Identity:Claim"]).Value;
                            var serviceProvider = context.HttpContext.RequestServices;
                            //var logger = serviceProvider.GetService<ILoggerService>();
                            try
                            {
                                var businessLogic = serviceProvider.GetService<ILoginService>();
                                var userMetadata = businessLogic.GetLoginUserDetails(pwcguid);

                                if (userMetadata.UserInfo == null)
                                {
                                    //logger.Error($"login failed.", new Exception(ApplicationMessages.USER_DOESNT_EXIST));
                                    context.HandleResponse();
                                    context.Response.StatusCode = 404;
                                    context.Response.Redirect("/Login/AccessDenied");
                                    return Task.CompletedTask;
                                }
                                else
                                {
                                    var claims = new List<Claim>
                                    {
                                        new Claim(ApplicationConstants.Claims.PWC_GUID, pwcguid),
                                        new Claim(ApplicationConstants.Claims.FULL_NAME, userMetadata.UserInfo.Full_Name),
                                        new Claim(ApplicationConstants.Claims.EMPLOYEE_ID, userMetadata.UserInfo.EmployeeID),
                                        //new Claim(ApplicationConstants.Claims.USERADID, userMetadata.UserInfo.AD_Id),
                                        new Claim(ApplicationConstants.Claims.USER_ROLE, userMetadata.UserRole),
                                        new Claim(ApplicationConstants.Claims.USER_ROLE_ID, userMetadata.UserRoleID),
                                        new Claim(ApplicationConstants.Claims.DESIGNATION, userMetadata.Designation),
                                        new Claim(ApplicationConstants.Claims.DESIGNATION_ID, userMetadata.DesignationID),
                                        new Claim(ApplicationConstants.Claims.LOS, userMetadata.UserInfo.LOS),
                                        new Claim(ApplicationConstants.Claims.SBU, userMetadata.UserInfo.Organisation_SBU),
                                        new Claim(ApplicationConstants.Claims.LOS_CODE, userMetadata.UserInfo.LOSCode),
                                        new Claim(ApplicationConstants.Claims.SBU_CODE, userMetadata.UserInfo.SBUCode),
                                        new Claim(ApplicationConstants.Claims.USER_LOS, userMetadata.LOS),
                                        new Claim(ApplicationConstants.Claims.USER_SBU, userMetadata.SBU),
                                        new Claim(ApplicationConstants.Claims.USER_LOS_CODE, userMetadata.LOSCode),
                                        new Claim(ApplicationConstants.Claims.USER_SBU_CODE, userMetadata.SBUCode),
                                        new Claim(ApplicationConstants.Claims.IS_SUPER_ADMIN, userMetadata.IsSuperAdmin),
                                    };
                                    context.Principal.AddIdentity(new ClaimsIdentity(claims));
                                    return Task.CompletedTask;
                                }
                            }
                            catch (Exception ex)
                            {
                                //logger.Error($"login failed.", ex);
                                throw;
                            }
                        }
                    };
                });
            }
            else
            {
                services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(options =>
                {
                    options.Events.OnRedirectToLogout = (context) =>
                    {
                        context.Response.StatusCode = 401;
                        context.Response.Redirect("/Login/Logout");
                        return Task.CompletedTask;
                    };

                    options.Events.OnRedirectToAccessDenied = (context) =>
                    {
                        context.Response.StatusCode = 404;
                        context.Response.Redirect("/Login/AccessDenied");
                        return Task.CompletedTask;
                    };
                });
            }
            services.AddAntiforgery();
            services.AddAuthorization();
            #endregion


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpContext();
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();
            

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
