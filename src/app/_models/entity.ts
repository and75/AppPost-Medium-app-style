/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 */

export interface Entity {
    guid: number;
    subtype:string;
    title: string;
    content : string;
    excerpt: string;
    time_created : number;
    owner : {};
    access_id: number;
    status: string;
    comments_on:string;
    ideas: number;
    loves: number;
    likes: number;
    comments: number;
}
