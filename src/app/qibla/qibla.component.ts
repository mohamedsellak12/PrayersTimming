import { Component, OnDestroy, OnInit } from '@angular/core';
import { QiblaService } from '../services/qibla.service';
import { CommonModule } from '@angular/common';
import { PrayTimmingService } from '../services/pray-timming.service';

@Component({
  selector: 'app-qibla',
  imports: [CommonModule],
  templateUrl: './qibla.component.html',
  styleUrl: './qibla.component.css'
})
export class QiblaComponent implements OnInit ,OnDestroy {
 qiblaDirection: number | null = null; // From API
  userHeading: number = 0;              // From device
  error: string | null = null;
  loading = true;

  city:string=''
  country:string=''

  constructor(private qiblaService: QiblaService ,private prayTimmingService:PrayTimmingService) {}

  async ngOnInit() {
try{
   const location=await this.prayTimmingService.getCurrentLocation();
      if(location){
        this.city=location.city;
        this.country=location.country;
        this.loading=false

      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
      
            this.qiblaService.getQibla(lat, lon).subscribe({
              next: (res: any) => {
                this.qiblaDirection = res.data.direction;
                this.loading = false;
                this.listenToCompass();
              },
              error: () => {
                this.error = '⚠️ Unable to fetch Qibla direction.';
                this.loading = false;
              }
            });
          },
          () => {
            this.error = '⚠️ Location access denied.';
            this.loading = false;
          }
        );
      } else {
        this.error = '⚠️ Geolocation not supported.';
        this.loading = false;
      }
}catch(err){
  console.log(err)
}

  }

  listenToCompass() {
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', (event: DeviceOrientationEvent) => {
        if (event.alpha !== null) {
          // alpha = rotation around Z axis (compass heading)
          this.userHeading = 360 - event.alpha; // invert to match compass
        }
      });
    } else {
      this.error = '⚠️ Compass not supported on this device.';
    }
  }

  ngOnDestroy() {
    window.removeEventListener('deviceorientation', () => {});
  }

  // Final angle (where the arrow should point)
  get finalAngle(): number {
    if (!this.qiblaDirection) return 0;
    return this.qiblaDirection - this.userHeading;
  }

}
