import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputFormComponent } from './components/input-form/input-form.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ReservaComponent } from './components/reserva/reserva.component';

const routes: Routes = [
  {
    path: 'input-form',
    component: InputFormComponent,
  },
  {
    path: 'user-info',
    component: UserInfoComponent,
    loadChildren: () =>
      import('./components/user-info/user-info.module').then(
        (m) => m.UserInfoModule
      ),
  },
  {
    path: 'reserva',
    component: ReservaComponent,
    loadChildren: () =>
      import('./components/reserva/reserva.module').then(
        (m) => m.ReservaModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
