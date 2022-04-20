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

  previewJSON(url: string, sheetName: string) {
    const sheetID = this.getSheetID(url);
    this.jsonDownloadService.previewJSON(sheetID, sheetName);
  }

  downloadJSON(url: string, sheetName: string) {
    const sheetID = this.getSheetID(url);
    this.jsonDownloadService.downloadJSON(sheetID, sheetName);
  }

  getSheetID(url: string): string {
    const prefix = 'https://docs.google.com/spreadsheets/d/';
    const suffix = '/edit'

    // Extract the sheetID which is a string inside the URL
    url = url.replace(prefix, '');
    const sheetID = url.split(suffix)[0];
    return sheetID;
  }


}
