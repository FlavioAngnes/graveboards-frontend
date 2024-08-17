import {Routes} from '@angular/router';
import {LatestRequestsComponent} from './page-components/latest-requests/latest-requests.component';
import {CallbackComponent} from './page-components/callback/callback.component';
import {MyRequestsComponent} from './page-components/my-requests/my-requests.component';
import {ManageRequestsComponent} from './page-components/manage-requests/manage-requests.component';
import {authGuard} from "./guards/auth.guard";
import {adminGuard} from "./guards/admin.guard";

export const routes: Routes = [
    { path: '', component: LatestRequestsComponent },
    { path: 'callback', component: CallbackComponent },
    { path: 'myrequests', component: MyRequestsComponent, canActivate: [authGuard] },
    { path: 'managerequests', component: ManageRequestsComponent, canActivate: [adminGuard] },
];

