import { Component } from '@angular/core';
import { present } from '@ionic/core/dist/types/utils/overlays';
import axios from 'axios';
import { promise } from 'protractor';
import { StateService } from '../state.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  url = 'https://www.omdbapi.com/';
  apiKey = '62d245cc';

  constructor(public state: StateService) {}

  searchMovie(e) {
    return new Promise((resolve) => {
      axios
        .get(this.url, {
          params: {
            apikey: this.apiKey,
            s: e.detail.value,
          },
        })
        .then((res) => {
          // console.log(e);
          this.state.searchList = res.data.Search;
          // console.log(res);
          // console.log(this.state.searchList);
          resolve(true);
        })
        .catch((error) => {
          resolve(false);
        });
    });
  }
  addToFavList(title, year, imdbID, poster) {
    return new Promise((resolve) => {
      let smartId = this.state.userId.concat(imdbID);
      let payload = {
        title: title,
        year: year,
        smartId: smartId,
        poster: poster,
        userId: this.state.userId,
      };
      axios
        .post(
          'https://smit-fasal-assignment.herokuapp.com/api/fav/addFav',
          payload
        )
        .then((res) => {
          this.state.getFavList();
          this.state.presentToast('Movie added to Your List!');
          resolve(true);
        })
        .catch((error) => {
          // console.log(error);
          this.state.presentToast('Something went wrong.');
          resolve(false);
        });
    });
  }
}
