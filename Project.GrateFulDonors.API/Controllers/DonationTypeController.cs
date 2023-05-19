using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.GrateFulDonors.Core.Common;
using Project.GrateFulDonors.Core.Services;
using Project.GrateFulDonors.Services;

namespace Project.GrateFulDonors.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonationTypeController : ControllerBase
    {
        public readonly IDonationTypeService donationTypeService;
        public DonationTypeController(IDonationTypeService donationTypeService)
        {
            this.donationTypeService = donationTypeService;
        }
        [HttpGet]
        [Route("GetAllDonationTypeLength")]
        public async Task<GrateFulDonorsResponse> GetAllDonationTypeLength()
        {
            return await donationTypeService.GetAllDonationTypeLength();
        }

        [HttpGet]
        [Route("GetDonationTypesForTheDropDown")]
        public async Task<GrateFulDonorsResponse> GetDonationTypesForTheDropDown()
        {
            return await donationTypeService.GetDonationTypesForTheDropDown();
        }

        [HttpGet]
        [Route("GetDonationTypeID")]
        public async Task<GrateFulDonorsResponse> GetDonationTypeID(int userID)
        {
            return await donationTypeService.GetDonationTypeID(userID);
        }
    }
}
