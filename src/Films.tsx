import * as React from "react";
import {
    BrowserRouter as Router,
    Link,
    Route,
} from "react-router-dom";
import { FilmItem, IFilm  } from "./FilmItem";

interface IState {
    loading: boolean;
    data?: {
        films: IFilm[];
    };
}

export default class Main extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            loading : true,
        };
    }

    public render() {
        if (this.state.loading) {
            return (<h1>Loading...</h1>);
        }
        if (this.state.data) {
            const data = this.state.data;
            const films = data.films.map((film: IFilm, key) =>
                <li key={key}><Link to={film.name}>{film.name}</Link></li>);
            const routes = [];
            routes.push(<Route exact path="/" render={() => (<ul>{films}</ul>)}/>);
            routes.push(...data.films.map((film: IFilm, key) =>
                    <Route path={"/" + film.name} render={() =>
                    (<div><h1>{film.name}</h1><span>{film.description}</span></div>)}/>));
            return (
                <Router>
                    <div>
                        {routes}
                    </div>
                </Router>
            );
        } else {
            return (<div>Data is empty</div>);
        }
    }
    public async componentDidMount() {
        const query = `query q1{                        viewer(
          accessToken:"d8b1408f130778d35d28872fc9a6984d"){
            films(limit:10){
              name
              description
            }
          }
        }`;
        const data = await this.query(query);
        this.setState({ loading: false, data: data.viewer });
    }

    private async query(query: string) {
        const res = await fetch("https://api.droptv.org/graphql", {
            body: JSON.stringify({
                query,
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        });
        if (res.status !== 200) {
            throw new Error("API failure, invalid status: " + res.status + ", " + res.statusText +
                (await res.text()));
        }
        const json = await res.json();
        if (json.errors) {
            throw new Error(json.errors.map((e: any) => e.message).join());
        }

        return json.data;

    }
}
