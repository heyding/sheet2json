import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-prerequisite-list',
  templateUrl: './prerequisite-list.component.html',
  styleUrls: ['./prerequisite-list.component.css']
})
export class PrerequisiteListComponent implements OnInit {

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
