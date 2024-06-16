using System;
using System.Collections.Generic;
using System.Text;

namespace Project.MIMS.Core.Models.ItemManagement
{
    public class ItemSaveModel
    {
        public int ItemID { get; set; }
        public int SubCategoryID { get; set; }
        public string ItemName { get; set; }
        public string ItemCode { get; set; }
        public string SerialNumber { get; set; }
        public decimal RetailPrice { get; set; }
        public decimal SellingPrice { get; set; }
        public int CreatedBy { get; set; }
    }
}
