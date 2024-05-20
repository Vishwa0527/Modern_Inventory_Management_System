using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.GrateFulDonors.Core.Common;
using Project.GrateFulDonors.Core.Services;
using Project.GrateFulDonors.Services;

namespace Project.GrateFulDonors.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeekerController : ControllerBase
    {
        private readonly ISeekerService seekerService;
        public SeekerController(ISeekerService seekerService)
        {
            this.seekerService = seekerService;
        }
        [HttpGet]
        [Route("GetAllSeekerLength")]
        public async Task<GrateFulDonorsResponse> GetAllSeekerLength()
        {
            return await seekerService.GetAllSeekerLength();
        }

        [HttpGet]
        [Route("GetCurrentSeekerID")]
        public async Task<GrateFulDonorsResponse> GetCurrentSeekerID(int UserID)
        {
            return await seekerService.GetCurrentSeekerID(UserID);
        }
    }
}
