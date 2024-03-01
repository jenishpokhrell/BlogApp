using blogApp.Core.DbContext;
using blogApp.Core.Dtos.Comment;
using blogApp.Core.Dtos.General;
using blogApp.Core.Entities;
using blogApp.Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System.Security.Claims;

namespace blogApp.Core.Services
{
    public class CommentServices : ICommentService
    {
        private readonly ApplicationDBContext _context;
        private readonly ILogService _logService;
        public CommentServices(ApplicationDBContext context,ILogService logService)
        {
            _context = context;
            _logService = logService;
        }

        //-------------- Deleting feature will come soon --------------
        /*
        public async Task<GeneralServiceResponeDto> DeleteCommentAsync(ClaimsPrincipal User,long id)
        {
            
        }
        */

        //posting comment to blogs
        public async Task<GeneralServiceResponeDto> PostCommentAsync(ClaimsPrincipal User, int blogId, PostCommentDto postCommentDto)
        {
            var blog = await _context.Blogs.FirstOrDefaultAsync(b => b.Id == blogId);
            if (blog == null)
            {
                return new GeneralServiceResponeDto()
                {
                    IsSuccess = false,
                    StatusCode = 404,
                    Message = "Blog doesn't exist."
                };
            }
            Comment comment = new Comment()
            {
                Comments = postCommentDto.Comments,
                Commentor = User.Identity.Name,
                blogId = blogId,
                blogTitle = blog.blogTitle
            };

            await _context.AddAsync(comment);
            await _context.SaveChangesAsync();
            await _logService.SaveNewLog(User.Identity.Name, "Posted a comment");

            return new GeneralServiceResponeDto()
            {
                IsSuccess = true,
                StatusCode = 201,
                Message = "Comment Posted Successfully."
            };
        }
    }
}
