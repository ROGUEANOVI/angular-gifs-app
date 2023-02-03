import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent  {

  @ViewChild("txtSearch") txtSearch!: ElementRef<HTMLInputElement>;


  constructor(private readonly gifService: GifsService){}

  search(){
    const value = this.txtSearch.nativeElement.value;
    if(value.trim().length === 0){
      return;
    }
    this.txtSearch.nativeElement.value = "";
    this.gifService.searchGifs(value);
  }

}
