import { createReducer, on } from "@ngrx/store";
import { addSuccessDoctor, findDoctor, findAllDoctor, findAllPageableDoctor, removeSuccessDoctor, resetDoctor, setErrorsDoctor, setPaginatorDoctor, updateSuccessDoctor} from "./doctors.actions";
import {Doctor} from "../../models/doctor";

const doctors: Doctor[] = [];
const doctor: Doctor = new Doctor();
export const doctorsReducer = createReducer(
  {
    doctors,
    paginator: {},
    doctor,
    errors: {}
  },
  on(resetDoctor, (state) => ({
    doctors: state.doctors,
    paginator: state.paginator,
    doctor: { ...doctor },
    errors: {}
  })),
  on(findAllDoctor, (state, { doctors }) => ({
      doctors: [...doctors],
      paginator: state.paginator,
      doctor: state.doctor,
      errors: state.errors
    }
  )),
  on(findAllPageableDoctor, (state, { doctors, paginator }) => ({
      doctors: [...doctors],
      paginator: {... paginator},
      doctor: state.doctor,
      errors: state.errors
    }
  )),
  on(findDoctor, (state, { id }) => ({
    doctors: state.doctors,
    paginator: state.paginator,
    doctor: state.doctors.find(doctor => doctor.idmedico == id) || new Doctor(),
    errors: state.errors
  })),
  on(setPaginatorDoctor, (state, { paginator }) => ({
    doctors: state.doctors,
    paginator: { ...paginator },
    doctor: state.doctor,
    errors: state.errors
  })),
  on(addSuccessDoctor, (state, { doctorNew }) => ({
    doctors: [...state.doctors, { ...doctorNew }],
    paginator: state.paginator,
    doctor: { ...doctor },
    errors: {}
  })),
  on(updateSuccessDoctor, (state, { doctorUpdated }) => ({
    doctors: state.doctors.map(p => (p.idmedico == doctorUpdated.idmedico) ? { ...doctorUpdated } : p),
    paginator: state.paginator,
    doctor: {... doctor},
    errors: {}
  })),
  on(removeSuccessDoctor, (state, { id }) => ({
    doctors: state.doctors.filter(doctor => doctor.idmedico != id),
    paginator: state.paginator,
    doctor: state.doctor,
    errors: state.errors
  })),
  on(setErrorsDoctor, (state, { doctorForm, errors }) => ({
    doctors: state.doctors,
    paginator: state.paginator,
    doctor: { ...doctorForm },
    errors: {... errors}
  }))
);
