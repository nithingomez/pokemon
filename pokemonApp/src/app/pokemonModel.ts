export interface PokeMon {
    id: number;
    name: string;
    height: number;
    weight: number;
    abilities: Abilities[];
    image: {
        [url: string]: string;
    };
}



export interface Abilities {
    ability: {
        [name: string]: string;
    };
}

