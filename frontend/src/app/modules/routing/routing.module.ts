import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../../components/login/login.component';
import { AdminComponent } from '../../components/login/admin/admin.component';
import { UserClientComponent } from '../../components/user-client/user-client.component';

const routes: Routes = [
  { path: '', component: UserClientComponent },
  { path: 'login', children: [
    { path: '', component: LoginComponent },
    { path: 'admin', component: AdminComponent }
  ] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
