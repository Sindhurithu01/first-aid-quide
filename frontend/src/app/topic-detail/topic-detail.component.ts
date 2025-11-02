import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClient, HttpClientModule } from '@angular/common/http';
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
      steps: [
      'Stop the burning process: Remove the person from the source of the burn (fire, hot surface, chemicals).',
      'Cool the burn: Hold the burned area under cool (not cold) running water for 10-20 minutes. If running water is unavailable, use a clean, cool, wet cloth.',
      'Protect the burn: Cover the burn loosely with a sterile, non-stick bandage or clean cloth.',
      'Avoid home remedies: Do not apply ice, butter, oils, or ointments on the burn.',
      'Relieve pain: Take over-the-counter pain relievers like ibuprofen or acetaminophen as needed.',
      'Monitor for infection: Watch for signs like increased redness, swelling, or pus.',
      'Seek medical help if the burn is larger than 3 inches, on the face, hands, feet, groin, or major joints, or if the burn is deep or causes white/charred skin.'
    ] },
  
    {
      id: '2',
      title: 'Cuts',
      description: 'Steps to treat a small cut',
      steps: [
      'Clean your hands thoroughly before touching the wound.',
      'Stop the bleeding by applying gentle pressure with a clean cloth or bandage.',
      'Wash the wound gently with clean water to remove any dirt or debris.',
      'Apply an antiseptic solution or cream to prevent infection.',
      'Cover the cut with a sterile bandage or dressing.',
      'Change the dressing daily or whenever it becomes wet or dirty.',
      'Watch for signs of infection such as redness, swelling, or pus.']
    },
    {
    id: '3',
    title: 'Hypothermia',
    description: 'Cold exposure help',
    steps: [
      'Move the person to a warm, dry place immediately.',
      'Remove any wet clothing carefully to prevent further heat loss.',
      'Cover the person with blankets, including their head, leaving face exposed.',
      'Give warm (not hot) fluids if the person is conscious and able to swallow.',
      'Avoid direct heat or hot water to prevent shock.',
      'Encourage gentle movement if possible to generate body heat.',
      'Seek medical help immediately, as hypothermia is a medical emergency.'
    ]
  },
  {
    id: '4',
    title: 'Fractures and Sprains',
    description: 'Broken bones and sprains',
    steps: [
      'Keep the injured area still and avoid moving it unnecessarily.',
      'Apply ice packs wrapped in cloth to reduce swelling and pain.',
      'Keep the injured limb elevated above heart level if possible.',
      'Do not attempt to realign bones or push protruding bones back in.',
      'Seek professional medical help immediately.',
      'Monitor for signs of shock or circulation problems such as numbness or color change.'
    ]
  },
  {
    id: '5',
    title: 'Shock',
    description: 'First aid steps for someone in shock',
    steps: [
      'Lay the person down on their back on a flat surface.',
      'If there is no injury preventing it, elevate their legs about 12 inches to improve blood flow.',
      'Keep the person warm and comfortable using blankets or clothing.',
      'Avoid giving food or drink in case surgery is needed.',
      'Reassure the person and keep them calm.',
      'Call emergency services immediately.',
      'Monitor breathing and consciousness while waiting for help.'
    ]
  },
  {
    id: '6',
    title: 'Nosebleeds',
    description: 'How to stop a nosebleed',
    steps: [
      'Sit the person upright and lean them slightly forward to avoid swallowing blood.',
      'Pinch the soft part of the nostrils together firmly for 10 to 15 minutes.',
      'Breathe through the mouth during this time.',
      'Apply a cold compress or ice pack to the bridge of the nose to reduce bleeding.',
      'Avoid lying down, bending over, or blowing the nose immediately after bleeding stops.',
      'Seek medical help if bleeding lasts more than 20 minutes or is very heavy.',
      'Also seek help if the nosebleed follows a head injury.'
    ]
  },
  {
    id: '7',
    title: 'Poisoning',
    description: 'First aid for poisoning',
    steps: [
      'Identify the poison if possible by checking containers, packaging, or the environment.',
      'Do not induce vomiting unless instructed by a medical professional or poison control.',
      'Call your local poison control center or emergency services immediately for guidance.',
      'Provide information about the person’s age, weight, and the poison involved.',
      'Follow instructions carefully about treatment or whether to administer activated charcoal.',
      'Keep the person calm and comfortable, and do not give anything to eat or drink unless advised.',
      'If the person becomes unconscious or has difficulty breathing, call emergency services immediately.'
    ]
  },
  {
    id: '8',
    title: 'Animal Bites and Stings',
    description: 'Care for bites and stings',
    steps: [
      'Clean the wound thoroughly with soap and water to reduce infection risk.',
      'Apply an antiseptic to the affected area.',
      'If the bite is from a venomous animal, seek immediate medical help.',
      'Immobilize the affected area to slow the spread of venom or infection.',
      'Cover the wound with a sterile bandage.',
      'Watch for signs of infection such as redness, swelling, or fever.',
      'Seek medical advice about rabies vaccination or tetanus shots if needed.'
    ]
  },
  {
    id: '9',
    title: 'Eye Injuries',
    description: 'First aid for minor eye injuries',
    steps: [
      'Do not rub or apply pressure to the injured eye.',
      'Rinse the eye gently with clean, lukewarm water or saline solution to remove debris.',
      'If a foreign object is visible, try to remove it carefully with sterile tweezers.',
      'Avoid using any ointments or medications unless prescribed by a doctor.',
      'Cover the eye loosely with a sterile patch or clean cloth to prevent further injury.',
      'Seek immediate medical help for chemical burns, cuts, or severe pain.',
      'Avoid driving or operating machinery until the eye is assessed by a professional.'
    ]
  },
  {
    id: '10',
    title: 'Heat Exhaustion',
    description: 'Steps to help someone suffering from heat exhaustion',
    steps: [
      'Move the person to a cooler, shaded or air-conditioned place immediately.',
      'Have them lie down and elevate their legs slightly to improve circulation.',
      'Offer small sips of cool water if the person is conscious and able to drink.',
      'Loosen or remove tight clothing to help cool the body.',
      'Apply cool, wet cloths or fan the person to reduce body temperature.',
      'Avoid giving very cold water or ice as it may cause stomach cramps.',
      'Seek medical help if symptoms worsen or do not improve within 30 minutes.'
    ]
  }
];
  constructor(
    private route: ActivatedRoute,
    private firstAidService: FirstaidService,
    private http: HttpClient
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
