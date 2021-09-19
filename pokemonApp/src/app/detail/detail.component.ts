import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PokeMon } from '../pokemonModel';



@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(
    private readonly commonService: CommonService,
    private readonly route: ActivatedRoute,
    private readonly spinner: NgxSpinnerService) { }

    pokemonId!: number;
    pokemonData!: PokeMon;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.pokemonId = params[`id`]);
    this.getPokemonDetailbyId(this.pokemonId);
  }

  getPokemonDetailbyId(id: number) {
    this.spinner.show();
    this.commonService.getPokemonDetailbyId(id).subscribe((data: any) => {
      this.pokemonData = {
        id: data.id,
        name: data.name,
        height: data.height,
        weight: data.weight,
        abilities: data.abilities,
        image: data.sprites.other['official-artwork'].front_default,
      };
      this.spinner.hide();
    });
  }
}
