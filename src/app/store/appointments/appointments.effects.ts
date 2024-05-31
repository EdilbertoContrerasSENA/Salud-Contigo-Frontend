import {Injectable} from "@angular/core";
import { AppointmentService } from "../../services/appointment.service";
import {Appointment} from "../../models/appointment";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import { addAppointment, addSuccessAppointment, findAllAppointment, findAllPageableAppointment, loadAppointment, removeAppointment, removeSuccessAppointment, setErrorsAppointment, setPaginatorAppointment, updateAppointment, updateSuccessAppointment } from "./appointments.actions";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import Swal from "sweetalert2";

@Injectable()
export class AppointmentsEffects {

  loadAppointments$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadAppointment),
      exhaustMap(action => this.service.findAllPageable(action.page)
        .pipe(
          map(pageable => {
            const appointments = pageable.content as Appointment[];
            const paginator = pageable;

            return findAllPageableAppointment({ appointments, paginator });
          }),
          catchError((error) => of(error))
        )
      )
    )
  );

  addAppointment$ = createEffect(
    () => this.actions$.pipe(
      ofType(addAppointment),
      exhaustMap(action => this.service.create(action.appointmentNew)
        .pipe(
          map(appointmentNew => addSuccessAppointment({ appointmentNew })),
          catchError(error => (error.status == 400) ? of(setErrorsAppointment({ appointmentForm: action.appointmentNew, errors: error.error })) : of(error)
          )
        )
      )
    )
  );

  updateAppointment$ = createEffect(
    () => this.actions$.pipe(
      ofType(updateAppointment),
      exhaustMap(action => this.service.update(action.appointmentUpdated)
        .pipe(
          map(appointmentUpdated => updateSuccessAppointment({ appointmentUpdated })),
          catchError(error => (error.status == 400) ? of(setErrorsAppointment({ appointmentForm: action.appointmentUpdated, errors: error.error })) : of(error)
          )
        )
      )
    )
  );

  removeAppointment$ = createEffect(
    () => this.actions$.pipe(
      ofType(removeAppointment),
      exhaustMap(action => this.service.remove(action.id)
        .pipe(
          map(() => removeSuccessAppointment({ id: action.id }))
        )
      )
    )
  );

  addSuccessAppointment$ = createEffect(() => this.actions$.pipe(
    ofType(addSuccessAppointment),
    tap(() => {
      this.router.navigate(['/appointments']);

      Swal.fire({
        title: "Creado nueva cita!",
        text: "Cita creada con exito!",
        icon: "success"
      });
    })
  ), { dispatch: false })

  updateSuccessAppointment$ = createEffect(() => this.actions$.pipe(
    ofType(updateSuccessAppointment),
    tap(() => {
      this.router.navigate(['/appointments']);

      Swal.fire({
        title: "Actualizada!",
        text: "Cita editada con exito!",
        icon: "success"
      });
    })
  ), {dispatch: false})

  removeSuccessAppointment$ = createEffect(() => this.actions$.pipe(
    ofType(removeSuccessAppointment),
    tap(() => {
      this.router.navigate(['/appointments']);

      Swal.fire({
        title: "Eliminada!",
        text: "Cita eliminada con exito.",
        icon: "success"
      });
    })
  ), { dispatch: false })

  constructor(
    private router: Router,
    private actions$: Actions,
    private service: AppointmentService
  ){}
}
