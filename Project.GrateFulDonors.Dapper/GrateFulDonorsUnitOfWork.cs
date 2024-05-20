using Project.Core.Data;
using Project.DataAccess.Dapper;
using Project.GrateFulDonors.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace Project.GrateFulDonors.Dapper
{
    public class GrateFulDonorsUnitOfWork : UnitOfWork, IGrateFulDonorsUnitOfWork
    {
        public GrateFulDonorsUnitOfWork(IGrateFulDonorsConnectionFactory ConnectionFactory) : base(ConnectionFactory) { }
    }
}
