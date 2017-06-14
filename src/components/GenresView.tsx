import * as React from "react";
import { IGenre } from "../types";

interface IProps {
    genres?: IGenre[];
    setFilter: (value: number[], key: number) => void;
    id: number;
}

export default class Genres extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }
    public render() {
        const genres = this.props.genres || [];
        const genresList = genres.map( (genre, key) => {
            return (<option key={key} value={genre.id} id={genre.id}>{genre.name}</option>);
        });

        return(
            <div>
                <select multiple={true} onChange={this.onChangeFilter.bind(this)}>
                    <option value="">Выберите жанр</option>
                    {genresList}
                </select>
            </div>
        );
    }
    private onChangeFilter(event: React.FormEvent<HTMLSelectElement>) {
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
        this.props.setFilter(values, this.props.id);
    }
}
