using System.ComponentModel.DataAnnotations;

namespace webapi.Models.entities;

public class Box
{
    [Key]
    public Guid Id { get; set; }
    public string BoxReference { get; set; } = null!;
    public string Condtition { get; set; } = null!;
    public DateTime ExepctedOn { get; set; }
    public string ReceivedBy { get; set; } = null!;
    public DateTime? ReceivedOn { get; set; }

    public Guid WarehouseJobId { get; set; }
    public WarehouseJob? WarehouseJob { get; set; }
}