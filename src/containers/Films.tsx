 import * as React from "react";
 import {
    BrowserRouter as Router,
    Link,
    Route,
} from "react-router-dom";
 import FilmsView from "../components/FilmsView";
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
            return (<Route exact path="/Tests/" render={() => (<h1>Loading...</h1>)}/>);
        }
        if (this.state.data) {
            return (
                    <div>
                        <FilmsView data={this.state.data} />
                        <Route path="/Tests/film/:filmId" key="film" component={FilmItem}/>
                    </div>
            );
        } else {
            return (<Route exact path="/Tests/" render={() => (<h1>data is empty</h1>)}/>);
        }
    }
    public async componentDidMount() {
        const query = `query q1{                        viewer(
          accessToken:"d8b1408f130778d35d28872fc9a6984d"){
            films(limit:10){
              name
              id
            }
          }
        }`;
        const data = await queryToAPI(query);
        this.setState({ loading: false, data: data.viewer });
    }
}

