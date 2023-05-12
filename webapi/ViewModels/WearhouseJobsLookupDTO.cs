namespace webapi.ViewModels;

public class WearhouseJobsLookupDTO
{
    public WearhouseJobsLookupDTO(IEnumerable<(string, bool)> wearhouseJobs)
    {
        WearhouseJobs = wearhouseJobs.ToArray();
    }

    public (string, bool)[] WearhouseJobs { get; }
}