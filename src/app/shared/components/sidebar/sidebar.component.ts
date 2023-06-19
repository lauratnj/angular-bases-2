import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';
import { Gif } from 'src/app/gifs/interfaces/gifs.interfaces';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
 //TODO: INYECTAR EL SERVICIO - private (esto va a necesitar que cree alguna propiedad pública que el html pueda ver)

  constructor( private gifService: GifsService) {}

  get tags():string[] {
    return this.gifService.tagHistory;
  }

  public searchTag( tag: string ):void {
    return this.gifService.searchTag( tag );
  }

}
