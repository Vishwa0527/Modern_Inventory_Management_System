using System;
using System.Collections.Generic;
using System.Text;

namespace Project.GrateFulDonors.Core.Models
{
    public class GetDonationTypesForDropDownModel
    {
        public int DonationTypeID { get; set; }
        public string DonationTypeName { get; set; }
        public bool IsActive { get; set; }
    }
}
