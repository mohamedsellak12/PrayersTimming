import { Component, OnInit } from '@angular/core';
import { QoranService } from '../services/qoran.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-surahs',
  imports: [CommonModule ,RouterModule],
  templateUrl: './list-surahs.component.html',
  styleUrl: './list-surahs.component.css'
})
export class ListSurahsComponent implements OnInit {
surahs:any = []

constructor(private qoranService:QoranService){}


ngOnInit(): void {
  this.qoranService.getSurahs().subscribe({
    next: (data) => {
      this.surahs=data.chapters
    },
    error: (err) => {
      console.error(err)
    }
  })
}

}
