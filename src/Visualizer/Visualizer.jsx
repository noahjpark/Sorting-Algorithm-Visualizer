import React from 'react';
import { getSortAnimations } from '../Algorithms/SortingAlgorithms.js';
import './Visualizer.css';

const UNSORTED = 'black';
const COMPARE = 'crimson';
const SORTED = 'chartreuse';
const MOVED = 'darkviolet';

export default class Visualizer extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            array: [],
            speed: 75,
            inProgress: false,
            algorithm: "",
        };
        this.handleSizeChange = this.handleSizeChange.bind(this);
        this.handleSpeedChange = this.handleSpeedChange.bind(this);
    }

    componentDidMount() {
        this.makeArray(5);
    }

    handleSizeChange(event) {
        this.makeArray(event.target.value);
    }

    handleSpeedChange(event) {
        this.updateSpeed(event.target.value);
    }

    updateSpeed(newSpeed) {
        this.setState(() => {
            return { speed: newSpeed };
        });
    }

    markInProgress(alg) {
        this.setState(() => {
            return { inProgress: true, algorithm: alg };
        });
    }

    markAsFinished() {
        this.setState(() => {
            return { inProgress: false, algorithm: "" };
        });
    }

    makeArray(bars) {
        if (!this.state.inProgress) {
            const array = [];
            for (let i = 0; i < bars; i++) {
                array.push(randomInt(5, 750));
            }
            array.push(750);
            this.setState(() => {
                return { array: array }; 
            });
        }
    }

    getMargin() {
        const { array } = this.state;
        return array.length < 5 ?
            10 : array.length < 8 ?
            8 : array.length < 11 ?
            6 : array.length < 20 ?
            4 : array.length < 50 ?
            3 : array.length < 100 ?
            2 : array.length < 130 ?
            1 : 0.5;
    }

    markAsSorted(animations, bars) {
        for (let i = 0; i < animations.length; i++) {
            setTimeout(() => {
                const [idx] = animations[i];
                const bstyle = bars[idx].style;
                if (bstyle.backgroundColor !== SORTED) bstyle.backgroundColor = SORTED;
            }, animations.length * this.state.speed);
        }

        this.reset(animations, bars);
    }

    reset(animations, bars) {
        for (let i = 0; i < animations.length; i++) {
            setTimeout(() => {
                const [idx] = animations[i];
                const bstyle = bars[idx].style;
                bstyle.backgroundColor = UNSORTED;
            }, (animations.length * this.state.speed) + 1500);
        }
        setTimeout(() => {
            this.markAsFinished();
            console.log("Finished");
        }, (animations.length * this.state.speed) + 1501);
    }

    visualizeSelectionSort() {
        this.markInProgress("Selection");
        setTimeout(() => {
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
                    }, i * this.state.speed);
                } else {
                    setTimeout(() => {
                        const [b1idx, height, s] = animations[i];
                        const b1style = bars[b1idx].style;
                        b1style.height = `${height}px`;
                        if (s === 1) b1style.backgroundColor = MOVED;
                    }, i * this.state.speed);
                }
            }

            this.markAsSorted(animations, bars);
        }, 100);
    }

    visualizeInsertionSort() {
        this.markInProgress("Insertion");
        setTimeout(() => {
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
                    }, i * this.state.speed);
                } else {
                    setTimeout(() => {
                        const [b1idx, height] = animations[i];
                        const b1style = bars[b1idx].style;
                        b1style.height = `${height}px`;
                        b1style.backgroundColor = MOVED;
                    }, i * this.state.speed);
                }
            }

            this.markAsSorted(animations, bars);
        }, 100);
    }

    visualizeBubbleSort() {
        this.markInProgress("Bubble");
        setTimeout(() => {
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
                    }, i * this.state.speed);
                } else {
                    setTimeout(() => {
                        const [b1idx, height, c] = animations[i];
                        const b1style = bars[b1idx].style;
                        b1style.height = `${height}px`;
                        if (c === 1) b1style.backgroundColor = MOVED;
                    }, i * this.state.speed);
                }
            }

            this.markAsSorted(animations, bars);
        }, 100);
    }

    visualizeMergeSort() {
        this.markInProgress("Merge");
        setTimeout(() => {
            const animations = getSortAnimations(this.state.array, "Merge");
            const bars = document.getElementsByClassName('array-bar');

            for (let i = 0; i < animations.length; i++) {
                const compare = animations[i][2] <= 0;

                console.log(animations[i][0] + " " + animations[i][1] + " " + animations[i][2]);

                if (compare) {
                    const [b1idx, b2idx, c] = animations[i];
                    const b1style = bars[b1idx].style;
                    const b2style = bars[b2idx].style;
                    const color = c === 0 ? COMPARE : MOVED;
                    setTimeout(() => {
                        b1style.backgroundColor = color;
                        b2style.backgroundColor = color;
                    }, i * this.state.speed);
                } else {
                    setTimeout(() => {
                        const [b1idx, height] = animations[i];
                        const b1style = bars[b1idx].style;
                        b1style.height = `${height}px`;
                        b1style.backgroundColor = MOVED;
                    }, i * this.state.speed);
                }
            }

            this.markAsSorted(animations, bars);
        }, 100);
    }

    render() {
        const { array, inProgress, algorithm } = this.state;
        const numHeightTop = Math.floor(getHeight().height / 8);
        const numHeightBottom = Math.floor(getHeight().height / 10);
        const numWidth = Math.floor(getWidth().width / (array.length * 1.25));
        const numMargin = this.getMargin();

        return (
            <div id="page">
                <div className="menu" style={{height: `${numHeightTop}px`}}>
                    <div id="makeArrayContainer">
                        <p>Make New Array</p>
                        <div className="makeArrayButton" onClick={!inProgress ? () => this.makeArray(array.length - 1) : null}>Shuffle!</div>
                    </div>
                    <div className="space" />
                    <div id="sizeSliderContainer">
                        <p>Change Array Size</p>
                        <input type="range" min="1" max="250" onChange={!inProgress ? this.handleSizeChange : null} class="slider" />
                    </div>
                    <div className="space" />
                    <div id="speedSliderContainer">
                        <p>Change Sorting Speed</p>
                        <input type="range" min="1" max="75" onChange={!inProgress ? this.handleSpeedChange : null} class="slider" />
                    </div>
                </div>
                <div id="array-container">
                    {array.map((value, idx) => ( <div className="array-bar" key={idx} style={{height: `${value}px`, width: `${numWidth}px`, marginLeft: `${numMargin}px`, marginRight: `${numMargin}px`, backgroundColor: UNSORTED}} /> ))}
                </div>
                <div className="menu" style={{height: `${numHeightBottom}px`}}>
                    <div className={algorithm === "Selection" ? "selectedButton" : "button"} onClick={!inProgress ? () => this.visualizeSelectionSort() : null}>Selection Sort</div>
                    <div className={algorithm === "Insertion" ? "selectedButton" : "button"} onClick={!inProgress ? () => this.visualizeInsertionSort() : null}>Insertion Sort</div>
                    <div className={algorithm === "Bubble" ? "selectedButton" : "button"} onClick={!inProgress ? () => this.visualizeBubbleSort() : null}>Bubble Sort</div>
                    <div className={algorithm === "Merge" ? "selectedButton" : "button"} onClick={!inProgress ? () => this.visualizeMergeSort() : null}>Merge Sort</div>
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