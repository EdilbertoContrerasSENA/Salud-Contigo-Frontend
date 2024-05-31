import { createReducer, on } from "@ngrx/store";
import {addSuccessAppointment, findAppointment, findAllAppointment, findAllPageableAppointment, removeSuccessAppointment, resetAppointment, setErrorsAppointment, setPaginatorAppointment, updateSuccessAppointment } from "./appointments.actions";
import {Appointment} from "../../models/appointment";

const appointments: Appointment[] = [];
const appointment: Appointment = new Appointment();
export const appointmentsReducer = createReducer(
  {
    appointments,
    paginator: {},
    appointment,
    errors: {}
  },
  on(resetAppointment, (state) => ({
    appointments: state.appointments,
    paginator: state.paginator,
    appointment: { ...appointment },
    errors: {}
  })),
  on(findAllAppointment, (state, { appointments }) => ({
      appointments: state.appointments,
      paginator: state.paginator,
      appointment: state.appointment,
      errors: state.errors
    }
  )),
  on(findAllPageableAppointment, (state, { appointments, paginator }) => ({
      appointments: [...appointments],
      paginator: {... paginator},
      appointment: state.appointment,
      errors: state.errors
    }
  )),
  on(findAppointment, (state, { id }) => ({
    appointments: state.appointments,
    paginator: state.paginator,
    appointment: state.appointments.find(appointment => appointment.idcita == id) || new Appointment(),
    errors: state.errors
  })),
  on(setPaginatorAppointment, (state, { paginator }) => ({
    appointments: state.appointments,
    paginator: { ...paginator },
    appointment: state.appointment,
    errors: state.errors
  })),
  on(addSuccessAppointment, (state, { appointmentNew }) => ({
    appointments: [...state.appointments, { ...appointmentNew }],
    paginator: state.paginator,
    appointment: { ...appointment },
    errors: {}
  })),
  on(updateSuccessAppointment, (state, { appointmentUpdated }) => ({
    appointments: state.appointments.map(p => (p.idcita == appointmentUpdated.idcita) ? { ...appointmentUpdated } : p),
    paginator: state.paginator,
    appointment: {... appointment},
    errors: {}
  })),
  on(removeSuccessAppointment, (state, { id }) => ({
    appointments: state.appointments.filter(appointment => appointment.idcita != id),
    paginator: state.paginator,
    appointment: state.appointment,
    errors: state.errors
  })),
  on(setErrorsAppointment, (state, { appointmentForm, errors }) => ({
    appointments: state.appointments,
    paginator: state.paginator,
    appointment: { ...appointmentForm },
    errors: {... errors}
  }))
);
