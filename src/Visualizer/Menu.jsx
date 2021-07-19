import React from 'react';
import "./Menu.css";

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const { makeArray } = this.props;

        makeArray(100);
        document.getElementById("changeSize").value = 50;
    }

    makeArray(bars) {
        const array = [];
        for (let i = 0; i < bars; i++)
            array.push(randomInt(1, 500));
        this.setState( { array } );
    }

    handleClick(algorithm) {
        const { updateAlgorithm } = this.props;
        updateAlgorithm(algorithm);
    }

    handleChange(event) {
        const { makeArray } = this.props;
        makeArray(Math.floor((parseInt(event.target.value) + 3) * 1.65));
    }

    render() {
        const array = this.state;
        const { algorithm, sort, isRunning, } = this.props;

        const speed = 570 - Math.pow(array.length, 2) > 0 ? 570 - Math.pow(array.length, 2) : 0;

        const color = isRunning ? "rgba(214, 29, 29, 0.8)" : "white";

        const cursor = isRunning ? "auto" : "pointer";

        return (
            <div id="menu">
                <div
                    id={!isRunning ? "makeArray" : "makeArrayX"}
                    style={{color: color, cursor: cursor}}
                    onClick={!isRunning ? () => this.makeArray(array.length) : null}>
                    Make New Array
                </div>
                <div className="separator" />
                <div
                    id="arraySize"
                    style={{color: color}}>
                    Change Array Size & Sorting Speed        
                </div>
                <input
                    id="changeSize"
                    type="range"
                    min="0"
                    max="100"
                    style={{background: color, cursor: cursor}}
                    disabled={isRunning ? "disabled" : null}
                    onChange={this.handleChange} />
                <div className="separator" />
                <div
                    className={algorithm === "selectionSort" ? "currentAlgorithmButton" : "algorithmButton"}
                    onClick={() => this.handleClick("selectionSort")}>
                    Selection Sort
                </div>
                <div className="separator" />
                { algorithm ? <div
                    id="sort"
                    style={{color: color, cursor: cursor}}
                    onClick={!isRunning ? () => sort(algorithm, array, speed) : null}>
                    Sort!
                    </div> : null
                }
            </div>
        );
    }
}

function randomInt(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
}