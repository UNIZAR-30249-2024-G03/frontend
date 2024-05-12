import { Component } from '@angular/core';
import { Map } from 'ol';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'schedule-app-unizar';
  map!: Map;
  geoJsonData: any;
}
