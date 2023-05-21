using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.GrateFulDonors.Core.Common;
using Project.GrateFulDonors.Core.Models;
using Project.GrateFulDonors.Core.Services;
using Project.GrateFulDonors.Services;

namespace Project.GrateFulDonors.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }
        [HttpGet]
        [Route("GetAllUsers")]
        public async Task<GrateFulDonorsResponse> GetAllUsers()
        {
            return await userService.GetAllUsers();
        }
        [HttpPost]
        [Route("Registration")]
        public async Task<GrateFulDonorsResponse> Registration(UserRegistrationInsertModel model)
        {
            return await userService.Registration(model);
        }
        [HttpPost]
        [Route("Login")]
        public async Task<GrateFulDonorsResponse> Login(UserLoginModel model)
        {
            return await userService.Login(model);
        }

        [HttpGet]
        [Route("GetUserDetailsByUserID")]
        public async Task<GrateFulDonorsResponse> GetUserDetailsByUserID(int UserID)
        {
            return await userService.GetUserDetailsByUserID(UserID);
        }

        [HttpGet]
        [Route("GetUserImageByUserID")]
        public async Task<GrateFulDonorsResponse> GetUserImageByUserID(int UserID)
        {
            return await userService.GetUserImageByUserID(UserID);
        }
    }
}
