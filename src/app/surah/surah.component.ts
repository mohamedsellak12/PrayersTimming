import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  surahInfo: any;
  nextChapiter: string |null=null
  prevChapiter: string |null=null
  audioUrl: string='';
  showScrollTop: boolean = false;
  reciters: { id: number; name: string }[] = [
    { id: 7, name: " الشيخ مشاري العفاسي " },
    { id: 24, name: "الشيخ عبد الله علي جابر " },
    { id: 19, name: " الشيخ علي العجمي" },
    { id: 14, name: "الشيخ فارس عباد" },
    { id: 13, name: "الشيخ سعد الغامدي" },
    { id: 10, name: "الشيخ سعود الشريم" },
    { id: 9, name: "الشيخ صديق المنشاوي" },
    { id: 3, name: "الشيخ عبد الرحمان السديس" },
    { id: 6, name: "الشيخ خليل الحصري" },
    { id: 1, name: " الشيخ عبد الباسط عبد الصمد" }
];



  constructor(private route:ActivatedRoute , private qoranService:QoranService , private router:Router){
    this.router.events.subscribe(()=>{
      window.scrollTo({top:0 , behavior:'smooth'})
    })
  }
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
      this.qoranService.getSurahInfo(this.id).subscribe({
        next: (data) => {
          this.surahInfo = data.chapter;
          this.qoranService.getSurahInfo(this.id+1).subscribe({
            next: (data) => {
              this.nextChapiter = data.chapter.name_arabic;
            },
            error: (error) => {
              console.error('Error fetching next surah info', error);
            }
          });
          this.qoranService.getSurahInfo(this.id-1).subscribe({
            next: (data) => {
              this.prevChapiter = data.chapter.name_arabic;
            },
            error: (error) => {
              console.error('Error fetching previous surah info', error);
            }
          })
         
        },
        error: (error) => {
          console.error('Error fetching surah info', error);
        }
      })
     
    }
  );

  window.addEventListener('scroll', () => {
    this.showScrollTop = window.scrollY > 200; // devient visible après 200px de scroll
  });
}


scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  element?.scrollIntoView({ behavior: 'smooth' });
}
playAudio(id:any){
  this.qoranService.getAudioOfSurah(id,this.id).subscribe({
    next: (audio) => {
      if(audio.audio_file.audio_url){
        this.audioUrl = audio.audio_file.audio_url;
      }else{
        this.audioUrl = '';
      }
    },
    error: (error) => {
      console.error('Error fetching audio', error);
    }
  })
  

}
navigateAndReload(nextId: number) { 
    setTimeout(() => {
      window.location.href = `/surah/${nextId}`; // Rechargement complet
    }, 500); // Délai pour permettre le scroll
}




}
