import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { EspaciosComponent } from '../espacios/espacios.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [MapComponent, EspaciosComponent],
  imports: [CommonModule, MatTableModule, FormsModule, MatCheckboxModule],
})
export class MapModule {}
