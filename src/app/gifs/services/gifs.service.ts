import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';


//Cuando pongo provideIn: root, hago que este servicio esté disponible en toda la aplicación y todos los módulos que inyecten este servicio
@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'i2gJ07wV4YKKQEtVrl92mQkHUho7azMZ';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient ) {
    this.loadLocalStorage();
    console.log('Gifs service ready');
   }

  get tagHistory(){
    return [...this._tagsHistory];
  }

  private organizeHistory( tag: string ){
  tag = tag.toLowerCase();

  //Con esto borra el tag anterior
  if ( this._tagsHistory.includes(tag) ){
    this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag )
  }

  //Con esto inserta el nuevo tag al inicio
  this._tagsHistory.unshift( tag );

  //Para limitar a 10 búsquedas el listado:
  this._tagsHistory = this.tagHistory.splice(0,10);

  this.saveLocalStorage();

  }


  //Guardar en Local Storage y que los gif permanezcan
  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify( this._tagsHistory) );
  }


  private loadLocalStorage():void {
    if( !localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );

    if( this._tagsHistory.length === 0 ) return;
    this.searchTag( this._tagsHistory[0] )

  }

  public searchTag(tag: string):void {

    if (tag.length === 0) return;
    this.organizeHistory(tag);

    //console.log(this.tagHistory);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag )

    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params })
      .subscribe( resp => {

        this.gifList = resp.data;
        //console.log({ gifs: this.gifList });

      })


    /* fetch('https://api.giphy.com/v1/gifs/search?api_key=i2gJ07wV4YKKQEtVrl92mQkHUho7azMZ&q=valorant&limit=10')
      .then( resp => resp.json() )
      .then( data => console.log(data) ); */
  }
}
