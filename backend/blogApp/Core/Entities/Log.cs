namespace blogApp.Core.Entities
{
    public class Log : BaseEntity<int>
    {
        public string Username { get; set; }
        public string Description { get; set; }
    }
}
