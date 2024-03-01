using blogApp.Core.Dtos.Blog;
using blogApp.Core.Dtos.Comment;
using blogApp.Core.Dtos.General;
using blogApp.Core.Entities;
using System.Security.Claims;

namespace blogApp.Core.Interfaces
{
    public interface IBlogService
    {
        Task<GeneralServiceResponeDto> PostNewBlogAsync(ClaimsPrincipal User, PostBlogDto postBlogDto);
        Task<IEnumerable<GetBlogDto>> GetBlogsAsync();
        Task<IEnumerable<GetBlogDto>> GetMyBlogsAsync(ClaimsPrincipal User);
        Task<GeneralServiceResponeDto> UpdateBlogAsync(int id, ClaimsPrincipal User, UpdateBlogDto updateBlogDto);
        Task<GeneralServiceResponeDto> DeleteBlogAsync(ClaimsPrincipal User,  int id);
    }
}
