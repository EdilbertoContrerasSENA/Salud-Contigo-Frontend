import {Component, OnInit} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Exam} from "../../models/exam";
import {Patient} from "../../models/patient";
import {Doctor} from "../../models/doctor";
import {PatientService} from "../../services/patient.service";
import {DoctorService} from "../../services/doctor.service";
import {Store} from "@ngrx/store";
import {addExam, findExam, resetExam, updateExam} from "../../store/exams/exams.actions";
import {AuthService} from "../../services/auth.service";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

@Component({
  selector: 'exam-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './exam-form.component.html',
  styleUrl: './exam-form.component.css'
})
export class ExamFormComponent implements OnInit {

  pacientes: Patient[] = [];
  medicos: Doctor[] = [];

  exam: Exam;
  errors: any = {};

  constructor(
    private pacienteService: PatientService,
    private medicoService: DoctorService,
    private store: Store<{exams: any}>,
    private authService: AuthService,
    private route: ActivatedRoute) {
    this.exam = new Exam();

    this.store.select('exams').subscribe(state => {
      this.errors = state.errors;
      this.exam = { ...state.exam };
    })
  }

  ngOnInit(): void {
    this.store.dispatch(resetExam());

    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');

      if (id > 0) {
        this.store.dispatch(findExam({ id }))
      }
    });

    this.pacienteService.findAll().subscribe(pacientes => this.pacientes = pacientes);
    this.medicoService.findAll().subscribe(medicos => this.medicos = medicos);

  }

  onSubmit(examForm: NgForm): void {
    if (this.exam.idexamen > 0) {
      this.store.dispatch(updateExam({ examUpdated: this.exam }))
    } else {
      this.store.dispatch(addExam({examNew: this.exam}))
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

  onClear(examForm: NgForm): void {
    this.store.dispatch(resetExam());
    examForm.reset();
    examForm.resetForm();
  }

  // Método para generar el PDF
  downloadPDF() {
    const DATA = document.getElementById('examFormContainer');
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

        doc.save('examenMedico.pdf');
      });
    }
  }


}
