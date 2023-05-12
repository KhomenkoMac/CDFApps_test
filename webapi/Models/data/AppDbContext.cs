using Microsoft.EntityFrameworkCore;
using webapi.Models.entities;

public class AppDbContext: DbContext
{
    public AppDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<WarehouseJob> WarehouseJobs { get; set; } = null!;
    public DbSet<Box> Boxes { get; set; } = null!;
    public DbSet<Photo> Photos { get; set; }= null!;
}