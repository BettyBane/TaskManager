import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Task } from '../models/projects';

@Injectable({
  providedIn: 'root',
})
export class TaskApiService {
  constructor(private http: HttpClient) {}
  postProduct(data: Task) {
    return this.http.post<Task>('http://localhost:3000/taskList/', data);
  }
  getProduct() {
    return this.http.get<Task[]>('http://localhost:3000/taskList/');
  }
  getTaskById(id: string) {
    return this.http.get<Task>('http://localhost:3000/taskList/' + id);
  }
  putProduct(id: string, data: Task) {
    return this.http.put<Task>('http://localhost:3000/taskList/' + id, data);
  }
  deleteProduct(id: string) {
    return this.http.delete<Task>('http://localhost:3000/taskList/' + id);
  }
}
