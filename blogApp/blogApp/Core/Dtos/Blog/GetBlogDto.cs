
using blogApp.Core.Dtos.Comment;
using blogApp.Core.Entities;

namespace blogApp.Core.Dtos.Blog
{
    public class GetBlogDto
    {
        public int Id { get; set; }
        public string blogTitle { get; set; }
        public string Description { get; set; }
        public string postedBy { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public IList<CommentDto> Comments {  get; set; }   

    }
}
