using System;
using System.Collections.Generic;
using System.Text;

namespace UserPWC.Context
{
    public interface IDbInitializer
    {
        void Initialize();
        void SeedDatabase();
    }
}
