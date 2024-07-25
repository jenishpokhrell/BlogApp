export interface ILogDto{
    createdAt: string;
    userName: string;
    description: string;
    type: 'blog' | 'comment';
}