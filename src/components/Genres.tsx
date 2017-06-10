import * as React from "react";
import { IGenre } from "../types";

interface IProps {
    genres: IGenre[];
}

export default class Genres extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }
    public render() {
        const genres = this.props.genres;
        const genresList = genres.map( (genre, key) => {
            return (<li key={key}>{genre.name}</li>);
        });

        return(
            <div>
                <h2>Список жанров:</h2>
                <ul>{genresList}</ul>
            </div>
        );
    }
}
