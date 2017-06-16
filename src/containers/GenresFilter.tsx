import * as React from "react";
import Genres from "../components/GenresView";
import { IGenre } from "../types";
import config from "../config";

interface IState {
  filterCount: number;
}

interface IProps {
    genres?: IGenre[];
    setFilter: (key: number, value?: number[]) => void;
    maximumCountGroupsOfGenres: number;
}

export default class GenresFilter extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            filterCount: 1,
        };
    }
    public render() {
        const filters = [];
        for (let i = 1; i <= this.state.filterCount; i++) {
            filters.push(
                <div key={i}>
                    <Genres id={i} setFilter={this.props.setFilter.bind(this)}
                            genres={this.props.genres ? this.props.genres : undefined} />
                    <p>Или</p>
                </div>);
        }
        return (
        <div>
            <p>Выберите жанр:</p>
            {filters}
            {this.state.filterCount > 1 ? <div>
                <button onClick={this.removeFilter.bind(this)}>Удалить фильтр</button><br/></div> : ""}
            {this.state.filterCount < this.props.maximumCountGroupsOfGenres ?
                <button onClick={this.addFilter.bind(this)}>Добавить фильтр</button> : ""}
        </div>
        );
    }
    private addFilter(event: React.FormEvent<HTMLButtonElement>) {
        this.setState({ filterCount : this.state.filterCount + 1 });
    }
    private removeFilter() {
        const filterCount = this.state.filterCount;
        this.props.setFilter(filterCount);
        this.setState({ filterCount : filterCount - 1 });
    }
}
