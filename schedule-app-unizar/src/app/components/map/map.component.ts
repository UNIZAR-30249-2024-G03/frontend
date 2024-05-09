import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import Overlay from 'ol/Overlay';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  map!: Map;
  adaByronCoordinates: [number, number] = [-0.88845, 41.683213];

  ngOnInit(): void {
    this.initializeMap();
  }

  private initializeMap(): void {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat(this.adaByronCoordinates),
        zoom: 18,
      }),
    });

    // Overlay oluştur
    const overlay = new Overlay({
      element: this.createOverlayElement(),
      position: fromLonLat(this.adaByronCoordinates),
      positioning: 'center-center',
      offset: [0, -40],
    });

    this.map.addOverlay(overlay);
  }

  private createOverlayElement(): HTMLElement {
    const element = document.createElement('div');
    element.className = 'overlay';
    element.innerHTML = '<div class="overlay-content">Ada Byron</div>';
    return element;
  }

  zoomToCampus(): void {
    this.map.getView().animate({
      center: fromLonLat(this.adaByronCoordinates),
      zoom: 18,
      duration: 1000,
    });
  }
}
