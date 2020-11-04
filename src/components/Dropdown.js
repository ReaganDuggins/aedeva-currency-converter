import React, {Component} from 'react';

export default class Dropdown extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <section className="input-section">
                <label htmlFor={this.props.id} className="input-label">{this.props.label}</label>
                <select 
                    id={this.props.id}
                    className={this.props.inputStyle}
                    placeholder={this.props.label}
                    value={this.props.value}
                    onChange={(event) => {
                        this.props.valChange(event.target.value);
                    }}
                >
                    {
                        this.props.options.map((opt) => {
                            return (
                                <option key={opt}>{opt}</option>
                            );
                        })
                    }
                </select>
            </section>
        )
    }
}