import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './entities';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  addUser(user:User) {
    return this.http.post<User>(environment.serverUrl+'/api/user', user);
  }
  login(user:User) {
    return this.http.post<{token:string}>(environment.serverUrl+'/api/login', user).pipe(
      tap(data => localStorage.setItem('token', data.token))
    );
  }

  getUser() {
    return this.http.get(environment.serverUrl + '/api/protected');
  }
}
