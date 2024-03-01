using blogApp.Core.Dtos.Auth;
using blogApp.Core.Dtos.General;
using System.Security.Claims;

namespace blogApp.Core.Interfaces
{
    public interface IAuthService
    {
        Task<GeneralServiceResponeDto> SeedRoleAsync();
        Task<GeneralServiceResponeDto> RegisterAsync(RegisterDto registerDto);
        Task<LoginServiceResponseDto> LoginAsync(LoginDto loginDto);
        Task<LoginServiceResponseDto> MeAsync(MeDto meDto);
        Task<IEnumerable<UserInfo>> GetUsersInfoAsync();
        Task<IEnumerable<InfoForUsers>> GetUsernamesListAsync();
    }
}
