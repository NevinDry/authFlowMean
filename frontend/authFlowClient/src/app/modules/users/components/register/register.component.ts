import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private registerForm: FormGroup;
  submitted: boolean = false;
  error: string = null;
  constructor(private formBuilder: FormBuilder, private usersService: UsersService) { }


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['tod', Validators.required],
      password: ['tod', Validators.required],
      passwordCheck: ['tod', Validators.required],
      email: ['tod@tod.fr', [Validators.required, Validators.email]]
    });
  };


  onSubmitRegisterForm() {
    this.submitted = true;
    this.error = null;

    if (this.registerForm.valid) {
      this.usersService.register(this.registerForm.value)
        .subscribe(
          (arg) => {

          }, (error: string) => {
            this.error = error;
          });
    }
  }

}
