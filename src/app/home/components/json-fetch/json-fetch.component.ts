import {Component, OnInit} from '@angular/core';
import {JsonService} from '../../../shared/services/json.service';
import {NotificationService} from '../../../shared/services/notification.service';

@Component({
  selector: 'app-json-fetch',
  templateUrl: './json-fetch.component.html',
  styleUrls: ['./json-fetch.component.css']
})
export class JsonFetchComponent implements OnInit {

  sheetID: string | undefined;
  sheetName: string | undefined;
  loading: boolean = false;
  errorMessage: string | undefined;

  notifyErrorHeadline: string = 'Ooops - could not fetch JSON data';
  notifyErrorMessage: string = 'Please check the pasted URL and name of your sheet. And make sure that you set the visibility to public within Google Sheets.';

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };


  constructor(private jsonDownloadService: JsonService, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.sheetID = '';
    this.sheetName = '';
  }

  public getJSON(url: string, sheetName: string, option: number) {
    this.loading = true;
    this.errorMessage = '';

    const sheetID = this.getSheetID(url);

    this.jsonDownloadService.getSheetAsJSON(sheetID, sheetName)
      .subscribe(
        (response) => {
          if (option === 1) {
            this.openJSONinNewTab(response)
          } else if (option === 2) {
            this.downloadJSONasFile(response, sheetName.concat('.json'))
          }
        },
        (error) => {
          this.errorMessage = error;
          this.loading = false;
          // TODO Mit richtigen Nachrichten befüllen
          this.notificationService.error(this.notifyErrorHeadline, this.notifyErrorMessage, this.options);
          throw error;
        }
      )
  }

  private openJSONinNewTab(data: any) {
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    const blobUrl = window.URL.createObjectURL(blob);
    window.open(blobUrl);
  }

  private downloadJSONasFile(data: any, filename: string) {
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    const blobUrl = window.URL.createObjectURL(blob);

    const tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = blobUrl;
    tempLink.setAttribute('download', filename);
    // Safari thinks _blank anchor are pop ups. We only want to set _blank
    // target if the browser does not support the HTML5 download attribute.
    // This allows you to download files in desktop safari if pop up blocking
    // is enabled.
    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank');
    }
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(blobUrl);
    }, 100);
  }

  getSheetID(url: string): string {
    const prefix = 'https://docs.google.com/spreadsheets/d/';
    const suffix = '/edit'

    // Extract the sheetID which is a string inside the URL
    url = url.replace(prefix, '');
    return url.split(suffix)[0];
  }
}
