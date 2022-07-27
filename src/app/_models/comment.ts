/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 */

export class Comment {
    postId: number;
    id: number;
    name: string;
    email:string;
    body: string;
    constructor(
        postId: number = null,
        id: number = null,
        name: string = '',
        email: string = '',
        body: string = 'Write your comment ...'
    ) {
        this.postId = postId;
        this.id = id;
        this.name = name;
        this.email = email;
        this.body = body;
    }
}