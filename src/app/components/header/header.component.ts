import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterModule} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule,
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  username: string = '';
  isAdmin: boolean = false;
  isDoctor: boolean = false;
  isPatient: boolean = false;

  constructor(private authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {
    this.username = this.authService.user.user.username
    this.isAdmin = this.authService.user.isAdmin
    this.isDoctor = this.authService.user.isDoctor
    this.isPatient = this.authService.user.isPatient
  }

  get login() {
    return this.authService.user;
  }

  get admin() {
    return this.authService.isAdmin();
  }

  handlerLogout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }

}
