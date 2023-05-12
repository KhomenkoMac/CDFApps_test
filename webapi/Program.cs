using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using webapi.Models.data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("Default");
builder.Services.AddDbContext<AppDbContext>(
    options => options.UseSqlServer(
        connectionString, 
        context => context.MigrationsAssembly(typeof(AppDbContext).Assembly.FullName)
    )
);
builder.Services.AddCors();
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

app.UseCors(policy=> policy.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());

app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

var db = services.GetRequiredService<AppDbContext>();

DbInitializer.Initilize(db);
DbSeeder.Seed(db);

app.Run();
