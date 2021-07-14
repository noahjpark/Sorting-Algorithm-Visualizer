export function getSortAnimations(arr, algorithm) {
    const animations = [];

    if (arr.length <= 1) return arr;
    
    if (algorithm === "Selection") selectionSortHelper(arr.slice(), animations);
    if (algorithm === "Insertion") insertionSortHelper(arr.slice(), animations);

    return animations;
}

function selectionSortHelper(copy, animations) {
    const n = copy.length;

    for (let i = 0; i < n; i++) {
        let min = i;

        for (let j = i + 1; j < n; j++) {
            animations.push([min, j, 0]);
            animations.push([min, j, -1]);
            if (copy[j] < copy[min]) min = j;
        }

        if (min !== i) {
            swap(copy, i, min);
            animations.push([i, copy[i], 1]);
            animations.push([min, copy[min], 2]);
        }
        else animations.push([i, copy[i], 1]);
    }
}

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function insertionSortHelper(copy, animations) {
    const n = copy.length;
    animations.push([0, copy[0], 1])

    for (let i = 1; i < n; i++) {
        for (let j = i; j > 0 && copy[j] < copy[j - 1]; j--) {
            animations.push([j, j - 1, 0]);
            animations.push([j - 1, j, 0]);
            swap(copy, j, j - 1);
            animations.push([j, copy[j], 1]);
            animations.push([j - 1, copy[j - 1], 1]);
        }
    }
}