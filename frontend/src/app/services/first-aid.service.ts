import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirstaidService {

  // Replace with your backend URL
  private apiUrl = 'http://localhost:3000/api/firstaid';

  constructor(private http: HttpClient) { }

  // Get all topics
  getTopics(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Get topic by ID
  getTopicById(id: string) {
  return this.http.get<any>(`http://localhost:3000/api/topics/${id}`);
}

}
