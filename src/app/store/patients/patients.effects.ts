import {Injectable} from "@angular/core";
import { PatientService } from "../../services/patient.service";
import {Patient} from "../../models/patient";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import { addPatient, addSuccessPatient, findAllPatient, findAllPageablePatient, loadPatient, removePatient, removeSuccessPatient, setErrorsPatient, setPaginatorPatient, updatePatient, updateSuccessPatient } from "./patients.actions";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import Swal from "sweetalert2";

@Injectable()
export class PatientsEffects {

  loadPatients$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadPatient),
      exhaustMap(action => this.service.findAllPageable(action.page)
        .pipe(
          map(pageable => {
            const patients = pageable.content as Patient[];
            const paginator = pageable;

            return findAllPageablePatient({ patients, paginator });
          }),
          catchError((error) => of(error))
        )
      )
    )
  );

  addPatient$ = createEffect(
    () => this.actions$.pipe(
      ofType(addPatient),
      exhaustMap(action => this.service.create(action.patientNew)
        .pipe(
          map(patientNew => addSuccessPatient({ patientNew })),
          catchError(error => (error.status == 400) ? of(setErrorsPatient({ patientForm: action.patientNew, errors: error.error })) : of(error)
          )
        )
      )
    )
  );

  updatePatient$ = createEffect(
    () => this.actions$.pipe(
      ofType(updatePatient),
      exhaustMap(action => this.service.update(action.patientUpdated)
        .pipe(
          map(patientUpdated => updateSuccessPatient({ patientUpdated })),
          catchError(error => (error.status == 400) ? of(setErrorsPatient({ patientForm: action.patientUpdated, errors: error.error })) : of(error)
          )
        )
      )
    )
  );

  removePatient$ = createEffect(
    () => this.actions$.pipe(
      ofType(removePatient),
      exhaustMap(action => this.service.remove(action.id)
        .pipe(
          map(() => removeSuccessPatient({ id: action.id }))
        )
      )
    )
  );

  addSuccessPatient$ = createEffect(() => this.actions$.pipe(
    ofType(addSuccessPatient),
    tap(() => {
      this.router.navigate(['/patients']);

      Swal.fire({
        title: "Creado nuevo paciente!",
        text: "Paciente creado con exito!",
        icon: "success"
      });
    })
  ), { dispatch: false })

  updateSuccessPatient$ = createEffect(() => this.actions$.pipe(
    ofType(updateSuccessPatient),
    tap(() => {
      this.router.navigate(['/patients']);

      Swal.fire({
        title: "Actualizado!",
        text: "Paciente editado con exito!",
        icon: "success"
      });
    })
  ), {dispatch: false})

  removeSuccessPatient$ = createEffect(() => this.actions$.pipe(
    ofType(removeSuccessPatient),
    tap(() => {
      this.router.navigate(['/patients']);

      Swal.fire({
        title: "Eliminado!",
        text: "Paciente eliminado con exito.",
        icon: "success"
      });
    })
  ), { dispatch: false })

  constructor(
    private router: Router,
    private actions$: Actions,
    private service: PatientService
  ){}
}
