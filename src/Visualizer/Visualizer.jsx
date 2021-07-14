import React from 'react';
import { getSortAnimations } from '../Algorithms/SortingAlgorithms.js';
import './Visualizer.css';

const SPEED = .1;
const BARS = 250;
const PRIMARY_COLOR = 'black';
const SECONDARY_COLOR = 'firebrick';
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
        this.shuffleArray();
    }

    shuffleArray() {
        const array = [];
        for (let i = 0; i < BARS; i++)
            array.push(randomInt(1, 500));
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

        for (let i = 0; i < animations.length; i++) {
            const bars = document.getElementsByClassName('array-bar');
            const compare = animations[i][2] === 0;
            console.log(animations[i][0] + " " + animations[i][1] + " " + animations[i][2]);

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
    }

    render() {
        const {array} = this.state;

        return (
            <div className="array-container">
                {array.map((value, idx) => (
                    <div className="array-bar" 
                        key = {idx} 
                        style={{
                            backgroundColor: PRIMARY_COLOR,
                            height: `${value}px`,
                    }}></div>
                ))}
                <button onClick={() => this.shuffleArray()}>Shuffle Array</button>
                <button onClick={() => this.visualizeSelectionSort()}>Selection Sort</button>
                <button onClick={() => this.visualizeInsertionSort()}>Insertion Sort</button>
            </div>
        );
    }
}

function randomInt(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
}