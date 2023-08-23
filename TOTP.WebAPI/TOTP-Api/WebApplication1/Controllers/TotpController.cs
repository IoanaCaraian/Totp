using Microsoft.AspNetCore.Mvc;
using Business.Dtos;
using Business.Services;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TotpController : ControllerBase
    {
        protected readonly ITotpService _totpService;

        public TotpController(ITotpService totpService)
        {
            _totpService = totpService;
        }

        [HttpPost]
        public IActionResult VerifyPinCode(TotpDetailsDto totpVerify)
        {
            bool isPinCodeValid = _totpService.VerifyPinCode(totpVerify);

            return Ok(new TotpValidationDto { IsCodeValid = isPinCodeValid });
        }

        [HttpGet]
        public IActionResult GeneratePinCode([FromQuery] int userId)
        {
            TotpCurrentDto validationTotpDto = _totpService.GeneratePinCode(userId);

            return Ok(validationTotpDto);
        }
    }
}
