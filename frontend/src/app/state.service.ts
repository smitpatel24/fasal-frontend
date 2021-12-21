import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  isUserAuthenticated = false;
  userId: string;
  favList;
  searchList;

  constructor(private toastCtrl: ToastController) {}

  async presentToast(info: string) {
    const toast = await this.toastCtrl.create({
      message: info,
      duration: 2000,
      color: 'dark',
    });
    toast.present();
  }

  getFavList() {
    return new Promise((resolve) => {
      axios
        .get('https://smit-fasal-assignment.herokuapp.com/api/fav/byUserId', {
          params: { userId: this.userId },
        })
        .then((res) => {
          this.favList = res.data;
          // console.log(res);
          // console.log(this.favList);
          resolve(true);
        })
        .catch((error) => {
          resolve(false);
        });
    });
  }
}
