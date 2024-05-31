import {Injectable} from "@angular/core";
import {DoctorService} from "../../services/doctor.service";
import {Doctor} from "../../models/doctor";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import { addDoctor, addSuccessDoctor, findAllDoctor, findAllPageableDoctor, loadDoctor, removeDoctor, removeSuccessDoctor, setErrorsDoctor, setPaginatorDoctor, updateDoctor, updateSuccessDoctor } from "./doctors.actions";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import Swal from "sweetalert2";

@Injectable()
export class DoctorsEffects {

  loadDoctors$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadDoctor),
      exhaustMap(action => this.service.findAllPageable(action.page)
        .pipe(
          map(pageable => {
            const doctors = pageable.content as Doctor[];
            const paginator = pageable;

            return findAllPageableDoctor({ doctors, paginator });
          }),
          catchError((error) => of(error))
        )
      )
    )
  );

  addDcotor$ = createEffect(
    () => this.actions$.pipe(
      ofType(addDoctor),
      exhaustMap(action => this.service.create(action.doctorNew)
        .pipe(
          map(doctorNew => addSuccessDoctor({ doctorNew })),
          catchError(error => (error.status == 400) ? of(setErrorsDoctor({ doctorForm: action.doctorNew, errors: error.error })) : of(error)
          )
        )
      )
    )
  );

  updateDoctor$ = createEffect(
    () => this.actions$.pipe(
      ofType(updateDoctor),
      exhaustMap(action => this.service.update(action.doctorUpdated)
        .pipe(
          map(doctorUpdated => updateSuccessDoctor({ doctorUpdated })),
          catchError(error => (error.status == 400) ? of(setErrorsDoctor({ doctorForm: action.doctorUpdated, errors: error.error })) : of(error)
          )
        )
      )
    )
  );

  removeDoctor$ = createEffect(
    () => this.actions$.pipe(
      ofType(removeDoctor),
      exhaustMap(action => this.service.remove(action.id)
        .pipe(
          map(() => removeSuccessDoctor({ id: action.id }))
        )
      )
    )
  );

  addSuccessDoctor$ = createEffect(() => this.actions$.pipe(
    ofType(addSuccessDoctor),
    tap(() => {
      this.router.navigate(['/doctors']);

      Swal.fire({
        title: "Creado nuevo médico!",
        text: "Médico creado con exito!",
        icon: "success"
      });
    })
  ), { dispatch: false })

  updateSuccessDoctor$ = createEffect(() => this.actions$.pipe(
    ofType(updateSuccessDoctor),
    tap(() => {
      this.router.navigate(['/doctors']);

      Swal.fire({
        title: "Actualizado!",
        text: "Médico editado con exito!",
        icon: "success"
      });
    })
  ), {dispatch: false})

  removeSuccessDoctor$ = createEffect(() => this.actions$.pipe(
    ofType(removeSuccessDoctor),
    tap(() => {
      this.router.navigate(['/doctors']);

      Swal.fire({
        title: "Eliminado!",
        text: "Médico eliminado con exito.",
        icon: "success"
      });
    })
  ), { dispatch: false })

  constructor(
    private router: Router,
    private actions$: Actions,
    private service: DoctorService
  ){}
}
