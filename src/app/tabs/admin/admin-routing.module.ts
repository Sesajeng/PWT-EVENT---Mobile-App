import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminTabsPage } from './admin.page';  // Ensure this is the correct path for AdminTabsPage

const routes: Routes = [
  {
    path: '',
    component: AdminTabsPage,
    children: [
      {
        path: 'user-list',
        loadChildren: () => import('../../pages/user-list/user-list.module').then(m => m.UserListPageModule),  // Replace with actual path to your dashboard page module
      },
      {
        path: 'categories',
        loadChildren: () => import('../../pages/admin/admin.module').then(m => m.AdminPageModule),  // Replace with actual path to your categories page module
      },
      {
        path: 'events',
        loadChildren: () => import('../../pages-event/admin/admin.module').then(m => m.AdminPageModule),  // Replace with actual path to your settings page module
      },
      {
        path: 'transactions',
        loadChildren: () => import('../../transactions/admin/admin.module').then(m => m.AdminPageModule),  // Replace with actual path to your settings page module
      },
      {
        path: 'profil',
        loadChildren: () => import('../../profil/profil.module').then(m => m.ProfilPageModule),  // Replace with actual path to your settings page module
      },
      {
        path: '',
        redirectTo: 'user-list',  
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/admin',  // Redirect to the dashboard by default
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminTabsRoutingModule {}
