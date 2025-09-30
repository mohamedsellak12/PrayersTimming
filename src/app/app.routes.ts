import { RouterModule, Routes } from '@angular/router';
import { ListSurahsComponent } from './list-surahs/list-surahs.component';
import { SurahComponent } from './surah/surah.component';
import { NgModule } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { BooksComponent } from './books/books.component';
import { HadithsComponent } from './hadiths/hadiths.component';
import { AsmaComponent } from './asma/asma.component';
import { AzkarComponent } from './azkar/azkar.component';

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
    },{
        path:"NamesOfGod",
        component:AsmaComponent,
        title:"Names Of God"
    },{
        path:"azkar/:type",
        component:AzkarComponent,
        title:"Al azkar"
    }
];
