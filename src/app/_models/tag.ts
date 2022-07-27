/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 */

export class Tag {
    tag: string;
    total : number;
    constructor(
        tag: string = null,
        total: number = null,
    ) {
        this.tag = tag;
        this.total = total;
    }
}


