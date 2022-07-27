/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 */

export class Post {
    guid: number;
    time_created : number;
    title: string;
    content : string;
    excerpt: string;
    tags : any;
    owner : {};
    access_id: number;
    status: string;
    comments_on:string;
    constructor(
        guid: number = null,
        time_created: number = null,
        title: string= null,
        content: string = '',
        excerpt: string = '',
        owner = {},
        access_id: number= null,
        status: string = '',
        comments_on: string = ''
    ) {
        this.guid = guid;
        this.time_created = time_created;
        this.title= title;
        this.content = content;
        this.excerpt = excerpt;
        this.owner = owner;
        this.access_id = access_id;
        this.status = status;
        this.comments_on = comments_on;
    }
}


