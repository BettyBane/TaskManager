import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/projects';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private http: HttpClient) {}
  postProduct(data: User) {
    return this.http.post<User>('http://localhost:3000/userList/', data);
  }
  getProduct() {
    return this.http.get<User[]>('http://localhost:3000/userList/');
  }
  getUserById(id: string) {
    return this.http.get<User>('http://localhost:3000/userList/' + id);
  }
  putProduct(id: string, data: User) {
    return this.http.put<User>('http://localhost:3000/userList/' + id, data);
  }
  deleteProduct(id: string) {
    return this.http.delete<User>('http://localhost:3000/userList/' + id);
  }
}
