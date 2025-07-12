import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventListUserPage } from './event-list-user.page';

const routes: Routes = [
  {
    path: '',
    component: EventListUserPage,
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventListUserPageRoutingModule {}
