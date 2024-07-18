export interface IGetBlogDto{
    createdAt: string,
    blogTitle: string,
    description: string,
    postedBy: string,
    comments: string[]
}

export interface IPostBlogDto{
    blogTitle: string,
    description: string,
}

export interface IUpdateBlogDto{
    blogTitle: string,
    description: string,
}