import { Component, OnInit } from '@angular/core';
import { HadithService } from '../services/hadith.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hadiths',
  imports: [CommonModule, RouterModule],
  templateUrl: './hadiths.component.html',
  styleUrl: './hadiths.component.css'
})
export class HadithsComponent implements OnInit {
  bookSlug!: string;
  chapterId!: number;
   showScrollTop: boolean = false;
   showScrollBottom: boolean = false;
   copiedIndex: number | null = null;
  hadiths: any[] = [];
  currentPage: number = 1;
  lastPage: number = 0;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private hadithService: HadithService,
    private router:Router
  ) {
     this.router.events.subscribe(()=>{
      window.scrollTo({top:0 , behavior:'smooth'})
    })
  }

  ngOnInit(): void {
    // ✅ جلب الـ params من الـ route
    this.route.paramMap.subscribe(params => {
      this.bookSlug = params.get('book') || '';
      this.chapterId = Number(params.get('chapter'));

      if (this.bookSlug && this.chapterId) {
        this.fetchHadiths();
      }
    });


    window.addEventListener('scroll', () => {
    this.showScrollTop = window.scrollY > 200; // devient visible après 200px de scroll
  });

  window.addEventListener('scroll', () => {
  const scrolledFromTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;

  // الزر يبان غير إلا كان المستخدم مازال ماوصلش بزاف لتحت
  this.showScrollBottom = scrolledFromTop < (maxScroll - 200);
});

  }

  fetchHadiths(page: number = 1): void {
    this.loading = true;
    this.hadithService.getHadiths(this.bookSlug, this.chapterId, page).subscribe({
      next: (res: any) => {
        this.hadiths = res.hadiths.data;
        this.currentPage = res.hadiths.current_page;
        this.lastPage = res.hadiths.last_page;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error fetching hadiths', err);
        this.loading = false;
      }
    });
  }

  nextPage(): void {
    if (this.currentPage < this.lastPage) {
      this.fetchHadiths(this.currentPage + 1);
       window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.fetchHadiths(this.currentPage - 1);
       window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
 scrollToBottom() {
  window.scrollTo({ 
    top: document.body.scrollHeight, 
    behavior: 'smooth' 
  });
}

copyHadith(hadith: any, index: number) {
  navigator.clipboard.writeText(hadith.hadithArabic).then(() => {
    this.copiedIndex = index;
    setTimeout(() => this.copiedIndex = null, 1500);
  });
}

shareHadith(hadith: any) {
  const textToShare = `📖 الحديث رقم ${hadith.hadithNumber}\n\n${hadith.hadithArabic}\n\nالحكم: ${this.translateStatus(hadith.status)} | المجلد: ${hadith.volume}`;

  if (navigator.share) {
    navigator.share({
      title: "📖 حديث نبوي",
      text: textToShare
    }).catch(err => console.error("Erreur partage:", err));
  } else {
    // Fallback si navigator.share n'est pas supporté
    navigator.clipboard.writeText(textToShare).then(() => {
      alert("تم النسخ في الحافظة لعدم دعم المشاركة ✅");
    });
  }
}



  translateBookName(bookName: string): string {
  switch (bookName) {
    case 'sahih-bukhari': return 'صحيح البخاري';
    case 'sahih-muslim': return 'صحيح مسلم';
    case "al-tirmidhi": return 'جامع الترمذي';
    case 'abu-dawood': return 'سنن أبي داود';
    case 'ibn-e-majah': return 'سنن ابن ماجه';
    case 'sunan-nasai': return 'سنن النسائي';
    case 'mishkat': return 'مشكات المصابيح';
    case 'musnad-ahmad': return 'مسند أحمد';
    case 'al-silsila-sahiha': return 'السلسلة الصحيحة';
    default: return bookName; // Si non trouvé, on retourne le nom original
  }
}

translateStatus(status: string): string {
  switch(status) {
    case 'sahih':
    case 'Sahih':  
      return 'صحيح';
    case 'hasan':
    case 'Hasan':
      return 'حسن';
    case 'Da`eef':
    case 'Da`if':
    case 'Weak':  // تحسبها لو جات بصيغة إنجليزية عامة
      return 'ضعيف';
    default:
      return status;  // إذا جات قيمة غير متوقعة، ترجعها كما هي
  }
}


}
