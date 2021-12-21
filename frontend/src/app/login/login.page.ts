import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { StateService } from '../state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string;
  password: string;
  constructor(private router: Router, private state: StateService) {}

  ngOnInit() {}

  onLogin() {
    let payload = {
      username: this.username,
      password: this.password,
    };
    // console.log(this.username, this.password);
    return new Promise((resolve) => {
      axios
        .post(
          'https://smit-fasal-assignment.herokuapp.com/api/users/login',
          payload
        )
        .then((res) => {
          // console.log(res.data._id);
          this.state.userId = res.data._id;
          this.state.isUserAuthenticated = true;
          this.router.navigate(['/start/tabs/tab1']);
          this.username = '';
          this.password = '';
          resolve(true);
        })
        .catch((error) => {
          console.log(error);
          this.state.presentToast('Something went wrong.');
          resolve(false);
        });
    });
  }

  goToSignup() {
    this.username = '';
    this.password = '';
    this.router.navigate(['/signup']);
  }
}
