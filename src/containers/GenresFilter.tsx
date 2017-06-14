import * as React from "react";
import Genres from "../components/GenresView";
import { IGenre } from "../types";

interface IState {
  1: number[];
  2: number[];
  3: number[];
  filterCount: number;
}

interface IProps {
    genres?: IGenre[];
    setFilter: (filter1: number[], filter2: number[], filter3: number[]) => void;
}

export default class GenresFilter extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            filterCount: 1,
            1: [],
            2: [],
            3: [],
        };
    }
    public render() {
        const filters = [];
        for (let i = 1; i <= this.state.filterCount; i++) {
            filters.push(
                <div key={i}>
                    <Genres id={i} setFilter={this.setGenreFilter.bind(this)}
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
            {this.state.filterCount < 3 ? <button onClick={this.addFilter.bind(this)}>Добавить фильтр</button> : ""}
        </div>
        );
    }
    private setGenreFilter(value: number[], key: number) {
        const filter = { [key] : value };
        this.setState(filter, () => {
            this.props.setFilter(this.state[1], this.state[2], this.state[3]);
        });
    }
    private addFilter(event: React.FormEvent<HTMLButtonElement>) {
        this.setState({ filterCount : this.state.filterCount + 1 });
    }
    private removeFilter() {
        const filterCount = this.state.filterCount;
        this.setGenreFilter([], filterCount);
        this.setState({ filterCount : filterCount - 1 });
    }
}
