import { Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CreateEventsComponent } from './create-events/create-events.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { EventTableComponent } from './event-table/event-table.component';
import { RsoTableComponent } from './rso-table/rso-table.component';
import { CreateUniversityComponent } from './create-university/create-university.component';
import { CreateReviewComponent } from './create-review/create-review.component';
import { CreateRsoComponent } from './create-rso/create-rso.component';
import { CreateLocationComponent } from './create-location/create-location.component';
import { JoinRsoComponent } from './join-rso/join-rso.component';
import { UpdateReviewsComponent } from './update-reviews/update-reviews.component';
import { AuthGuard } from './services/authGaurd.service';

export const routes: Routes = [
    { path: '', component: EventTableComponent , canActivate: [AuthGuard] },
    { path: 'sidebar', component: SidebarComponent, canActivate: [AuthGuard] },
    { path: 'create-event', component: CreateEventsComponent, canActivate: [AuthGuard] },
    { path: 'sign-up', component: SignUpComponent},
    { path: 'sign-in', component: SignInComponent},
    { path: 'event-table', component: EventTableComponent, canActivate: [AuthGuard]},
    { path: 'rso', component: RsoTableComponent, canActivate: [AuthGuard]},
    { path: 'create-university', component: CreateUniversityComponent, canActivate: [AuthGuard]},
    { path: 'create-review', component: CreateReviewComponent, canActivate: [AuthGuard]},
    { path: 'create-rso', component: CreateRsoComponent, canActivate: [AuthGuard]},
    { path: 'account', component: AccountComponent, canActivate: [AuthGuard]},
    { path: 'create-location', component: CreateLocationComponent, canActivate: [AuthGuard]},
    { path: 'join-rso', component: JoinRsoComponent, canActivate: [AuthGuard]},
    { path: 'update-reviews', component: UpdateReviewsComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo: 'sign-in' }
];
