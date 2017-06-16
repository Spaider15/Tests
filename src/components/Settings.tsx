import * as React from "react";

interface IProps {
    value: number;
    setSettings: (value: number) => void;
}

interface IState {
    inputValue: number;
}

export default class Settings extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            inputValue: this.props.value,
        };
    }

    public render() {
        return (
            <form>
                <p>
                    Введите количество фильтров: <input onChange={this.onInputChange.bind(this)}  type="number"
                                                        defaultValue={this.props.value + ""}/>
                </p>
                <button onClick={this.onClickHandler.bind(this)}>Применить</button>
            </form>
        );
    }

    private onClickHandler(event: React.FormEvent<HTMLButtonElement>) {
        this.props.setSettings(this.state.inputValue);
    }

    private onInputChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({ inputValue: +event.currentTarget.value });
    }
};