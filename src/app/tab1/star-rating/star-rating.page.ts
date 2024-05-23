import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.page.html',
  styleUrls: ['./star-rating.page.scss'],
})
export class StarRatingPage {

  @Input() rate: number |any;
  @Input() max: number |any;
  @Input() readOnly: boolean |any;

  getFilledStars(): any[] {
    return new Array(this.rate);
  }

  getEmptyStars(): any[] {
    return new Array(this.max - this.rate);
  }

}
