import * as React from "react";
import { IGenre } from "../types";
import {EventHandler} from "react";

interface IProps {
    genres?: IGenre[];
    setFilter: (value: number[][]) => void;
}

export default class Genres extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }
    public render() {
        const genres = this.props.genres || [];
        const genresList = genres.map( (genre, key) => {
            return (<option value={genre.id} key={genre.id}>{genre.name}</option>);
        });

        return(
            <div>
                <div>Выберите жанр:</div>
                <br />
                <select multiple={true} onChange={this.onChange.bind(this)}>
                    <option value="">Выберите жанр</option>
                    {genresList}</select>
            </div>
        );
    }
    private onChange(event: React.FormEvent<HTMLSelectElement>) {
        const target = event.currentTarget;
        const options = target.options;
        const values = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected && +options[i].value !== 0) {
                values.push(+options[i].value);
            }
        }
        if (values.length < 1) {
            return;
        }
        this.props.setFilter([values]);
    }
}
