import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputFormComponent } from './components/input-form/input-form.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { MapComponent } from './components/map/map.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: InputFormComponent,
  },
  {
    path: 'user-info',
    component: UserInfoComponent,
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./components/user-info/user-info.module').then(
        (m) => m.UserInfoModule
      ),
  },
  {
    path: 'reserva',
    component: ReservaComponent,
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./components/reserva/reserva.module').then(
        (m) => m.ReservaModule
      ),
  },
  {
    path: 'map',
    component: MapComponent,
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./components/map/map.module').then((m) => m.MapModule),
  },
  {
    path: 'espacios',
    loadChildren: () =>
      import('./components/espacios/espacios.module').then(
        (m) => m.EspaciosModule
      ),
  },
  {
    path: 'reservation',
    loadChildren: () =>
      import(
        './components/espacios/make-reservation/make-reservation.module'
      ).then((m) => m.MakeReservationModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
