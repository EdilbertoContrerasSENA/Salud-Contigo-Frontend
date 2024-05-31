import {Injectable} from "@angular/core";
import { ExamService } from "../../services/exam.service";
import {Exam} from "../../models/exam";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import { addExam, addSuccessExam, findAllExam, findAllPageableExam, loadExam, removeExam, removeSuccessExam, setErrorsExam, setPaginatorExam, updateExam, updateSuccessExam } from "./exams.actions";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import Swal from "sweetalert2";

@Injectable()
export class ExamsEffects {

  loadExams$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadExam),
      exhaustMap(action => this.service.findAllPageable(action.page)
        .pipe(
          map(pageable => {
            const exams = pageable.content as Exam[];
            const paginator = pageable;

            return findAllPageableExam({ exams, paginator });
          }),
          catchError((error) => of(error))
        )
      )
    )
  );

  addExam$ = createEffect(
    () => this.actions$.pipe(
      ofType(addExam),
      exhaustMap(action => this.service.create(action.examNew)
        .pipe(
          map(examNew => addSuccessExam({ examNew })),
          catchError(error => (error.status == 400) ? of(setErrorsExam({ examForm: action.examNew, errors: error.error })) : of(error)
          )
        )
      )
    )
  );

  updateExam$ = createEffect(
    () => this.actions$.pipe(
      ofType(updateExam),
      exhaustMap(action => this.service.update(action.examUpdated)
        .pipe(
          map(examUpdated => updateSuccessExam({ examUpdated })),
          catchError(error => (error.status == 400) ? of(setErrorsExam({ examForm: action.examUpdated, errors: error.error })) : of(error)
          )
        )
      )
    )
  );

  removeExam$ = createEffect(
    () => this.actions$.pipe(
      ofType(removeExam),
      exhaustMap(action => this.service.remove(action.id)
        .pipe(
          map(() => removeSuccessExam({ id: action.id }))
        )
      )
    )
  );

  addSuccessExam$ = createEffect(() => this.actions$.pipe(
    ofType(addSuccessExam),
    tap(() => {
      this.router.navigate(['/exams']);

      Swal.fire({
        title: "Creado nuevo examen!",
        text: "Examen creado con exito!",
        icon: "success"
      });
    })
  ), { dispatch: false })

  updateSuccessExam$ = createEffect(() => this.actions$.pipe(
    ofType(updateSuccessExam),
    tap(() => {
      this.router.navigate(['/exams']);

      Swal.fire({
        title: "Actualizado!",
        text: "Examen editado con exito!",
        icon: "success"
      });
    })
  ), {dispatch: false})

  removeSuccessExam$ = createEffect(() => this.actions$.pipe(
    ofType(removeSuccessExam),
    tap(() => {
      this.router.navigate(['/exams']);

      Swal.fire({
        title: "Eliminado!",
        text: "Examen eliminado con exito.",
        icon: "success"
      });
    })
  ), { dispatch: false })

  constructor(
    private router: Router,
    private actions$: Actions,
    private service: ExamService
  ){}
}
