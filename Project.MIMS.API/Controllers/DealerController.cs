using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.MIMS.Core.Common;
using Project.MIMS.Core.Services;
using Project.MIMS.Core.Services.ItemManagement;
using Project.MIMS.Services.ItemManagement;

namespace Project.MIMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DealerController : ControllerBase
    {
        private readonly IDealerService dealerService;
        public DealerController(IDealerService dealerService)
        {
            this.dealerService = dealerService;
        }

        [HttpGet]
        [Route("GetDealerListForDropdown")]
        public async Task<MIMSResponse> GetDealerListForDropdown()
        {
            return await dealerService.GetDealerListForDropdown();
        }
    }
}
