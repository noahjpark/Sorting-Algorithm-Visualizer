export function getSortAnimations(arr, algorithm) {
    const animations = [];

    if (algorithm === "Selection") selectionSortHelper(arr, animations);
    else if (algorithm === "Insertion") insertionSortHelper(arr, animations);
    else if (algorithm === "Bubble") bubbleSortHelper(arr, animations);
    else if (algorithm === "Merge") mergeSortHelper(arr, animations, 0, arr.length - 1);

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

function insertionSortHelper(copy, animations) {
    const n = copy.length;
    animations.push([0, copy[0], 1])

    for (let i = 1; i < n; i++) {
        for (let j = i; j > 0; j--) {
            animations.push([j, j - 1, 0]);
            animations.push([j - 1, j, 0]);
            if (copy[j] > copy[j - 1]) {
                animations.push([j, copy[j], 1]);
                animations.push([j - 1, copy[j - 1], 1]);
                break;
            }
            swap(copy, j, j - 1);
            animations.push([j, copy[j], 1]);
            animations.push([j - 1, copy[j - 1], 1]);
        }
    }
}

function bubbleSortHelper(copy, animations) {
    const n = copy.length;
    let sorted = false;

    for (let end = n - 1; !sorted; end--) {
        sorted = true;

        for (let i = 0; i < end; i++) {
            animations.push([i, i + 1, 0]);
            animations.push([i + 1, i, 0]);
            animations.push([i, i + 1, -1]);
            animations.push([i + 1, i, -1]);
            if (copy[i] > copy[i + 1]) {
                swap(copy, i, i + 1);
                animations.push([i, copy[i], 2]);
                animations.push([i + 1, copy[i + 1], 2]);
                sorted = false;
            }
        }

        animations.push([end, copy[end], 1]);
    }
}

function mergeSortHelper(copy, animations, left, right) {
    if (left < right) {
        let mid = left + (right - left) / 2;
        mergeSortHelper(copy, animations, left, mid);
        mergeSortHelper(copy, animations, mid + 1, right);
        merge(copy, animations, left, mid, right);
    }
}

function merge(copy, animations, left, mid, right) {
    let n1 = mid - left + 1, n2 = right - mid;

    let i = 0, j = 0;
    while (i < n1 && j < n2) {
        animations.push([left + i, mid + j, 0]);
        animations.push([mid + j, left + i, 0]);
        animations.push([left + i, mid + j, 1]);
        animations.push([mid + j, left + i, 1]);
        if (copy[left + i] < copy[mid + j]) i++;
        else {
            swap(copy, left + i, mid + j);
            j++;
        }
    }
}

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}