import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AzkarService } from '../services/azkar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-azkar',
  imports: [CommonModule,RouterModule],
  templateUrl: './azkar.component.html',
  styleUrl: './azkar.component.css'
})
export class AzkarComponent {
 type: string | null = null;
 azkars:any[]=[]
  counters: number[] = [];
 title:string=""
 loading:boolean=true

  constructor(private route: ActivatedRoute , private azkarSrvice:AzkarService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.type = params.get('type');
      // alert('Type mis à jour:'+ this.type);

      if(this.type==='sabah'){
        this.fetchAzkarSabah()
      } else if (this.type==='massa'){
        this.fetchAzkarMassa()
      }else if(this.type==='salat'){
        this.fetchAzkarAftreSalat()
      }else{
        return;
      }
      
    });

  }

   decrement(index: number) {
    if (this.counters[index] > 0) {
      this.counters[index]--;
    }
  }

  fetchAzkarSabah(){
    this.azkarSrvice.getAzkarSabah().subscribe({
      next:(res)=>{
        this.azkars=res.content
        this.title=res.title
        this.loading=false
         this.counters = this.azkars.map(z => z.repeat);
       console.log("Counter",this.counters)
      },
      error:(err)=>{
        console.log(err)
        this.loading=false
      }
    })
  }

   fetchAzkarMassa(){
    this.azkarSrvice.getAzkarMassa().subscribe({
      next:(res)=>{
        this.azkars=res.content
        this.title=res.title
        this.loading=false

         this.counters = this.azkars.map(z => z.repeat);
       console.log("Counter",this.counters)
      },
      error:(err)=>{
        console.log(err)
        this.loading=false
      }
    })
  }

   fetchAzkarAftreSalat(){
    this.azkarSrvice.getAzkarAfterSalat().subscribe({
      next:(res)=>{
        this.azkars=res.content
        this.title=res.title
        this.loading=false
         this.counters = this.azkars.map(z => z.repeat);
       console.log("Counter",this.counters)
      },
      error:(err)=>{
        console.log(err)
        this.loading=false
      }
    })
  }












}
