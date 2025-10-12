import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FirstaidService } from '../services/first-aid.service';

@Component({
  selector: 'app-topic-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div *ngIf="topic; else loadingOrNotFound">
      <h2>{{ topic.title }}</h2>
      <p>{{ topic.description }}</p>

      <div *ngIf="topic.steps?.length">
        <h3>Steps</h3>
        <ul>
          <li *ngFor="let step of topic.steps">{{ step }}</li>
        </ul>
      </div>

      <hr />

      <h4>Add a Review</h4>
      <textarea [(ngModel)]="reviewText" rows="3" cols="60" placeholder="Write your review..."></textarea><br>
      <button (click)="submitReview()">Submit Review</button>

      <div *ngIf="reviews.length > 0" style="margin-top: 20px;">
        <h4>Reviews</h4>
        <ul>
          <li *ngFor="let review of reviews">{{ review }}</li>
        </ul>
      </div>
    </div>

    <ng-template #loadingOrNotFound>
      <p *ngIf="loading">Loading topic details...</p>
      <p *ngIf="!loading && !topic">Topic not found.</p>
    </ng-template>
  `
})
export class TopicDetailComponent implements OnInit {
  topic: any = null;
  reviewText = '';
  reviews: string[] = [];
  loading = true;

  // Mock topics list for fallback or offline use (optional)
  topics = [
    {
      id: '1',
      title: 'Burns',
      description: 'Steps to treat a minor burn',
      steps: ['Cool under water', 'Cover with clean cloth', 'Do not pop blisters']
    },
  
    {
      id: '2',
      title: 'Cuts',
      description: 'Steps to treat a small cut',
      steps: ['Wash wound', 'Apply antiseptic', 'Bandage']
    },
    {
      id: '3',
      title: 'Hypothermia',
      description: 'Cold exposure help',
      steps: ['Move the person to a warm place', 'Remove wet clothing', 'Cover with blankets', 'Seek medical help immediately']
    },
    {
      id: '4',
      title: 'Fractures and Sprains',
      description: 'Broken bones and sprains',
      steps: ['Immobilize the injured area', 'Apply ice to reduce swelling', 'Keep the limb elevated', 'Seek professional medical help']
    },
    { 
    id: '5', 
    title: 'Shock', 
    description: 'First aid steps for someone in shock', 
    steps: ['Lay the person down', 'Elevate legs if no injury', 'Keep them warm', 'Call emergency services immediately'] 
  },
  { 
    id: '6', 
    title: 'Nosebleeds', 
    description: 'How to stop a nosebleed', 
    steps: ['Sit upright and lean forward', 'Pinch nostrils for 10-15 minutes', 'Apply a cold compress on the nose bridge', 'Seek help if bleeding persists'] 
  },
  { 
    id: '7', 
    title: 'Poisoning', 
    description: 'First aid for poisoning', 
    steps: ['Identify the poison', 'Do not induce vomiting unless instructed', 'Call poison control or emergency services', 'Follow their guidance carefully'] 
  },
  { 
    id: '8', 
    title: 'Animal Bites and Stings', 
    description: 'Care for bites and stings', 
    steps: ['Clean the wound thoroughly', 'Apply antiseptic', 'Immobilize if necessary', 'Seek medical help for rabies or severe bites'] 
  },
  { 
    id: '9', 
    title: 'Eye Injuries', 
    description: 'First aid for minor eye injuries', 
    steps: ['Do not rub the eye', 'Rinse gently with clean water', 'Remove any visible foreign object carefully', 'Seek medical help for chemical burns or severe injuries'] 
  },
  { id: '10', title: 'Heat Exhaustion',
     description: 'Steps to help someone suffering from heat exhaustion', 
     steps: ['Move the person to a cooler place', 'Have them lie down and elevate legs', 'Give water to drink if conscious', 'Loosen clothing and cool body with wet cloths'] 
  },
  ];

  constructor(
    private route: ActivatedRoute,
    private firstAidService: FirstaidService
  ) {}

  ngOnInit(): void {
    const topicId = this.route.snapshot.paramMap.get('id');
    console.log('Topic id from route:', topicId);

    if (topicId) {
      this.firstAidService.getTopicById(topicId).subscribe({
        next: (data) => {
          console.log('Fetched topic:', data);
          this.topic = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to fetch topic:', err);
          this.loading = false;
          // Optional fallback: find in mock topics if backend is down
          this.topic = this.topics.find(t => t.id === topicId) || null;
        }
      });
    } else {
      console.warn('No topic ID found in route!');
      this.loading = false;
    }
  }

  submitReview(): void {
    if (this.reviewText.trim()) {
      this.reviews.push(this.reviewText.trim());
      this.reviewText = '';
    }
  }
}
