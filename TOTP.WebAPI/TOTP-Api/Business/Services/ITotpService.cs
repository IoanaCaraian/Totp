using Business.Dtos;

namespace Business.Services
{
    public interface ITotpService
    {
        bool VerifyPinCode(TotpDetailsDto totpDetails);

        TotpCurrentDto GeneratePinCode(int userId);
    }
}
