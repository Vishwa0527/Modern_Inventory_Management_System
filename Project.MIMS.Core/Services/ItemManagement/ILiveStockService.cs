using Project.MIMS.Core.Common;
using Project.MIMS.Core.Models;
using Project.MIMS.Core.Models.ItemManagement;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Project.MIMS.Core.Services
{
    public interface ILiveStockService
    {
        Task<MIMSResponse> GetLiveStockDetails(LiveStockInputModel model);
        Task<MIMSResponse> GetItemSubCategoryListBycategoryID(int categoryID);
    }
}