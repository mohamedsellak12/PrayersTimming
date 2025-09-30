import { RouterModule, Routes } from '@angular/router';
import { ListSurahsComponent } from './list-surahs/list-surahs.component';
import { SurahComponent } from './surah/surah.component';
import { NgModule } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { BooksComponent } from './books/books.component';
import { HadithsComponent } from './hadiths/hadiths.component';

export const routes: Routes = [
    {
        path:"chapters",
        component:ListSurahsComponent,
         title:"Chapters"
    },
    {
        path:"surah/:id",
        component:SurahComponent,
        title:"Surah"
    },{
        path:"search",
        component:SearchComponent,
        title:"Search"
    },{
        path:"Sunah-books",
        component:BooksComponent,
        title:"Books of Sunah"
    },{
        path:"hadiths/:book/:chapter",
        component:HadithsComponent,
        title:"Hadiths"
    }
];
