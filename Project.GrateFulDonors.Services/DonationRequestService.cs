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
using System.Linq;
using System.Reflection;

namespace Project.GrateFulDonors.Services
{
    public class DonationRequestService : IDonationRequestService
    {
        private readonly IGrateFulDonorsUnitOfWork UnitOfWork;
        private readonly IGrateFulDonorsResponse GrateFulDonorsResponse;
        private readonly IConfiguration configuration;

        public DonationRequestService(IGrateFulDonorsUnitOfWork UnitOfWork, IGrateFulDonorsResponse GrateFulDonorsResponse, IConfiguration configuration)
        {
            this.GrateFulDonorsResponse = GrateFulDonorsResponse;
            this.UnitOfWork = UnitOfWork;
            this.configuration = configuration;
        }

        public async Task<GrateFulDonorsResponse> SaveDonationRequest(DonationRequestSaveModel model)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "DonationRequestID", Tuple.Create(0.ToString(), DbType.Int32, ParameterDirection.InputOutput) },
                    { "SeekerID", Tuple.Create(model.SeekerID.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "DonationTypeID", Tuple.Create(model.DonationTypeID.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "Description", Tuple.Create(model.Description.ToString(), DbType.String, ParameterDirection.Input) },
                    { "RequiredBefore", Tuple.Create(model.RequiredBefore.ToString(), DbType.DateTime, ParameterDirection.Input) },
                    { "Amount", Tuple.Create(model.Amount == "" ? null : model.Amount.ToString(), DbType.Decimal, ParameterDirection.Input) },
                    { "BloodType", Tuple.Create(model.BloodType == 0 ? null :model.BloodType.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "DonationRequestStatus", Tuple.Create(1.ToString(), DbType.Int32, ParameterDirection.Input) },
                };

                var result = await UnitOfWork.Repository<DonationRequestSaveModel>().ExecuteSPWithInputOutputAsync("[Administration].[SaveDonationRequestDetails]", parameters);
                if (result > 0)
                {
                    return GrateFulDonorsResponse.GenerateResponseMessage(GrateFulDonorsResponseEnum.Success.ToString(), "Donation Request Sucessfully", result);
                }
                else
                {
                    return GrateFulDonorsResponse.GenerateResponseMessage(GrateFulDonorsResponseEnum.Error.ToString(), "Donation Request Failed", result);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<GrateFulDonorsResponse> DonationRequestDetailsGet(int DonationTypeID)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "DonationTypeID", Tuple.Create(DonationTypeID.ToString(), DbType.Int32, ParameterDirection.Input) }
                };

                var result = await UnitOfWork.Repository<DonationRequestGetModel>().GetEntitiesBySPAsync("[Administration].[GetAllDonationRequestsByDonationType]", parameters);
                if (result.Count() > 0)
                {
                    return GrateFulDonorsResponse.GenerateResponseMessage(GrateFulDonorsResponseEnum.Success.ToString(), "Donation Request Details Retrieved Sucessfully", result);
                }
                else
                {
                    return GrateFulDonorsResponse.GenerateResponseMessage(GrateFulDonorsResponseEnum.Error.ToString(), "No Records to Display", result);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
    }
}
