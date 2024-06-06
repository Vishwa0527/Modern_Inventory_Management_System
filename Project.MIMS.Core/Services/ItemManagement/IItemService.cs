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
        Task<MIMSResponse> ItemCategoryUpdate(ItemCategoryModel model);
        Task<MIMSResponse> GetItemCategoryDetailsByID(int ItemCategoryID);
        Task<MIMSResponse> DeleteItemCategory(int ItemCategoryID);
        Task<MIMSResponse> GetItemCategoryListForDropdown();
        Task<MIMSResponse> ItemSubCategorySave(ItemSubCategoryModel model);
        Task<MIMSResponse> GetItemSubCategoriesforListing(ItemSubCategoryModel model);
        Task<MIMSResponse> DeleteItemSubCategory(int SubCategoryID, int UserID);
    }
}
