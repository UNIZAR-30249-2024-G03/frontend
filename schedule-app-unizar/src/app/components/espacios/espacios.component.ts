import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Espacio } from '../../models/espacio';
import { EspaciosService } from '../../services/espacios.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MakeReservationComponent } from './make-reservation/make-reservation.component';

@Component({
  selector: 'app-espacios',
  templateUrl: './espacios.component.html',
  styleUrls: ['./espacios.component.scss'],
})
export class EspaciosComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'id',
    'tamano',
    'categoriaReserva',
    // 'reservable',
    'horaApertura',
    'horaCierre',
    'porcentajeUsoMaximo',
    'capacidadMaxima',
  ];
  dataSource = new MatTableDataSource<Espacio>();
  filter: any = {};
  selection = new SelectionModel<Espacio>(true, []);
  selectedRows: Espacio[] = [];
  reservationModalVisible = false;

  constructor(
    private espaciosService: EspaciosService,
    public dialog: MatDialog
  ) {}

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

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  openDialog(): void {
    const selectedRows = this.selection.selected.length;

    this.selection.selected.forEach((row) => {
      const dialogRef = this.dialog.open(MakeReservationComponent, {
        width: '500px',
        data: row,
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
      });
    });
  }
}
