using System;
using System.Collections.Generic;
using System.Text;

namespace Project.MIMS.Core.Models.ItemManagement
{
    public class ItemSubCategoryListingModel
    {
        public int SubCategoryID { get; set; }
        public string SubCategoryCode { get; set; }
        public string SubCategoryName { get; set; }
        public string ItemCategoryCode { get; set; }
        public string DealerName { get; set; }
        public bool IsActive { get; set; }
    }
}
