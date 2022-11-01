import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskAssignment, TaskCategory } from '../models/projects';

@Injectable({
  providedIn: 'root',
})
export class TaskAssigService {
  constructor(private http: HttpClient) {}
  postProduct(data: TaskAssignment) {
    return this.http.post<TaskAssignment>(
      'http://localhost:3000/taskAssignment/',
      data
    );
  }
  getProduct() {
    return this.http.get<TaskAssignment[]>(
      'http://localhost:3000/taskAssignment/'
    );
  }
  putProduct(id: string, data: TaskAssignment) {
    return this.http.put<TaskAssignment>(
      'http://localhost:3000/taskAssignment/' + id,
      data
    );
  }
  deleteProduct(id: string) {
    return this.http.delete<TaskAssignment>(
      'http://localhost:3000/taskAssignment/' + id
    );
  }
  getTaskAssigById(id: string) {
    return this.http.get<TaskAssignment>(
      'http://localhost:3000/taskAssignment/' + id
    );
  }
}
