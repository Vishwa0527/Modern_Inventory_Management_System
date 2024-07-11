using Microsoft.Extensions.Configuration;
using Project.MIMS.Core.Common;
using Project.MIMS.Core;
using Project.MIMS.Core.Services;
using System;
using System.Collections.Generic;
using System.Text;
using Project.MIMS.Core.Models.ItemManagement;
using System.Data;
using System.Threading.Tasks;
using Project.MIMS.Core.Models;
using System.Linq;

namespace Project.MIMS.Services
{
    public class LiveStockService : ILiveStockService
    {
        private readonly IMIMSUnitOfWork UnitOfWork;
        private readonly IMIMSResponse MIMSResponse;
        private readonly IConfiguration configuration;

        public LiveStockService(IMIMSUnitOfWork UnitOfWork, IMIMSResponse MIMSResponse, IConfiguration configuration)
        {
            this.MIMSResponse = MIMSResponse;
            this.UnitOfWork = UnitOfWork;
            this.configuration = configuration;
        }

        public async Task<MIMSResponse> GetLiveStockDetails(LiveStockInputModel model)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "SubCategoryID", Tuple.Create(model.SubCategoryID.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "ItemCode", Tuple.Create(model.ItemCode == "" ? null : model.ItemCode.ToString(), DbType.String, ParameterDirection.Input) },
                    { "CategoryID", Tuple.Create(model.CategoryID == 0 ? null : model.CategoryID.ToString(), DbType.Int32, ParameterDirection.Input) }
                };

                var result = await UnitOfWork.Repository<LiveStockOutPutModel>().GetEntitiesBySPAsync("[Item].[GetLiveStockDetails]", parameters);
                if (result.Count() > 0)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), "Item Sub Category Details Retrieved Sucessfully", result);
                }
                else
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "No Records to Display", result);
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<MIMSResponse> GetItemSubCategoryListBycategoryID(int categoryID)
        {
            var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
            {
                { "CategoryID", Tuple.Create(categoryID.ToString(), DbType.Int32, ParameterDirection.Input) }
            };

            var result = await UnitOfWork.Repository<ItemSubCategoryListingModel>().GetEntitiesBySPAsync("[Item].[GetItemSubCategoryListBycategoryID]", parameters);
            if (result.Count() > 0)
            {
                return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), "Item Sub Category Details Retrieved Sucessfully", result);
            }
            else
            {
                return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "No Records to Display", result);
            }
        }
    }
}
