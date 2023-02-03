import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor(private readonly gifsService: GifsService) {}

  get record(){
    return this.gifsService.record;
  }

  search(param: string){
    this.gifsService.searchGifs(param);
  }

}
