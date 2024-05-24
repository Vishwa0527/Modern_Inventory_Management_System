using Project.MIMS.Core.Common;
using Project.MIMS.Core.Models.ItemManagement;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Project.MIMS.Core.Services.ItemManagement
{
    public interface IItemService
    {
        Task<MIMSResponse> ItemCategorySave(ItemCategoryModel model);
        Task<MIMSResponse> GetItemCategoriesforListing(ItemCategoryModel model);
    }
}
