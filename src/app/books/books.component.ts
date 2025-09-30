import { Component, OnInit } from '@angular/core';
import { HadithService } from '../services/hadith.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-books',
  imports: [CommonModule, RouterModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {
books: any[] = [];
selectedChapters: any[] = [];
bookSlug:string=""
loading:boolean=true


constructor(private hadithService:HadithService){}
  ngOnInit(): void {
    this.getBooks()
   
  }
  getBooks(){
    this.hadithService.getBooks().subscribe({
      next:(res:any)=> {
          this.books=res.books
          console.log(res)
          this.loading=false
      },error:(err)=>{
        console.log(err)
        this.loading=false
      }
    })
  }

   selectBook(bookSlug: string) {
    // alert('You clicked book id: ' + bookId);
    
    this.hadithService.getChapiters(bookSlug).subscribe({
      next:(res)=>{
        this.selectedChapters=res.chapters
        this.bookSlug=bookSlug
      },
      error:(err)=>{
        console.log(err)
        
      }
    })
    
  }

  closeChaptersPopup() {
  this.selectedChapters = [];
}
// selectChapiter(chId:number){
//   alert("le livre "+this.bookSlug +" et le chapitre "+chId)
// }
  // Traduction du nom du livre
translateBookName(bookName: string): string {
  switch (bookName) {
    case 'Sahih Bukhari': return 'صحيح البخاري';
    case 'Sahih Muslim': return 'صحيح مسلم';
    case "Jami' Al-Tirmidhi": return 'جامع الترمذي';
    case 'Sunan Abu Dawood': return 'سنن أبي داود';
    case 'Sunan Ibn-e-Majah': return 'سنن ابن ماجه';
    case 'Sunan An-Nasa`i': return 'سنن النسائي';
    case 'Mishkat Al-Masabih': return 'مشكات المصابيح';
    case 'Musnad Ahmad': return 'مسند أحمد';
    case 'Al-Silsila Sahiha': return 'السلسلة الصحيحة';
    default: return bookName; // Si non trouvé, on retourne le nom original
  }
}

// Traduction du nom de l'auteur
translateWriterName(writerName: string): string {
  switch (writerName) {
    case 'Imam Bukhari': return 'الإمام البخاري';
    case 'Imam Muslim': return 'الإمام مسلم';
    case 'Abu `Isa Muhammad at-Tirmidhi': return 'أبو عيسى محمد الترمذي';
    case "Imam Abu Dawud Sulayman ibn al-Ash'ath as-Sijistani": return 'الإمام أبو داود سليمان بن الأشعث السجستاني';
    case 'Imam Muhammad bin Yazid Ibn Majah al-Qazvini': return 'الإمام محمد بن يزيد ابن ماجه القزويني';
    case 'Imam Ahmad an-Nasa`i': return 'الإمام أحمد النسائي';
    case 'Imam Khatib at-Tabrizi': return 'الإمام الخطيب الطبرزي';
    case 'Imam Ahmad ibn Hanbal': return 'الإمام أحمد بن حنبل';
    case 'Allama Muhammad Nasir Uddin Al-Bani': return 'العلامة محمد ناصر الدين الألباني';
    default: return writerName;
  }
}


}
