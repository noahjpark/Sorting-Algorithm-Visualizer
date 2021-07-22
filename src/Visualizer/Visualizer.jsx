import React from 'react';
import { getSortAnimations } from '../Algorithms/SortingAlgorithms.js';
import './Visualizer.css';

const UNSORTED = 'black';
const COMPARE = 'crimson';
const SORTED = 'chartreuse';
const MOVED = 'darkviolet';
const SCANNED = 'lightseagreen';
const CONTRAST = 'ivory';

export default class Visualizer extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            array: [],
            speed: 15,
            inProgress: false,
            algorithm: "",
        };
        this.handleSizeChange = this.handleSizeChange.bind(this);
        this.handleSpeedChange = this.handleSpeedChange.bind(this);
    }

    componentDidMount() {
        this.makeArray(49);
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
            for (let i = 0; i < bars; i++)
                array.push(randomInt(5, 750));
            array.push(750);
            this.setState(() => {
                return { array: array }; 
            });
        }
    }

    sizeIsPowerOfTwo(n) {
        return parseInt( (Math.ceil((Math.log(n) / Math.log(2))))) === parseInt( (Math.floor(((Math.log(n) / Math.log(2))))));
    }

    findNearestPowerOfTwo() {
        let n = this.state.array.length, l = n - 1, r = n + 1;

        while (l > 1) {
            if (this.sizeIsPowerOfTwo(l)) return l;
            if (this.sizeIsPowerOfTwo(r)) return r;

            if (l > 1) l--;
            r++
        }

        return 2;
    }

    getMargin() {
        const { array } = this.state;
        return array.length < 5 ?
            10 : array.length < 8 ?
            8 : array.length < 11 ?
            6 : array.length < 20 ?
            4 : array.length < 40 ?
            2.5 : array.length < 100 ?
            1.5 : array.length < 130 ? 1 : 0.5;
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
                if (animations[i][2] < 1) {
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
                        const [idx, height, s] = animations[i];
                        const bstyle = bars[idx].style;
                        bstyle.height = `${height}px`;
                        if (s === 1) bstyle.backgroundColor = MOVED;
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
                if (animations[i][2] === 0) {
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
                        const [idx, height] = animations[i];
                        const bstyle = bars[idx].style;
                        bstyle.height = `${height}px`;
                        bstyle.backgroundColor = MOVED;
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
                if (animations[i][2] < 1) {
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
                        const [idx, height, c] = animations[i];
                        const bstyle = bars[idx].style;
                        bstyle.height = `${height}px`;
                        if (c === 1) bstyle.backgroundColor = MOVED;
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
                if (animations[i][2] < 1) {
                    const [b1idx, b2idx, c] = animations[i];
                    const b1style = bars[b1idx].style;
                    const b2style = bars[b2idx].style;
                    const color = c === 0 ? CONTRAST : MOVED;
                    setTimeout(() => {
                        b1style.backgroundColor = color;
                        b2style.backgroundColor = color;
                    }, i * this.state.speed);
                } else {
                    setTimeout(() => {
                        const [idx, height] = animations[i];
                        const bstyle = bars[idx].style;
                        bstyle.height = `${height}px`;
                        bstyle.backgroundColor = MOVED;
                    }, i * this.state.speed);
                }
            }

            this.markAsSorted(animations, bars);
        }, 100);
    }

    visualizeQuickSort() {
        this.markInProgress("Quick");
        setTimeout(() => {
            const animations = getSortAnimations(this.state.array, "Quick");
            const bars = document.getElementsByClassName('array-bar');

            for (let i = 0; i < animations.length; i++) {
                if (animations[i][2] < 1) {
                    const [b1idx, b2idx, c] = animations[i];
                    const b1style = bars[b1idx].style;
                    const b2style = bars[b2idx].style;
                    const color = c === 0 ? CONTRAST : SCANNED;
                    setTimeout(() => {
                        b1style.backgroundColor = color;
                        b2style.backgroundColor = color;
                    }, i * this.state.speed);
                } else {
                    setTimeout(() => {
                        const [idx, height] = animations[i];
                        const bstyle = bars[idx].style;
                        bstyle.height = `${height}px`;
                        bstyle.backgroundColor = MOVED;
                    }, i * this.state.speed);
                }
            }

            this.markAsSorted(animations, bars);
        }, 100);
    }

    visualizeCountingSort() {
        this.markInProgress("Counting");
        setTimeout(() => {
            const animations = getSortAnimations(this.state.array, "Counting");
            const bars = document.getElementsByClassName('array-bar');

            for (let i = 0; i < animations.length; i++) {
                if (animations[i][1] === 0) {
                    const [bidx] = animations[i];
                    const bstyle = bars[bidx].style;
                    const color = SCANNED;
                    setTimeout(() => {
                        bstyle.backgroundColor = color;
                    }, i * this.state.speed);
                } else {
                    setTimeout(() => {
                        const [idx, height] = animations[i];
                        const bstyle = bars[idx].style;
                        bstyle.height = `${height}px`;
                        bstyle.backgroundColor = MOVED;
                    }, i * this.state.speed);
                }
            }

            this.markAsSorted(animations, bars);
        }, 100);
    }

    visualizeHeapSort() {
        this.markInProgress("Heap");
        setTimeout(() => {
            const animations = getSortAnimations(this.state.array, "Heap");
            const bars = document.getElementsByClassName('array-bar');

            for (let i = 0; i < animations.length; i++) {
                if (animations[i][2] <= 0) {
                    const [b1idx, b2idx, c] = animations[i];
                    const b1style = bars[b1idx].style;
                    const b2style = bars[b2idx].style;
                    const color = c === 0 ? COMPARE : SCANNED;
                    setTimeout(() => {
                        b1style.backgroundColor = color;
                        b2style.backgroundColor = color;
                    }, i * this.state.speed);
                } else {
                    setTimeout(() => {
                        const [idx, height, c] = animations[i];
                        const bstyle = bars[idx].style;
                        bstyle.height = `${height}px`;
                        bstyle.backgroundColor = c === 2 ? SCANNED : MOVED;
                    }, i * this.state.speed);
                }
            }

            this.markAsSorted(animations, bars);
        }, 100);
    }

    visualizeRadixSort() {
        this.markInProgress("Radix");
        setTimeout(() => {
            const animations = getSortAnimations(this.state.array, "Radix");
            const bars = document.getElementsByClassName('array-bar');

            for (let i = 0; i < animations.length; i++) {
                setTimeout(() => {
                    const [idx, height, c] = animations[i];
                    const bstyle = bars[idx].style;
                    bstyle.height = `${height}px`;
                    bstyle.backgroundColor = c === 1 ? SCANNED : MOVED;
                }, i * this.state.speed);
            }

            this.markAsSorted(animations, bars);
        }, 100);
    }

    visualizeShellSort() {
        this.markInProgress("Shell");
        setTimeout(() => {
            const animations = getSortAnimations(this.state.array, "Shell");
            const bars = document.getElementsByClassName('array-bar');

            for (let i = 0; i < animations.length; i++) {
                if (animations[i][2] <= 0) {
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
                        const [idx, height, c] = animations[i];
                        const bstyle = bars[idx].style;
                        bstyle.height = `${height}px`;
                        bstyle.backgroundColor = c === 2 ? COMPARE : UNSORTED;
                    }, i * this.state.speed);
                }
            }

            this.markAsSorted(animations, bars);
        }, 100);
    }

    visualizeCocktailShakerSort() {
        this.markInProgress("Cocktail");
        setTimeout(() => {
            const animations = getSortAnimations(this.state.array, "Cocktail");
            const bars = document.getElementsByClassName('array-bar');

            for (let i = 0; i < animations.length; i++) {
                if (animations[i][2] <= 0) {
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
                        const [idx, height] = animations[i];
                        const bstyle = bars[idx].style;
                        bstyle.height = `${height}px`;
                    }, i * this.state.speed);
                }
            }

            this.markAsSorted(animations, bars);
        }, 100);
    }

    visualizeGnomeSort() {
        this.markInProgress("Gnome");
        setTimeout(() => {
            const animations = getSortAnimations(this.state.array, "Gnome");
            const bars = document.getElementsByClassName('array-bar');

            for (let i = 0; i < animations.length; i++) {
                if (animations[i][2] <= 0) {
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
                        const [idx, height, c] = animations[i];
                        const bstyle = bars[idx].style;
                        bstyle.height = `${height}px`;
                        bstyle.backgroundColor = c === 1 ? UNSORTED : MOVED;
                    }, i * this.state.speed);
                }
            }

            this.markAsSorted(animations, bars);
        }, 100);
    }

    visualizeBitonicSort() {
        if (!this.sizeIsPowerOfTwo(this.state.array.length))
            this.makeArray(this.findNearestPowerOfTwo() - 1);

        this.markInProgress("Bitonic");
        setTimeout(() => {
            const animations = getSortAnimations(this.state.array, "Bitonic");
            const bars = document.getElementsByClassName('array-bar');

            for (let i = 0; i < animations.length; i++) {
                if (animations[i][2] <= 0) {
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
                        const [idx, height] = animations[i];
                        const bstyle = bars[idx].style;
                        bstyle.height = `${height}px`;
                    }, i * this.state.speed);
                }
            }

            this.markAsSorted(animations, bars);
        }, 100);
    }

    render() {
        const { array, inProgress, algorithm } = this.state;
        const h = getHeight().height;
        const percentBottomPadding = 
            h <= 1080 ? 2 :
            h <= 1250 ? 5 : 
            h <= 1275 ? 12 :
            h <= 1300 ? 17 :
            h <= 1325 ? 25 : 35;
        const numWidth = Math.floor(getWidth().width / (array.length * 1.4));
        const numMargin = this.getMargin();

        return (
            <div id="page">
                <div className="row">
                    <div className="menu-container">
                        <div className="menu">
                            <div className="makeArrayButton" onClick={!inProgress ? () => this.makeArray(array.length - 1) : null}>Shuffle!</div>
                            <div className="sliderContainer">
                                <div className="desc">Change Array Size</div>
                                <input type="range" min="1" max="250" onChange={!inProgress ? this.handleSizeChange : null} className="slider" />
                            </div>
                            <div className="sliderContainer">
                            <div className="desc">Change Sorting Speed</div>
                                <input type="range" min="1" max="75" onChange={!inProgress ? this.handleSpeedChange : null} className="slider" style={{direction: 'rtl'}} />
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="row">
                    <div id="array-container">
                        {array.map((value, idx) => ( <div className="array-bar" key={idx} style={{paddingBottom: `${percentBottomPadding}%`, height: `${value}px`, width: `${numWidth}px`, marginLeft: `${numMargin}px`, marginRight: `${numMargin}px`, backgroundColor: UNSORTED}} /> ))}
                    </div>
                </div>
                <div className="row">
                    <div className="menu-container">
                        <div className="menu extra-padding">
                            <div className={algorithm === "Selection" ? "selectedButton" : "button"} onClick={!inProgress ? () => this.visualizeSelectionSort() : null}>Selection Sort</div>
                            <div className={algorithm === "Insertion" ? "selectedButton" : "button"} onClick={!inProgress ? () => this.visualizeInsertionSort() : null}>Insertion Sort</div>
                            <div className={algorithm === "Bubble" ? "selectedButton" : "button"} onClick={!inProgress ? () => this.visualizeBubbleSort() : null}>Bubble Sort</div>
                            <div className={algorithm === "Merge" ? "selectedButton" : "button"} onClick={!inProgress ? () => this.visualizeMergeSort() : null}>Merge Sort</div>
                            <div className={algorithm === "Quick" ? "selectedButton" : "button"} onClick={!inProgress ? () => this.visualizeQuickSort() : null}>Quick Sort</div>
                            <div className={algorithm === "Counting" ? "selectedButton" : "button"} onClick={!inProgress ? () => this.visualizeCountingSort() : null}>Counting Sort</div>
                            <div className={algorithm === "Heap" ? "selectedButton" : "button"} onClick={!inProgress ? () => this.visualizeHeapSort() : null}>Heap Sort</div>
                            <div className={algorithm === "Radix" ? "selectedButton" : "button"} onClick={!inProgress ? () => this.visualizeRadixSort() : null}>Radix Sort</div>
                            <div className={algorithm === "Shell" ? "selectedButton" : "button"} onClick={!inProgress ? () => this.visualizeShellSort() : null}>Shell Sort</div>
                            <div className={algorithm === "Cocktail" ? "selectedButton" : "button"} onClick={!inProgress ? () => this.visualizeCocktailShakerSort() : null}>Cocktail Shaker Sort</div>
                            <div className={algorithm === "Gnome" ? "selectedButton" : "button"} onClick={!inProgress ? () => this.visualizeGnomeSort() : null}>Gnome Sort</div>
                            <div className={algorithm === "Bitonic" ? "selectedButton" : "button"} onClick={!inProgress ? () => this.visualizeBitonicSort() : null}>Bitonic Sort</div>
                        </div>
                    </div>
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
    return {height };
}