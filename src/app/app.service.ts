/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 */

import { Injectable } from '@angular/core';
import { Post } from './_models/post';
import { Tag } from './_models/tag';
import { Comment } from './_models/comment';
import { User } from './_models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  // le point d’accés à notre API
  private serviceUrl = 'https://jsonplaceholder.typicode.com/';
  private ApiServiceUrl = 'http://app-post-elgg.bsys2.host/services/api/rest/json/?method=';
  private loggedInUser: User = null;
  constructor(private http: HttpClient, private authService: AuthService) { }

  getAuthToken() {
    return this.authService.getAuthToken();
  }

  /** GET Posts */
  getPosts(): Observable<Post[]> {
    const authtoken = this.getAuthToken();
    const url = `${this.ApiServiceUrl}blog.get_latest_posts&limit=100&offset=0&auth_token=${authtoken}`;
    return this.http.get<Post[]>(url).pipe(
      tap(_ => this.log(`fetched getPosts`)),
      catchError(this.handleError('getPosts', []))
    );
  }

  getPostsOld(): Observable<Post[]> {
    const url = `${this.serviceUrl}posts`;
    return this.http.get<Post[]>(url).pipe(
      tap(_ => this.log(`fetched getPosts`)),
      catchError(this.handleError('getPosts', []))
    );
  }


  /** GET Post */
  getPost(id: number): Observable<Post> {
    const authtoken = this.getAuthToken();
    const url = `${this.ApiServiceUrl}blog.get_post&guid=${id}&auth_token=${authtoken}`;
    return this.http.get<Post>(url).pipe(
      tap(_ => this.log(`fetched getPost id=${id}`)),
      catchError(this.handleError<Post>(`getPost id=${id}`))
    );
  }

  /** GET Post */
  getOwner(id: number): Observable<User> {
    const authtoken = this.getAuthToken();
    const url = `${this.ApiServiceUrl}entity.get_owner&guid=${id}&auth_token=${authtoken}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched getOwner guid=${id}`)),
      catchError(this.handleError<User>(`getOwner guid=${id}`))
    );
  }

  /** PUT: update the post  */
  deletePost(guid: number): Observable<any> {
    let authtoken = this.getAuthToken();
    let ApiUrl = `${this.ApiServiceUrl}blog.delete_post`;
    var formData: any = new FormData();
    if (guid) {
      formData.append("guid", guid);
    }
    formData.append('auth_token', authtoken);
    return this.http.post<any>(ApiUrl, formData)
      .pipe(
        tap(_ => this.log(`fetched deletePost `)),
        catchError(this.handleError<any>(`deletePost`))
      );
  }

  /** POST post **/
  //Connection method
  savePost(title: string, description: string, guid: number, tags: string[]): Observable<any> {
    const authtoken = this.getAuthToken();
    const ApiUrl = `${this.ApiServiceUrl}blog.save_post`;
    var formData: any = new FormData();
    if (title) {
      formData.append("title", title);
    }
    if (description) {
      formData.append("content", description);
    }
    if (guid) {
      formData.append("guid", guid);
    }
    if (tags) {
      formData.append("tags", tags);
    }
    formData.append('auth_token', authtoken);
    return this.http.post<any>(ApiUrl, formData)
      .pipe(
        tap(_ => this.log(`fetched login `)),
        catchError(this.handleError<User>(`login`))
      );
  }

  /** GET Post */
  getPostsByUserId(id: number): Observable<Post[]> {
    const authtoken = this.getAuthToken();
    const url = `${this.ApiServiceUrl}blog.get_last_user_post&guid=${id}&limit=100&offset=0&auth_token=${authtoken}`;
    return this.http.get<Post[]>(url).pipe(
      tap(_ => this.log(`fetched getPostsByUserId`)),
      catchError(this.handleError('getPostsByUserId', []))
    );
  }

  /* Post search */
  appSearch(search:string[]): Observable<any[]> {
    
    let term = search[0];
    let searchOn:string = search[1];
    let url:string ='';
    
    if (!term.trim()) {
      return of([]);
    }
    
    const authtoken = this.getAuthToken();
    
    if(searchOn=='tags'){
      url = `${this.ApiServiceUrl}tags.search_by_term&term=${term}&auth_token=${authtoken}`;
    } else {
      url = `${this.ApiServiceUrl}blog.search_post&term=${term}&auth_token=${authtoken}`;
    }
    console.log('SearchOn', searchOn);
    console.log('SearchUrl', url);

    return this.http.get<any>(url).pipe(
      map(res => {
        console.log(res);
        if (res.result) {
          return res.result;
        } else {
          return null;
        }
      }),
      tap(_ => this.log(`fetched AppSearch on ${searchOn} matching "${term}"`)),
      catchError(this.handleError<any[]>('AppSearch', []))
    );

  }


  /** TAGS */
  /** Search tag by term */
  getTagsByTerm(term: string): Observable<Tag[]> {
    const authtoken = this.getAuthToken();
    const url = `${this.ApiServiceUrl}tags.search_by_term&term=${term}&auth_token=${authtoken}`;
    return this.http.get<any>(url).pipe(
      map(res => {
        if (res.result) {
          return res.result;
        } else {
          return null;
        }
      }),
      tap(_ => this.log(`found post matching ${term}`)),
      catchError(this.handleError<Tag[]>('searchPost', []))
    );
  }

  getMostUsedTags(): Observable<Tag[]> {
    const authtoken = this.getAuthToken();
    const url = `${this.ApiServiceUrl}tags.tagsCloud&auth_token=${authtoken}`;
    return this.http.get<any>(url).pipe(
      tap(_ => this.log(`fetched getMostUsedTags`)),
      catchError(this.handleError<Tag[]>('getMostUsedTags', []))
    );
  }

  getEntitiesByTag(tag: string): Observable<any[]> {
    const authtoken = this.getAuthToken();
    const url = `${this.ApiServiceUrl}tags.get_entities_by_tag&tag=${tag}&auth_token=${authtoken}`;
    return this.http.get<any>(url).pipe(
      map(res => {
        if (res.status==0 && res.result) {
          return res.result;
        } else {
          return null;
        }
      }),
      tap(_ => this.log(`Fetched getEntitiesByTag matching ${tag}`)),
      catchError(this.handleError<Tag[]>('getEntitiesByTag', []))
    );
  }

  /*ANNOTATIONS*/
  getPostByAnnotation(name: string): Observable<any[]> {
    const authtoken = this.getAuthToken();
    const url = `${this.ApiServiceUrl}annotations.statistics&name=${name}&auth_token=${authtoken}`;
    return this.http.get<any>(url).pipe(
      tap(_ => this.log(`fetched getPostByAnnotation`)),
      catchError(this.handleError<any[]>('getPostByAnnotation', []))
    );
  }

  /*COMMENTS*/
  /*Get comment for entity*/
  getCommentsByEntityId(id: number): Observable<Post> {
    const authtoken = this.getAuthToken();
    const url = `${this.ApiServiceUrl}comments.get_latest&guid=${id}&auth_token=${authtoken}`;
    return this.http.get<Post>(url).pipe(
      tap(_ => this.log(`fetched getCommentsByPostId id=${id}`)),
      catchError(this.handleError<Post>(`getPost id=${id}`))
    );
  }

  /*Save comment*/
  saveComment(guid: number, description: string) {
    const authtoken = this.getAuthToken();
    const ApiUrl = `${this.ApiServiceUrl}comments.save_comment`;
    var formData: any = new FormData();
    if (guid) {
      formData.append("guid", guid);
    }
    if (description) {
      formData.append("description", description);
    }
    formData.append('auth_token', authtoken);
    return this.http.post<any>(ApiUrl, formData).pipe(
      tap(_ => this.log(`fetched saveComment `)),
      catchError(this.handleError<Comment>(`saveComment`))
    );
  }

  /*USERS*/
  /* Get User by guid */
  getUserById(guid: number): Observable<User> {
    const url = `${this.serviceUrl}users/${guid}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched getUserById id=${guid}`)),
      catchError(this.handleError<User>(`getPost id=${guid}`))
    );
  }

  getLoggedInUser(): Observable<User[]> {
    const authtoken = this.getAuthToken();
    const url = `${this.ApiServiceUrl}core.getLoggedInUser&auth_token=${authtoken}`;
    return this.http.get<User[]>(url).pipe(
      tap(_ => this.log(`fetched getLoggedInUser`)),
      catchError(this.handleError('getLoggedInUser', []))
    );
  }

  /* ANNOTATION */
  /* Create annotations */
  createAnnotation(guid_one: number, name: string): Observable<any> {
    let authtoken = this.getAuthToken();
    let ApiUrl = `${this.ApiServiceUrl}annotations.create_annotation`;
    var formData: any = new FormData();
    if (guid_one) {
      formData.append("guid_one", guid_one);
    }
    if (name) {
      formData.append("name", name);
    }
    formData.append('auth_token', authtoken);
    return this.http.post<any>(ApiUrl, formData)
      .pipe(
        tap(_ => this.log(`fetched createAnnotation ${guid_one} / ${name}`)),
        catchError(this.handleError<any>(`createAnnotation`))
      );
  }

  /* handleError */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  /* log */
  private log(log: string) {
    console.info(log);
  }

}