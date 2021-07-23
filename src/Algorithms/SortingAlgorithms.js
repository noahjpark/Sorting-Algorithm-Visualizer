// Driver function calls the appropriate sorting algorithm and checks to make sure it worked by outputting the log of the compared result
export function getSortAnimations(arr, algorithm) {
    const animations = [];
    const copy = getSortedArray(arr);

    if (algorithm === "Selection") selectionSort(arr, animations);
    else if (algorithm === "Insertion") insertionSort(arr, animations);
    else if (algorithm === "Bubble") bubbleSort(arr, animations);
    else if (algorithm === "Merge") mergeSort(arr, animations, 0, arr.length - 1);
    else if (algorithm === "Quick") quickSort(arr, animations, 0, arr.length - 1);
    else if (algorithm === "Counting") countingSort(arr, animations);
    else if (algorithm === "Heap") heapSort(arr, animations);
    else if (algorithm === "Radix") radixSort(arr, animations);
    else if (algorithm === "Shell") shellSort(arr, animations);
    else if (algorithm === "Cocktail") cocktailShakerSort(arr, animations);
    else if (algorithm === "Gnome") gnomeSort(arr, animations);
    else if (algorithm === "Bitonic") bitonicSort(arr, animations, 0, arr.length, 1);
    else if (algorithm === "Comb") combSort(arr, animations);
    else if (algorithm === "Pancake") pancakeSort(arr, animations);

    console.log(areEqual(copy, arr));

    return animations;
}

// Selection Sort algorithm
function selectionSort(arr, animations) {
    const n = arr.length;

    for (let i = 0; i < n; i++) {
        let min = i;

        for (let j = i + 1; j < n; j++) {
            animations.push([min, j, 0]);
            animations.push([min, j, -1]);
            if (arr[j] < arr[min]) min = j;
        }

        if (min !== i) {
            swap(arr, i, min);
            animations.push([i, arr[i], 1]);
            animations.push([min, arr[min], 2]);
        }
        else animations.push([i, arr[i], 1]);
    }
}

// Insertion Sort algorithm
function insertionSort(arr, animations) {
    const n = arr.length;
    animations.push([0, arr[0], 1])

    for (let i = 1; i < n; i++) {
        for (let j = i; j > 0; j--) {
            animations.push([j, j - 1, 0]);
            if (arr[j] > arr[j - 1]) {
                animations.push([j, arr[j], 1]);
                animations.push([j - 1, arr[j - 1], 1]);
                break;
            }
            swap(arr, j, j - 1);
            animations.push([j, arr[j], 1]);
            animations.push([j - 1, arr[j - 1], 1]);
        }
    }
}

// Bubble Sort algorithm
function bubbleSort(arr, animations) {
    const n = arr.length;
    let sorted = false;

    for (let end = n - 1; !sorted; end--) {
        sorted = true;

        for (let i = 0; i < end; i++) {
            animations.push([i, i + 1, 0]);
            animations.push([i, i + 1, -1]);
            if (arr[i] > arr[i + 1]) {
                swap(arr, i, i + 1);
                animations.push([i, arr[i], 2]);
                animations.push([i + 1, arr[i + 1], 2]);
                sorted = false;
            }
        }

        animations.push([end, arr[end], 1]);
    }
}

// Merge Sort algorithm
function mergeSort(arr, animations, left, right) {
    if (left >= right) return;

    const mid = left + Math.floor((right - left) / 2);
    mergeSort(arr, animations, left, mid);
    mergeSort(arr, animations, mid + 1, right);
    merge(arr, animations, left, mid, right);
}

// Merge helper to Merge Sort
function merge(arr, animations, left, mid, right) {
    let n1 = mid - left + 1, n2 = right - mid;
    let t1 = [], t2 = [];

    for (let i = 0; i < n1; i++)
        t1[i] = arr[left + i];

    for (let j = 0; j < n2; j++)
        t2[j] = arr[mid + j + 1];

    let i = 0, j = 0, idx = left;
    while (i < n1 && j < n2) {
        animations.push([left + i, mid + j + 1, 0]);
        animations.push([left + i, mid + j + 1, -1]);
        arr[idx] = t1[i] < t2[j] ? t1[i++] : t2[j++];
        animations.push([idx, arr[idx++], 1]);
    }

    while (i < n1) {
        arr[idx] = t1[i++];
        animations.push([idx, arr[idx++], 1]);
    }

    while (j < n2) {
        arr[idx] = t2[j++];
        animations.push([idx, arr[idx++], 1]);
    }
}

// Quick Sort algorithm
function quickSort(arr, animations, left, right) {
    if (left >= right) return;

    let p = partition(arr, animations, left, right);
    quickSort(arr, animations, left, p - 1);
    quickSort(arr, animations, p + 1, right);
}

