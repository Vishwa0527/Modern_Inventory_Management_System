using Project.Core.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace Project.GrateFulDonors.Dapper
{
    public class GrateFulDonorsConnectionFactory : IGrateFulDonorsConnectionFactory
    {
        private readonly string connectionString;

        public GrateFulDonorsConnectionFactory(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public IDbConnection GetConnection()
        {
            return new SqlConnection(this.connectionString);
        }
    }
}
