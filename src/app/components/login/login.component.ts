import { Component, OnInit } from '@angular/core';
import { MyErrorStateMatcher } from 'src/app/data/error.state.matcher';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CONST } from 'src/app/data/const';
import { NotifyService } from 'src/app/services/notify.service';
import { AuthInfo } from 'src/app/models/authInfo';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  matcher  = new MyErrorStateMatcher();
  W_Login  = new FormControl('', Validators.required);
  W_Pass   = new FormControl('', [Validators.minLength(6), Validators.required]);
  authInfo : AuthInfo;
  loginForm = new FormGroup({
    userLogin:      this.W_Login,
    userPassword:   this.W_Pass
  });

  constructor(private router: Router, private userService : UserService, private _ns : NotifyService) { }

  ngOnInit() {
  }

  onLogIn(){
    this.authInfo = this.loginForm.value;
    this.userService.login(this.authInfo).subscribe(
      data => {
        this._ns.ShowNotify(CONST.NOTI_OK, 'LogIn OK');
        this.router.navigate(['/user']);
      },
      // if(data.status == CONST.RES_OK){
      //   setTimeout(() => {
      //     this.router.navigate(['user']); // Navigate to dashboard view
      //   }, 750);
      // } else {
      //      this._ns.ShowNotify(CONST.NOTI_ERR, 'Your username or password is incorrect. Please try again.');
      // }},
      error => { this._ns.ShowNotify(CONST.NOTI_ERR, 'Server Error. Please try again.')}
    )
  }

}
