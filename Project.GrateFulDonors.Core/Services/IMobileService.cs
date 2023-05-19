using Project.GrateFulDonors.Core.Common;
using Project.GrateFulDonors.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Project.GrateFulDonors.Core.Services
{
    public interface IMobileService
    {
        Task<GrateFulDonorsResponse> UpdateVerifyStatus(UpdateVerifyDetailsInputModel model);
        Task<GrateFulDonorsResponse> GetUserDetailsForProfile(UpdateVerifyDetailsInputModel model);
    }
}
