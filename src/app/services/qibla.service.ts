import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QiblaService {
 private apiUrl = 'https://api.aladhan.com/v1/qibla';
   constructor(private http:HttpClient) { }

    getQibla(lat: number, lon: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${lat}/${lon}`);
  }
}
