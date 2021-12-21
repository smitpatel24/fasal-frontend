import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import axios from 'axios';
import { StateService } from '../state.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor(
    public state: StateService,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.state.getFavList();
  }

  removeFromList(smartId) {
    return new Promise((resolve) => {
      axios
        .delete(
          'https://smit-fasal-assignment.herokuapp.com/api/fav/updateFav',
          {
            params: { smartId: smartId },
          }
        )
        .then((res) => {
          this.state.getFavList();
          resolve(true);
        })
        .catch((error) => {
          resolve(false);
        });
    });
  }

  logout() {
    this.alertCtrl
      .create({
        header: 'Are you sure you want to logout?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Logout',
            handler: () => {
              this.state.isUserAuthenticated = false;
              this.router.navigate(['/login']);
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }
}
