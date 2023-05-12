using Microsoft.AspNetCore.Mvc;
using webapi.Models.entities;
using webapi.ViewModels;

namespace webapi.Controllers;

[ApiController]
[Route("[controller]")]
public class WearhouseJobsController : ControllerBase
{
    private readonly ILogger<WearhouseJobsController> _logger;
    private readonly AppDbContext _context;
    public WearhouseJobsController(ILogger<WearhouseJobsController> logger, AppDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpPatch("{boxReference}", Name = "ChangeBoxCondition")]
    public async Task<ActionResult> Patch([FromRoute] string boxReference, ChangeBoxConditionRequest request)
    {
        if (boxReference != request.BoxReference)
        {
            return BadRequest();
        }

        var boxToUPD = _context.Boxes.Single(x=> x.BoxReference == request.BoxReference);

        boxToUPD.Condtition = request.BoxCondition;

        _context.Update(boxToUPD);

        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpPatch("{boxReference}/mark-received", Name = "MarkAsReceived")]
    public ActionResult<MarkBoxAsReceivedRepsonse> Patch([FromRoute] string boxReference){
        
        Box foundBox = null;
        
        try
        {
            foundBox = _context.Boxes.Single(x=> x.BoxReference == boxReference);
        }
        catch(InvalidOperationException)
        {
            return NoContent();
        }

        foundBox.ReceivedOn = DateTime.Now;
        
        _context
            .Entry(foundBox)
            .Reference(p => p.WarehouseJob)
            .Load();

        var jobOfBox = foundBox.WarehouseJob!;

        _context
            .Entry(jobOfBox)
            .Collection(p => p.Boxes!)
            .Load();

        var allBoxesReceived = jobOfBox.Boxes!.All(x=> x.ReceivedOn is not null);

        if (allBoxesReceived)
        {
            jobOfBox.IsReceived = true;

            _context.Update(jobOfBox);

            _context.SaveChanges();
        }

        return Ok(new MarkBoxAsReceivedRepsonse(jobOfBox.JobNumber, allBoxesReceived));
    }
}
