using Project.GrateFulDonors.Core.Common;
using Project.GrateFulDonors.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Project.GrateFulDonors.Core.Services
{
    public interface IUserService
    {
        Task<GrateFulDonorsResponse> GetAllUsers();
        Task<GrateFulDonorsResponse> Login(UserLoginModel model);
        Task<GrateFulDonorsResponse> Registration(UserRegistrationInsertModel model);
        Task<GrateFulDonorsResponse> GetUserDetailsByUserID(int UserID);
        Task<GrateFulDonorsResponse> GetUserImageByUserID(int UserID);
    }
}
