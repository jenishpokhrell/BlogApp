export interface IPostBlogDto{
    blogTitle: string,
    description: string,
}
export interface IGetBlogDto{
    id: string;
    blogTitle: string,
    description: string,
    createdAt: string,
    postedBy: string,
    comments: string[]
}

export interface IUpdateBlogDto{
    blogTitle: string,
    description: string,
}