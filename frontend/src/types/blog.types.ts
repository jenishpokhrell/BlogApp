export interface IPostBlogDto{
    blogTitle: string,
    description: string,
}
export interface IComment {
    id: string
    commentor: string;
    comments: string;
}

export interface IGetBlogDto{
    id: string;
    blogTitle: string,
    description: string,
    createdAt: string,
    postedBy: string,
    comments: IComment[];
}


export interface IUpdateBlogDto{
    blogTitle: string,
    description: string,
}