import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-prerequisites',
  templateUrl: './prerequisites.component.html',
  styleUrls: ['./prerequisites.component.css']
})
export class PrerequisitesComponent implements OnInit {

  displayGif: boolean | undefined;
  buttonText = 'Show tutorial';

  constructor() {
  }

  ngOnInit(): void {
    this.displayGif = false;
  }

  onButtonClick(): void {
    this.displayGif = !this.displayGif;
    if (this.displayGif) {
      this.buttonText = 'hide';
    } else {
      this.buttonText = 'Show tutorial';
    }
  }

}
