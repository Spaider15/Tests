import * as React from "react";
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
            return(<h1>Loading...</h1>);
        } else {
            const films = this.state.data ? this.state.data.films.map((film: IFilm, key) =>
                <li key={key}><FilmItem film={film}/></li>) : [];
            return(<ul>{films}</ul>);
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
