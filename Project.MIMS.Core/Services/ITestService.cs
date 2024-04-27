﻿using Project.MIMS.Core.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Project.MIMS.Core.Services
{
    public interface ITestService
    {
        Task<MIMSResponse> GetCustomerGeneralDetailsByCustomerID(int customerID);
    }
}
