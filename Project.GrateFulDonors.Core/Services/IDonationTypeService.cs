﻿using Project.GrateFulDonors.Core.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Project.GrateFulDonors.Core.Services
{
    public interface IDonationTypeService
    {
        Task<GrateFulDonorsResponse> GetAllDonationTypeLength();
        Task<GrateFulDonorsResponse> GetDonationTypesForTheDropDown();
        Task<GrateFulDonorsResponse> GetDonationTypeID(int userID);
    }
}
