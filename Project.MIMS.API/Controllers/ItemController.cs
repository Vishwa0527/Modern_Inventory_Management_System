using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.MIMS.Core.Common;
using Project.MIMS.Core.Models;
using Project.MIMS.Core.Models.ItemManagement;
using Project.MIMS.Core.Services;
using Project.MIMS.Core.Services.ItemManagement;
using Project.MIMS.Services;

namespace Project.MIMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IItemService itemService;
        public ItemController(IItemService itemService)
        {
            this.itemService = itemService;
        }

        [HttpPost]
        [Route("ItemCategorySave")]
        public async Task<MIMSResponse> ItemCategorySave(ItemCategoryModel model)
        {
            return await itemService.ItemCategorySave(model);
        }

        [HttpPost]
        [Route("GetItemCategoriesforListing")]
        public async Task<MIMSResponse> GetItemCategoriesforListing(ItemCategoryModel model)
        {
            return await itemService.GetItemCategoriesforListing(model);
        }

        [HttpPost]
        [Route("ItemCategoryUpdate")]
        public async Task<MIMSResponse> ItemCategoryUpdate(ItemCategoryModel model)
        {
            return await itemService.ItemCategoryUpdate(model);
        }

        [HttpGet]
        [Route("GetItemCategoryDetailsByID")]
        public async Task<MIMSResponse> GetItemCategoryDetailsByID(int ItemCategoryID)
        {
            return await itemService.GetItemCategoryDetailsByID(ItemCategoryID);
        }

        [HttpGet]
        [Route("DeleteItemCategory")]
        public async Task<MIMSResponse> DeleteItemCategory(int ItemCategoryID)
        {
            return await itemService.DeleteItemCategory(ItemCategoryID);
        }

        [HttpGet]
        [Route("GetItemCategoryListForDropdown")]
        public async Task<MIMSResponse> GetItemCategoryListForDropdown()
        {
            return await itemService.GetItemCategoryListForDropdown();
        }

        [HttpPost]
        [Route("ItemSubCategorySave")]
        public async Task<MIMSResponse> ItemSubCategorySave(ItemSubCategoryModel model)
        {
            return await itemService.ItemSubCategorySave(model);
        }

        [HttpPost]
        [Route("GetItemSubCategoriesforListing")]
        public async Task<MIMSResponse> GetItemSubCategoriesforListing(ItemSubCategoryModel model)
        {
            return await itemService.GetItemSubCategoriesforListing(model);
        }

        [HttpGet]
        [Route("DeleteItemSubCategory")]
        public async Task<MIMSResponse> DeleteItemSubCategory(int SubCategoryID, int UserID)
        {
            return await itemService.DeleteItemSubCategory(SubCategoryID, UserID);
        }

        [HttpGet]
        [Route("GetItemSubCategoryDetailsByID")]
        public async Task<MIMSResponse> GetItemSubCategoryDetailsByID(int SubCategoryID)
        {
            return await itemService.GetItemSubCategoryDetailsByID(SubCategoryID);
        }

        [HttpGet]
        [Route("GetItemSubCategoryListForDropdown")]
        public async Task<MIMSResponse> GetItemSubCategoryListForDropdown()
        {
            return await itemService.GetItemSubCategoryListForDropdown();
        }

        [HttpPost]
        [Route("ItemSave")]
        public async Task<MIMSResponse> ItemSave(List<ItemSaveModel> model)
        {
            return await itemService.ItemSave(model);
        }

        [HttpPost]
        [Route("GetItemsforListing")]
        public async Task<MIMSResponse> GetItemsforListing(ItemSaveModel model)
        {
            return await itemService.GetItemsforListing(model);
        }

        [HttpGet]
        [Route("DeleteItem")]
        public async Task<MIMSResponse> DeleteItem(int ItemID, int UserID)
        {
            return await itemService.DeleteItem(ItemID, UserID);
        }
        [HttpGet]
        [Route("GetItemDetailsByID")]
        public async Task<MIMSResponse> GetItemDetailsByID(int ItemID)
        {
            return await itemService.GetItemDetailsByID(ItemID);
        }

        [HttpPost]
        [Route("ItemUpdate")]
        public async Task<MIMSResponse> ItemUpdate(ItemSaveModel model)
        {
            return await itemService.ItemUpdate(model);
        }
    }
}
