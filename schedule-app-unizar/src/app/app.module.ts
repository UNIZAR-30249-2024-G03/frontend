import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputFormComponent } from './components/input-form/input-form.component';
import { InteractiveMapComponent } from './components/interactive-map/interactive-map.component';
import { SpaceInfoComponent } from './components/space-info/space-info.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { OverlayComponent } from './components/map/overlay/overlay.component';
import { MapModule } from './components/map/map.module';
import { ReservaModule } from './components/reserva/reserva.module';

@NgModule({
  declarations: [
    AppComponent,
    InputFormComponent,
    InteractiveMapComponent,
    SpaceInfoComponent,
    SearchBarComponent,
    HeaderComponent,
    OverlayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MapModule,
    ReservaModule,
  ],
  providers: [
    {
      provide: 'apiUrl',
      useValue: 'http://localhost:4040',
    },
    provideClientHydration(),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
