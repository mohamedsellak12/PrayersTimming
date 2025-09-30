import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  
})
export class NavbarComponent implements OnInit {
 
 isOpen: boolean = false;
 darkMode = false;
 dropdownOpen :boolean= false;
 dropdownMobile:boolean=false


toggleDarkMode() {
  this.darkMode = !this.darkMode;
  const html = document.documentElement;
  if (this.darkMode) {
    html.classList.add('dark');
    localStorage.setItem("dark",'true')
  } else {
    localStorage.setItem("dark",'false')
    html.classList.remove('dark');

  }
}

@HostListener('document:click', ['$event'])
onDocumentClick(event: Event) {
  const target = event.target as HTMLElement;
  if (!target.closest('.dropdown-wrapper')) {
    this.dropdownOpen = false;
  }
}

 ngOnInit(): void {
     const savedMode = localStorage.getItem('dark');
  if (savedMode === 'true') {
    this.darkMode = true;
    document.documentElement.classList.add('dark');
  } else {
    this.darkMode = false;
    document.documentElement.classList.remove('dark');
  }
  }

}
