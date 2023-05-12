using System.ComponentModel.DataAnnotations;

namespace webapi.Models.entities;

public class WarehouseJob
{
    [Key]
    public Guid Id { get; set; }
    public string JobNumber { get; set; } = null!;
    public string ExternalRef { get; set; } = null!;
    public bool IsReceived { get; set; }
    public DateTime CreatedOn { get; set; }
    public DateTime UpdatedOn { get; set; }
    public string CreatedBy { get; set; } = null!;
    public IList<Box>? Boxes { get; set; }
}