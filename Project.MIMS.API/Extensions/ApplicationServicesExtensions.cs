using Project.MIMS.Core.Common;
using Project.MIMS.Core.Services;
using Project.MIMS.Services;

namespace Project.MIMS.API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddTransient<IMIMSResponse, MIMSResponse>();
            services.AddTransient<ITestService, TestService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IDonationTypeService, DonationTypeService>();
            services.AddTransient<IDonorService, DonorService>();
            services.AddTransient<ISeekerService, SeekerService>();
            services.AddTransient<IMobileService, MobileService>();
            services.AddTransient<IDonationRequestService, DonationRequestService>();

            return services;
        }
    }
}
