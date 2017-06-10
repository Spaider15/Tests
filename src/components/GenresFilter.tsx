import * as React from "react";
import { IGenre } from "../types";

interface IProps {
    genres: IGenre[];
    setFilter: (value: number[][]) => void;
}

export default class Genres extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }
    public render() {
        const genres = this.props.genres;
        const genresList = genres.map( (genre, key) => {
            return (<option value={genre.id} key={genre.id}>{genre.name}</option>);
        });

        return(
            <div>
                <div>Выберите жанр:</div>
                <br />
                <select onChange={this.onChange.bind(this)}>
                    <option value="">Выберите жанр</option>
                    {genresList}</select>
            </div>
        );
    }
    private onChange(event: any) {
        if (!event.target.value) {
            return;
        }
        this.props.setFilter([[+event.target.value]]);
    }
}
