import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DigimonsService } from 'src/app/services/digimons.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  characterId: string = '';
  character = null as any;
  allFields: [] = []; // Arreglo de personajes

  constructor(
    private actRoute: ActivatedRoute,
    private digimonsSvc: DigimonsService
  ) {
    this.characterId = this.actRoute.snapshot.paramMap.get('id') as string;
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getCharacter()
  }

  /*** Obtener Detalles ***/
  getCharacter() {
    this.digimonsSvc.getCharacterById(this.characterId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.character = res;
        this.getFields();
      },
      error: (error: any) => {
      }
    });
  }

  /*** Obtener Detalles ***/
  getFields() {
    this.allFields = this.character.fields.map(field => field.image);
  }

}
