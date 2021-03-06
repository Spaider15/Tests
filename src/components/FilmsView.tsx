import * as React from "react";
import {
    Link,
    Route,
} from "react-router-dom";
import { IData, IFilm } from "../types";

interface IProps {
    data?: IData;
}

export default (props: IProps) => {
    const data = props.data;
    const filmsList = data ? data.films.map((film: IFilm, key: number) =>
        <li key={key}><Link to={`film/${film.id}`}>{film.name}</Link></li>) : "";
    return (
        <ul>{filmsList}</ul>
    );
};
