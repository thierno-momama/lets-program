import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  login(){
    this.http.get<any>("http://localhost:3000/signupUsers").subscribe(res => {
      const reslogin = res.find((t: any) => {
        return t.email === this.loginForm.value.email && t.password === this.loginForm.value.password;
      });
      if(reslogin){
        alert("Login in successfully");
        this.loginForm.reset();
        this.router.navigate(['dashboard']);
      }else{
        alert("Something error login, please enter real value login form");
      }
    });
  }

}
