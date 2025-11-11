import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { Routes } from '@angular/router';
import { TimelineComponent } from './features/timeline/timeline.component';
import { ProfileComponent } from './features/profile/profile.component';
import { ChangePasswordComponent } from './features/auth/change-password/change-password.component';
import { DetailsPostComponent } from './features/details-post/details-post.component';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { NotfoundComponent } from './features/notfound/notfound.component';

export const routes: Routes = [
  { path: '', redirectTo: 'timeline', pathMatch: 'full' },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'timeline', component: TimelineComponent, title: 'TimeLine Page' },
      { path: 'profile', component: ProfileComponent, title: 'Profile Page' },
      { path: 'details/:id', component: DetailsPostComponent, title: 'Details Page' },
      { path: 'change', component: ChangePasswordComponent, title: 'Change Password Page' },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, title: 'login page' },
      { path: 'register', component: RegisterComponent, title: 'register page' },
    ],
  },
  { path: '**', component: NotfoundComponent, title: 'NotFound Page' },
];
