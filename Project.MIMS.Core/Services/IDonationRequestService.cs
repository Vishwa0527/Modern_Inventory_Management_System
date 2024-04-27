﻿using Project.MIMS.Core.Common;
using Project.MIMS.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Project.MIMS.Core.Services
{
    public interface IDonationRequestService
    {
        Task<MIMSResponse> SaveDonationRequest(DonationRequestSaveModel model);
        Task<MIMSResponse> DonationRequestDetailsGet(int DonationTypeID);
    }
}
