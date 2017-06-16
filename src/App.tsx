import * as React from "react";
import {
    HashRouter as Router,
} from "react-router-dom";
import Main from "./containers/Main";

export default class App extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);
    }
    public render() {
        return(
            <Router>
                <Main />
            </Router>
        );
    }
}
