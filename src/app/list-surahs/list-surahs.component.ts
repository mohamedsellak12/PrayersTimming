import { Component, HostListener, OnInit } from '@angular/core';
import { QoranService } from '../services/qoran.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-surahs',
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './list-surahs.component.html',
  styleUrls: ['./list-surahs.component.css']
})
export class ListSurahsComponent implements OnInit {
  surahs: any[] = [];
  filteredSurahs: any[] = [];
  groupedSurahs: any[][] = [];
  cols: number = 3; // nombre de colonnes (desktop par défaut)
  loading: boolean = true;
  query: string = '';

  constructor(private qoranService: QoranService) {}

  ngOnInit(): void {
    this.updateCols(window.innerWidth);

    this.qoranService.getSurahs().subscribe({
      next: (data) => {
        this.surahs = data.chapters;
        this.filteredSurahs = [...this.surahs]; // copie initiale
        this.groupSurahs();
        this.loading = false;
      },
      error: (err) => console.error(err)
    });
  }

  // écoute le redimensionnement
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateCols(event.target.innerWidth);
    this.groupSurahs();
  }

  // change le nombre de colonnes selon la largeur
  updateCols(width: number) {
    if (width < 640) this.cols = 1;        // mobile
    else if (width < 1024) this.cols = 2;  // tablette
    else this.cols = 3;                    // desktop
  }

  // regroupement en colonnes
  groupSurahs() {
    const rows = Math.ceil(this.filteredSurahs.length / this.cols);
    this.groupedSurahs = Array.from({ length: rows }, (_, r) =>
      Array.from({ length: this.cols }, (_, c) => this.filteredSurahs[c * rows + r] || null)
    );
  }

  // filtre par nom arabe ou traduit
  filterSurahs() {
    const q = this.query.toLowerCase().trim();

    if (!q) {
      this.filteredSurahs = [...this.surahs]; // si vide → toutes les surahs
    } else {
      this.filteredSurahs = this.surahs.filter((s) =>
        s.name_arabic?.toLowerCase().includes(q) ||
        s.translated_name?.name?.toLowerCase().includes(q)
      );
    }

    this.groupSurahs();
  }

  // reset recherche
  clearSearch() {
    this.query = '';
    this.filteredSurahs = [...this.surahs];
    this.groupSurahs();
  }
}

