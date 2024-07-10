using Microsoft.Extensions.Configuration;
using Project.MIMS.Core.Common;
using Project.MIMS.Core;
using Project.MIMS.Core.Services.Administration;
using System;
using System.Collections.Generic;
using System.Text;
using Project.MIMS.Core.Models.ItemManagement;
using System.Data;
using System.Threading.Tasks;
using Project.MIMS.Core.Models.Administration;
using System.Linq;

namespace Project.MIMS.Services.Administration
{
    public class SalesPointService : ISalesPointService
    {
        private readonly IMIMSUnitOfWork UnitOfWork;
        private readonly IMIMSResponse MIMSResponse;
        private readonly IConfiguration configuration;

        public SalesPointService(IMIMSUnitOfWork UnitOfWork, IMIMSResponse MIMSResponse, IConfiguration configuration)
        {
            this.MIMSResponse = MIMSResponse;
            this.UnitOfWork = UnitOfWork;
            this.configuration = configuration;
        }

        public async Task<MIMSResponse> GetSalesPointsForDropDown(int companyID)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "CompanyID", Tuple.Create(companyID.ToString(), DbType.Int32, ParameterDirection.Input) }
                };

                var result = (await UnitOfWork.Repository<SalesPointDropdownModel>().GetEntitiesBySPAsync("[Item].[GetSalesPointsForDropDown]", parameters)).ToList();

                return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), "Sales Point Retrieved Sucessfully", result);
  
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
