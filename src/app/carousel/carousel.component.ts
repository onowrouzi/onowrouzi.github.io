import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { SlideModel } from '../interfaces/slide-model';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap/carousel/carousel-config';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CarouselComponent implements OnInit {

  @Input() slides: SlideModel[];
  @Input() interval?: number;
  @Input() height: string;

  constructor(config: NgbCarouselConfig) {
    config.interval = this.interval || 5000;
    this.height = this.height || '400px';
  }

  ngOnInit() {
  }

}
