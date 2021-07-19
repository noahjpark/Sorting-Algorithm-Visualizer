import React from 'react';
import { getSortAnimations } from '../Algorithms/SortingAlgorithms.js';
import './Visualizer.css';

const SPEED = 75;
const BARS = 6;
const UNSORTED = 'black';
const COMPARE = 'crimson';
const SORTED = 'chartreuse';
const MOVED = 'darkviolet';

export default class Visualizer extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            array: [],
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.makeArray();
    }

    handleChange(event) {
        this.makeArray(Math.floor((parseInt(event.target.value) + 3) * 1.65));
    }

    makeArray() {
        const array = [];
        for (let i = 0; i < BARS; i++) {
            array.push(randomInt(5, 750));
        }
        array.push(750);
        this.setState( { array } );
    }

    markAsSorted(animations, bars) {
        for (let i = 0; i < animations.length; i++) {
            setTimeout(() => {
                const [idx] = animations[i];
                const bstyle = bars[idx].style;
                if (bstyle.backgroundColor !== SORTED) bstyle.backgroundColor = SORTED;
            }, animations.length * SPEED);
        }
    }

    reset(animations, bars) {
        for (let i = 0; i < animations.length; i++) {
            setTimeout(() => {
                const [idx] = animations[i];
                const bstyle = bars[idx].style;
                bstyle.backgroundColor = UNSORTED;
            }, animations.length * SPEED * 1.4);
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
                const color = c === 0 ? COMPARE : UNSORTED;
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
        this.reset(animations, bars);
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
                const color = c === 0 ? COMPARE : UNSORTED;
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
        this.reset(animations, bars);
    }

    visualizeBubbleSort() {
        const animations = getSortAnimations(this.state.array, "Bubble");
        const bars = document.getElementsByClassName('array-bar');

        for (let i = 0; i < animations.length; i++) {
            const compare = animations[i][2] <= 0;

            if (compare) {
                const [b1idx, b2idx, c] = animations[i];
                const b1style = bars[b1idx].style;
                const b2style = bars[b2idx].style;
                const color = c === 0 ? COMPARE : UNSORTED;
                setTimeout(() => {
                    b1style.backgroundColor = color;
                    b2style.backgroundColor = color;
                }, i * SPEED);
            } else {
                setTimeout(() => {
                    const [b1idx, height, c] = animations[i];
                    const b1style = bars[b1idx].style;
                    b1style.height = `${height}px`;
                    if (c === 1) b1style.backgroundColor = MOVED;
                }, i * SPEED);
            }
        }

        this.markAsSorted(animations, bars);
        this.reset(animations, bars);
    }

    visualizeMergeSort() {
        const animations = getSortAnimations(this.state.array, "Merge");
        const bars = document.getElementsByClassNameByClassName('array-bar');

        this.markAsSorted(animations, bars);
    }

    render() {
        const { array, isRunning } = this.state;
        const numHeight = Math.floor(getHeight().height / 10);
        const numWidth = Math.floor(getWidth().width / (array.length * 2));
        const numMargin = array.length < 5 ?
            10 : array.length < 8 ?
            8 : array.length < 11 ?
            6 : array.length < 20 ?
            4 : array.length < 50 ?
            3.5 : array.length < 100 ?
            3 : array.length < 130 ?
            2.5 : 2;

        return (
            <div id="page">
                <div className="menu" style={{height: `${numHeight}px`}}>
                    <div className="button" onClick={!isRunning ? () => this.makeArray() : null}>Make New Array</div>
                </div>
                <div id="array-container">
                    {array.map((value, idx) => ( <div className="array-bar" key={idx} style={{height: `${value}px`, width: `${numWidth}px`, marginLeft: `${numMargin}px`, marginRight: `${numMargin}px`, backgroundColor: UNSORTED}} /> ))}
                </div>
                <div className="menu" style={{height: `${numHeight}px`}}>
                    <div className="button" onClick={!isRunning ? () => this.visualizeSelectionSort() : null}>Selection Sort</div>
                    <div className="button" onClick={!isRunning ? () => this.visualizeInsertionSort() : null}>Insertion Sort</div>
                    <div className="button" onClick={!isRunning ? () => this.visualizeBubbleSort() : null}>Bubble Sort</div>
                    <div className="button" onClick={!isRunning ? () => this.visualizeMergeSort() : null}>Merge Sort</div>
                </div>
            </div>
        );
    }
}

function randomInt(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
}

function getWidth() {
    const { innerWidth: width } = window;
    return { width };
}

function getHeight() {
    const { innerHeight: height } = window;
    return { height };
}