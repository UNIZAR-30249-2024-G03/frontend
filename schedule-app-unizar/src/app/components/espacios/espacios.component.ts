import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Espacio } from '../../models/espacio';
import { EspaciosService } from '../../services/espacios.service';

@Component({
  selector: 'app-espacios',
  templateUrl: './espacios.component.html',
  styleUrls: ['./espacios.component.scss'],
})
export class EspaciosComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'tamano',
    'categoriaReserva',
    'reservable',
    'horaApertura',
    'horaCierre',
    'porcentajeUsoMaximo',
    'capacidadMaxima',
  ];
  dataSource = new MatTableDataSource<Espacio>();
  filter: any = {};

  constructor(private espaciosService: EspaciosService) {}

  ngOnInit(): void {
    this.loadEspacios();
  }

  loadEspacios(): void {
    this.espaciosService.getEspacios().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  applyFilters(): void {
    this.espaciosService
      .getEspaciosWithFilters(this.filter)
      .subscribe((data) => {
        this.dataSource.data = data;
      });
  }
}
