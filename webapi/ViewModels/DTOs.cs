namespace webapi.Controllers;

public record class ChangeBoxConditionRequest(string BoxReference, string BoxCondition);

public record class MarkBoxAsReceivedRequest(string BoxReference);
public record class MarkBoxAsReceivedRepsonse(string JobNumber, bool IsReceived);
