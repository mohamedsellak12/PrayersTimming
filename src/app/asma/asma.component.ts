import { Component, OnInit } from '@angular/core';
import { PrayTimmingService } from '../services/pray-timming.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-asma',
  imports: [RouterModule ,CommonModule ,FormsModule],
  templateUrl: './asma.component.html',
  styleUrl: './asma.component.css'
})
export class AsmaComponent implements OnInit {
  names: any[] = [];
  filtered: any[] = [];
  query: string = '';
  selected: any = null;
  loading = false;

  constructor(private prayTimmingService: PrayTimmingService) {}

  ngOnInit(): void {
    this.loading = true;
    this.prayTimmingService.getAllGodNames().subscribe({
      next: (res) => {
        console.log(res)
        this.names = Array.isArray(res?.data) ? res.data : [];
        this.filtered = [...this.names];
        this.loading = false;
      },
      error: (err) => { console.error(err); this.loading = false; }
    });
  }

  applyFilter() {
    const q = (this.query || '').trim().toLowerCase();
    if (!q) { this.filtered = [...this.names]; return; }
    this.filtered = this.names.filter(n =>
      (n.name || '').toLowerCase().includes(q) ||
      (n.transliteration || '').toLowerCase().includes(q) ||
      (n.en?.meaning || '').toLowerCase().includes(q) ||
      ('' + n.number).includes(q)
    );
  }

  clearFilter() { this.query = ''; this.applyFilter(); }

  openDetail(item: any) { this.selected = item; }
  closeDetail() { this.selected = null; }

  copyName(item: any) {
    navigator.clipboard?.writeText(`${item.name} — ${item.transliteration} — ${item.en?.meaning || ''}`);
  }

  shareName(item: any) {
    if (navigator.share) {
      navigator.share({ title: item.name, text: `${item.name} — ${item.en?.meaning || ''}` }).catch(()=>{});
    } else {
      this.copyName(item);
      alert('تم نسخ الاسم إلى الحافظة (للمشاركة انسخه والصقه).');
    }
  }
}

