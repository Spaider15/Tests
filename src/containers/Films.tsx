 import * as React from "react";
 import {
    Link,
    Route,
} from "react-router-dom";
 import FilmsView from "../components/FilmsView";
 import GenresFilter from "../containers/GenresFilter";
 import { queryToAPI } from "../helpers";
 import { IFilmsState } from "../types";
 import FilmItem from "./FilmItem";

 const styles = {
     filmsList: {
       float: "left",
     },
     filter: {
        marginLeft: "50px",
        float: "left",
     },
 };

 export default class Films extends React.Component<{}, IFilmsState> {
    constructor(props: any) {
        super(props);
        this.state = {
            loading : true,
            loadingFilter: false,
            filter: {
                limit: 10,
                genres: {},
            },
        };
    }

    public render() {
        if (this.state.loading) {
            return (<Route exact path="/" render={() => (<h1>Loading...</h1>)}/>);
        }
        if (this.state.data) {
            return (
                    <div>
                        <Route exact path="/" key="main" render={() => (
                            <div>
                                <div style={styles.filmsList}>
                                    <h2>Список фильмов:</h2>
                                    {this.state.loadingFilter ? <h3>Loading...</h3> :
                                        <FilmsView data={this.state.data} />}
                                </div>
                                <div style={styles.filter}>
                                    <h2>Фильтр:</h2>
                                    <GenresFilter setFilter={this.setGenreFilter.bind(this)}
                                                  genres={this.state.data ? this.state.data.genres : undefined} />
                                </div>
                            </div>
                        )}/>
                        <Route path="/film/:filmId" key="film" component={FilmItem}/>
                    </div>
            );
        } else {
            return (<Route exact path="/" render={() => (<h1>data is empty</h1>)}/>);
        }
    }
    public async componentDidMount() {
        await this.getFilms();
    }
    private setGenreFilter(value: number[], key: number) {
        const filter = this.state.filter;
        filter.genres[key] = value;
        this.setState({ filter, loadingFilter: true });
        this.getFilms();
    }
    private async getFilms() {
        const filter = this.state.filter;
        let genres: number[][] = [[]];
        if (Object.keys(filter.genres).length > 0) {
            genres = Object.keys(filter.genres).map( (key: any) => {
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
        const data = await queryToAPI(query, { genres });
        this.setState({ loading: false, data: data.viewer, loadingFilter: false });
    }
}
