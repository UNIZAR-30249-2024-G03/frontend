import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputFormComponent } from './components/input-form/input-form.component';
import { UserInfoComponent } from './components/user-info/user-info.component';

const routes: Routes = [
  {
    path: 'input-form',
    component: InputFormComponent,
  },
  {
    path: 'user-info',
    component: UserInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
