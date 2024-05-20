using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.GrateFulDonors.Core.Common;
using Project.GrateFulDonors.Core.Services;
using Project.GrateFulDonors.Services;

namespace Project.GrateFulDonors.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonorController : ControllerBase
    {
        private readonly IDonorService donorService;
        public DonorController(IDonorService donorService)
        {
            this.donorService = donorService;
        }

        [HttpGet]
        [Route("GetAllDonorLength")]
        public async Task<GrateFulDonorsResponse> GetAllDonorLength()
        {
            return await donorService.GetAllDonorLength();
        }
    }
}
