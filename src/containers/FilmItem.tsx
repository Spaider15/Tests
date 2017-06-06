import * as React from "react";
import {RouteComponentProps} from "react-router";
import { queryToAPI } from "../helpers";
import { IFilmItemState } from "../types";
import FilmView from "../components/FilmView";

interface IMatchOptions {
    filmId: string;
}

type IProps = RouteComponentProps<IMatchOptions>;

export default class FilmItem extends React.Component<IProps, IFilmItemState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            loading: true,
        };
    }
    public async componentDidMount() {
        const id = this.props.match.params.filmId;
        const query = `query q1{                        viewer(
          accessToken:"d8b1408f130778d35d28872fc9a6984d"){
            film(id:${id}){
              name
              description
              nameEng
              ratingKinopoisk
              ratingIMDB
              country{
                name
              }
              year
              director{
                name
              }
            }
          }
        }`;
        const data = await queryToAPI(query);
        this.setState( { loading: false, data : data.viewer.film } );
    }
    public render() {
        if (this.state.loading) {
            return (
                <h1>Loading Film...</h1>
            );
        } else {
            if (this.state.data) {
                return (
                    <FilmView film={this.state.data}/>
                );
            } else {
                return(
                    <h1>No information about this film</h1>
                );
            }

        }
    }
}
