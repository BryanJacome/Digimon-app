import { Component, OnInit, inject } from '@angular/core';
import { DigimonsService } from 'src/app/services/digimons.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  characters: any[] = []; // Arreglo de personajes
  currentPage: number = 1; // Página actual
  itemsPerPage: number = 20; // Elementos por página
  totalPages: number = 0; // Total de páginas

  constructor(private digimonsSvc: DigimonsService) { }

  ngOnInit(): void {
    this.loadCharacters(); // Cargar personajes cuando se inicia el componente
  }

  loadCharacters(): void {
    // Llamar al servicio para obtener los personajes de la página actual
    this.digimonsSvc.getDigimon(this.itemsPerPage).subscribe(
      (res: any) => {
        this.characters = res.content; // Actualizar arreglo de personajes
        //this.totalPages = Math.ceil(res.totalElements / this.itemsPerPage); // Calcular el total de páginas
      },
      (error: any) => {
        console.error('Error al obtener personajes:', error);
      }
    );
  }

  nextPage(): void {
    this.itemsPerPage += 20;
    this.currentPage += 1;
    this.loadCharacters();
  }
}
