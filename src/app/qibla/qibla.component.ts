import { Component, OnDestroy, OnInit } from '@angular/core';
import { QiblaService } from '../services/qibla.service';
import { CommonModule } from '@angular/common';

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

  constructor(private qiblaService: QiblaService) {}

  ngOnInit() {
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
