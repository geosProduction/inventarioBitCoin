import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../Auth/register/register.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public title1: string = "Logo";
  public title2: string = "Inicio";
  public title3: string = "Admin";
  public title4: string = "Salir";
  public title5: string = "Inicio";
  public user$: Observable<any> =this.authService.angularFireAuth.user;

  constructor(public dialog: MatDialog, private authService: AuthService, private router: Router) { }

  ngOnInit():void {}

  openDialog() {
    this.dialog.open(RegisterComponent);
  }

  logout() {
      this.authService.logout();
      this.router.navigate(['/home']);
      this.alertSuccess();
  }
  //////////////Swal Alert/////////////////
  alertSuccess() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'info',
      title: 'Hasta Luego'
    })
  }

}
