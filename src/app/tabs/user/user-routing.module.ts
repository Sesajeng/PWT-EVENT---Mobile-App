import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserTabsPage } from './user.page';  // Ensure this is the correct path for AdminTabsPage

const routes: Routes = [
  {
    path: '',
    component: UserTabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../../pages/user/user.module').then(m => m.UserPageModule),  // Replace with actual path to your dashboard page module
      },
      {
        path: 'transactions',
        loadChildren: () => import('../../transactions/user/user.module').then(m => m.UserPageModule),  // Replace with actual path to your settings page module
      },
      {
        path: 'profil',
        loadChildren: () => import('../../profil/profil.module').then(m => m.ProfilPageModule),  // Replace with actual path to your settings page module
      },
      {
        path: '',
        redirectTo: 'dashboard',  // Default route if none is selected
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/user',  // Redirect to the dashboard by default
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserTabsRoutingModule {}
