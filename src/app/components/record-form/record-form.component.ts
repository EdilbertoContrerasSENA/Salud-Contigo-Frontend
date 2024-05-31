import {Component, OnInit} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Record} from "../../models/record";
import {Patient} from "../../models/patient";
import {Doctor} from "../../models/doctor";
import {PatientService} from "../../services/patient.service";
import {DoctorService} from "../../services/doctor.service";
import {AuthService} from "../../services/auth.service";
import {Store} from "@ngrx/store";
import {addRecord, findRecord, resetRecord, updateRecord} from "../../store/records/records.actions";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'record-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './record-form.component.html',
  styleUrl: './record-form.component.css'
})
export class RecordFormComponent implements OnInit {

  pacientes: Patient[] = [];
  medicos: Doctor[] = [];
  record: Record;
  errors: any = {};

  username: string = '';
  isAdmin: boolean = false;
  isDoctor: boolean = false;
  isPatient: boolean = false;

  constructor(
    private pacienteService: PatientService,
    private medicoService: DoctorService,
    private store: Store<{records: any}>,
    private authService: AuthService,
    private route: ActivatedRoute) {
    this.record = new Record();

    this.store.select('records').subscribe(state => {
      this.errors = state.errors;
      this.record = { ...state.record };
    })
  }

  ngOnInit(): void {
    this.store.dispatch(resetRecord());

    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');

      if (id > 0) {
        this.store.dispatch(findRecord({ id }))
      }
    });

    this.pacienteService.findAll().subscribe(pacientes => this.pacientes = pacientes);
    this.medicoService.findAll().subscribe(medicos => this.medicos = medicos);

    this.username = this.authService.user.user.username
    this.isAdmin = this.authService.user.isAdmin
    this.isDoctor = this.authService.user.isDoctor
    this.isPatient = this.authService.user.isPatient
  }

  onSubmit(recordForm: NgForm): void {
    if (this.record.idhistoria > 0) {
      this.store.dispatch(updateRecord({ recordUpdated: this.record }))
    } else {
      this.store.dispatch(addRecord({recordNew: this.record}))
    }
  }

  get admin() {
    return this.authService.isAdmin();
  }

  onClear(recordForm: NgForm): void {
    this.store.dispatch(resetRecord());
    recordForm.reset();
    recordForm.resetForm();
  }

  // Método para generar el PDF
  downloadPDF() {
    const DATA = document.getElementById('recordFormContainer');
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

        doc.save('historiaClinica.pdf');
      });
    }
  }

}
