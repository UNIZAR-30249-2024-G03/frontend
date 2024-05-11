import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { EspaciosModule } from '../espacios/espacios.module';
import { OverlayComponent } from './overlay/overlay.component';

@NgModule({
  declarations: [MapComponent, OverlayComponent],
  imports: [CommonModule, EspaciosModule],
})
export class MapModule {}
