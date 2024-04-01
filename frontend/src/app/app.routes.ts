import { Routes } from '@angular/router';
import { WelcomePage } from './welcome/feature/welcome/welcome.page';
import { HomePage } from './home/feature/home.page';

export const routes: Routes = [
    {
        path: 'home',
        component: HomePage,
        data: { animation: 'nextPage' }
    },
    {
        path: 'welcome',
        component: WelcomePage,
        data: { animation: 'nextPage' }
    },

];
    
