using Project.GrateFulDonors.Core.Common;
using Project.GrateFulDonors.Core.Services;
using Project.GrateFulDonors.Services;

namespace Project.GrateFulDonors.API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddTransient<IGrateFulDonorsResponse, GrateFulDonorsResponse>();
            services.AddTransient<ITestService, TestService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IDonationTypeService, DonationTypeService>();
            services.AddTransient<IDonorService, DonorService>();
            services.AddTransient<ISeekerService, SeekerService>();
            services.AddTransient<IMobileService, MobileService>();

            return services;
        }
    }
}
