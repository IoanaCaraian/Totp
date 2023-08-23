namespace Business.Dtos
{
    public class TotpCurrentDto
    {
        public string? PinCode { get; set; }

        public int RemainingSeconds { get; set; }
    }
}
