import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  apiBaseUrl = 'https://opensheet.elk.sh/';

  constructor(private http: HttpClient) {
  }

  public previewJSON(sheetID: string, sheetName: string) {
    this.http.get<Blob>(this.apiBaseUrl.concat('/').concat(sheetID).concat('/').concat(sheetName)).subscribe(data => this.openJSONinNewTab(data));
  }

  public downloadJSON(sheetID: string, sheetName: string) {
    this.http.get<Blob>(this.apiBaseUrl.concat('/').concat(sheetID).concat('/').concat(sheetName)).subscribe(data => this.downloadJSONasFile(data, sheetName.concat('.json')));
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
}
