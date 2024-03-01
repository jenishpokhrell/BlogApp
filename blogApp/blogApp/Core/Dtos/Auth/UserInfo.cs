﻿namespace blogApp.Core.Dtos.Auth
{
    public class UserInfo
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public DateTime createdAt { get; set; }
        public IEnumerable<string> Roles { get; set; }

    }
}
