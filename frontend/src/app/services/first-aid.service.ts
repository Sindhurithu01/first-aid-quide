import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirstaidService {

  // Replace with your backend URL
  private apiUrl = 'https://first-aid-quide-15.onrender.com';


  constructor(private http: HttpClient) { }

  // Get all topics
  getTopics(): Observable<any> {
    return this.http.get(`${this.apiUrl}/topics`);
  }

  // Get topic by ID
  getTopicById(id: string) {
  return this.http.get<any>(`http://first-aid-quide-12.onrender.com/api/topics/${id}`);
}

}
