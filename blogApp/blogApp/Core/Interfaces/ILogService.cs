using blogApp.Core.Dtos.General;
using blogApp.Core.Dtos.Log;
using System.Security.Claims;

namespace blogApp.Core.Interfaces
{
    public interface ILogService
    {
        Task SaveNewLog(string Username, string Description);
        Task<IEnumerable<GetLogDto>> GetLogsAsync();
        Task<IEnumerable<GetLogDto>> GetMyLogsAsync(ClaimsPrincipal User);
    }
}
