import * as React from "react";
import FilmsView from "../components/FilmsView";
import GenresFilter from "../containers/GenresFilter";
import {queryToAPI} from "../helpers";
import {IFilmsState} from "../types";
import FilmItem from "./FilmItem";

const styles = {
    main: {
        display: "flex",
        flexDirection: "row" as "row",
    },
    filter: {
        marginLeft: "50px",
    },
};

interface IProps {
    maximumCountGroupsOfGenres: number;
}

export default class Films extends React.Component<IProps, IFilmsState> {
    constructor(props: any) {
        super(props);
        this.state = {
            loading: true,
            loadingFilter: false,
            filter: {
                limit: 10,
                genres: {},
            },
        };
    }

    public render() {
        if (this.state.loading) {
            return (<h1>Loading...</h1>);
        }
        if (this.state.data) {
            return (
                    <div style={styles.main}>
                        <div>
                            <h2>Список фильмов:</h2>
                            {this.state.loadingFilter ? <h3>Loading...</h3> :
                                <FilmsView data={this.state.data}/>}
                        </div>
                        <div style={styles.filter}>
                            <h2>Фильтр:</h2>
                            <GenresFilter setFilter={this.setGenreFilter.bind(this)}
                                          maximumCountGroupsOfGenres={this.props.maximumCountGroupsOfGenres}
                                          genres={this.state.data ? this.state.data.genres : undefined}/>
                        </div>
                    </div>
            );
        } else {
            return (<h1>data is empty</h1>);
        }
    }

    public async componentDidMount() {
        await this.getFilms();
    }

    private setGenreFilter(key: number, value?: number[]) {
        const filter = this.state.filter;
        if (!value) {
            delete filter.genres[key];
        } else {
            filter.genres[key] = value;
        }
        this.setState({filter, loadingFilter: true});
        this.getFilms();
    }

    private async getFilms() {
        const filter = this.state.filter;
        let genres: number[][] = [[]];
        if (Object.keys(filter.genres).length > 0) {
            genres = Object.keys(filter.genres).map((key: any) => {
                return filter.genres[key];
            });
        }
        const query = `query($genres:[[Int]]!) {                        viewer(
          accessToken:"d8b1408f130778d35d28872fc9a6984d"){
            films(limit:${filter.limit},genres: {or: $genres}){
              name
              id
            }
            genres {
               id
               name
            }
          }
        }`;
        const data = await queryToAPI(query, {genres});
        this.setState({loading: false, data: data.viewer, loadingFilter: false});
    }
}
