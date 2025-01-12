import { Routes } from '@angular/router';
import { ListSurahsComponent } from './list-surahs/list-surahs.component';
import { SurahComponent } from './surah/surah.component';

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
    }
];
