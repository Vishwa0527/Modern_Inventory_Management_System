using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.GrateFulDonors.Core.Common;
using Project.GrateFulDonors.Core.Services;

namespace Project.GrateFulDonors.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly ITestService testService;

        public TestController(ITestService testService)
        {
            this.testService = testService;
        }
        [HttpGet]
        [Route("GetCustomerGeneralDetailsByCustomerID")]
        public async Task<GrateFulDonorsResponse> GetCustomerGeneralDetailsByCustomerID(int customerID)
        {
            return await testService.GetCustomerGeneralDetailsByCustomerID(customerID);
        }
    }
}
