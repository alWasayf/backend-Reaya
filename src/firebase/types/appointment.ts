import { Babysitter } from "./babysitter";
import { Individual } from "./individual";

export interface Appointment {
  individual?: Individual | string;
  babysitter?: Babysitter | string;
  status?: string;
  rates?: number;
  isRated?: boolean;
  date?: string;
  numOfChildren?: number;
  id?: string;
  address?: string;
}

export interface AppointmentRequest {
  body: {
    individualId?: string;
    babysitterId?: string;
    status?: string;
    isRated?: boolean;
    date?: string;
    numOfChildren?: number;
    id?: string;
    address?: string;
  };
}
