using Microsoft.Extensions.Configuration;
using Project.GrateFulDonors.Core.Common;
using Project.GrateFulDonors.Core;
using Project.GrateFulDonors.Core.Services;
using System;
using System.Collections.Generic;
using System.Text;
using Project.GrateFulDonors.Core.Models;
using System.Data;
using System.Threading.Tasks;

namespace Project.GrateFulDonors.Services
{
    public class MobileService : IMobileService
    {
        private readonly IGrateFulDonorsUnitOfWork UnitOfWork;
        private readonly IGrateFulDonorsResponse GrateFulDonorsResponse;
        private readonly IConfiguration configuration;

        public MobileService(IGrateFulDonorsUnitOfWork UnitOfWork, IGrateFulDonorsResponse GrateFulDonorsResponse, IConfiguration configuration)
        {
            this.GrateFulDonorsResponse = GrateFulDonorsResponse;
            this.UnitOfWork = UnitOfWork;
            this.configuration = configuration;
        }
        public async Task<GrateFulDonorsResponse> UpdateVerifyStatus(UpdateVerifyDetailsInputModel model)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "UserID", Tuple.Create(model.UserID.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "UserType", Tuple.Create(model.UserType.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "QrCode", Tuple.Create(model.QrCode.ToString(), DbType.String, ParameterDirection.Input) },
                    { "VerifyStatus", Tuple.Create(2.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "Result", Tuple.Create("-1".ToString(), DbType.Int32, ParameterDirection.Output) }
                };

                var result = await UnitOfWork.Repository<UpdateVerifyDetailsInputModel>().ExecuteSPWithInputOutputAsync("[Administration].[UpdateVerifyStatus]", parameters);
                if (result > 0)
                {
                    return GrateFulDonorsResponse.GenerateResponseMessage(GrateFulDonorsResponseEnum.Success.ToString(), "User Verified Successfully", result);
                }
                else
                {
                    return GrateFulDonorsResponse.GenerateResponseMessage(GrateFulDonorsResponseEnum.Error.ToString(), "User Verification Failed", result);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<GrateFulDonorsResponse> GetUserDetailsForProfile(UpdateVerifyDetailsInputModel model)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "UserID", Tuple.Create(model.UserID.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "UserType", Tuple.Create(model.UserType.ToString(), DbType.Int32, ParameterDirection.Input) }
                };

                var result = await UnitOfWork.Repository<GetUserDetailsForProfileModel>().GetEntityBySPAsync("[Administration].[GetUserDetailsForProfile]", parameters);
                if (result != null)
                {
                    return GrateFulDonorsResponse.GenerateResponseMessage(GrateFulDonorsResponseEnum.Success.ToString(), "User Retrieved Successfully", result);
                }
                else
                {
                    return GrateFulDonorsResponse.GenerateResponseMessage(GrateFulDonorsResponseEnum.Error.ToString(), "No Records to display", result);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
    }
}
