import { Routes } from '@angular/router';
import { LatestRequestsComponent } from './beatmaps/components/latest-requests/latest-requests.component';
import { CallbackComponent } from './beatmaps/components/callback/callback.component';
import { MyRequestsComponent } from './beatmaps/components/my-requests/my-requests.component';

export const routes: Routes = [
    { path: '', component: LatestRequestsComponent },
    { path: 'callback', component: CallbackComponent },
    { path: 'myrequests', component: MyRequestsComponent },

];

