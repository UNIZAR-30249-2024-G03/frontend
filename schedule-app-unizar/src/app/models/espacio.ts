export interface Espacio {
  id: string;
  tamano: number;
  categoriaReserva: string;
  numMaxOcupantes: number;
  planta: number;
  reservable: boolean;
  porcentajeUsoMaximo?: number;
}
