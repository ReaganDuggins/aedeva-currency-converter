import './App.css';
import NumberInput from './components/NumberInput';
import Currencies from './components/Currencies';
import { Component } from 'react';

export default class App extends Component {
    constructor(props) {
        super(props);

        

        this.state = {
            leftSideTotal: "",
            rightSideTotal: "",
            currencies: {
                suns: {
                    name: "Suns",
                    denominations: Object.keys(Currencies.suns),
                },
                ord: {
                    name: "Ord",
                    denominations: Object.keys(Currencies.ord),
                },
            },
            inputs: {
                ord: {
                    clod: 0,
                    og: 0,
                    clop: 0,
                    et: 0,
                    ord: 0,
                    bone: 0,
                    stone: 0,
                    ice: 0,
                    flame: 0,
                    cloud: 0,
                    bolt: 0,
                },
                suns: {
                    set: 0,
                    star: 0,
                    sun: 0,
                    constellation: 0,
                }
            }
        }
    }

    setCurrencyAmount = (currency, denom, newValue) => {
        let oldInputs = this.state.inputs;
        oldInputs[currency][denom] = newValue;
        this.setState({
            inputs: oldInputs
        });
    }

    showCurrencyInputs = (currency) => {
        let currencyInfo = this.state.currencies[currency];
        return currencyInfo.denominations.map((denomination,i) => {
            if(denomination == "baseUnit") {
                return <span></span>;
            }
            let capitalizedLabel = this.capitalize(denomination);
            return (
                <section>
                    <NumberInput
                        label={capitalizedLabel}
                        id={denomination + ""}
                        className="number-input"
                        placeholder={denomination + "s"}
                        value={this.state.currencies[currency][denomination]}
                        valChange={
                            (newVal) => {
                                this.setCurrencyAmount(currency, denomination, newVal);
                            }
                        }
                    >
                    </NumberInput>
                </section>
            );
        });
    }

    capitalize = (word) => {
        let firstLetterCaps = word.toString()[0].toUpperCase();
        let restOfWord = word.substring(1, word.toString().length);
        return firstLetterCaps + restOfWord;
    }

    calculateBaseTotal = (currency) => {
        let denoms = Object.keys(this.state.inputs[currency]);
        let total = 0;
        denoms.forEach((denom) => {
            let coins = this.state.inputs[currency][denom];
            let valuePerCoin = Currencies[currency][denom];
            let subtotal = coins * valuePerCoin;
            if(!isNaN(subtotal)) total += subtotal;
        });
        return total;
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <table>
                        <tr>
                            <td>
                                <section>
                                    <h1>Ord</h1>
                                    {this.showCurrencyInputs("ord")}
                                    <button onClick={this.ordToSuns}>Convert to Suns</button>
                                    <section className="result-box">
                                        {
                                            this.showConversionOrd()
                                        }
                                        <label>

                                        </label>
                                    </section>
                                </section>
                            </td>
                            <td>
                                <section>
                                    <h1>Suns</h1>
                                    {this.showCurrencyInputs("suns")}
                                    <button onClick={this.sunsToOrd}>Convert to Ord</button>
                                    <section className="result-box">
                                        {
                                            this.showConversionSuns()
                                        }
                                        <label>

                                        </label>
                                    </section>
                                </section>
                            </td>
                        </tr>
                    </table>
                </header>
            </div>
        );
    }

    ordToSuns = () => {
        let ordBaseTotal = this.calculateBaseTotal('ord');
        let sunTotals = {};

        Object.keys(Currencies.suns).reverse().forEach((denom) => {
            if(ordBaseTotal <= 0) {
                sunTotals[denom] = 0;
                return;
            }

            let currentDenomValue = Currencies.suns[denom];
            let coins = Math.floor(ordBaseTotal / currentDenomValue);
            sunTotals[denom] = coins;
            if(coins < 1) {
                return;
            }
            ordBaseTotal -= (coins * currentDenomValue);
        });
        
        if(ordBaseTotal > 0) {
            let lowestCurrencyName = Object.keys(Currencies.suns)[0];
            let lowestCurrencyValue = Currencies.suns[lowestCurrencyName];
            let remainderRounded = Math.round((ordBaseTotal / lowestCurrencyValue) * 100) / 100;
            sunTotals[lowestCurrencyName] += remainderRounded;
        }
        
        this.setState({
            leftSideTotal: sunTotals
        });
    }

    showConversionOrd = () => {
        return Object.keys(this.state.leftSideTotal).reverse().map((denom) => {
            return (
                <section className="result-section">
                    <label>{this.capitalize(denom)}s:</label>
                    {this.state.leftSideTotal[denom]}
                </section>
            )
        });
    }

    sunsToOrd = () => {
        let sunBaseTotal = this.calculateBaseTotal('suns');
        let ordTotals = {};

        Object.keys(Currencies.ord).reverse().forEach((denom) => {
            console.log("DENOM IS: ", denom)
            if(sunBaseTotal <= 0) {
                ordTotals[denom] = 0;
                return;
            }

            let currentDenomValue = Currencies.ord[denom];
            let coins = Math.floor(sunBaseTotal / currentDenomValue);
            ordTotals[denom] = coins;
            if(coins < 1) {
                return;
            }
            sunBaseTotal -= (coins * currentDenomValue);
        });
        
        if(sunBaseTotal > 0) {
            let lowestCurrencyName = Object.keys(Currencies.ord)[0];
            let lowestCurrencyValue = Currencies.ord[lowestCurrencyName];
            let remainderRounded = Math.round((sunBaseTotal / lowestCurrencyValue) * 100) / 100;
            ordTotals[lowestCurrencyName] += remainderRounded;
        }

        console.log("&&&&&", ordTotals);
        
        this.setState({
            rightSideTotal: ordTotals
        });
    }

    showConversionSuns = () => {
        return Object.keys(this.state.rightSideTotal).reverse().map((denom) => {
            return (
                <section className="result-section">
                    <label>{this.capitalize(denom)}s:</label>
                    {this.state.rightSideTotal[denom]}
                </section>
            )
        });
    }
}
