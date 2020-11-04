import React, {Component} from 'react';

export default class NumberInput extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <section className="input-section">
                <label htmlFor={this.props.id} className="input-label">{this.props.label}</label>
                <input 
                    id={this.props.id}
                    className={this.props.inputStyle}
                    placeholder={this.props.label}
                    value={this.props.value}
                    type="number"
                    onChange={(event) => {
                        this.props.valChange(event.target.value);
                    }}
                ></input>
            </section>
        )
    }
}