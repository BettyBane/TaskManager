import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ProjectType } from '../models/projects';

@Injectable({
  providedIn: 'root',
})
export class ProjectTypeService {
  constructor(private http: HttpClient) {}
  postProduct(data: ProjectType) {
    return this.http.post<ProjectType>(
      'http://localhost:3000/projectType/',
      data
    );
  }
  getProduct() {
    return this.http.get<ProjectType[]>('http://localhost:3000/projectType/');
  }
  putProduct(id: string, data: ProjectType) {
    return this.http.put<ProjectType>(
      'http://localhost:3000/projectType/' + id,
      data
    );
  }
  deleteProduct(id: string) {
    return this.http.delete<ProjectType>(
      'http://localhost:3000/projectType/' + id
    );
  }
}
