import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {

  results: any = [];
  searchQuery: string = "";

  private activatedRouteSub: any;
  private searchArtistsSub: any;

  constructor(private ars: ActivatedRoute, private mds: MusicDataService) { }

  ngOnInit(): void {
    this.activatedRouteSub = this.ars.queryParams.subscribe(data => this.searchQuery = data['q']);
    this.searchArtistsSub = this.mds.searchArtists(this.searchQuery).subscribe(data => this.results = data.artists.items.filter(item => item.images.length > 0));
  }

  ngOnDestroy(): void {
    this.activatedRouteSub.unsubscribe();
    this.searchArtistsSub.unsubscribe();
  }

}
