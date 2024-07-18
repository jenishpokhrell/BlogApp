namespace blogApp.Core.Dtos.Auth
{
    public class InfoForUsers
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public IEnumerable<string> Roles { get; set; }
    }

}