// Partition helper to Quick Sort
function partition(arr, animations, left, right) {
    let pivot = arr[right], i = left;

    for (let j = left; j < right; j++) {
        animations.push([j, right, 0]);
        animations.push([j, right, -1]);
        if (arr[j] < pivot) {
            swap(arr, i, j);
            animations.push([i, arr[i++], 1]);
        }
    }

    swap(arr, i, right);
    for (let j = i; j <= right; j++)
        animations.push([j, arr[j], 1]);
    return i;
}

// Counting Sort algorithm
function countingSort(arr, animations) {
    let n = arr.length, idx = 0;
    const freq = [];

    for (let i = 0; i <= 750; i++)
        freq.push(0);

    for (let i = 0; i < n; i++) {
        animations.push([i, 0]);
        freq[arr[i]]++;
    }

    for (let i = 0; i <= 750; i++) {
        while (freq[i] > 0) {
            arr[idx] = i;
            animations.push([idx, arr[idx++], 1]);
            freq[i]--;
        }
    }
}

// Heap Sort algorithm
function heapSort(arr, animations) {
    let n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
        heapify(arr, animations, n, i);

    for (let i = n - 1; i > 0; i--) {
        swap(arr, 0, i);
        animations.push([i, arr[i], 1]);
        heapify(arr, animations, i, 0);
    }

    animations.push([0, arr[0], 1]);
}

// Heapify helper to Heap Sort
function heapify(arr, animations, n, i) {
    let largest = i, l = 2 * i + 1, r = 2 * i + 2;

    if (l < n) {
        animations.push([l, largest, 0]);
        animations.push([l, largest, -1]);
        if (arr[l] > arr[largest]) largest = l;
    }
    if (r < n) {
        animations.push([r, largest, 0]);
        animations.push([r, largest, -1]);
        if (arr[r] > arr[largest]) largest = r;
    }

    if (largest !== i) {
        swap(arr, i, largest);
        animations.push([i, arr[i], 2]);
        animations.push([largest, arr[largest], 2]);
        heapify(arr, animations, n, largest);
    }
}

// Radix Sort
function radixSort(arr, animations) {
    let max = arr[findMax(arr, arr.length - 1)];
    for (let i = 1; Math.floor(max / i) > 0; i *= 10)
        countingSortRadix(arr, i, animations);
}

