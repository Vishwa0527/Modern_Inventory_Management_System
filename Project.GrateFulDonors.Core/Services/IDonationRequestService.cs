using Project.GrateFulDonors.Core.Common;
using Project.GrateFulDonors.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Project.GrateFulDonors.Core.Services
{
    public interface IDonationRequestService
    {
        Task<GrateFulDonorsResponse> SaveDonationRequest(DonationRequestSaveModel model);
        Task<GrateFulDonorsResponse> DonationRequestDetailsGet(int DonationTypeID);
    }
}
