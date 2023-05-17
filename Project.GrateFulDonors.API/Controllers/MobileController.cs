using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.GrateFulDonors.Core.Common;
using Project.GrateFulDonors.Core.Models;
using Project.GrateFulDonors.Core.Services;

namespace Project.GrateFulDonors.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MobileController : ControllerBase
    {
        private readonly IMobileService mobileService;
        public MobileController(IMobileService mobileService)
        {
            this.mobileService = mobileService;
        }
        [HttpPost]
        [Route("UpdateVerifyStatus")]
        public async Task<GrateFulDonorsResponse> UpdateVerifyStatus(UpdateVerifyDetailsInputModel model)
        {
            return await mobileService.UpdateVerifyStatus(model);
        }
    }
}
