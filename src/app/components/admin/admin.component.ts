import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  showFiller = false;
  public title1: string = "Logo";
  public title2: string = "Inicio";
  public title3: string = "Admin";
  public title4: string = "Salir";
  public title5: string = "Inicio";
  public user$: Observable<any> =this.authService.angularFireAuth.user;
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {}

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
