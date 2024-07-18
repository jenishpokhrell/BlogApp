export interface IPostBlogDto{
    blogTitle: string,
    description: string,
}
export interface IGetBlogDto extends IPostBlogDto{
    createdAt: string,
    postedBy: string,
    comments: string[]
}

export interface IUpdateBlogDto{
    blogTitle: string,
    description: string,
}