using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.MIMS.Core.Common;
using Project.MIMS.Core.Services.Administration;
using Project.MIMS.Services.Administration;

namespace Project.MIMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesPointController : ControllerBase
    {
        private readonly ISalesPointService salesPointService;

        public SalesPointController(ISalesPointService salesPointService)
        {
            this.salesPointService = salesPointService;
        }

        [HttpGet]
        [Route("GetSalesPointsForDropDown")]
        public async Task<MIMSResponse> GetSalesPointsForDropDown(int companyID)
        {
            return await salesPointService.GetSalesPointsForDropDown(companyID);
        }
    }
}
