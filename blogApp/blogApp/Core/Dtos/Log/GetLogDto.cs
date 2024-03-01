namespace blogApp.Core.Dtos.Log
{
    public class GetLogDto
    {
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public string Username { get; set; }

        public string Description { get; set; }
    }
}
