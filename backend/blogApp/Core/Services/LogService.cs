using blogApp.Core.DbContext;
using blogApp.Core.Dtos.Log;
using blogApp.Core.Entities;
using blogApp.Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace blogApp.Core.Services
{
    public class LogService : ILogService
    {
        private readonly ApplicationDBContext _context;
        public LogService(ApplicationDBContext context)
        {
            _context = context;
        }

        //Getting logs
        public async Task<IEnumerable<GetLogDto>> GetLogsAsync()
        {
            var logs = await _context.Logs
                .Select(q => new GetLogDto
                {
                    CreatedAt = q.CreatedAt,
                    Username = q.Username,
                    Description = q.Description,
                })
                .OrderByDescending(q => q.CreatedAt)
                .ToListAsync();
            return logs;
        }

        //Getting my logs
        public async Task<IEnumerable<GetLogDto>> GetMyLogsAsync(ClaimsPrincipal User)
        {
            var myLogs = await _context.Logs
                .Where(q => q.Username == User.Identity.Name)
                .Select(q => new GetLogDto 
                { 
                    CreatedAt = q.CreatedAt,
                    Username = q.Username,
                    Description = q.Description,
                })
                .OrderByDescending(q => q.CreatedAt)
                .ToListAsync();
            return myLogs;
        }

        //Saving users logs
        public async Task SaveNewLog(string Username, string Description)
        {
            var newLog = new Log()
            {
                Username = Username,
                Description = Description
            };
            await _context.Logs.AddAsync(newLog);
            await _context.SaveChangesAsync();
        }
    }
}
