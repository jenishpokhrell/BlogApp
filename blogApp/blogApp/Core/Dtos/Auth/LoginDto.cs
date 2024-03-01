using System.ComponentModel.DataAnnotations;

namespace blogApp.Core.Dtos.Auth
{
    public class LoginDto
    {
        [Required(ErrorMessage = "Username required")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Password Required")]
        public string Password { get; set; }
    }
}
