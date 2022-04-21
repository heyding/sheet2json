import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  apiBaseUrl: string = 'https://opensheet.elk.sh/';

  constructor(private http: HttpClient) {
  }

  getSheetAsJSON(sheetID: string, sheetName: string): Observable<any> {
    return this.http.get<any>(this.apiBaseUrl + '/' + sheetID + '/' + sheetName)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
  }
}
