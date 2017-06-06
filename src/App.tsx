import * as React from "react";
import {
    HashRouter as Router,
} from "react-router-dom";
import Films from "./containers/Films";

export default class App extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);
    }
    public render() {
        return(
            <Router basename="/Tests/">
                <Films />
            </Router>
        );
    }
}
