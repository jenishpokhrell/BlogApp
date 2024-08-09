using blogApp.Core.Constants;
using blogApp.Core.DbContext;
using blogApp.Core.Dtos.Auth;
using blogApp.Core.Dtos.General;
using blogApp.Core.Entities;
using blogApp.Core.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Text;

namespace blogApp.Core.Services
{
    public class AuthServices : IAuthService
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogService _logService;
        private readonly IBlogService _blogService;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDBContext _context;

        public AuthServices(ApplicationDBContext context, UserManager<ApplicationUser> userManager,IBlogService blogService, RoleManager<IdentityRole> roleManager, ILogService logService, IConfiguration configuration)
        {
            _context = context;
            _roleManager = roleManager;
            _userManager = userManager;
            _logService = logService;
            _configuration = configuration;
            _blogService = blogService;
        }


        //Seeding roles 
        public async Task<GeneralServiceResponeDto> SeedRoleAsync()
        {
            bool isAdminRoleExists = await _roleManager.RoleExistsAsync(StaticUserRoles.ADMIN);
            bool isUserRolesExists = await _roleManager.RoleExistsAsync(StaticUserRoles.USER);

            if (isAdminRoleExists && isUserRolesExists)
            {
                return new GeneralServiceResponeDto()
                {
                    IsSuccess = true,
                    StatusCode = 200,
                    Message = "Roles Seeding Already Done.",
                };
            }
            await _roleManager.CreateAsync(new IdentityRole(StaticUserRoles.ADMIN));
            await _roleManager.CreateAsync(new IdentityRole(StaticUserRoles.USER));

            return new GeneralServiceResponeDto()
            {
                IsSuccess = true,
                StatusCode = 200,
                Message = "Roles Seeding Sucessfully Done.",
            };
        }

        //Registering User

        public async Task<GeneralServiceResponeDto> RegisterAsync(RegisterDto registerDto)
        {
            var isUserExists = await _userManager.FindByNameAsync(registerDto.Username);
            if(isUserExists is not null)
            {
                return new GeneralServiceResponeDto()
                {
                    IsSuccess = true,
                    StatusCode = 200,
                    Message = "User Already Exists"
                };
            }
            ApplicationUser newUser = new ApplicationUser()
            {
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                UserName = registerDto.Username,
                Email = registerDto.Email,
                Address = registerDto.Address,
                SecurityStamp = Guid.NewGuid().ToString()
            };

            var createUser = await _userManager.CreateAsync(newUser, registerDto.Password);

            if (!createUser.Succeeded)
            {
                var errorString = "User Creation failed";
                foreach(var error in createUser.Errors)
                {
                    errorString += "#"+ error.Description;
                }
                return new GeneralServiceResponeDto()
                {
                    IsSuccess = false,
                    StatusCode = 400,
                    Message = errorString
                };
            }
            //Adding a default user role to all new user
            await _userManager.AddToRoleAsync(newUser, StaticUserRoles.USER);
            await _logService.SaveNewLog(newUser.UserName, "Created an account");

            return new GeneralServiceResponeDto()
            {
                IsSuccess = true,
                StatusCode = 200,
                Message = "User Created Successfully"
            };
        }

        //Logging In

        public async Task<LoginServiceResponseDto> LoginAsync(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.Username);
            if (user is null)
                return null;

            var isPasswordCorrect = await _userManager.CheckPasswordAsync(user, loginDto.Password);
            if (!isPasswordCorrect)
                return null;

            // Return token and user-info
            var newToken = await GenerateJWTTokenAsync(user);
            var roles = await _userManager.GetRolesAsync(user);
            var userInfo = GenerateUserInfoObject(user, roles);
            await _logService.SaveNewLog(user.UserName, "Logged In");

            return new LoginServiceResponseDto()
            {
                NewToken = newToken,
                UserInfo = userInfo
            };

        }

        //Getting personal data

        public async Task<LoginServiceResponseDto> MeAsync(MeDto meDto)
        {
            ClaimsPrincipal handler = new JwtSecurityTokenHandler().ValidateToken(meDto.Token, new TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidIssuer = _configuration["JWT:ValidIssuer"],
                ValidAudience = _configuration["JWT:ValidAudience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]))
            }, out SecurityToken securityToken);

            string decodedUserName = handler.Claims.First(q => q.Type == ClaimTypes.Name).Value;
            if (decodedUserName is null)
                return null;

            var user = await _userManager.FindByNameAsync(decodedUserName);
            if (user is null)
                return null;

            var newToken = await GenerateJWTTokenAsync(user);
            var roles = await _userManager.GetRolesAsync(user);
            var userInfo = GenerateUserInfoObject(user, roles);
            await _logService.SaveNewLog(user.UserName, "New Token Generated.");

            return new LoginServiceResponseDto()
            {
                NewToken = newToken,
                UserInfo = userInfo
            };
        }


        //Fetching users info for admin only
        public async Task<IEnumerable<UserInfo>> GetUsersInfoAsync()
        {
            var users = await _userManager.Users.ToListAsync();
            List<UserInfo> userInfo = new List<UserInfo>();
            foreach(var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                var userInfoResult = GenerateUserInfoObject(user, roles);
                userInfo.Add(userInfoResult);
            }
            return userInfo;

        }


        //Fetching certain info of user for other user roles
        public async Task<IEnumerable<InfoForUsers>> GetUsernamesListAsync()
        {
            var users = await _userManager.Users.ToListAsync();
            List<InfoForUsers> infoForUsers = new List<InfoForUsers>();

            foreach(var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                var infoForUsersResult = GenerateUserInfoObjectForUsers(user, roles);
                infoForUsers.Add(infoForUsersResult);
            }
            return infoForUsers;
        }

        //Generate JWT Token Async
        private async Task<string> GenerateJWTTokenAsync(ApplicationUser user)
        {
            var userRoles = await _userManager.GetRolesAsync(user);

            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim("FirstName", user.FirstName),
                new Claim("LastName", user.LastName),
            };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }
            var authSecret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
            var signingCredentials = new SigningCredentials(authSecret, SecurityAlgorithms.HmacSha256);

            var tokenObject = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                notBefore: DateTime.Now,
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: signingCredentials
                );
            string token = new JwtSecurityTokenHandler().WriteToken(tokenObject);
            return token;
        }


        //Generate User Info Object
        private UserInfo GenerateUserInfoObject(ApplicationUser user, IEnumerable<string> Roles)
        {
            //Instead of this we can also use Automapper packages
            return new UserInfo()
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Username = user.UserName,
                Email = user.Email,
                Address = user.Address,
                createdAt = user.CreatedAt,
                Roles = Roles
            };
        }

        //Generate User Info Object For Users
        private InfoForUsers GenerateUserInfoObjectForUsers(ApplicationUser user, IEnumerable<string> Roles)
        {
            //Instead of this we can also use Automapper packages
            return new InfoForUsers()
            {
                Id = user.Id,
                Username = user.UserName,
                Email = user.Email,
                Roles = Roles
            };
        }

        
    }
}
