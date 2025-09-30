import { Component, HostListener, OnInit } from '@angular/core';
import { QoranService } from '../services/qoran.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-surahs',
  imports: [CommonModule, RouterModule],
  templateUrl: './list-surahs.component.html',
  styleUrls: ['./list-surahs.component.css']
})
export class ListSurahsComponent implements OnInit {
  surahs: any[] = [];
  groupedSurahs: any[][] = [];
  cols: number = 3; // nombre de colonnes par défaut (desktop)
  loading:boolean=true

  constructor(private qoranService: QoranService) {}

  ngOnInit(): void {
    this.updateCols(window.innerWidth);

    this.qoranService.getSurahs().subscribe({
      next: (data) => {
        this.surahs = data.chapters;
        this.groupSurahs();
        this.loading=false
      },
      error: (err) => console.error(err)
    });
  }

  // Écoute le redimensionnement de la fenêtre pour changer le nombre de colonnes
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateCols(event.target.innerWidth);
    this.groupSurahs(); // regrouper à nouveau les colonnes
  }

  // Met à jour le nombre de colonnes selon la largeur
  updateCols(width: number) {
    if (width < 640) this.cols = 1;        // mobile
    else if (width < 1024) this.cols = 2;  // tablette
    else this.cols = 3;                    // desktop
  }

  // Regroupe les sourates en colonnes verticales
  groupSurahs() {
    const rows = Math.ceil(this.surahs.length / this.cols);
    this.groupedSurahs = Array.from({ length: rows }, (_, r) =>
      Array.from({ length: this.cols }, (_, c) => this.surahs[c * rows + r] || null)
    );
  }
}
