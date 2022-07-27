/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 */

export class User {
    guid: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    constructor(
        guid: number =  null,
        name: string = '',
        username: string ='',
        email: string = '',
        phone: string = '',
        website: string =''
    ) {
        this.guid = guid;
        this.name = name;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.website = website;
    }
}



