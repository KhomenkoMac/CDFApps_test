using webapi.Models.entities;

namespace webapi.Models.data;

internal static class DbSeeder
{
    public static void Seed(AppDbContext db)
    {
        var warehouse1 = new WarehouseJob{
            JobNumber = "BN000001",
            ExternalRef = "",
            IsReceived = false,
            CreatedOn = DateTime.Now,
            UpdatedOn = DateTime.Now,
            CreatedBy = ""
        };
        var warehouse2 = new WarehouseJob{
            JobNumber = "BN000002",
            ExternalRef = "",
            IsReceived = false,
            CreatedOn = DateTime.Now,
            UpdatedOn = DateTime.Now,
            CreatedBy = ""
        };
        var warehouse3 = new WarehouseJob{
            JobNumber = "BN000003",
            ExternalRef = "",
            IsReceived = false,
            CreatedOn = DateTime.Now,
            UpdatedOn = DateTime.Now,
            CreatedBy = ""
        };
        
        db.WarehouseJobs.AddRange(
            warehouse1,
            warehouse2,
            warehouse3
        );
        db.Boxes.AddRange(
            new Box
            {
                BoxReference= "BN00021",
                Condtition= "good",
                ExepctedOn= DateTime.Now,
                ReceivedBy= "",
                ReceivedOn= DateTime.Now,
                WarehouseJob = warehouse1
            },
            new Box
            {
                BoxReference= "BN00022",
                Condtition= "broken",
                ExepctedOn= DateTime.Now,
                ReceivedBy= "",
                ReceivedOn= DateTime.Now,
                WarehouseJob = warehouse2
            },
            new Box
            {
                BoxReference= "BN00023",
                Condtition= "",
                ExepctedOn= DateTime.Now,
                ReceivedBy= "",
                ReceivedOn= DateTime.Now,
                WarehouseJob = warehouse3
            },
            new Box
            {
                BoxReference= "BN00024",
                Condtition= "good",
                ExepctedOn= DateTime.Now,
                ReceivedBy= "",
                ReceivedOn= DateTime.Now,
                WarehouseJob = warehouse1
            },
            new Box
            {
                BoxReference= "BN00025",
                Condtition= "good",
                ExepctedOn= DateTime.Now,
                ReceivedBy= "",
                ReceivedOn= DateTime.Now,
                WarehouseJob = warehouse1
            }
        );

        db.SaveChanges();
    }   
}