using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.MIMS.Core.Common;
using Project.MIMS.Core.Services.Administration;
using Project.MIMS.Services.ItemManagement;

namespace Project.MIMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyService companyService;

        public CompanyController(ICompanyService companyService)
        {
            this.companyService = companyService;
        }

        [HttpGet]
        [Route("GetCompaniesForDropDown")]
        public async Task<MIMSResponse> GetCompaniesForDropDown()
        {
            return await companyService.GetCompaniesForDropDown();
        }
    }
}
