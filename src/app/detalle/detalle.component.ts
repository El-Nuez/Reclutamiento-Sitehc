import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle',
  imports: [CommonModule],
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit {
  idPokemon: string | null = null;
  detallesPokemon: any = null;
  movimientosIniciales: string[] = [];

  constructor(private rutaActiva: ActivatedRoute, private servicioApi: ApiService) {}

  ngOnInit(): void {
    this.idPokemon = this.rutaActiva.snapshot.paramMap.get('id');
    if (this.idPokemon) {
      this.servicioApi.obtenerDetallePokemon(this.idPokemon).subscribe((datosPokemon) => {
        datosPokemon.weight = (datosPokemon.weight / 10).toFixed(1); 
        this.detallesPokemon = datosPokemon;
        this.movimientosIniciales = this.obtenerMovimientosIniciales(datosPokemon.moves);
      });
    }
  }

  private obtenerMovimientosIniciales(moves: any[]): string[] {
    return moves
      .filter((move) =>
        move.version_group_details.some(
          (detail: any) => detail.level_learned_at === 1
        )
      )
      .map((move) => move.move.name);
  }

  reproducirSonido(): void {
    const id = this.detallesPokemon.id;
    const audioUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`;

    const audio = new Audio(audioUrl);
    audio.onerror = () => {
      alert('El sonido no está disponible para este Pokémon.');
    };
    audio.play();
  }

  regresar(): void {
    history.back();
  }
}
