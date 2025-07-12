import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Default route (redirect to login)
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  //Register route
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule),
  },

  // Login route
  { 
    path: 'login', 
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) 
  },

  // Admin route
  { 
    path: 'admin', 
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminPageModule) 
  },

  // User route
  { 
    path: 'user', 
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserPageModule) 
  },
  
  {
    path: 'admin-tabs',
    loadChildren: () => import('./tabs/admin/admin.module').then( m => m.AdminTabsModule)
  },
  {
    path: 'user-tabs',
    loadChildren: () => import('./tabs/user/user.module').then( m => m.UserTabsModule)
  },
  {
    path: 'admin-event',
    loadChildren: () => import('./pages-event/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'user-event',
    loadChildren: () => import('./pages-event/user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'user-list',
    loadChildren: () => import('./pages/user-list/user-list.module').then( m => m.UserListPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./transactions/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./transactions/user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'event-list-user',
    loadChildren: () => import('./event-list-user/event-list-user.module').then( m => m.EventListUserPageModule)
  },
  {
    path: 'profil',
    loadChildren: () => import('./profil/profil.module').then( m => m.ProfilPageModule)
  },
  {
    path: 'ticket-detail',
    loadChildren: () => import('./ticket-detail/ticket-detail.module').then( m => m.TicketDetailPageModule)
  },
  {
    path: 'event-submit-user',
    loadChildren: () => import('./event-submit-user/event-submit-user.module').then( m => m.EventSubmitUserPageModule)
  },
  {
    path: 'transactions/user',
    loadChildren: () => import('./transactions/user/user.module').then(m => m.UserPageModule),
  }
  
  
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
