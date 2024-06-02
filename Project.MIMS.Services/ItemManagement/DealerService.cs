using Microsoft.Extensions.Configuration;
using Project.DataAccess.Dapper;
using Project.MIMS.Core;
using Project.MIMS.Core.Common;
using Project.MIMS.Core.Models.ItemManagement;
using Project.MIMS.Core.Services.ItemManagement;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Project.MIMS.Services.ItemManagement
{
    public class DealerService : IDealerService
    {
        private readonly IMIMSUnitOfWork UnitOfWork;
        private readonly IMIMSResponse MIMSResponse;
        private readonly IConfiguration configuration;

        public DealerService(IMIMSUnitOfWork UnitOfWork, IMIMSResponse MIMSResponse, IConfiguration configuration)
        {
            this.MIMSResponse = MIMSResponse;
            this.UnitOfWork = UnitOfWork;
            this.configuration = configuration;
        }
        public async Task<MIMSResponse> GetDealerListForDropdown()
        {
            try
            {
                var result = await UnitOfWork.Repository<DealerDropdownModel>().GetEntitiesBySPAsyncWithoutParameters("[Item].[GetDealerListForDropdown]");
                if (result != null)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), "Item Category Details Retrieved Sucessfully", result);
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
    }
}
