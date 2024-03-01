using blogApp.Core.DbContext;
using blogApp.Core.Dtos.Blog;
using blogApp.Core.Dtos.Comment;
using blogApp.Core.Dtos.General;
using blogApp.Core.Entities;
using blogApp.Core.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace blogApp.Core.Services
{
    public class BlogServices : IBlogService
    {
        private readonly ApplicationDBContext _context;
        private readonly ILogService _logService;
        public BlogServices(ApplicationDBContext context, ILogService logService)
        {
            _context = context;
            _logService = logService;
        }

        //Posting blogs
        public async Task<GeneralServiceResponeDto> PostNewBlogAsync(ClaimsPrincipal User, PostBlogDto postBlogDto)
        {
            Blog blog = new Blog()
            {
                blogTitle = postBlogDto.blogTitle,
                Description = postBlogDto.Description,
                UserId = User.FindFirstValue(ClaimTypes.NameIdentifier),
                postedBy = User.Identity.Name,
            };

            await _context.Blogs.AddAsync(blog);
            await _context.SaveChangesAsync();
            await _logService.SaveNewLog(User.Identity.Name, "Posted a new blog.");

            return new GeneralServiceResponeDto()
            {
                IsSuccess = true,
                StatusCode = 201,
                Message = "Your Blog is Posted Successfully."
            };
        }

        //getting all blogs
        public async Task<IEnumerable<GetBlogDto>> GetBlogsAsync()
        {
            var blogs = await _context.Blogs
                .Select(q => new GetBlogDto()
                {
                    Id = q.Id,
                    blogTitle = q.blogTitle,
                    Description = q.Description,
                    postedBy = q.postedBy,
                    CreatedAt = q.CreatedAt,
                    Comments = q.Comments.Select(comments => new CommentDto
                    {
                        Id = comments.Id,
                        Comments = comments.Comments,
                        Commentor = comments.Commentor
                    }).ToList()
                })
                .OrderByDescending(q => q.CreatedAt)
                .ToListAsync();
            return blogs;
        }

        //getting my blogs
        public async Task<IEnumerable<GetBlogDto>> GetMyBlogsAsync(ClaimsPrincipal User)
        { 
            var loggedInUser = User.Identity.Name;
            var myBlogs = await _context.Blogs
                .Where(q => q.postedBy == loggedInUser)
                .Select(q => new GetBlogDto()
                {
                    Id = q.Id,
                    blogTitle = q.blogTitle,
                    Description = q.Description,
                    postedBy = q.postedBy,
                    CreatedAt = q.CreatedAt,
                    Comments = q.Comments.Select(comments => new CommentDto
                    {
                        Id = comments.Id,
                        Comments = comments.Comments,
                        Commentor = comments.Commentor
                    }).ToList()
                })
                .OrderByDescending(q => q.CreatedAt)
                .ToListAsync();

            return myBlogs;
        }

        //updating blogs
        public async Task<GeneralServiceResponeDto> UpdateBlogAsync(int id, ClaimsPrincipal User, UpdateBlogDto updateBlogDto)
        {   
            var currentBlog = await _context.Blogs.FindAsync(id);
            if (currentBlog is null)

                return new GeneralServiceResponeDto()
                {
                    IsSuccess = false,
                    StatusCode = 404,
                    Message = "Blog doesn't exists"
                };

            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if(currentBlog.UserId != currentUserId)
            {
                return new GeneralServiceResponeDto()
                {
                    IsSuccess = false,
                    StatusCode = 403,
                    Message = "You are not authorized to update this blog."
                };
            }

            currentBlog.blogTitle = updateBlogDto.blogTitle;
            currentBlog.Description = updateBlogDto.Description;
            _context.Entry(currentBlog).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            await _logService.SaveNewLog(User.Identity.Name, "Updated blog");

            return new GeneralServiceResponeDto()
            {
                IsSuccess = true,
                StatusCode = 201,
                Message = "Blog Updated Successfully."
            };
        }

        //Deleting blogs
        public async Task<GeneralServiceResponeDto> DeleteBlogAsync(ClaimsPrincipal User, int id)
        {
            var currentBlog = await _context.Blogs.FindAsync(id);
            var comments = await _context.Comments.Where(c => c.blogId == id).ToListAsync();
            if(currentBlog is null)
            {
                return new GeneralServiceResponeDto()
                {
                    IsSuccess = false,
                    StatusCode = 404,
                    Message = "Blog not found."
                };
            }
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (currentBlog.UserId != currentUserId)
            {
                return new GeneralServiceResponeDto()
                {
                    IsSuccess = false,
                    StatusCode = 403,
                    Message = "You are not authorized to delete this blog."
                };
            }
            _context.Blogs.Remove(currentBlog);
            _context.Comments.RemoveRange(comments);
            await _context.SaveChangesAsync();
            await _logService.SaveNewLog(User.Identity.Name, "Deleted Blog");

            return new GeneralServiceResponeDto()
            {
                IsSuccess = true,
                StatusCode = 201,
                Message = "Blog deleted successfully."
            };

        }
    }
}
