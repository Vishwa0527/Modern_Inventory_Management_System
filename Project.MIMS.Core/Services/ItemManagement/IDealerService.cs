using Project.MIMS.Core.Common;
using Project.MIMS.Core.Models.ItemManagement;
using System.Threading.Tasks;

namespace Project.MIMS.Core.Services.ItemManagement
{
    public interface IDealerService
    {
        Task<MIMSResponse> DealerSave(DealerSaveModel model);
        Task<MIMSResponse> GetDealersForDropDown();
        Task<MIMSResponse> GetDealerDetails(DealerSaveModel model);
        Task<MIMSResponse> GetDealerDetailsByDealerID(int dealerID);
        Task<MIMSResponse> DealerUpdate(DealerSaveModel model);
    }
}
