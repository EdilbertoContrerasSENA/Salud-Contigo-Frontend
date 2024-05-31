import { Component } from '@angular/core';
import {User} from "../../models/user";
import {Store} from "@ngrx/store";
import {login} from "../../store/auth/auth.actions";
import {FormsModule} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  title: string = "Iniciar Sesión";

  user: User;

  constructor(private store: Store<{auth: any}>
  ) {
    this.user = new User();
  }

  onSubmit() {
    if (!this.user.username || !this.user.password) {
      Swal.fire(
        'Error de validacion',
        'Username y password requeridos!',
        'error'
      );
    } else {
      this.store.dispatch(login({ username: this.user.username, password: this.user.password }));
      console.log(this.user.username, this.user.password);
    }
  }

}
