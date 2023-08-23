using System.ComponentModel.DataAnnotations;

namespace Business.Dtos
{
    public class TotpDetailsDto
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        [StringLength(6)]
        public string? PinCode { get; set; }

        [Required]
        public string? UtcDateTime { get; set; }
    }
}
