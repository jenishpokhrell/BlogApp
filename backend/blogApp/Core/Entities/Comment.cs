using Microsoft.AspNetCore.Authentication;

namespace blogApp.Core.Entities
{
    public class Comment : BaseEntity<long>
    {
        public string Commentor { get; set; }
        public string Comments {  get; set; }
        public Blog Blog { get; set; }
        public int blogId { get; set; }
        public string blogTitle { get; set; }

    }
}
