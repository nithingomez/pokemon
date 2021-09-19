import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) { }


  getAllPokemon(limit: number, offset: number) {
    return this.http.get(`${this.baseUrl}?offset=${offset}&limit=${limit}`);
  }

  getPokemonDetail(url: string) {
    return this.http.get(url);
  }

  getPokemonDetailbyId(id: number) {
    return this.http.get(`${this.baseUrl}${id}`);
  }


}
