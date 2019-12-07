import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private loginForm: FormGroup;
  submitted: boolean = false;
  error: string = null;
  constructor(private formBuilder: FormBuilder, private usersService: UsersService) { }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['tod@tod.fr', [Validators.required, Validators.email]],
      password: ['tod', Validators.required],
    })
  }

  onSubmitLoginForm() {
    this.submitted = true;
    this.error = null;

    if (this.loginForm.valid) {
      this.usersService.login(this.loginForm.value)
        .subscribe(
          (arg) => {

          }, (error: string) => {
            this.error = error;
          });
    }
  }

}
