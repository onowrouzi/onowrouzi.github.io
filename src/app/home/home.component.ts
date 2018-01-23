import { Component, OnInit } from '@angular/core';
import { SlideModel } from '../interfaces/slide-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  slides: SlideModel[];

  constructor() {

    this.slides = [
      {
        src: '../assets/images/wave.jpg',
        caption: {
          label: 'Hello There!',
          text: 'Welcome to my page!'
        }
      },
      {
        src: '../assets/images/sleepy_dogs.jpg',
        caption: {
          label: 'Look... puppies!',
          text: 'My dogs get real sleepy...'
        }
      },
      {
        src: '../assets/images/wedding_toast.jpg',
        caption: {
          label: 'My other half',
          text: 'I have a very supportive wife whom I love immenely'
        }
      }
    ];
  }

  ngOnInit() {
  }

}
