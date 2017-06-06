import * as React from "react";
import { IFilm } from "../types";

export interface IProps {
    film: IFilm;
}

export default (props: IProps) => {
    const film = props.film;
    return (
        <div>
            <h1>{film.name}</h1>
            <div dangerouslySetInnerHTML={{__html: `Описание: ${film.description}`}} />
            <br/>
            <div>Страна: {film.country.name}</div>
            <div>Режисер: {film.director.name}</div>
            <div>Год: {film.year}</div>
            <div>IMDB: {film.ratingIMDB}</div>
            <div>Kinopoisk: {film.ratingKinopoisk}</div>
        </div>
    );
};
