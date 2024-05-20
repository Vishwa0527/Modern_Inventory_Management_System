using Microsoft.Extensions.Configuration;
using Project.GrateFulDonors.Core.Common;
using Project.GrateFulDonors.Core;
using System;
using System.Collections.Generic;
using System.Text;
using Project.GrateFulDonors.Core.Services;
using Project.GrateFulDonors.Core.Models;
using System.Threading.Tasks;

namespace Project.GrateFulDonors.Services
{
    public class DonorService : IDonorService
    {
        private readonly IGrateFulDonorsUnitOfWork UnitOfWork;
        private readonly IGrateFulDonorsResponse GrateFulDonorsResponse;
        private readonly IConfiguration configuration;

        public DonorService(IGrateFulDonorsUnitOfWork UnitOfWork, IGrateFulDonorsResponse GrateFulDonorsResponse, IConfiguration configuration)
        {
            this.GrateFulDonorsResponse = GrateFulDonorsResponse;
            this.UnitOfWork = UnitOfWork;
            this.configuration = configuration;
        }
        public async Task<GrateFulDonorsResponse> GetAllDonorLength()
        {
            try
            {
                var result = await UnitOfWork.Repository<GetDonorLengthModel>().GetEntitiesBySPAsyncWithoutParameters("[Administration].[GetDonorLength]");
                return GrateFulDonorsResponse.GenerateResponseMessage(GrateFulDonorsResponseEnum.Success.ToString(), string.Empty, result);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
    }
}
