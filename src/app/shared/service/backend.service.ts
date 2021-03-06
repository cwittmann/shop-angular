import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseModel } from '../model/BaseModel';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  headers: HttpHeaders;
  userAuthenticated: EventEmitter<Boolean>;
  authenticationFailed: EventEmitter<Boolean>;

  constructor(private httpClient: HttpClient) {
    this.userAuthenticated = new EventEmitter();
    this.authenticationFailed = new EventEmitter();
  }

  // AUTHENTICATION

  authenticate(user: string, password: string) {
    this.headers = new HttpHeaders({
      authorization: 'Basic ' + btoa('user1:password1'),
    });

    this.httpClient
      .post('http://localhost:8000/auth', [user, password], {
        headers: this.headers,
        responseType: 'text',
      })
      .subscribe(
        (res) => {
          if (res === 'Successful') {
            this.userAuthenticated.emit(true);
          }
        },
        (error) => {
          this.authenticationFailed.emit(true);
        }
      );
  }

  // GENERIC

  async get<T>(dbNamePlural: string) {
    return await this.httpClient
      .get<T>('http://localhost:8000/' + dbNamePlural, {
        headers: this.headers,
      })
      .toPromise();
  }

  async post<T>(item: T, dbNamePlural: string): Promise<T> {
    return await this.httpClient
      .post<T>('http://localhost:8000/' + dbNamePlural, item, {
        headers: this.headers,
      })
      .toPromise();
  }

  async put<T extends BaseModel>(item: T, dbNamePlural: string): Promise<T> {
    return await this.httpClient
      .put<T>('http://localhost:8000/' + dbNamePlural + '/' + item.id, item, {
        headers: this.headers,
      })
      .toPromise();
  }

  async delete<T>(id: string, dbNamePlural: string) {
    return await this.httpClient
      .delete<T>('http://localhost:8000/' + dbNamePlural + '/' + id, {
        headers: this.headers,
      })
      .toPromise();
  }

  // IMAGES

  async postImage(item: FormData) {
    return await this.httpClient
      .post('http://localhost:8000/images', item, {
        headers: this.headers,
      })
      .toPromise();
  }

  async getImages() {
    return await this.httpClient
      .get('http://localhost:8000/images', { headers: this.headers })
      .toPromise();
  }
}
