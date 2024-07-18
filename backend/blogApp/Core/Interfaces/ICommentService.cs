using blogApp.Core.Dtos.Comment;
using blogApp.Core.Dtos.General;
using System.Security.Claims;

namespace blogApp.Core.Interfaces
{
    public interface ICommentService
    {
        Task<GeneralServiceResponeDto> PostCommentAsync(ClaimsPrincipal User, int blogId, PostCommentDto postCommentDto);
        
        // -------------------- Comment delete feature will soon come. ----------------------------
        //Task<GeneralServiceResponeDto> DeleteCommentAsync(ClaimsPrincipal User, long id);

    }
}
