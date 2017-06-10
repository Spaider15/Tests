 import * as React from "react";
 import {
    Link,
    Route,
} from "react-router-dom";
 import FilmsView from "../components/FilmsView";
 import GenresFilter from "../components/GenresFilter";
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
            filter: {
                limit: 10,
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
                                    <FilmsView data={this.state.data} />
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
    private setGenreFilter(value: number[][]) {
        const filter = this.state.filter;
        filter.genre = value;
        this.setState({ filter });
        this.getFilms();
    }
    private async getFilms() {
        const filter = this.state.filter;
        console.log(filter);
        const query = `query q1{                        viewer(
          accessToken:"d8b1408f130778d35d28872fc9a6984d"){
            films(limit:${filter.limit}, ${filter.genre ? `genres: {or: [[${filter.genre}]]}` : ""}){
              name
              id
            }
            genres {
               id
               name
            }
          }
        }`;
        const data = await queryToAPI(query);
        this.setState({ loading: false, data: data.viewer });
    }
}
