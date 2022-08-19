using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using UserPWC.Models;


namespace UserPWC.Context
{
    public class FIMSDbContext : DbContext
    {
        public virtual DbSet<TblStaff> TblStaff { get; set; }
        public virtual DbSet<FIMS_Request> Requests { get; set; }
        public virtual DbSet<FIMS_Users> Users { get; set; }
        public virtual DbSet<FIMS_Roles> Roles { get; set; }
        public virtual DbSet<FIMS_Request_Type> Request_Types { get; set; }
        public virtual DbSet<FIMS_Status> Statuses { get; set; }
       
        public virtual DbSet<FIMS_M_Vendor> Vendors { get; set; }



        public override int SaveChanges()
        {
            return base.SaveChanges();
        }

        public void Update<T>(T entity) where T : class
        {
            Entry(entity).State = EntityState.Modified;
        }

        public FIMSDbContext(DbContextOptions options)
            : base(options)
        { }

        public FIMSDbContext(string connectionString) : this(GetOptions(connectionString))
        {
        }

        private static DbContextOptions GetOptions(string connectionString)
        {
            return SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), connectionString).Options;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TblStaff>().HasKey(tblStaff => tblStaff.EmployeeID);
            modelBuilder.Entity<TblStaff>().HasKey(tblStaff => tblStaff.EmployeeNumber);
        }

        
    }
}
