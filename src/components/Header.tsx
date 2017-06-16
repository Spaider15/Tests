import * as React from "react";
import NavItem from "./NavigationItem";

export default class Header extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);
    }
    public render() {
        return(
            <nav>
                <NavItem route="" caption="Главная" />
                <NavItem route="settings" caption="Настройки" />
            </nav>
        );
    }
}
