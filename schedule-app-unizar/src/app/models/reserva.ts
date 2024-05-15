import { Espacio } from './espacio';
import { User } from './user';

export interface Reserva {
  id: string;
  idUsario: string;
  person: User;
  espacio: Espacio;
  infoReserva: InfoReserva;
}

export interface InfoReserva {
  numMaxPersonas: number;
  fechaInicio: string;
  fechaFinal: string;
  descripcion?: string;
  tipoUsoReserva?: string;
}
