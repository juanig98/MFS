import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClrAlertTypesEnum } from 'src/app/models/enums/ClrAlert.enums';
import { ClrAlertSimple } from 'src/app/models/interfaces/ClrAlertSimple';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = "Login page";

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(1)]),
    password: new FormControl('', [Validators.required, Validators.minLength(1)]),
  })

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void { }

  alert: ClrAlertSimple = new ClrAlertSimple({ show: false, type: ClrAlertTypesEnum.INFO, data: "" });
  disableBtnSubmit = false;
  onSubmit(): void {
    const MISSING_FIELD = 1001;
    try {
      if (!this.form.valid) throw MISSING_FIELD

      this.disableBtnSubmit = true; // Deshabilito el botón de submit

      this.authService.login(this.form.value).subscribe(
        response => {
          this.authService.setToken(response.token);
          this.router.navigate(['/app/dashboard']);
          this.disableBtnSubmit = false;
        },
        error => {
          this.disableBtnSubmit = false;
          if (error.status == 401) {
            this.alert = new ClrAlertSimple({ show: true, type: ClrAlertTypesEnum.DANGER, data: error.error.message });
          } else if (error.status == 0) {
            this.alert = new ClrAlertSimple({ show: true, type: ClrAlertTypesEnum.DANGER, data: 'Ocurrió un error al intentar conectar con el servidor' });
          } else {
            this.alert = new ClrAlertSimple({ show: true, type: ClrAlertTypesEnum.DANGER, data: 'Ocurrió un error indefinido' });
          }
        },
      );
    } catch (error) {
      if (error == MISSING_FIELD) this.alert = new ClrAlertSimple({ show: true, type: ClrAlertTypesEnum.DANGER, data: 'Debes completar todos los campos' });
    }

  }

}
