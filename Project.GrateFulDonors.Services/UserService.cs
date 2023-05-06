using Project.GrateFulDonors.Core.Common;
using Project.GrateFulDonors.Core;
using Project.GrateFulDonors.Core.Services;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Project.GrateFulDonors.Core.Models;
using System.Linq;

namespace Project.GrateFulDonors.Services
{
    public class UserService : IUserService
    {
        private readonly IGrateFulDonorsUnitOfWork UnitOfWork;
        private readonly IGrateFulDonorsResponse GrateFulDonorsResponse;
        private readonly IConfiguration configuration;

        public UserService(IGrateFulDonorsUnitOfWork UnitOfWork, IGrateFulDonorsResponse GrateFulDonorsResponse, IConfiguration configuration)
        {
            this.GrateFulDonorsResponse = GrateFulDonorsResponse;
            this.UnitOfWork = UnitOfWork;
            this.configuration = configuration;
        }
        public async Task<GrateFulDonorsResponse> GetAllUsers()
        {
            try
            {
                var result = await UnitOfWork.Repository<UserGetModel>().GetEntitiesBySPAsyncWithoutParameters("[Administration].[GetAllUsers]");
                return GrateFulDonorsResponse.GenerateResponseMessage(GrateFulDonorsResponseEnum.Success.ToString(), string.Empty, result);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<GrateFulDonorsResponse> Login(UserLoginModel model)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "UserName", Tuple.Create(model.Username.ToString(), DbType.String, ParameterDirection.Input) },
                    { "Password", Tuple.Create(model.Password.ToString(), DbType.String, ParameterDirection.Input) },
                };

                var result = (await UnitOfWork.Repository<UserReturnModel>().GetEntitiesBySPAsync("[Administration].[UserLogin]", parameters)).ToList();
                if (result.Count() > 0)
                {
                    return GrateFulDonorsResponse.GenerateResponseMessage(GrateFulDonorsResponseEnum.Success.ToString(), string.Empty, result);
                }
                else
                {
                    return GrateFulDonorsResponse.GenerateResponseMessage(GrateFulDonorsResponseEnum.Error.ToString(), string.Empty, result);
                }
                
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<GrateFulDonorsResponse> Registration(UserRegistrationInsertModel model)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "UserName", Tuple.Create(model.Username.ToString(), DbType.String, ParameterDirection.Input) },
                    { "Password", Tuple.Create(model.Password.ToString(), DbType.String, ParameterDirection.Input) },
                };

                var result = (await UnitOfWork.Repository<UserReturnModel>().GetEntitiesBySPAsync("[Administration].[UserLogin]", parameters)).ToList();
                if (result.Count() > 0)
                {
                    return GrateFulDonorsResponse.GenerateResponseMessage(GrateFulDonorsResponseEnum.Success.ToString(), string.Empty, result);
                }
                else
                {
                    return GrateFulDonorsResponse.GenerateResponseMessage(GrateFulDonorsResponseEnum.Error.ToString(), string.Empty, result);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<GrateFulDonorsResponse> GetUserDetailsByUserID(int UserID)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "UserID", Tuple.Create(UserID.ToString(), DbType.Int32, ParameterDirection.Input) }
                };

                var result = await UnitOfWork.Repository<UserGetModel>().GetEntityBySPAsync("[Administration].[GetUserDetailsByUserID]", parameters);
                return GrateFulDonorsResponse.GenerateResponseMessage(GrateFulDonorsResponseEnum.Success.ToString(), string.Empty, result);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
    }
}
