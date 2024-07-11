using System;
using System.Collections.Generic;
using System.Text;

namespace Project.MIMS.Core.Models.ItemManagement
{
    public class LiveStockOutPutModel
    {
        public string ItemCode { get; set; }
        public decimal RetailPrice { get; set; }
        public string ReceivedDate { get; set; }
    }
}
