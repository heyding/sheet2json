import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {HomeSelectors} from './store/home.selectors';
import {HomeActions} from './store/home.actions';
import {JsonService} from '../../../shared/services/json.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userInput$: Observable<string> | undefined;
  userInput: string | undefined;
  displayUserInput: boolean = false;

  sheetID: string | undefined;
  sheetName: string | undefined;


  constructor(private store: Store, private jsonDownloadService: JsonService) {
  }

  ngOnInit(): void {
    this.userInput$ = this.store.select(HomeSelectors.selectUserInput);
    // TODO Remove default values
    // this.sheetID = '1k0ETCI_rPqrPHrnlcdgWfU4NU7Pfx4fUuVkhZhZxwfc';
    // this.sheetName = 'family';
    this.sheetID = '';
    this.sheetName = '';
  }

  storeUserInput(userInput: string) {
    this.displayUserInput = true;
    this.store.dispatch(HomeActions.setUserInput({userInput}));
    this.userInput = '';
  }

  resetStore() {
    this.displayUserInput = false;
    this.store.dispatch(HomeActions.setUserInput({userInput: 'Hello world!'}));
    this.userInput = '';
  }

  hideUserInput(): void {
    this.displayUserInput = false;
  }

  previewJSON(sheetID: string, sheetName: string) {
    this.jsonDownloadService.previewJSON(sheetID, sheetName);
  }

  downloadJSON(sheetID: string, sheetName: string) {
    this.jsonDownloadService.downloadJSON(sheetID, sheetName);
  }


}
