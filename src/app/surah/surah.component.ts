import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { QoranService } from '../services/qoran.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-surah',
  imports: [RouterModule ,CommonModule],
  templateUrl: './surah.component.html',
  styleUrl: './surah.component.css'
})
export class SurahComponent implements OnInit {
  complateSurah: string=''
  id:any

  constructor(private route:ActivatedRoute , private qoranService:QoranService){}
ngOnInit(): void {
 this.route.paramMap.subscribe(
    params=>{
      this.id=Number(params.get('id'))
      this.qoranService.getSurah(this.id).subscribe({
        next: (surah) => {
          this.complateSurah =surah.verses
          .map((verse: any) => `${verse.text_uthmani} (${verse.verse_key.split(':')[1]})`)
          .join(' ');
        },
        error: (error) => {
          console.error('Error fetching surah', error);
        }
      })
    }
  );
}

}
