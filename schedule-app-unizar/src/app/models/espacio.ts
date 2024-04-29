export interface Espacio {
  id: string;
  tamano: number;
  tipoEspacio: string;
  categoriaReserva: string;
  numMaxOcupantes: number;
  planta: number;
  reservable: boolean;
  porcentajeUsoMaximo?: number; // Optional maximum usage percentage of the space
}
