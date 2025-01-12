import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private urlBasePokemon = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private clienteHttp: HttpClient) {}

  obtenerDetallePokemon(id: string): Observable<any> {
    return this.clienteHttp.get(`${this.urlBasePokemon}${id}`);
  }
  obtenerListaPokemon(offset: number, limit: number): Observable<any> {
    return this.clienteHttp.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
  }
  obtenerPokemonPorTipo(tipo: string): Observable<any> {
    return this.clienteHttp.get(`https://pokeapi.co/api/v2/type/${tipo}`);
  }
  
  
}
