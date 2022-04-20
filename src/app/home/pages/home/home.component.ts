import {Component, OnInit} from '@angular/core';
import {JsonService} from '../../../shared/services/json.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sheetID: string | undefined;
  sheetName: string | undefined;

  constructor(private jsonDownloadService: JsonService) {
  }

  ngOnInit(): void {
    this.sheetID = '';
    this.sheetName = '';
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
    return url.split(suffix)[0];
  }
}
