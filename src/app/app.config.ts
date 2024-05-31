import { ApplicationConfig, isDevMode } from '@angular/core';

import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { tokenInterceptor } from "./interceptors/token.interceptor";
import { patientsReducer } from './store/patients/patients.reducers';
import { doctorsReducer } from './store/doctors/doctors.reducers';
import {appointmentsReducer} from "./store/appointments/appointments.reducers";
import {examsReducer} from "./store/exams/exams.reducers";
import {recordsReducer} from "./store/records/records.reducers";
import {auditoriasReducer} from "./store/auditorias/auditorias.reducers";
import { authReducer } from "./store/auth/auth.reducers";
import { PatientsEffects } from './store/patients/patients.effects';
import { DoctorsEffects } from './store/doctors/doctors.effects';
import {AppointmentsEffects} from "./store/appointments/appointments.effects";
import {ExamsEffects} from "./store/exams/exams.effects";
import {RecordsEffects} from "./store/records/records.effects";
import {AuditoriasEffects} from "./store/auditorias/auditorias.effects";
import {AuthEffects} from "./store/auth/auth.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideStore({
      patients: patientsReducer,
      doctors: doctorsReducer,
      appointments: appointmentsReducer,
      exams: examsReducer,
      records: recordsReducer,
      auditorias: auditoriasReducer,
      auth: authReducer
    }),
    provideEffects(
      PatientsEffects,
      DoctorsEffects,
      AppointmentsEffects,
      ExamsEffects,
      RecordsEffects,
      AuditoriasEffects,
      AuthEffects
    ),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
};

// provideStore(reducers, { metaReducers }),
