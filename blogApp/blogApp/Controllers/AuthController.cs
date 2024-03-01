using blogApp.Core.Constants;
using blogApp.Core.Dtos.Auth;
using blogApp.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace blogApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }


        //------------------------>Seeding Role To Database<------------------------------
        [HttpPost]
        [Route("seeding-roles")]
        public async Task<IActionResult> SeedRoles()
        {
            var seedRoles = await _authService.SeedRoleAsync();
            return StatusCode(seedRoles.StatusCode, seedRoles.Message);
        }

        //----------------------->Registering User<---------------------------------
        [HttpPost]
        [Route("register-user")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterDto registerDto)
        {
            var registerUser = await _authService.RegisterAsync(registerDto);
            return StatusCode(registerUser.StatusCode, registerUser.Message);
        }

        //----------------------->Logging User<---------------------------------
        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult<LoginServiceResponseDto>> Login([FromBody] LoginDto loginDto)
        {
            var user = await _authService.LoginAsync(loginDto);
            if(user is null) {
                return Unauthorized("Invalid Credentials. Please contact admin");
            }
            return Ok(user);
        }

        //----------------------->Generating New Token<---------------------------------
        [HttpPost]
        [Route("Me")]
        public async Task<ActionResult<LoginServiceResponseDto>> Me([FromBody] MeDto meDto)
        {
            try
            {
                var me = await _authService.MeAsync(meDto);
                if(me is null)
                {
                    return Unauthorized("Invalid Token.");
                }
                else
                {
                    return Ok(me);
                }

            } catch (Exception)
            {
                return Unauthorized("Invalid Token.");
            }

        }

        //----------------------->Getting users infor<---------------------------------
        [HttpGet]
        [Route("Users")]
        [Authorize(Roles = StaticUserRoles.ADMIN)]
        public async Task<ActionResult<IEnumerable<UserInfo>>> GetUsersLIst()
        {
            var users = await _authService.GetUsersInfoAsync();
            return Ok(users); 
        }

        //----------------------->Getting limited user infos<---------------------------------
        [HttpGet]
        [Route("UserInfoForUsers")]
        public async Task<ActionResult<IEnumerable<InfoForUsers>>> UserInfoForUsers()
        {
            var users = await _authService.GetUsernamesListAsync();
            return Ok(users);
        }
    }
}
