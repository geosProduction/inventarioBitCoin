import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RegisterComponent } from '../Auth/register/register.component';
import { ForgetPasswordComponent } from '../Auth/forget-password/forget-password.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  emailPattern: any = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  passPattern: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\.\/])(?=.{8,})/;

  public title1: string = "Sing In";
  public title2: string = "Inicio";
  public title3: string = "Bienvenido al Sitema";
  public title4: string = "Logo";
  public title5: string = "Salir";
  public title6: string = "Admin";
  public user$: Observable<any> = this.authService.angularFireAuth.user;

  validarEntrada: string;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private authService: AuthService, public router: Router) { }

  ngOnInit(): void {
  }

  formGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required, Validators.pattern(this.passPattern)]]
  });

  openDialog() {
    this.dialog.open(RegisterComponent);
  }

  openForgetPassword() {
    this.dialog.open(ForgetPasswordComponent);
  }

  savelogin() {
    if (this.formGroup.valid) {
      const { email, password } = this.formGroup.value;
      this.authService.login(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("No valido", errorCode, errorMessage);
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
          icon: 'error',
          title: 'Error: ' + errorCode
        })
      });
      this.router.navigate(['/admin']);
    } else {
      console.log("No valido");
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
    this.alertSuccess();
  }

  // auth() {
  //   this.authService.auth(function (user) {
  //     if (user) {
  //       var email = user.email;
  //       var uid = user.uid;
  //       var providerData = user.providerData;
  //     } else {
  //       console.log("No Registrado");
  //     }
  //   });
  // }

  //////////////////////Swal Alert/////////////////////
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
      icon: 'success',
      title: 'Acceso Correcto, Bienvenido'
    })
  }
}
