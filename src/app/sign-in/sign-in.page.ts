import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../Shared/user.service';
import { RepositoryService } from '../Shared/repository.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangePasswordPage } from '../change-password/change-password.page';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  errorMessage: string = '';
  showError?: boolean;
  formModel = {
    Email: '',
    Password: ''
  };
  showModal: boolean = false; 

  constructor(private service: UserService, private router: Router,
    private repository: RepositoryService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('');
  }

   onSubmit(form: NgForm) {
    const enteredPassword = form.value.Password;
    const defaultPassword = 'Password.321';

    const email = this.formModel.Email;

      // Proceed with login
      this.service.login(form.value).subscribe(
        (res: any) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('login-user', JSON.stringify(res.user));
          if (res.user.isBlocked) {
            localStorage.removeItem('token');
            this.errorMessage = 'User Blocked';
            this.showError = true;
          } 
          if (enteredPassword === defaultPassword){
            this.Update(email);
          }
          
          else {
            this.router.navigateByUrl('');
            console.log('Logged in');
          }
          
        },
        err => {
          this.errorMessage = 'USERNAME OR PASSWORD WRONG!';
          this.showError = true;
        }
      );
  }

  updatePassword(form: NgForm) {
    const data: any = {
      password: form.value.password,
      confirmPassword: form.value.confirm
    };
    const email = this.formModel.Email; // Assuming you have the email stored in formModel.Email

    const apiUri: string = `api/account/changePassword/${email}`;
    this.repository.create(apiUri, data).subscribe({
      next: () => {
        console.log('Password updated successfully');
        // Close modal after successful password update
        this.showModal = false;
      },
      error: (err: HttpErrorResponse) => {
        this.showError = true;
        this.errorMessage = err.message;
      }
    });
  }

  closeModal() {
    // Close modal and reset flag
    this.showModal = false;
  }

  Update(id: string) {

    const popup = this.dialog.open(ChangePasswordPage, {
      width: '400px', height: '330px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
     data:{
      id:id
     }
    });
  }

}
