import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FirstaidService } from '../services/first-aid.service';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <h2>First Aid Topics</h2>

    <div *ngIf="topics.length === 0">
      <p>No topics found. Try refreshing or check backend connection.</p>
    </div>

    <div *ngFor="let topic of topics" style="margin-bottom: 20px; padding: 10px; border: 1px solid #ccc;">
      <h3>{{ topic.title }}</h3>
      <p>{{ topic.description }}</p>
      <button (click)="viewDetails(topic._id || topic.id)">View Details</button>
    </div>
  `
})
export class TopicsComponent implements OnInit {
  topics: any[] = [];

  constructor(private firstAidService: FirstaidService, private router: Router) {}

  ngOnInit(): void {
    this.loadTopics();
  }

  loadTopics(): void {    

    this.firstAidService.getTopics().subscribe({
      next: (data: any) => {
        console.log('Fetched topics:', data);
        if (data && Array.isArray(data)) {
          this.topics = data;
        } else {
          console.error('Unexpected data format:', data);
          this.topics = [];
        }
      },
      error: (err: any) => {
        console.error('Error fetching topics:', err);
        this.topics = [{ id: 1, title: 'Burns', description: 'Steps to treat a minor burn' },
    { id: 2, title: 'Cuts', description: 'Steps to treat a small cut' },
    { id: 3, title: 'Hypothermia', description: 'Cold exposure help' },
    { id:4,title: 'Fractures and Sprains', description: 'broken bones and sprains'},
    { id: 5, title: 'Shock', description: 'First aid steps for someone in shock'}, 
    { id: 6, title: 'Nosebleeds', description: 'How to stop a nosebleed'},
    {id: 7, title: 'Poisoning', description: 'First aid for poisoning'},
    {id: 8, title: 'Animal Bites and Stings', description: 'Care for bites and stings' },
    { id: 9, title: 'Eye Injuries', description: 'First aid for minor eye injuries'},
    { id: 10, title: 'Heat Exhaustion', description: 'Steps to help someone suffering from heat exhaustion'}  ];
      }
    }); 

  }

  viewDetails(topicId: string): void {
    console.log('Navigating to topic :', topicId);
    this.router.navigate(['/topic-detail', topicId]);
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
  goToTopicDetail(topicId: string) {
  this.router.navigate(['/topic-detail', topicId]);
}

}
