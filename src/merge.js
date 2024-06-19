export function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    } else {
        let middleIndex = Math.floor(arr.length / 2);
        let firstHalf = arr.slice(0, middleIndex);
        let secondHalf = arr.slice(middleIndex);
        let firstSorted = mergeSort(firstHalf);
        let secondSorted = mergeSort(secondHalf);
        return merge(firstSorted, secondSorted);
    }
}

function merge(arr1, arr2) {
    let result = [];
    let i = 0;
    let j = 0;

    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            result.push(arr1[i]);
            i++;
        } else {
            result.push(arr2[j]);
            j++;
        }
    }

    return result.concat(arr1.slice(i).concat(arr2.slice(j)));
}

export function removeDuplicate(sortedArray) {
    return sortedArray.filter((item, index, array) => {
        return index === 0 || item !== array[index - 1];
    });
}
