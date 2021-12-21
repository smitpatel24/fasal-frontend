import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { StateService } from '../state.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  username: string;
  password: string;
  constructor(private router: Router, private state: StateService) {}

  ngOnInit() {}

  onSignup() {
    let payload = {
      username: this.username,
      password: this.password,
    };
    return new Promise((resolve) => {
      axios
        .post(
          'https://smit-fasal-assignment.herokuapp.com/api/users/register',
          payload
        )
        .then((res) => {
          this.state.presentToast('Account created successfully!');
          this.username = '';
          this.password = '';
          this.router.navigate(['']);
          resolve(true);
        })
        .catch((error) => {
          this.state.presentToast(
            'Something went wrong. Try using another username.'
          );
          resolve(false);
        });
    });
  }
}
