import { Routes } from '@angular/router';
import { LatestRequestsComponent } from './beatmaps/components/latest-requests/latest-requests.component';
import { CallbackComponent } from './beatmaps/components/callback/callback.component';

export const routes: Routes = [
    { path: '', component: LatestRequestsComponent },
    { path: 'callback', component: CallbackComponent },
];
