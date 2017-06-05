import * as React from "react";

export interface IProps {
    name: string;
}

export default (props: IProps) => {
    return (
        <span>{props.name}</span>
    );
};
