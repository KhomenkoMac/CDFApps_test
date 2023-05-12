namespace webapi.Models.data;

internal static class DbInitializer
{
    public static void Initilize(AppDbContext db)
    {
        db.Database.EnsureDeleted();
        db.Database.EnsureCreated();
    }    
}