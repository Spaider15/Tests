import * as React from "react";
import {
    Link,
} from "react-router-dom";

interface IProps {
    caption: string;
    route: string;
}

const styles = {
  navItem : {
    float: "left",
    paddingRight: "20px",
  },
};

export default (props: IProps) => {
    return(
    <Link to={`/${props.route}`}><h3 style={styles.navItem}>{props.caption}</h3></Link>
    );
};

