
using Microsoft.AspNetCore.Connections;
using Project.Core.Data;
using Project.GrateFulDonors.API.Extensions;
using Project.GrateFulDonors.Core;
using Project.GrateFulDonors.Dapper;

var builder = WebApplication.CreateBuilder(args);

var provider = builder.Services.BuildServiceProvider();
var configuration = provider.GetRequiredService<IConfiguration>();
var ConName = configuration.GetValue<string>("name");


// Add services to the container.
builder.Services.AddTransient<IGrateFulDonorsUnitOfWork, GrateFulDonorsUnitOfWork>(ctx =>
{
    IGrateFulDonorsConnectionFactory connectionFactory = new GrateFulDonorsConnectionFactory(configuration.GetConnectionString("SqlConnectionString"));
    return new GrateFulDonorsUnitOfWork(connectionFactory);
});
builder.Services.AddApplicationServices();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
