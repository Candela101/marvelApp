import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const URL_API = environment.urlApi;
const KEY_PUBLIC = environment.keyPublic;
const HASH = environment.hash;

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<any> {
    return this.http.get<any>(`${URL_API}/characters?ts=1&apikey=${KEY_PUBLIC}&hash=${HASH}`).pipe(map((data: any) => data.data.results));
  }

  getCharacter(id: string): Observable<any> {
    return this.http.get(`${URL_API}/characters/${id}?ts=1&apikey=${KEY_PUBLIC}&hash=${HASH}`).pipe(map((data: any) => data.data.results));
  }

  getComics(): Observable<any> {

    return this.http.get<any>(`${URL_API}/comics?ts=1&apikey=${KEY_PUBLIC}&hash=${HASH}`).pipe(map((data: any) => data.data.results));

  }


  getComic(id: string): Observable<any> {

    return this.http.get(`${URL_API}/comics/${id}?ts=1&apikey=${KEY_PUBLIC}&hash=${HASH}`).pipe(map((data: any) => data.data.results));

  }

  getCharacterByName(name: string): Observable<any[]> {
    return this.http.get(`${URL_API}/characters?name=${name}&ts=1&apikey=${KEY_PUBLIC}&hash=${HASH}`)
      .pipe(
        map((data: any) => data.data.results)
      );
  }
}
