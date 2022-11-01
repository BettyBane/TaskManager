import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskCategory } from '../models/projects';

@Injectable({
  providedIn: 'root',
})
export class TaskTypeService {
  constructor(private http: HttpClient) {}
  postProduct(data: TaskCategory) {
    return this.http.post<TaskCategory>(
      'http://localhost:3000/taskType/',
      data
    );
  }
  getProduct() {
    return this.http.get<TaskCategory[]>('http://localhost:3000/taskType/');
  }
  putProduct(id: string, data: TaskCategory) {
    return this.http.put<TaskCategory>(
      'http://localhost:3000/taskType/' + id,
      data
    );
  }
  deleteProduct(id: string) {
    return this.http.delete<TaskCategory>(
      'http://localhost:3000/taskType/' + id
    );
  }
}
