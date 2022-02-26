import { Component, OnInit } from '@angular/core';
import { FEATURES } from './mock-feature';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent implements OnInit {
  features = FEATURES;
  constructor() { }

  ngOnInit(): void {
  }

}
