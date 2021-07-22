export function getSortAnimations(arr, algorithm) {
    const animations = [];
    const copy = [];
    for (let i = 0; i < arr.length; i++)
        copy[i] = arr[i];
    copy.sort((a, b) => { return a - b });

    if (algorithm === "Selection") selectionSortHelper(arr, animations);
    else if (algorithm === "Insertion") insertionSortHelper(arr, animations);
    else if (algorithm === "Bubble") bubbleSortHelper(arr, animations);
    else if (algorithm === "Merge") mergeSortHelper(arr, animations, 0, arr.length - 1);
    else if (algorithm === "Quick") quickSortHelper(arr, animations, 0, arr.length - 1);
    else if (algorithm === "Counting") countingSortHelper(arr, animations);
    else if (algorithm === "Heap") heapSortHelper(arr, animations);
    else if (algorithm === "Radix") radixSortHelper(arr, animations);
    else if (algorithm === "Shell") shellSortHelper(arr, animations);
    else if (algorithm === "Cocktail") cocktailShakerSortHelper(arr, animations);
    else if (algorithm === "Gnome") gnomeSortHelper(arr, animations);
    else if (algorithm === "Bitonic") bitonicSortHelper(arr, animations, 0, arr.length, 1);

    console.log(areEqual(copy, arr));

    return animations;
}

function selectionSortHelper(arr, animations) {
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

function insertionSortHelper(arr, animations) {
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

function bubbleSortHelper(arr, animations) {
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

function mergeSortHelper(arr, animations, left, right) {
    if (left >= right) return;

    const mid = left + Math.floor((right - left) / 2);
    mergeSortHelper(arr, animations, left, mid);
    mergeSortHelper(arr, animations, mid + 1, right);
    merge(arr, animations, left, mid, right);
}

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

function quickSortHelper(arr, animations, left, right) {
    if (left >= right) return;

    let p = partition(arr, animations, left, right);
    quickSortHelper(arr, animations, left, p - 1);
    quickSortHelper(arr, animations, p + 1, right);
}

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

function countingSortHelper(arr, animations) {
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

function heapSortHelper(arr, animations) {
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

function radixSortHelper(arr, animations) {
    let max = findMax(arr);
    for (let i = 1; Math.floor(max / i) > 0; i *= 10)
        countingSortRadix(arr, i, animations);
}

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

function shellSortHelper(arr, animations) {
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

function cocktailShakerSortHelper(arr, animations) {
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

function gnomeSortHelper(arr, animations) {
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

function bitonicSortHelper(arr, animations, low, count, dir) {
    if (count > 1) {
        let k = Math.floor(count / 2);

        bitonicSortHelper(arr, animations, low, k, 1);
        bitonicSortHelper(arr, animations, low + k, k, 0);
        bitonicMerge(arr, animations, low, count, dir);
    }
}

function bitonicMerge(arr, animations, low, count, dir) {
    if (count > 1) {
        let k = Math.floor(count / 2);

        for (let i = low; i < low + k; i++)
            bitonicSwap(arr, animations, i, i + k, dir);

        bitonicMerge(arr, animations, low, k, dir);
        bitonicMerge(arr, animations, low + k, k, dir);
    }
}

function bitonicSwap(arr, animations, i, j, dir) {
    animations.push([i, j, 0]);
    animations.push([i, j, -1]);
    if ((arr[i] > arr[j] && dir === 1) || (arr[i] < arr[j] && dir === 0)) {
        swap(arr, i, j);
        animations.push([i, arr[i], 1]);
        animations.push([j, arr[j], 1]);
    }
}

function findMax(arr) {
    let max = 0;
    for (let i = 0; i < arr.length - 1; i++)
        max = Math.max(max, arr[i]);
    return max;
}

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function print(arr) {
    for (let i = 0; i < arr.length; i++)
        console.log(arr[i]);
}

function compare(arr, sorted) {
    for (let i = 0; i < arr.length; i++)
        if (arr[i] !== sorted[i]) console.log(i + ": " + arr[i] + " " + sorted[i]);
}

function areEqual(arr, sorted) {
    for (let i = 0; i < arr.length; i++)
        if (arr[i] !== sorted[i]) return false;
    return true;
}