/**
 * Created by ia.busarov on 06.06.2017.
 */
export interface IFilm {
    name: string;
    description: string;
    id: string;
    nameEng: string;
    ratingKinopoisk: string;
    ratingIMDB: string;
    country: { name: string };
    year: string;
    director: { name: string };
}

export interface IGenre {
    id: string;
    name: string;
}

export interface IData {
    films: IFilm[];
    genres: IGenre[];
}

export interface IFilmsState {
    loading: boolean;
    data?: IData;
}

export interface IFilmItemState {
    loading: boolean;
    data?: IFilm;
}
