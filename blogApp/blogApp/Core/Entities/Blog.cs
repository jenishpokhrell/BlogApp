using blogApp.Core.Dtos.Comment;

namespace blogApp.Core.Entities
{
    public class Blog : BaseEntity<int>
    {
        public string blogTitle { get; set; }
        public string Description { get; set; }
        public string UserId { get; set; }
        public string postedBy { get; set; }
        public IList<Comment> Comments { get; set; }

    }
}
