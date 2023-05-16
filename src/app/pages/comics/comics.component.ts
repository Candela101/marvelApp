import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MarvelService } from 'src/app/services/marvel.service';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})
export class ComicsComponent implements OnInit {

  title = 'Comics';

  constructor(private marvelSvc: MarvelService, private router: Router) { }
  comics: any[] = [];
  limit: number = 20;
  offset: number = 0;


  ngOnInit() {

    this.getAllComics();
  }

  getAllComics() {

    this.marvelSvc.getComics(this.limit, this.offset).subscribe(data => {
      this.comics = data;
    });

  }

  getComics(id: string) {
    this.router.navigate(['/comic/', id]);
  }

  loadNextPage() {
    this.offset += this.limit;
    this.getAllComics();
  }

  loadPreviousPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.getAllComics();
    }
  }

  getCurrentPage(): number {
    return Math.floor(this.offset / this.limit) + 1;
  }
}
