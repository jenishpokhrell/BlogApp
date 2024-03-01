using blogApp.Core.Constants;
using blogApp.Core.Dtos.Log;
using blogApp.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace blogApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogsController : ControllerBase
    {
        private readonly ILogService _logService;

        public LogsController(ILogService logService)
        {
            _logService = logService;
        }

        //----------------------->Getting all Users log<---------------------------------
        [HttpGet]
        [Route("Get All Logs")]
        [Authorize(Roles = StaticUserRoles.ADMIN)] //Can be only accessed by admin
        public async Task<ActionResult<IEnumerable<GetLogDto>>> GetLogs()
        {
            var logs = _logService.GetLogsAsync();
            return Ok(logs);
        }

        //----------------------->Getting my logs<---------------------------------
        [HttpGet]
        [Route("My Logs")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<GetLogDto>>> GetMyLogs()
        {
            var myLogs = await _logService.GetMyLogsAsync(User);
            return Ok(myLogs);
        }
    }
}