// Counting Sort helper to Radix Sort
function countingSortRadix(arr, exp, animations) {
    let res = [];
    let counts = [];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++)
        res.push(0);

    for (let i = 0; i < 10; i++)
        counts.push(0);

    for (let i = 0; i < n - 1; i++) {
        counts[Math.floor(arr[i] / exp) % 10]++;
        animations.push([i, arr[i], 1]);
    }
    animations.push([n - 1, arr[n - 1], 1]);

    for (let i = 1; i < 10; i++)
        counts[i] += counts[i - 1];

    for (let i = n - 2; i >= 0; i--) {
        res[counts[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
        counts[Math.floor(arr[i] / exp) % 10]--;
    }

    for (let i = 0; i < n - 1; i++) {
        arr[i] = res[i];
        animations.push([i, arr[i], 2]);
    }

    animations.push([n - 1, arr[n - 1], 2]);
}

// Shell Sort algorithm
function shellSort(arr, animations) {
    const n = arr.length;

    for (let i = Math.floor(n / 2); i > 0; i = (Math.floor(i / 2))) {
        for (let j = i; j < n; j++) {
            let temp = arr[j], k = 0;
            animations.push([j, arr[j], 2]);
            animations.push([j, arr[j], 3]);

            for (k = j; k >= i && arr[k - i] > temp; k -= i) {
                animations.push([k, k - i, 0]);
                animations.push([k, k - i, -1]);
                arr[k] = arr[k - i];
                animations.push([k, arr[k], 1]);
            }

            arr[k] = temp;
            animations.push([k, arr[k], 1]);
        }
    }

    animations.push([0, arr[0], 1]);
}

// Cocktail Shaker Sort algorithm
function cocktailShakerSort(arr, animations) {
    let sorted = false;
    let n = arr.length, start = 0, end = n - 1;

    while (!sorted) {
        sorted = true;

        for (let i = start; i < end; i++) {
            animations.push([i, i + 1, 0]);
            animations.push([i, i + 1, -1]);
            if (arr[i] > arr[i + 1]) {
                swap(arr, i, i + 1);
                animations.push([i, arr[i], 1]);
                animations.push([i + 1, arr[i + 1], 1]);
                sorted = false;
            }
        }

        animations.push([end, arr[end--], 2]);
        if (sorted) break;
        sorted = true;
        
        for (let i = end - 1; i >= start; i--) {
            animations.push([i, i + 1, 0]);
            animations.push([i, i + 1, -1]);
            if (arr[i] > arr[i + 1]) {
                swap(arr, i, i + 1);
                animations.push([i, arr[i], 1]);
                animations.push([i + 1, arr[i + 1], 1]);
                sorted = false;
            }
        }

        animations.push([start, arr[start++], 2]);
    }
}

// Gnome Sort algorithm
function gnomeSort(arr, animations) {
    let i = 0, n = arr.length;

    while (i < n) {
        if (i === 0) i++;

        animations.push([i, i - 1, 0]);
        animations.push([i, i - 1, -1]);
        if (arr[i] >= arr[i - 1]) i++;
        else {
            swap(arr, i, i - 1);
            animations.push([i, arr[i--], 1]);
            animations.push([i, arr[i], 1]);
        }
    }
}

// Bitonic Sort algorithm
function bitonicSort(arr, animations, low, count, dir) {
    if (count > 1) {
        let k = Math.floor(count / 2);

        bitonicSort(arr, animations, low, k, 1);
        bitonicSort(arr, animations, low + k, k, 0);
        bitonicMerge(arr, animations, low, count, dir);
    }
}

// Bitonic Merge helper to Bitonic Sort
function bitonicMerge(arr, animations, low, count, dir) {
    if (count > 1) {
        let k = Math.floor(count / 2);

        for (let i = low; i < low + k; i++)
            bitonicSwap(arr, animations, i, i + k, dir);

        bitonicMerge(arr, animations, low, k, dir);
        bitonicMerge(arr, animations, low + k, k, dir);
    }
}

// Bitonic Swap helper to Bitonic Sort
function bitonicSwap(arr, animations, i, j, dir) {
    animations.push([i, j, 0]);
    animations.push([i, j, -1]);
    if ((arr[i] > arr[j] && dir === 1) || (arr[i] < arr[j] && dir === 0)) {
        swap(arr, i, j);
        animations.push([i, arr[i], 1]);
        animations.push([j, arr[j], 1]);
    }
}

// Comb Sort algorithm
function combSort(arr, animations) {
    let n = arr.length, gap = n;
    let sorted = false;

    while (gap != 1 || !sorted) {
        gap = nextGap(gap);
        sorted = true;

        for (let i = 0; i < n - gap; i++) {
            animations.push([i, i + gap, 0]);
            animations.push([i, i + gap, -1]);
            if (arr[i] > arr[i + gap]) {
                swap(arr, i, i + gap);
                animations.push([i, arr[i], 1]);
                animations.push([i + gap, arr[i + gap], 1]);
                sorted = false;
            }
        }
    }

    animations.push([n - 1, arr[n - 1], 1]);
}

// Pancake Sort algorithm
function pancakeSort(arr, animations) {
    animations.push([arr.length - 1, arr[arr.length - 1], 1]);

    for (let i = arr.length - 1; i > 1; i--) {
        let max = findMax(arr, i);

        animations.push([max, arr[max], 2]);

        if (max != i) {
            flip(arr, animations, max);
            flip(arr, animations, i - 1);
        }

        animations.push([i - 1, arr[i - 1], 1]);
        for (let j = 0; j < i - 1; j++)
            animations.push([j, arr[j], 3]);
    }

    animations.push([0, arr[0], 1]);
}

// Flip helper for Pancake Sort
function flip(arr, animations, end) {
    for (let i = 0; i <= end; i++, end--) {
        animations.push([i, end, 0]);
        swap(arr, i, end);
        animations.push([i, arr[i], 2]);
        animations.push([end, arr[end], 2]);
    }
}

// Next Gap helper to Comb Sort
function nextGap(gap) {
    gap = parseInt((gap * 10) / 13, 10);
    return gap >= 1 ? gap : 1;
}

// Finds the max in the array
function findMax(arr, n) {
    let max = 0;
    for (let i = 1; i < n; i++)
        if (arr[i] > arr[max]) max = i;
    return max;
}

// Swaps the values of two indices i and j in the array
function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// Prints the array
function print(arr) {
    for (let i = 0; i < arr.length; i++)
        console.log(arr[i]);
}

// Prints the compared arrays
function compare(arr, sorted) {
    for (let i = 0; i < arr.length; i++)
        if (arr[i] !== sorted[i]) console.log(i + ": " + arr[i] + " " + sorted[i]);
}

// Checks if two arrays are identical
function areEqual(arr, sorted) {
    for (let i = 0; i < arr.length; i++)
        if (arr[i] !== sorted[i]) return false;
    return true;
}

// Makes a copy of the array and sorts it
function getSortedArray(arr) {
    let copy = [];
    for (let i = 0; i < arr.length; i++)
        copy[i] = arr[i];
    copy.sort((a, b) => { return a - b });
    return copy;
}