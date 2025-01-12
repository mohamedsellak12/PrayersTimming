import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrayTimmingService {
  private apiUrl='https://api.aladhan.com/v1/timingsByCity/today'
  constructor(private http:HttpClient) { }

  async getCurrentLocation():Promise<{city: string; country: string }>{
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            console.log(latitude + ' ' + longitude)
            const response = await firstValueFrom(
              this.http.get<any>(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=26d20e314f7b416c87c1190970e988c2`)
            );
            const city = response.results[0].components.city;
            const country = response.results[0].components.country;
            resolve({ city, country });
          } catch (error) {
            reject('Erreur lors de la conversion des coordonnées en ville.');
          }
        },
        (error) => reject('Erreur de géolocalisation : ' + error.message)
      );
    });
  }


  getPrayerTimes( city: string,country: string){
    return this.http.get<any>(`${this.apiUrl}?city=${city}&country=${country}`);
  }
  getNextPrayerTimes(prayerTimes:any):{name: string; time: Date}|undefined {
    const currentTime = new Date();
    const prayers = Object.entries(prayerTimes.timings)
    .map(([prayer, time]) => {
        if (["Fajr","Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"].includes(prayer) && typeof time === 'string') {
            const [hours, minutes] = time.split(':').map(Number);
            const prayerDate = new Date();
            prayerDate.setHours(hours, minutes, 0);
            return { name: prayer, time: prayerDate };
        }
        return undefined; // Explicitly returning undefined for invalid cases
    })
    .filter((p): p is { name: string; time: Date } => !!p);  // Remove any undefined entries


    const nextPrayer = prayers.find(p => p && p.time && p.time > currentTime);
    // return nextPrayer ?? prayers[0];
    if(nextPrayer){
      return nextPrayer;
    }else{
      const firstPrayerNextDay = { ...prayers[0] };
      if (firstPrayerNextDay && firstPrayerNextDay.name && firstPrayerNextDay.time) {
        firstPrayerNextDay.time.setDate(firstPrayerNextDay.time.getDate() + 1);
        return firstPrayerNextDay;
    } else {
        throw new Error("Aucune prière valide trouvée pour le jour suivant.");
    }
    }




  }
}
