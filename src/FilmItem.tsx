import * as React from "react";

export interface IFilm {
    name: string;
    description: string;
}

interface IProps {
    film: IFilm;
}

const styles = {
    information : {
        display: "none",
    },
};

export const FilmItem = (props: IProps) => {
    const film = props.film;
    return (
        <div>
            <span onClick={onFilmClickHandler}>{film.name}</span>
            <span style={styles.information}>Описание: {film.description}</span>
        </div>
    );
};

const onFilmClickHandler = (event: any) => {
    event.target.nextElementSibling.style.display = "block";
};
