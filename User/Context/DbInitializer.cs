using System;
using System.Collections.Generic;
using System.Text;

namespace UserPWC.Context
{
    public class DbInitializer : IDbInitializer
    {
        private readonly FIMSDbContext _context;

        public DbInitializer(FIMSDbContext context)
        {
            _context = context;
        }

        public void Initialize()
        {
            _context.Database.EnsureCreated();
        }

        //Seed
        public void SeedDatabase()
        {
        }
    }
}
