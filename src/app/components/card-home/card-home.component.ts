import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-home',
  templateUrl: './card-home.component.html',
  styleUrls: ['./card-home.component.css'],
})
export class CardHomeComponent {
  @Input() data: any;
}
