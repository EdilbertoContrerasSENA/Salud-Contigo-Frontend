import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  modalCitasMedicas: boolean = false;
  modalExamenesMedicos: boolean = false;

  constructor(private authService: AuthService
  ){}

  openModal(modalId: string): void {
    if (modalId === 'citasMedicasModal') {
      this.modalCitasMedicas = true;
    } else if (modalId === 'examenesMedicosModal') {
      this.modalExamenesMedicos = true;
    }
  }

  closeModal(modalId: string): void {
    if (modalId === 'citasMedicasModal') {
      this.modalCitasMedicas = false;
    } else if (modalId === 'examenesMedicosModal') {
      this.modalExamenesMedicos = false;
    }
  }

  get login() {
    return this.authService.user;
  }

}
