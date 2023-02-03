import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historyList: string[] = [];

  private _apiUrl: string = "http://api.giphy.com/v1/gifs";

  private _apiKey: string = "zyZ63lkVTSy9Q9VMUyZybFwjH6Mxuy3R";

  public results: Gif[] = [];   

  get record(){
    return [...this._historyList];
  }

  constructor(private readonly http: HttpClient){
    
    if (localStorage.getItem("record")) {
      this._historyList = JSON.parse(localStorage.getItem("record")!);
    }

    if (localStorage.getItem("results")) {
      this.results = JSON.parse(localStorage.getItem("results")!);
    }
  }

  searchGifs(query: string){

    const gif = this._historyList.find(gif => gif.toLowerCase() === query.toLowerCase());
    
    if(!gif){
      this._historyList.unshift(query);
      this._historyList = this._historyList.splice(0, 10);
      localStorage.setItem("record" , JSON.stringify(this._historyList));
    }

    const params = new HttpParams()
      .set("api_key", this._apiKey)
      .set("limit", "10")
      .set("q", query);

    this.http.get<SearchGifsResponse>(`${this._apiUrl}/search`, {params})
      .subscribe({
        next: (res) => {
          this.results = res.data;
          localStorage.setItem("results" , JSON.stringify(this.results));
        },
        error: err => console.log(err)
      });
  }



}
