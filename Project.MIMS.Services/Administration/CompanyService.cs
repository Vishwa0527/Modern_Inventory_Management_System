using Microsoft.Extensions.Configuration;
using Project.DataAccess.Dapper;
using Project.MIMS.Core;
using Project.MIMS.Core.Common;
using Project.MIMS.Core.Models.Administration;
using Project.MIMS.Core.Models.ItemManagement;
using Project.MIMS.Core.Services.Administration;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Project.MIMS.Services.Administration
{
    public class CompanyService : ICompanyService
    {
        private readonly IMIMSUnitOfWork UnitOfWork;
        private readonly IMIMSResponse MIMSResponse;
        private readonly IConfiguration configuration;

        public CompanyService(IMIMSUnitOfWork UnitOfWork, IMIMSResponse MIMSResponse, IConfiguration configuration)
        {
            this.MIMSResponse = MIMSResponse;
            this.UnitOfWork = UnitOfWork;
            this.configuration = configuration;
        }
        public async Task<MIMSResponse> GetCompaniesForDropDown()
        {
            try
            {
                var result = await UnitOfWork.Repository<CompanyDropdownModel>().GetEntitiesBySPAsyncWithoutParameters("[Administration].[GetCompaniesForDropDown]");
                return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), string.Empty, result);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
