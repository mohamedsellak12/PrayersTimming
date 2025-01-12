import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QoranService {
  urlapi="https://api.quran.com/api/v4"

  constructor(private http:HttpClient) { }

  getSurahs():Observable<any> {
    return this.http.get(`${this.urlapi}/chapters`);
  }
  getSurah(id:any):Observable<any> {
    return this.http.get(`${this.urlapi}/quran/verses/uthmani?chapter_number=${id}`);
  }
}
