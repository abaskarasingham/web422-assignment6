import { Component, OnDestroy, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit, OnDestroy {

  favourites: Array<any> = [];

  private favouritesSub: any;
  private removeFromFavouritesSub: any;

  constructor(private mds: MusicDataService) { }

  ngOnInit(): void {
    this.favouritesSub = this.mds.getFavourites().subscribe(data => this.favourites = data.tracks);
  }

  removeFromFavourites(id: string) {
    this.removeFromFavouritesSub = this.mds.removeFromFavourites(id).subscribe(data => this.favourites = data.tracks);
  }

  ngOnDestroy(): void {
    this.favouritesSub.unsubscribe();
    if (this.removeFromFavouritesSub != undefined)
    {
      this.removeFromFavouritesSub.unsubscribe();
    }
  }

}
