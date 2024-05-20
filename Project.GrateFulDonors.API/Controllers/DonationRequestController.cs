using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.GrateFulDonors.Core.Common;
using Project.GrateFulDonors.Core.Models;
using Project.GrateFulDonors.Core.Services;

namespace Project.GrateFulDonors.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonationRequestController : ControllerBase
    {
        private readonly IDonationRequestService donationRequestService;
        public DonationRequestController(IDonationRequestService donationRequestService)
        {
            this.donationRequestService = donationRequestService;
        }

        [HttpPost]
        [Route("SaveDonationRequest")]
        public async Task<GrateFulDonorsResponse> SaveDonationRequest(DonationRequestSaveModel model)
        {
            return await donationRequestService.SaveDonationRequest(model);
        }


        [HttpGet]
        [Route("DonationRequestDetailsGet")]
        public async Task<GrateFulDonorsResponse> DonationRequestDetailsGet(int DonationTypeID)
        {
            return await donationRequestService.DonationRequestDetailsGet(DonationTypeID);
        }

    }
}
