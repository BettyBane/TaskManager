import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Project } from '../models/projects';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  postProduct(data: Project) {
    return this.http.post<Project>('http://localhost:3000/projectList/', data);
  }
  getProduct() {
    return this.http.get<Project[]>('http://localhost:3000/projectList/');
  }
  putProduct(id: string, data: any) {
    return this.http.put<Project>(
      'http://localhost:3000/projectList/' + id,
      data
    );
  }
  deleteProduct(id: string) {
    return this.http.delete<Project>('http://localhost:3000/projectList/' + id);
  }
}
