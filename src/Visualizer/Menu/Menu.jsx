import React, { Component } from 'react';
import "./Menu.css";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const { makeArray } = this.props;

        makeArray(100);
        document.getElementById("changeSize").value = 50;
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
        const {
            array,
            algorithm,
            makeArray,
            sort,
            isRunning,
        } = this.props;

        const speed = 570 - Math.pow(array.length, 2) > 0 ?
        570 - Math.pow(array.length, 2) : 0;

        const color = isRunning ? "rgba(214, 29, 29, 0.8)" : "white";

        const cursor = isRunning ? "auto" : "pointer";

        return (
            <div id="menu">
                <div
                    id={!isRunning ? "makeArray" : "makeArrayX"}
                    style={{color: color, cursor: cursor}}
                    onClick={!isRunning ? () => makeArray(array.length) : null}>
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

export default Menu;