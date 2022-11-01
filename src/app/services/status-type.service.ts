import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Status } from '../models/projects';

@Injectable({
  providedIn: 'root',
})
export class StatusTypeService {
  constructor(private http: HttpClient) {}
  postProduct(data: Status) {
    return this.http.post<Status>('http://localhost:3000/statusType/', data);
  }
  getProduct() {
    return this.http.get<Status[]>('http://localhost:3000/statusType/');
  }
  putProduct(id: string, data: Status) {
    return this.http.put<Status>(
      'http://localhost:3000/statusType/' + id,
      data
    );
  }
  deleteProduct(id: string) {
    return this.http.delete<Status>('http://localhost:3000/statusType/' + id);
  }
}
