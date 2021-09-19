import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { CommonService } from '../common.service';
import * as RESOURCES from '../../assets/pokemonRes';
import { Router } from '@angular/router';
import { PokeMon } from '../pokemonModel';


@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  pokemonArray: any = [];
  pokemonDetailArray: PokeMon[] = [];
  pokemonDetailArrayOrg: PokeMon[] = [];
  pokemonArrayUrl: any = [];
  searchText: any = '';
  paginationConfig = {
    currentPage: 1,
    itemsPerPage: 10,
  };
  sortCriteriaArray = [RESOURCES.SearchCriteria.NAME, RESOURCES.SearchCriteria.WEIGHT, RESOURCES.SearchCriteria.HEIGHT];
  selectedCriteria: any = RESOURCES.SearchCriteria.NAME;
  constructor(
    private readonly commonService: CommonService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.getAllPokemon(RESOURCES.LIMIT, RESOURCES.OFFSET);

  }

  getAllPokemon(limit: number, offset: number) {
    this.commonService.getAllPokemon(limit, offset).subscribe((data: any) => {
      this.pokemonArray = data.results;


      this.pokemonArray.forEach((row: any) => {
        this.pokemonArrayUrl.push(this.commonService.getPokemonDetail(row.url));
      });

      forkJoin([...this.pokemonArrayUrl]).subscribe(
        res => {
          res.forEach((details: any) => {
            const row = {
              id: details.id,
              name: details.name,
              height: details.height,
              weight: details.weight,
              abilities: details.abilities,
              image: details.sprites.other['official-artwork'].front_default,
            };
            this.pokemonDetailArray.push(row);
            this.pokemonDetailArrayOrg.push(row);
            if (localStorage.getItem('searchText')) {
              this.pokemonDetailArray =
              this.searchTextMethod(localStorage.getItem('searchText'),
              this.pokemonDetailArrayOrg, this.selectedCriteria);
              this.searchText = localStorage.getItem('searchText');
            }
            if (localStorage.getItem('selectedSort')) {
              this.sortByMethod(localStorage.getItem('selectedSort'), this.pokemonDetailArray);
              this.selectedCriteria = localStorage.getItem('selectedSort');
            }
          });

        });

    }
    );
  }

  pageChange(selectedPage: number) {
    this.paginationConfig.currentPage = selectedPage;
  }

  sortBy() {
    localStorage.setItem('selectedSort', this.selectedCriteria);
    this.pokemonDetailArray = this.sortByMethod(this.selectedCriteria, this.pokemonDetailArray);
  }

  setItemsPerPage(totalItems: any) {
    const newObj = { ...this.paginationConfig };
    newObj.itemsPerPage = Number(totalItems);
    this.paginationConfig = { ...newObj };
  }

  search() {
    localStorage.setItem('searchText', this.searchText);
    this.pokemonDetailArray = this.searchTextMethod(this.searchText, this.pokemonDetailArrayOrg, this.selectedCriteria);
  }

  sortByMethod(selectedSortType: any, pokemonDetailArray: PokeMon[]) {
    switch (selectedSortType) {
      case RESOURCES.SearchCriteria.NAME:
        return pokemonDetailArray.sort((a, b) => a.name.localeCompare(b.name));
      case RESOURCES.SearchCriteria.HEIGHT:
        return pokemonDetailArray.sort((a, b) => b.height - a.height);
      case RESOURCES.SearchCriteria.WEIGHT:
        return pokemonDetailArray.sort((a, b) => b.weight - a.weight);
      default:
        return pokemonDetailArray.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  searchTextMethod(searchText: any, pokemonDetailArrayOrg: PokeMon[], selectedCriteria: string) {
    let finalArray = [];
    if (searchText) {
      const nameSearchResult = pokemonDetailArrayOrg.filter(item => item.name.includes(searchText));
      const abilitySearchResult = pokemonDetailArrayOrg.filter(obj =>
        obj.abilities.some(item =>
          item.ability.name.includes(searchText)));
      finalArray = nameSearchResult.concat(abilitySearchResult);
      finalArray = this.sortByMethod(selectedCriteria, finalArray);
      this.paginationConfig.currentPage = 1;
    } else {
      finalArray = JSON.parse(JSON.stringify(pokemonDetailArrayOrg));
      finalArray = this.sortByMethod(selectedCriteria, finalArray);
    }
    return finalArray;
  }

  goToDetail(pokemon: PokeMon) {
    this.router.navigate([`${pokemon.id}`]);
  }

}
