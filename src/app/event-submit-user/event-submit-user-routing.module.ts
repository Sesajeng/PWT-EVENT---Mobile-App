import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventSubmitUserPage } from './event-submit-user.page';

const routes: Routes = [
  {
    path: '',
    component: EventSubmitUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventSubmitUserPageRoutingModule {}
