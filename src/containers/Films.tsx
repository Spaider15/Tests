 import * as React from "react";
 import {
    Link,
    Route,
} from "react-router-dom";
 import FilmsView from "../components/FilmsView";
 import Genres from "../components/Genres";
 import { queryToAPI } from "../helpers";
 import { IFilmsState } from "../types";
 import FilmItem from "./FilmItem";

 export default class Films extends React.Component<{}, IFilmsState> {
    constructor(props: any) {
        super(props);
        this.state = {
            loading : true,
        };
    }

    public render() {
        if (this.state.loading) {
            return (<Route exact path="/" render={() => (<h1>Loading...</h1>)}/>);
        }
        if (this.state.data) {
            return (
                    <div>
                        <h2>Список фильмов:</h2>
                        <FilmsView data={this.state.data} />
                        <Genres genres={this.state.data.genres} />
                        <Route path="/film/:filmId" key="film" component={FilmItem}/>
                    </div>
            );
        } else {
            return (<Route exact path="/" render={() => (<h1>data is empty</h1>)}/>);
        }
    }
    public async componentDidMount() {
        const query = `query q1{                        viewer(
          accessToken:"d8b1408f130778d35d28872fc9a6984d"){
            films(limit:10){
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

