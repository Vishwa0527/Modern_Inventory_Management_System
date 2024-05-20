using Microsoft.Extensions.Configuration;
using Project.GrateFulDonors.Core.Common;
using Project.GrateFulDonors.Core;
using Project.GrateFulDonors.Core.Services;
using System;
using System.Collections.Generic;
using System.Text;
using Project.GrateFulDonors.Core.Models;
using System.Threading.Tasks;
using System.Data;

namespace Project.GrateFulDonors.Services
{
    public class DonationTypeService : IDonationTypeService
    {
        private readonly IGrateFulDonorsUnitOfWork UnitOfWork;
        private readonly IGrateFulDonorsResponse GrateFulDonorsResponse;
        private readonly IConfiguration configuration;

        public DonationTypeService(IGrateFulDonorsUnitOfWork UnitOfWork, IGrateFulDonorsResponse GrateFulDonorsResponse, IConfiguration configuration)
        {
            this.GrateFulDonorsResponse = GrateFulDonorsResponse;
            this.UnitOfWork = UnitOfWork;
            this.configuration = configuration;
        }

        public async Task<GrateFulDonorsResponse> GetAllDonationTypeLength()
        {
            try
            {
                var result = await UnitOfWork.Repository<GetAllDonationTypeLengthModels>().GetEntitiesBySPAsyncWithoutParameters("[Administration].[GetAllDonationTypeLength]");
                return GrateFulDonorsResponse.GenerateResponseMessage(GrateFulDonorsResponseEnum.Success.ToString(), string.Empty, result);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<GrateFulDonorsResponse> GetDonationTypesForTheDropDown()
        {
            try
            {
                var result = await UnitOfWork.Repository<GetDonationTypesForDropDownModel>().GetEntitiesBySPAsyncWithoutParameters("[Administration].[GetDonationTypesForTheDropDown]");
                return GrateFulDonorsResponse.GenerateResponseMessage(GrateFulDonorsResponseEnum.Success.ToString(), string.Empty, result);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<GrateFulDonorsResponse> GetDonationTypeID(int userID)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "UserID", Tuple.Create(userID.ToString(), DbType.Int32, ParameterDirection.Input) }
                };
                var result = await UnitOfWork.Repository<GetDonationTypeIDModel>().GetEntityBySPAsync("[Administration].[GetDonationTypeIDByUserID]", parameters);
                return GrateFulDonorsResponse.GenerateResponseMessage(GrateFulDonorsResponseEnum.Success.ToString(), string.Empty, result);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
    }
}
