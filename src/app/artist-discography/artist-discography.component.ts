import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {

  albums: Array<any> = [];
  artist: any = {};
  id: string = "";

  private activatedRouteSub: any;
  private artistByIdSub: any;
  private albumsByArtistIdSub: any;

  constructor(private ars: ActivatedRoute, private mds: MusicDataService) { }

  ngOnInit(): void {
    this.activatedRouteSub = this.ars.params.subscribe(data => this.id = data['id']);
    this.artistByIdSub = this.mds.getArtistById(this.id).subscribe(data => this.artist = data);
    this.albumsByArtistIdSub = this.mds.getAlbumsByArtistId(this.id).subscribe(data => this.albums = data.items.filter((curValue, index, self) => self.findIndex(t => t.name.toUpperCase() === curValue.name.toUpperCase()) === index));

  }

  ngOnDestroy(): void {
    this.activatedRouteSub.unsubscribe();
    this.artistByIdSub.unsubscribe();
    this.albumsByArtistIdSub.unsubscribe();
  }

}
