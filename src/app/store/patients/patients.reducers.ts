import { createReducer, on } from "@ngrx/store";
import { addSuccessPatient, findPatient, findAllPatient, findAllPageablePatient, removeSuccessPatient, resetPatient, setErrorsPatient, setPaginatorPatient, updateSuccessPatient } from "./patients.actions";
import {Patient} from "../../models/patient";

const patients: Patient[] = [];
const patient: Patient = new Patient();
export const patientsReducer = createReducer(
  {
    patients,
    paginator: {},
    patient,
    errors: {}
  },
  on(resetPatient, (state) => ({
    patients: state.patients,
    paginator: state.paginator,
    patient: { ...patient },
    errors: {}
  })),
  on(findAllPatient, (state, { patients }) => ({
      patients: state.patients,
      paginator: state.paginator,
      patient: state.patient,
      errors: state.errors
    }
  )),
  on(findAllPageablePatient, (state, { patients, paginator }) => ({
      patients: [...patients],
      paginator: {... paginator},
      patient: state.patient,
      errors: state.errors
    }
  )),
  on(findPatient, (state, { id }) => ({
    patients: state.patients,
    paginator: state.paginator,
    patient: state.patients.find(patient => patient.idpaciente == id) || new Patient(),
    errors: state.errors
  })),
  on(setPaginatorPatient, (state, { paginator }) => ({
    patients: state.patients,
    paginator: { ...paginator },
    patient: state.patient,
    errors: state.errors
  })),
  on(addSuccessPatient, (state, { patientNew }) => ({
    patients: [...state.patients, { ...patientNew }],
    paginator: state.paginator,
    patient: { ...patient },
    errors: {}
  })),
  on(updateSuccessPatient, (state, { patientUpdated }) => ({
    patients: state.patients.map(p => (p.idpaciente == patientUpdated.idpaciente) ? { ...patientUpdated } : p),
    paginator: state.paginator,
    patient: {... patient},
    errors: {}
  })),
  on(removeSuccessPatient, (state, { id }) => ({
    patients: state.patients.filter(patient => patient.idpaciente != id),
    paginator: state.paginator,
    patient: state.patient,
    errors: state.errors
  })),
  on(setErrorsPatient, (state, { patientForm, errors }) => ({
    patients: state.patients,
    paginator: state.paginator,
    patient: { ...patientForm },
    errors: {... errors}
  }))
);
