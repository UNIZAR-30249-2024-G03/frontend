export interface ReservationData {
    id: string;
    person: {
      id: number;
      username: string;
      email: string;
      roles: string[];
      departamentoAdscrito: string;
    };
    espacio: {
      id: string;
      tamano: number;
      tipoEspacio: string;
      categoriaReserva: string;
      numMaxOcupantes: number;
      planta: number;
      reservable: boolean;
    };
    infoReserva: {
      numMaxPersonas: number;
      fechaInicio: string;
      fechaFinal: string;
      descripcion: string;
      tipoUsoReserva: string;
    };
  }