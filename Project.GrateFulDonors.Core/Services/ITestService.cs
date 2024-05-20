using Project.GrateFulDonors.Core.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Project.GrateFulDonors.Core.Services
{
    public interface ITestService
    {
        Task<GrateFulDonorsResponse> GetCustomerGeneralDetailsByCustomerID(int customerID);
    }
}
