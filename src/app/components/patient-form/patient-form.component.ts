import {Component, OnInit} from '@angular/core';
import {Patient} from "../../models/patient";
import {Store} from "@ngrx/store";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";
import { addPatient, findPatient, resetPatient, updatePatient } from '../../store/patients/patients.actions';

@Component({
  selector: 'patient-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.component.css'
})
export class PatientFormComponent implements OnInit {

  patient: Patient;
  errors: any = {};

  constructor(
    private store: Store<{patients: any}>,
    private route: ActivatedRoute) {
    this.patient = new Patient();

    this.store.select('patients').subscribe(state => {
      this.errors = state.errors;
      this.patient = { ...state.patient };
    })
  }

  ngOnInit(): void {
    this.store.dispatch(resetPatient());

    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');

      if (id > 0) {
        this.store.dispatch(findPatient({ id }))
      }
    });
  }

  onSubmit(patientForm: NgForm): void {
    if (this.patient.idpaciente > 0) {
      this.store.dispatch(updatePatient({ patientUpdated: this.patient }))
    } else {
      this.store.dispatch(addPatient({patientNew: this.patient}))
    }
  }

  onClear(patientForm: NgForm): void {
    this.store.dispatch(resetPatient());
    patientForm.reset();
    patientForm.resetForm();
  }

}
