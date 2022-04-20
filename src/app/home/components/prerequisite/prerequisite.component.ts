import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-prerequisite',
  templateUrl: './prerequisite.component.html',
  styleUrls: ['./prerequisite.component.css']
})
export class PrerequisiteComponent implements OnInit {

  @Input()
  description: string | undefined;
  @Input()
  icon: string | undefined;
  @Input()
  last: boolean | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
