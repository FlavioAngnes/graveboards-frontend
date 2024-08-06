import { Routes } from '@angular/router';
import { LatestRequestsComponent } from './beatmaps/components/latest-requests/latest-requests.component';
import { CallbackComponent } from './beatmaps/components/callback/callback.component';
import { MyRequestsComponent } from './beatmaps/components/my-requests/my-requests.component';
import {ManageRequestsComponent} from './beatmaps/components/manage-requests/manage-requests.component';
import {authGuard} from "./beatmaps/auth.guard";
import {adminGuard} from "./beatmaps/admin.guard";

export const routes: Routes = [
    { path: '', component: LatestRequestsComponent },
    { path: 'callback', component: CallbackComponent },
    { path: 'myrequests', component: MyRequestsComponent, canActivate: [authGuard] },
    { path: 'managerequests', component: ManageRequestsComponent, canActivate: [adminGuard] },
];

