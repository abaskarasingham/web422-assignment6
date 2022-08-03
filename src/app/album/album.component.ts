import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit, OnDestroy {

  album: any = {};
  id: string = "";

  private activatedRouteSub: any;
  private albumByIdSub: any;

  constructor(private snackBar: MatSnackBar, private ars: ActivatedRoute, private mds: MusicDataService) { }

  ngOnInit(): void {
    this.activatedRouteSub = this.ars.params.subscribe(data => this.id = data['id']);
    this.albumByIdSub = this.mds.getAlbumById(this.id).subscribe(data => this.album = data);
  }

  addToFavourites(trackID: string) {
    this.mds.addToFavourites(trackID).subscribe(
      (success) => {
        this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 });
      },
      (err) => {
        this.snackBar.open("Adding to Favourites...", "Unable to add song to Favourites", { duration: 1500 });
      }
    )
  }

  ngOnDestroy(): void {
    this.activatedRouteSub.unsubscribe();
    this.albumByIdSub.unsubscribe();
  }

}
