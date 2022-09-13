import { Injectable } from '@angular/core';
import { Language } from '../interfaces/language.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as uuid from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languagesUrl = 'api/languages/';
  constructor(private http: HttpClient) { }

  getLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>(this.languagesUrl).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  createLanguage(language: Language): Observable<Language> {
    language.id = uuid.v4();;
    return this.http.post<Language>(this.languagesUrl, language).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    )
  }

  editLanguage(language: Language): Observable<any> {
    return this.http.put(this.languagesUrl + language.id, language);
  }

  deleteLanguage(id: string): Observable<any> {
    return this.http.delete(this.languagesUrl + id);
  }
}