import {Routes} from '@angular/router';
import {LandingComponent} from './components/landing/landing.component';
import {AuthComponent} from "./components/auth/auth.component";
import {HomeComponent} from "./components/home/home.component";
import {PatientComponent} from "./components/patient/patient.component";
import {PatientFormComponent} from "./components/patient-form/patient-form.component";
import {DoctorComponent} from "./components/doctor/doctor.component";
import {DoctorFormComponent} from "./components/doctor-form/doctor-form.component";
import {AuditoriaComponent} from "./components/auditoria/auditoria.component";
import {AppointmentComponent} from "./components/appointment/appointment.component";
import {AppointmentFormComponent} from "./components/appointment-form/appointment-form.component";
import {ExamComponent} from "./components/exam/exam.component";
import {ExamFormComponent} from "./components/exam-form/exam-form.component";
import {RecordComponent} from "./components/record/record.component";
import {RecordFormComponent} from "./components/record-form/record-form.component";
import {Forbidden403Component} from "./components/forbidden403/forbidden403.component";

import {adminAuthGuard} from "./guards/admin-auth.guard";
import {userAuthGuard} from "./guards/user-auth.guard";

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [userAuthGuard]
  },
  {
    path: 'patients',
    component: PatientComponent,
    canActivate: [userAuthGuard]
  },
  {
    path: 'patients/page/:page',
    component: PatientComponent,
    canActivate: [userAuthGuard]
  },
  {
    path: 'patients/create',
    component: PatientFormComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: 'patients/update/:id',
    component: PatientFormComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: 'doctors',
    component: DoctorComponent,
    canActivate: [userAuthGuard]
  },
  {
    path: 'doctors/page/:page',
    component: DoctorComponent,
    canActivate: [userAuthGuard]
  },
  {
    path: 'doctors/create',
    component: DoctorFormComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: 'doctors/update/:id',
    component: DoctorFormComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: 'appointments',
    component: AppointmentComponent,
    canActivate: [userAuthGuard]
  },
  {
    path: 'appointments/page/:page',
    component: AppointmentComponent,
    canActivate: [userAuthGuard]
  },
  {
    path: 'appointments/create',
    component: AppointmentFormComponent,
    canActivate: [userAuthGuard]
  },
  {
    path: 'appointments/update/:id',
    component: AppointmentFormComponent,
    canActivate: [userAuthGuard]
  },
  {
    path: 'exams',
    component: ExamComponent,
    canActivate: [userAuthGuard]
  },
  {
    path: 'exams/page/:page',
    component: ExamComponent,
    canActivate: [userAuthGuard]
  },
  {
    path: 'exams/create',
    component: ExamFormComponent,
    canActivate: [userAuthGuard]
  },
  {
    path: 'exams/update/:id',
    component: ExamFormComponent,
    canActivate: [userAuthGuard]
  },
  {
    path: 'records',
    component: RecordComponent,
    canActivate: [userAuthGuard]
  },
  {
    path: 'records/page/:page',
    component: RecordComponent,
    canActivate: [userAuthGuard]
  },
  {
    path: 'records/create',
    component: RecordFormComponent,
    canActivate: [userAuthGuard]
  },
  {
    path: 'records/update/:id',
    component: RecordFormComponent,
    canActivate: [userAuthGuard]
  },
  {
    path: 'auditorias',
    component: AuditoriaComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: 'auditorias/page/:page',
    component: AuditoriaComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: 'forbidden',
    component: Forbidden403Component
  }
];
