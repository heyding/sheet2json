import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-api-reference',
  templateUrl: './api-reference.component.html',
  styleUrls: ['./api-reference.component.css']
})
export class ApiReferenceComponent implements OnInit {

  displayBanner: boolean = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  dismissBanner(): void {
    this.displayBanner = false;
  }

}
