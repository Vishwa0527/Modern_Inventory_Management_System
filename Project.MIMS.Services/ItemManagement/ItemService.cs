using Microsoft.Extensions.Configuration;
using Project.MIMS.Core.Common;
using Project.MIMS.Core.Models;
using Project.MIMS.Core;
using Project.MIMS.Core.Services.ItemManagement;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;
using Project.MIMS.Core.Models.ItemManagement;
using System.Linq;

namespace Project.MIMS.Services.ItemManagement
{
    public class ItemService : IItemService
    {
        private readonly IMIMSUnitOfWork UnitOfWork;
        private readonly IMIMSResponse MIMSResponse;
        private readonly IConfiguration configuration;

        public ItemService(IMIMSUnitOfWork UnitOfWork, IMIMSResponse MIMSResponse, IConfiguration configuration)
        {
            this.MIMSResponse = MIMSResponse;
            this.UnitOfWork = UnitOfWork;
            this.configuration = configuration;
        }

        public async Task<MIMSResponse> ItemCategorySave(ItemCategoryModel model)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "ItemCategoryID", Tuple.Create(0.ToString(), DbType.Int32, ParameterDirection.InputOutput) },
                    { "CategoryCode", Tuple.Create(model.CategoryCode.ToString(), DbType.String, ParameterDirection.Input) },
                    { "CategoryName", Tuple.Create(model.CategoryName.ToString(), DbType.String, ParameterDirection.Input) },
                    { "CreatedBy", Tuple.Create(model.CreatedBy.ToString(), DbType.Int32, ParameterDirection.Input) }
                };

                var result = await UnitOfWork.Repository<ItemCategoryModel>().ExecuteSPWithInputOutputAsync("[Item].[ItemCategorySave]", parameters);
                if (result == -1)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "Item Category Already Exists", result);
                }
                else if (result > 0)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), "Item Category Saved Sucessfully", result);
                }
                else
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "Item Category Save Failed", result);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<MIMSResponse> GetItemCategoriesforListing(ItemCategoryModel model)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "CategoryName", Tuple.Create(model.CategoryName == "" ? null : model.CategoryName.ToString(), DbType.String, ParameterDirection.Input) },
                    { "CategoryCode", Tuple.Create(model.CategoryCode == "" ? null : model.CategoryCode.ToString(), DbType.String, ParameterDirection.Input) }
                };

                var result = await UnitOfWork.Repository<ItemCategoryListingModel>().GetEntitiesBySPAsync("[Item].[GetItemCategoriesforListing]", parameters);
                if (result.Count() > 0)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), "Item Category Details Retrieved Sucessfully", result);
                }
                else
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "No Records to Display", result);
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<MIMSResponse> ItemCategoryUpdate(ItemCategoryModel model)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "ItemCategoryID", Tuple.Create(model.ItemCategoryID.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "CategoryCode", Tuple.Create(model.CategoryCode.ToString(), DbType.String, ParameterDirection.Input) },
                    { "CategoryName", Tuple.Create(model.CategoryName.ToString(), DbType.String, ParameterDirection.Input) },
                    { "IsActive", Tuple.Create(model.IsActive.ToString(), DbType.Boolean, ParameterDirection.Input) },
                    { "CreatedBy", Tuple.Create(model.CreatedBy.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "Result", Tuple.Create("-1".ToString(), DbType.Int32, ParameterDirection.Output) }
                };

                var result = await UnitOfWork.Repository<ItemCategoryModel>().ExecuteSPWithInputOutputAsync("[Item].[ItemCategoryUpdate]", parameters);
                if (result == -1)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "Item Category Code Already Exists", result);
                }
                else if (result > 0)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), "Item Category Updated Sucessfully", result);
                }
                else
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "Item Category Update Failed", result);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<MIMSResponse> GetItemCategoryDetailsByID(int ItemCategoryID)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "ItemCategoryID", Tuple.Create(ItemCategoryID.ToString(), DbType.Int32, ParameterDirection.Input) }
                };

                var result = await UnitOfWork.Repository<ItemCategoryModel>().GetEntityBySPAsync("[Item].[GetItemCategoryDetailsByID]", parameters);
                if (result != null)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), "Item Category Details Retrieved Sucessfully", result);
                }
                else
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "No Records to Display", result);
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<MIMSResponse> DeleteItemCategory(int ItemCategoryID)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "ItemCategoryID", Tuple.Create(ItemCategoryID.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "Result", Tuple.Create("-1".ToString(), DbType.Int32, ParameterDirection.Output) }
                };

                var result = await UnitOfWork.Repository<ItemCategoryModel>().ExecuteSPWithInputOutputAsync("[Item].[DeleteItemCategory]", parameters);
                if (result > 0)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), "Item Category Deleted Sucessfully", result);
                }
                else
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "Error While Deleting Item Category", result);
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<MIMSResponse> GetItemCategoryListForDropdown()
        {
            try
            {
                var result = await UnitOfWork.Repository<ItemCategoryModel>().GetEntitiesBySPAsyncWithoutParameters("[Item].[GetItemCategoryListForDropdown]");
                if (result != null)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), "Item Category Details Retrieved Sucessfully", result);
                }
                else
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "No Records to Display", result);
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<MIMSResponse> ItemSubCategorySave(ItemSubCategoryModel model)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "SubCategoryID", Tuple.Create(model.SubCategoryID.ToString(), DbType.Int32, ParameterDirection.InputOutput) },
                    { "SubCategoryCode", Tuple.Create(model.SubCategoryCode.ToString(), DbType.String, ParameterDirection.Input) },
                    { "SubCategoryName", Tuple.Create(model.SubCategoryName.ToString(), DbType.String, ParameterDirection.Input) },
                    { "CategoryID", Tuple.Create(model.CategoryID.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "DealerID", Tuple.Create(model.DealerID.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "Description", Tuple.Create(model.Description.ToString(), DbType.String, ParameterDirection.Input) },
                    { "IsActive", Tuple.Create(model.IsActive.ToString(), DbType.Boolean, ParameterDirection.Input) },
                    { "CreatedBy", Tuple.Create(model.CreatedBy.ToString(), DbType.Int32, ParameterDirection.Input) }
                };

                var result = await UnitOfWork.Repository<ItemSubCategoryModel>().ExecuteSPWithInputOutputAsync("[Item].[ItemSubCategorySave]", parameters);
                if (result == -1)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "Item Sub Category Already Exists", result);
                }
                else if (result > 0)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), "Item Sub Category Saved Sucessfully", result);
                }
                else
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "Item Sub Category Save Failed", result);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<MIMSResponse> GetItemSubCategoriesforListing(ItemSubCategoryModel model)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "SubCategoryCode", Tuple.Create(model.SubCategoryCode == "" ? null : model.SubCategoryCode.ToString(), DbType.String, ParameterDirection.Input) },
                    { "DealerID", Tuple.Create(model.DealerID == 0 ? null : model.DealerID.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "CategoryID", Tuple.Create(model.CategoryID == 0 ? null : model.CategoryID.ToString(), DbType.Int32, ParameterDirection.Input) }
                };

                var result = await UnitOfWork.Repository<ItemSubCategoryListingModel>().GetEntitiesBySPAsync("[Item].[GetItemSubCategoriesforListing]", parameters);
                if (result.Count() > 0)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), "Item Sub Category Details Retrieved Sucessfully", result);
                }
                else
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "No Records to Display", result);
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<MIMSResponse> DeleteItemSubCategory(int SubCategoryID, int UserID)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "SubCategoryID", Tuple.Create(SubCategoryID.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "UserID", Tuple.Create(UserID.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "Result", Tuple.Create("-1".ToString(), DbType.Int32, ParameterDirection.Output) }
                };

                var result = await UnitOfWork.Repository<ItemSubCategoryModel>().ExecuteSPWithInputOutputAsync("[Item].[DeleteItemSubCategory]", parameters);
                if (result > 0)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), "Item Sub Category Deleted Sucessfully", result);
                }
                else
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "Error While Deleting Item Sub Category", result);
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<MIMSResponse> GetItemSubCategoryDetailsByID(int SubCategoryID)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "SubCategoryID", Tuple.Create(SubCategoryID.ToString(), DbType.Int32, ParameterDirection.Input) }
                };

                var result = await UnitOfWork.Repository<ItemSubCategoryModel>().GetEntityBySPAsync("[Item].[GetItemSubCategoryDetailsByID]", parameters);
                if (result != null)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), "Item Sub Category Details Retrieved Sucessfully", result);
                }
                else
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "No Records to Display", result);
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<MIMSResponse> GetItemSubCategoryListForDropdown()
        {
            try
            {
                var result = await UnitOfWork.Repository<ItemSubCategoryModel>().GetEntitiesBySPAsyncWithoutParameters("[Item].[GetItemSubCategoryListForDropdown]");
                if (result != null)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), "Item Sub Category Details Retrieved Sucessfully", result);
                }
                else
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "No Records to Display", result);
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<MIMSResponse> ItemSave(List<ItemSaveModel> model)
        {
            try
            {
                foreach (var item in model)
                {
                    var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                    {
                        { "ItemID", Tuple.Create(item.ItemID.ToString(), DbType.Int32, ParameterDirection.InputOutput) },
                        { "SubCategoryID", Tuple.Create(item.SubCategoryID.ToString(), DbType.Int32, ParameterDirection.Input) },
                        { "ItemName", Tuple.Create(item.ItemName.ToString(), DbType.String, ParameterDirection.Input) },
                        { "ItemCode", Tuple.Create(item.ItemCode.ToString(), DbType.String, ParameterDirection.Input) },
                        { "SerialNumber", Tuple.Create(item.SerialNumber.ToString(), DbType.String, ParameterDirection.Input) },
                        { "RetailPrice", Tuple.Create(item.RetailPrice.ToString(), DbType.Decimal, ParameterDirection.Input) },
                        { "SellingPrice", Tuple.Create(item.SellingPrice.ToString(), DbType.Decimal, ParameterDirection.Input) },
                        { "CreatedBy", Tuple.Create(item.CreatedBy.ToString(), DbType.Int32, ParameterDirection.Input) }
                    };

                    var result = await UnitOfWork.Repository<ItemSaveModel>().ExecuteSPWithInputOutputAsync("[Item].[ItemSave]", parameters);

                    if (result <= 0)
                    {
                        return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "Item Save Failed", result);
                    }
                }
                return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), "Items successfully saved", 1);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<MIMSResponse> GetItemsforListing(ItemSaveModel model)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "SubCategoryID", Tuple.Create(model.SubCategoryID == 0 ? null : model.SubCategoryID.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "ItemCode", Tuple.Create(model.ItemCode == "" ? null : model.ItemCode.ToString(), DbType.String, ParameterDirection.Input) },
                    { "SerialNumber", Tuple.Create(model.SerialNumber == "" ? null : model.SerialNumber.ToString(), DbType.String, ParameterDirection.Input) }
                };

                var result = await UnitOfWork.Repository<ItemListingModel>().GetEntitiesBySPAsync("[Item].[GetItemsforListing]", parameters);
                if (result.Count() > 0)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), "Item Details Retrieved Sucessfully", result);
                }
                else
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "No Records to Display", result);
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<MIMSResponse> DeleteItem(int ItemID, int UserID)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "ItemID", Tuple.Create(ItemID.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "UserID", Tuple.Create(UserID.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "Result", Tuple.Create("-1".ToString(), DbType.Int32, ParameterDirection.Output) }
                };

                var result = await UnitOfWork.Repository<ItemSaveModel>().ExecuteSPWithInputOutputAsync("[Item].[DeleteItem]", parameters);
                if (result > 0)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), "Item Deleted Sucessfully", result);
                }
                else
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "Error While Deleting Item", result);
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<MIMSResponse> GetItemDetailsByID(int ItemID)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "ItemID", Tuple.Create(ItemID.ToString(), DbType.Int32, ParameterDirection.Input) }
                };

                var result = await UnitOfWork.Repository<ItemSaveModel>().GetEntityBySPAsync("[Item].[GetItemDetailsByID]", parameters);
                if (result != null)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), "Item Details Retrieved Sucessfully", result);
                }
                else
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "No Records to Display", result);
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<MIMSResponse> ItemUpdate(ItemSaveModel model)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "ItemID", Tuple.Create(model.ItemID.ToString(), DbType.Int32, ParameterDirection.InputOutput) },
                    { "SubCategoryID", Tuple.Create(model.SubCategoryID.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "ItemName", Tuple.Create(model.ItemName.ToString(), DbType.String, ParameterDirection.Input) },
                    { "ItemCode", Tuple.Create(model.ItemCode.ToString(), DbType.String, ParameterDirection.Input) },
                    { "SerialNumber", Tuple.Create(model.SerialNumber.ToString(), DbType.String, ParameterDirection.Input) },
                    { "RetailPrice", Tuple.Create(model.RetailPrice.ToString(), DbType.Decimal, ParameterDirection.Input) },
                    { "SellingPrice", Tuple.Create(model.SellingPrice.ToString(), DbType.Decimal, ParameterDirection.Input) },
                    { "CreatedBy", Tuple.Create(model.CreatedBy.ToString(), DbType.Int32, ParameterDirection.Input) }
                };

                var result = await UnitOfWork.Repository<ItemSaveModel>().ExecuteSPWithInputOutputAsync("[Item].[ItemUpdate]", parameters);
                if (result == -1)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "Item Code Already Exists", result);
                }
                else if (result > 0)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), "Item Updated Sucessfully", result);
                }
                else
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "Item Update Failed", result);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
