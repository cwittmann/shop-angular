import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  transition,
  animate,
  style,
} from '@angular/animations';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  animations: [
    trigger('scroll', [
      state('in', style({ opacity: 1.0, transform: 'translate(0,0)' })),
      transition(':enter', [
        style({ opacity: 0.5, transform: 'translate(0,-100px)' }),
        animate('400ms cubic-bezier(0.680, -0.550, 0.265, 1.550)'),
      ]),
      transition(':leave', animate(600, style({ opacity: 0 }))),
    ]),
  ],
})
export class TitleComponent implements OnInit {
  @Input()
  title: string;

  constructor() {}

  ngOnInit(): void {}
}
