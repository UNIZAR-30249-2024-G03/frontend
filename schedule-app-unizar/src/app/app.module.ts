import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputFormComponent } from './components/input-form/input-form.component';
import { InteractiveMapComponent } from './components/interactive-map/interactive-map.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { SpaceInfoComponent } from './components/space-info/space-info.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    InputFormComponent,
    InteractiveMapComponent,
    UserInfoComponent,
    SpaceInfoComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
