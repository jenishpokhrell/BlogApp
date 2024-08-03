using blogApp.Core.Constants;
using blogApp.Core.Dtos.Blog;
using blogApp.Core.Dtos.Comment;
using blogApp.Core.Dtos.General;
using blogApp.Core.Entities;
using blogApp.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace blogApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogsController : ControllerBase
    {
        private readonly IBlogService _blogServices;

        public BlogsController(IBlogService blogServices)
        {
            _blogServices = blogServices;
        }

        //----------------------->Posting new blog<---------------------------------
        [HttpPost]
        [Route("Create")]
        [Authorize]
        public async Task<ActionResult> PostBlog([FromBody] PostBlogDto postBlogDto)
        {
            var blog = await _blogServices.PostNewBlogAsync(User, postBlogDto);
            if (blog.IsSuccess)
            {
                return Ok(blog);
            }
            return StatusCode(blog.StatusCode, blog.Message);
        }

        //----------------------->Getting my blogs<---------------------------------
        [HttpGet]
        [Route("mine")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<GetBlogDto>>> GetMyBlogs()
        {
            var myBlogs = await _blogServices.GetMyBlogsAsync(User);
            return Ok(myBlogs);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<GetBlogDto>> GetBlogById(int id)
        {
            var blog = await _blogServices.GetBlogByIdAsync(id);
            if(blog is null)
            {
                return NotFound();
            }
            return Ok(blog);
        } 

        //----------------------->Updating blogr<---------------------------------
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateBlog(int id,[FromBody] UpdateBlogDto updateBlogDto)
        {
            var updateblog = await _blogServices.UpdateBlogAsync(id, User, updateBlogDto);
            if(updateblog.IsSuccess)
            {
                return Ok(updateblog);
            }
            else
            {
                return StatusCode(updateblog.StatusCode, updateblog.Message);
            }
        }

        //----------------------->Get all blogs<---------------------------------
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<GetBlogDto>>> GetAllBlogs()
        {
            var blogs = await _blogServices.GetBlogsAsync();
            return Ok(blogs);
        }

        //----------------------->Deleting blog<---------------------------------
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteBlog(int id)
        {
            var deleteBlog = await _blogServices.DeleteBlogAsync(User, id);
            if (deleteBlog.IsSuccess)
            {
                return Ok(deleteBlog);
            }
            else
            {
                return StatusCode(deleteBlog.StatusCode, deleteBlog.Message);
            }
        }
    }
}
