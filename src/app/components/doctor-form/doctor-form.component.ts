import { Component } from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Doctor} from "../../models/doctor";
import {Store} from "@ngrx/store";
import {addDoctor, findDoctor, resetDoctor, updateDoctor} from "../../store/doctors/doctors.actions";

@Component({
  selector: 'doctor-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './doctor-form.component.html',
  styleUrl: './doctor-form.component.css'
})
export class DoctorFormComponent {

  doctor: Doctor;
  errors: any = {};

  constructor(
    private store: Store<{doctors: any}>,
    private route: ActivatedRoute) {
    this.doctor = new Doctor();

    this.store.select('doctors').subscribe(state => {
      this.errors = state.errors;
      this.doctor = { ...state.doctor };
    })
  }

  ngOnInit(): void {
    this.store.dispatch(resetDoctor());

    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');

      if (id > 0) {
        this.store.dispatch(findDoctor({ id }))
      }
    });
  }

  onSubmit(doctorForm: NgForm): void {
    if (this.doctor.idmedico > 0) {
      this.store.dispatch(updateDoctor({ doctorUpdated: this.doctor }))
    } else {
      this.store.dispatch(addDoctor({doctorNew: this.doctor}))
    }
  }

  onClear(doctorForm: NgForm): void {
    this.store.dispatch(resetDoctor());
    doctorForm.reset();
    doctorForm.resetForm();
  }

}
