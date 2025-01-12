import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pray-cart',
  imports: [],
  templateUrl: './pray-cart.component.html',
  styleUrl: './pray-cart.component.css'
})
export class PrayCartComponent {
  @Input() prayName: string=''
  @Input() prayNameAr: string=''
  @Input() prayTime: any
}
