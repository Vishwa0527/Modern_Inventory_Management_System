using Microsoft.Extensions.Configuration;
using Project.GrateFulDonors.Core;
using Project.GrateFulDonors.Core.Common;
using Project.GrateFulDonors.Core.Services;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace Project.GrateFulDonors.Services
{
    public class TestService : ITestService
    {
        private readonly IGrateFulDonorsUnitOfWork UnitOfWork;
        private readonly IGrateFulDonorsResponse GrateFulDonorsResponse;
        private readonly IConfiguration configuration;

        public TestService(IGrateFulDonorsUnitOfWork UnitOfWork, IGrateFulDonorsResponse GrateFulDonorsResponse, IConfiguration configuration)
        {
            this.GrateFulDonorsResponse = GrateFulDonorsResponse;
            this.UnitOfWork = UnitOfWork;
            this.configuration = configuration;
        }
        public async Task<GrateFulDonorsResponse> GetCustomerGeneralDetailsByCustomerID(int customerID)
        {
            try
            {
                Dictionary<string, Tuple<string, DbType, ParameterDirection>> parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "CustomerID", Tuple.Create(customerID.ToString(), DbType.Int32, ParameterDirection.Input) },
                };
                var result = (await UnitOfWork.Repository<TestModel>().GetEntitiesBySPAsync("[cms].[GetCustomerDetailsByCustomerID]", parameters));
                return GrateFulDonorsResponse.GenerateResponseMessage(GrateFulDonorsResponseEnum.Success.ToString(), string.Empty, result);
            }
            catch (Exception ex)
            {

                throw ex;
            }
            
        }
    }
}
