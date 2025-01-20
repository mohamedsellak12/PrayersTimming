import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QoranService } from '../services/qoran.service';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchQuery:string=''
  results:any[] = [];
  surahName:string=''
  constructor(private quranService: QoranService){}
  performSearch(){
    this.quranService.search(this.searchQuery).subscribe({
      next: (data) => {
        this.results=data.search.results
        this.searchQuery=''
        this.surahName=data.search.results.map((v:any)=>
        {
           this.getSurahName(v.verse_key.split(':')[0])
        })
      },
      error: (err) => {
        console.error(err)
      }
    })
  }
  getSurahName(id: any){
    this.quranService.getSurahInfo(id).subscribe({
      next: (data) => {
        return data.chapter.name_arabic;
      },
      error: (error) => {
        console.error('Error fetching surah info', error);
      }
    })
    return ''

  }

}
