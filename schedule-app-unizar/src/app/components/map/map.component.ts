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
  overlayContainer!: HTMLElement;

  ngOnInit(): void {
    this.initializeMap();
    this.overlayContainer = document.getElementById('overlay-container')!;
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

    const overlay = new Overlay({
      element: this.createOverlayElement(),
      position: fromLonLat(this.adaByronCoordinates),
      positioning: 'center-center',
      offset: [0, -40],
    });

    this.map.addOverlay(overlay);

    this.map.getView().on('change:resolution', () => {
      if (this.map.getView().getZoom()! < 15) {
        this.overlayContainer.classList.add('overlay-hidden');
      } else {
        this.overlayContainer.classList.remove('overlay-hidden');
      }
    });
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
