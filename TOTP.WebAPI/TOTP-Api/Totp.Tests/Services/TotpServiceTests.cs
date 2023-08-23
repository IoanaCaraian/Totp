using Business.Dtos;
using Business.Services;
using Xunit;

namespace Totp.Tests.Services
{
    public class TotpServiceTests
    {
        private readonly TotpService _service;

        public TotpServiceTests()
        {
            _service = new TotpService();
        }

        [Fact]
        public void VerifyPinCode_Should_Return_False()
        {
            var totpDetails = new TotpDetailsDto
            {
                UserId = 1,
                UtcDateTime = "2023-08-08T12:00:00Z",
                PinCode = "123456"
            };

            bool result = _service.VerifyPinCode(totpDetails);

            Assert.False(result);
        }

        [Fact]
        public void VerifyPinCode_With_Invalid_Date_Should_Return_False()
        {
            var totpDetails = new TotpDetailsDto
            {
                UserId = 1,
                UtcDateTime = "2023-",
                PinCode = "123456"
            };

            bool result = _service.VerifyPinCode(totpDetails);

            Assert.False(result);
        }

        [Fact]
        public void GeneratePinCode_Should_Return_TotpCurrentDto()
        {
            int userId = 1;

            TotpCurrentDto result = _service.GeneratePinCode(userId);

            Assert.NotNull(result);
            Assert.NotNull(result.PinCode);
            Assert.InRange(result.RemainingSeconds, 0, 30);
        }
    }
}
