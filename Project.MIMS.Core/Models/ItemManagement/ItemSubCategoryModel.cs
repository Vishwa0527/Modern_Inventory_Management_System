using System;
using System.Collections.Generic;
using System.Text;

namespace Project.MIMS.Core.Models.ItemManagement
{
    public class ItemSubCategoryModel
    {
        public string SubCategoryName { get; set; }
        public string SubCategoryCode { get; set; }
        public bool IsActive { get; set; }
        public int CategoryID { get; set; }
        public string Description { get; set; }
        public int DealerID { get; set; }
        public int CreatedBy { get; set; }
    }
}
