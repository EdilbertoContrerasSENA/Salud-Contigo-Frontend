import {Component, OnInit} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Appointment} from "../../models/appointment";
import {Patient} from "../../models/patient";
import {Doctor} from "../../models/doctor";
import {PatientService} from "../../services/patient.service";
import {DoctorService} from "../../services/doctor.service";
import {AuthService} from "../../services/auth.service";
import {Store} from "@ngrx/store";
import {addAppointment, findAppointment, resetAppointment, updateAppointment} from "../../store/appointments/appointments.actions";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'appointment-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.css'
})
export class AppointmentFormComponent implements OnInit {

  pacientes: Patient[] = [];
  medicos: Doctor[] = [];

  appointment: Appointment;
  errors: any = {};

  constructor(
    private pacienteService: PatientService,
    private medicoService: DoctorService,
    private store: Store<{appointments: any}>,
    private authService: AuthService,
    private route: ActivatedRoute) {
    this.appointment = new Appointment();

    this.store.select('appointments').subscribe(state => {
      this.errors = state.errors;
      this.appointment = { ...state.appointment };
    })
  }

  ngOnInit(): void {
    this.store.dispatch(resetAppointment());

    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');

      if (id > 0) {
        this.store.dispatch(findAppointment({ id }))
      }
    });

    this.pacienteService.findAll().subscribe(pacientes => this.pacientes = pacientes);
    this.medicoService.findAll().subscribe(medicos => this.medicos = medicos);

  }

  onSubmit(appointmentForm: NgForm): void {
    if (this.appointment.idcita > 0) {
      this.store.dispatch(updateAppointment({ appointmentUpdated: this.appointment }))
    } else {
      this.store.dispatch(addAppointment({appointmentNew: this.appointment}))
    }
  }

  get admin() {
    return this.authService.isAdmin();
  }

  get doctor() {
    return this.authService.isDoctor();
  }

  get patient() {
    return this.authService.isPatient();
  }

  onClear(appointmentForm: NgForm): void {
    this.store.dispatch(resetAppointment());
    appointmentForm.reset();
    appointmentForm.resetForm();
  }

  // Método para generar el PDF
  downloadPDF() {
    const DATA = document.getElementById('appointmentFormContainer');
    if (DATA) {
      html2canvas(DATA).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 208;
        const pageHeight = 295; // A4 page height in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 20; // starting position, 20mm from top

        // First page
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        doc.save('citaMedica.pdf');
      });
    }
  }

}
