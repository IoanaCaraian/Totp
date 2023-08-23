using OtpNet;
using System.Text;
using Business.Contants;
using Business.Dtos;

namespace Business.Services
{
    public class TotpService : ITotpService
    {
        public bool VerifyPinCode(TotpDetailsDto totpDetails)
        {
            byte[] secretKey = GetSecretKey(totpDetails.UserId);
            DateTime correctUtc;

            if(!DateTime.TryParse(totpDetails.UtcDateTime, out correctUtc))
            {
                return false;
            }

            TimeCorrection timeCorrection = new TimeCorrection(correctUtc);
            Totp totp = new Totp(secretKey, timeCorrection: timeCorrection);
            long timeStepMatched;

            return totp.VerifyTotp(totpDetails.PinCode, out timeStepMatched);
        }

        public TotpCurrentDto GeneratePinCode(int userId)
        {
            byte[] secretKey = GetSecretKey(userId);
            Totp totp = new Totp(secretKey);

            string pinCode = totp.ComputeTotp();
            int remainingSeconds = totp.RemainingSeconds();

            return new TotpCurrentDto
            {
                PinCode = pinCode,
                RemainingSeconds = remainingSeconds
            };
        }

        private byte[] GetSecretKey(int userId)
        {
            return Encoding.UTF8.GetBytes(TotpConstants.SecretKey + userId);
        }
    }
}
