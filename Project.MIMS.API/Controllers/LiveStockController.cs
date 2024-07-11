using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.MIMS.Core.Common;
using Project.MIMS.Core.Models;
using Project.MIMS.Core.Models.ItemManagement;
using Project.MIMS.Core.Services;
using Project.MIMS.Core.Services.ItemManagement;

namespace Project.MIMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LiveStockController : ControllerBase
    {
        private readonly ILiveStockService liveStockService;
        public LiveStockController(ILiveStockService liveStockService)
        {
            this.liveStockService = liveStockService;
        }

        [HttpPost]
        [Route("GetLiveStockDetails")]
        public async Task<MIMSResponse> GetLiveStockDetails(LiveStockInputModel model)
        {
            return await liveStockService.GetLiveStockDetails(model);
        }

        [HttpGet]
        [Route("GetItemSubCategoryListBycategoryID")]
        public async Task<MIMSResponse> GetItemSubCategoryListBycategoryID(int categoryID)
        {
            return await liveStockService.GetItemSubCategoryListBycategoryID(categoryID);
        }
    }
}
