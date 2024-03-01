using blogApp.Core.Dtos.Comment;
using blogApp.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace blogApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;
        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        //----------------------->Posting comment to a blog<---------------------------------
        [HttpPost("{blogId}")]
        [Authorize]
        public async Task<ActionResult> PostComment(int blogId,[FromBody] PostCommentDto postCommentDto)
        {
            var comment = await _commentService.PostCommentAsync(User, blogId, postCommentDto);
            if (comment.IsSuccess)
            {
                return Ok(comment);
            }
            else
            {
                return StatusCode(comment.StatusCode, comment.Message);
            }
        }
    }
}
