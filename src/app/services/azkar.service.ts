import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AzkarService {
  private basUrl='https://ahegazy.github.io/muslimKit/json'

  constructor(private http:HttpClient) { }

  getAzkarSabah():Observable<any>{
    return this.http.get(`${this.basUrl}/azkar_sabah.json`)
  }

  getAzkarMassa():Observable<any>{
    return this.http.get(`${this.basUrl}/azkar_massa.json`)
  }
  getAzkarAfterSalat():Observable<any>{
    return this.http.get(`${this.basUrl}/PostPrayer_azkar.json`)
  }
}
