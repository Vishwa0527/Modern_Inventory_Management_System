using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace Project.Core.Data
{
    public interface IGrateFulDonorsConnectionFactory
    {
        IDbConnection GetConnection();
    }
}
