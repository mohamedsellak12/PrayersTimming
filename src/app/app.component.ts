import { Component, OnInit } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { PrayCartComponent } from "./pray-cart/pray-cart.component";
import { PrayTimmingService } from './services/pray-timming.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [PrayCartComponent , CommonModule , RouterOutlet ,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit  {

  city: string='';
  country: string='';
  date: string = new Date().toLocaleDateString();
  prayerTimes : any;
  loading :boolean =true
  nextPrayer?:{name: string; time: Date} ;
  countdown:string=''
  isQoranRoute: boolean=false;
  isSurahRoute:boolean=false


  constructor(private prayTimmingService:PrayTimmingService , private router:Router){

  }
   async ngOnInit() {
    this.router.events.subscribe(()=>{
      this.isQoranRoute=this.router.url ==="/chapters"
    })
    this.router.events.subscribe(()=>{
      this.isSurahRoute=this.router.url.includes("/surah")
    })
    try{
      const location=await this.prayTimmingService.getCurrentLocation();
      if(location){
        this.city=location.city;
        this.country=location.country;
        this.loading=false


      }

      this.prayTimmingService.getPrayerTimes(this.city,this.country).subscribe({
        next: (data) => {
          this.prayerTimes=data.data;
          // this.loading=false;
          console.log(data.data);
          this.nextPrayer=this.prayTimmingService.getNextPrayerTimes(this.prayerTimes);
          this.startCountdown();
        },
        error: (err) => {
          console.error(err);
          this.loading=false;
        }
      })
    }catch(err){
      console.error(err);
    }
   
  }
  startCountdown() {
    setInterval(() => {
      const now = new Date();
      if(this.nextPrayer){
        
        const diff = this.nextPrayer.time.getTime() - now.getTime();
        console.log(diff)
        console.log(this.nextPrayer)
  
        if (diff == 0) {
          this.countdown = "Time for " + this.nextPrayer.name + "!";
        }else if(diff<0){
          this.countdown = "Prayer time ended today!";
          this.nextPrayer = undefined;
        }else {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          this.countdown = `-${hours.toString().padStart(2,"0")} 
          : ${minutes.toString().padStart(2,"0")} : 
          ${seconds.toString().padStart(2,"0")}`;
        }
      }
      }, 1000);
    }
  }


