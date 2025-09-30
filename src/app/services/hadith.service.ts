import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HadithService {
   private BASE_URL = 'https://hadithapi.com/api';
    private API_KEY ="$2y$10$JTZWa5WlW5eGEIXWmLIu6Devy2gIXhxmvi0R775lNvdpdSmN9y"

  constructor(private http: HttpClient) { }

  getBooks(): Observable<any> {
  return this.http.get(`${this.BASE_URL}/books?apiKey=${this.API_KEY}`);
}

getChapiters(bookSlug:string):Observable<any>{
  return this.http.get(`${this.BASE_URL}/${bookSlug}/chapters?apiKey=${this.API_KEY}`)
}

getHadiths(bookSlug: string, chapterId: number , page:number):Observable<any> {
  return this.http.get(`${this.BASE_URL}/hadiths?apiKey=${this.API_KEY}&book=${bookSlug}&chapter=${chapterId}&page=${page}`);
   ;
}

}
