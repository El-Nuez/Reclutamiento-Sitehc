import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-paginada',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './lista-paginada.component.html',
  styleUrl: './lista-paginada.component.css'
})
export class ListaPaginadaComponent implements OnInit {
  listaPokemon: { nombre: string; url: string; imagen: string }[] = [];
  offset: number = 0; 
  limit: number = 12;
  paginas: number[] = []; 
  tipoSeleccionado: string = '';
  idSeleccionado: string = '';
  NombreSeleccionado: string = '';
  totalPokemons: number = 0;

  constructor(private servicioApi: ApiService) {}

  ngOnInit(): void {
    this.cargarPokemon(); 
    this.paginas = this.calcularPaginas();
  }

  buscarPorTipo(event: Event): void {
    const valor = (event.target as HTMLSelectElement).value;
    if (valor) {
      this.servicioApi.obtenerPokemonPorTipo(valor).subscribe((data) => {
        this.listaPokemon = data.pokemon.map((entry: any) => ({
          nombre: entry.pokemon.name,
          url: entry.pokemon.url,
          imagen: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${entry.pokemon.url.split('/').slice(-2)[0]}.png`,
        }));
      });
    }
  }
  
  buscarPorID_Nombre(event: Event): void {
    const valor = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    if (!valor) {
      return;
    }
  
    // checa si es un ID o Nombre
    const esID = !isNaN(Number(valor));
  
    if (esID) {
      this.servicioApi.obtenerDetallePokemon(valor).subscribe((data) => {
        this.listaPokemon = [
          {
            nombre: data.name,
            url: `https://pokeapi.co/api/v2/pokemon/${valor}/`,
            imagen: data.sprites.front_default || 'https://mcfil.net.ar/wp-content/uploads/2021/04/no-dispnible.jpg',
          },
        ];
      });
    } else {
      this.servicioApi.obtenerDetallePokemon(valor).subscribe((data) => {
        this.listaPokemon = [
          {
            nombre: data.name,
            url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`,
            imagen: data.sprites.front_default || 'https://mcfil.net.ar/wp-content/uploads/2021/04/no-dispnible.jpg',
          },
        ];
      });
    }
  }
  
  
  
  
  limpiarBusqueda(): void {
    this.tipoSeleccionado = ''; 
    this.idSeleccionado = ''; 
    this.NombreSeleccionado = ''; 
    this.listaPokemon = []; 
    this.cargarPokemon(); 
  }
  

  cargarPokemon(): void {
    this.servicioApi.obtenerListaPokemon(this.offset, this.limit).subscribe((data) => {
      this.totalPokemons = data.count; 
      this.listaPokemon = data.results.map((pokemon: any) => ({
        nombre: pokemon.name,
        url: pokemon.url,
        imagen: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          pokemon.url.split('/').slice(-2)[0]
        }.png`,
      })).map((pokemon: any) => {
        if (!pokemon.imagen) {
          pokemon.imagen = 'https://mcfil.net.ar/wp-content/uploads/2021/04/no-dispnible.jpg';
        }
        return pokemon;
      });
      this.paginas = this.calcularPaginas(); 
    });
  }
    
  calcularPaginas(): number[] {
    const totalPaginas = Math.ceil(this.totalPokemons / this.limit);
    const paginaActual = this.offset / this.limit + 1;
  
    const maxBotonesVisibles = 6;
    const paginasAntes = Math.floor(maxBotonesVisibles / 2);
    const paginasDespues = Math.floor(maxBotonesVisibles / 2);
  
    let rangoInicio = Math.max(paginaActual - paginasAntes, 1);
    let rangoFin = Math.min(rangoInicio + maxBotonesVisibles - 1, totalPaginas);
  
    if (rangoFin - rangoInicio + 1 < maxBotonesVisibles) {
      const diferencia = maxBotonesVisibles - (rangoFin - rangoInicio + 1);
      if (rangoInicio > 1) {
        rangoInicio = Math.max(rangoInicio - diferencia, 1);
      } else if (rangoFin < totalPaginas) {
        rangoFin = Math.min(rangoFin + diferencia, totalPaginas);
      }
    }
  
    return Array.from({ length: rangoFin - rangoInicio + 1 }, (_, i) => rangoInicio + i);
  }
  
  calcularUltimaPagina(): number {
    return Math.ceil(this.totalPokemons / this.limit); 
  }

  siguientePagina(): void {
    if (this.offset + this.limit < this.totalPokemons) {
      this.offset += this.limit;
      this.cargarPokemon();
    }
  }
  
  paginaAnterior(): void {
    if (this.offset > 0) {
      this.offset -= this.limit;
      this.cargarPokemon();
    }
  }
  
  irAPagina(numeroPagina: number): void {
    this.offset = (numeroPagina - 1) * this.limit;
    this.cargarPokemon();
  }
  
  
}
