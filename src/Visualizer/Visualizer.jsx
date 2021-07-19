import React from 'react';
import { getSortAnimations } from '../Algorithms/SortingAlgorithms.js';
import './Visualizer.css';

const SPEED = 75;
const BARS = 200;
const PRIMARY_COLOR = 'black';
const SECONDARY_COLOR = 'crimson';
const SORTED = 'chartreuse';
const MOVED = 'darkviolet';

export default class Visualizer extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.makeArray();
    }

    makeArray() {
        const array = [];
        const idx = randomInt(0, BARS);
        for (let i = 0; i < BARS; i++) {
            if (i === idx) array.push(750);
            else array.push(randomInt(5, 750));
        }
        this.setState( { array } );
    }

    markAsSorted(animations, bars) {
        for (let i = 0; i < animations.length; i++) {
            setTimeout(() => {
                const b1style = bars[i].style;
                b1style.backgroundColor = SORTED;
            }, animations.length * SPEED);
        }
    }

    visualizeSelectionSort() {
        const animations = getSortAnimations(this.state.array, "Selection");
        const bars = document.getElementsByClassName('array-bar');

        for (let i = 0; i < animations.length; i++) {
            const compare = animations[i][2] < 1;

            if (compare) {
                const [b1idx, b2idx, c] = animations[i];
                const b1style = bars[b1idx].style;
                const b2style = bars[b2idx].style;
                const color = c === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    b1style.backgroundColor = color;
                    b2style.backgroundColor = color;
                }, i * SPEED);
            } else {
                setTimeout(() => {
                    const [b1idx, height, s] = animations[i];
                    const b1style = bars[b1idx].style;
                    b1style.height = `${height}px`;
                    if (s === 1) b1style.backgroundColor = MOVED;
                }, i * SPEED);
            }
        }

        this.markAsSorted(animations, bars);
    }

    visualizeInsertionSort() {
        const animations = getSortAnimations(this.state.array, "Insertion");
        const bars = document.getElementsByClassName('array-bar');

        for (let i = 0; i < animations.length; i++) {
            const compare = animations[i][2] === 0;

            if (compare) {
                const [b1idx, b2idx, c] = animations[i];
                const b1style = bars[b1idx].style;
                const b2style = bars[b2idx].style;
                const color = c === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    b1style.backgroundColor = color;
                    b2style.backgroundColor = color;
                }, i * SPEED);
            } else {
                setTimeout(() => {
                    const [b1idx, height] = animations[i];
                    const b1style = bars[b1idx].style;
                    b1style.height = `${height}px`;
                    b1style.backgroundColor = MOVED;
                }, i * SPEED);
            }
        }

        this.markAsSorted(animations, bars);
    }

    render() {
        const { array, isRunning } = this.state;

        return (
            <div id="page">
                <div className="menu">
                    <div className="button" onClick={!isRunning ? () => this.makeArray() : null}>Make New Array</div>
                </div>
                <div id="array-container">
                    {array.map((value, idx) => ( <div className="array-bar" key = {idx} style={{ backgroundColor: PRIMARY_COLOR, height: `${value}px`, }} /> ))}
                </div>
                <div className="menu">
                    <div className="button" onClick={!isRunning ? () => this.visualizeSelectionSort() : null}>Selection Sort</div>
                    <div className="button" onClick={!isRunning ? () => this.visualizeInsertionSort() : null}>Insertion Sort</div>
                </div>
            </div>
        );
    }
}

function randomInt(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
}