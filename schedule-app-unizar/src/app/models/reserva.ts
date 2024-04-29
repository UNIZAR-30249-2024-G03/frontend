import { Espacio } from './espacio';
import { User } from './user';

export interface Reserva {
  id: string;
  person: User; // The type of person involved in the reservation
  espacio: Espacio; // The type of space involved in the reservation
  infoReserva: InfoReserva;
}

export interface InfoReserva {
  numMaxPersonas: number;
  fechaInicio: string; // Start date and time of the reservation in ISO 8601 format
  fechaFinal: string; // End date and time of the reservation in ISO 8601 format
  descripcion?: string; // Optional description of the reservation
}
