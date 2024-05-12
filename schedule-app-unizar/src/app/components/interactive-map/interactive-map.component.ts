import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Geolocation from 'ol/Geolocation';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';

@Component({
  selector: 'app-interactive-map',
  templateUrl: './interactive-map.component.html',
  styleUrls: ['./interactive-map.component.scss'],
})
export class InteractiveMapComponent implements OnInit, OnDestroy {
  @ViewChild('mapElement') mapElement!: ElementRef;
  @ViewChild('mapElementRef') mapElementRef!: ElementRef;

  map!: Map;
  geolocation!: Geolocation;
  marker!: Feature;

  ngOnInit() {
    // Do something else that doesn't require the mapElement
  }

  ngAfterViewInit() {
    this.mapElement = this.mapElementRef; // Assign the reference to mapElement
    this.initMap();
    this.initGeolocation();
  }

  ngOnDestroy() {
    if (this.geolocation) {
      this.geolocation.dispose();
    }
  }

  private initMap() {
    this.map = new Map({
      target: this.mapElement.nativeElement,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 5,
      }),
    });
  }

  private initGeolocation() {
    this.geolocation = new Geolocation({
      tracking: true,
      projection: this.map.getView().getProjection(),
    });

    this.marker = new Feature();
    this.marker.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({ color: 'blue' }),
          stroke: new Stroke({
            color: 'white',
            width: 2,
          }),
        }),
      })
    );

    const markerSource = new VectorSource({
      features: [this.marker],
    });

    const markerLayer = new VectorLayer({
      source: markerSource,
    });

    this.map.addLayer(markerLayer);

    this.geolocation.on('change:position', () => {
      const coordinates = this.geolocation.getPosition();
      if (coordinates) {
        const lonLat = fromLonLat(coordinates);
        this.marker.setGeometry(new Point(lonLat));
        this.map.getView().setCenter(lonLat);
        this.map.getView().setZoom(15);
      } else {
        // Set default location if geolocation fails
        const defaultLonLat = [-0.861222, 41.644444]; // Zaragoza, Spain coordinates
        this.marker.setGeometry(new Point(defaultLonLat));
        this.map.getView().setCenter(defaultLonLat);
        this.map.getView().setZoom(15);
      }
    });
  }
}
