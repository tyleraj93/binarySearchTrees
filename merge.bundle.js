"use strict";
(self["webpackChunkbinarysearchtrees"] = self["webpackChunkbinarysearchtrees"] || []).push([["merge"],{

/***/ "./src/merge.js":
/*!**********************!*\
  !*** ./src/merge.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mergeSort: () => (/* binding */ mergeSort),
/* harmony export */   removeDuplicate: () => (/* binding */ removeDuplicate)
/* harmony export */ });
// This function performs the merge sort algorithm on an array.
function mergeSort(arr) {
    // Base case: if the array has 1 or no elements, it's already sorted.
    if (arr.length <= 1) {
        return arr;
    } else {
        // Recursive case: split the array into halves.
        let middleIndex = Math.floor(arr.length / 2);
        let firstHalf = arr.slice(0, middleIndex);
        let secondHalf = arr.slice(middleIndex);

        // Recursively sort both halves.
        let firstSorted = mergeSort(firstHalf);
        let secondSorted = mergeSort(secondHalf);

        // Merge the two sorted halves.
        return merge(firstSorted, secondSorted);
    }
}

// This function merges two sorted arrays into one sorted array.
function merge(arr1, arr2) {
    let result = [];
    let i = 0; // Pointer for arr1
    let j = 0; // Pointer for arr2

    // Traverse both arrays and insert smaller of both elements in result
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            result.push(arr1[i]);
            i++; // Move pointer for arr1
        } else {
            result.push(arr2[j]);
            j++; // Move pointer for arr2
        }
    }

    // Concatenate the remaining elements of both arrays (if any).
    return result.concat(arr1.slice(i).concat(arr2.slice(j)));
}

// This function removes duplicate elements from a sorted array.
function removeDuplicate(sortedArray) {
    return sortedArray.filter((item, index, array) => {
        // Keep only the first instance of each element, ignoring subsequent duplicates.
        return index === 0 || item !== array[index - 1];
    });
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/merge.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2UuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLGVBQWU7O0FBRWY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsVUFBVTtBQUNWO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iaW5hcnlzZWFyY2h0cmVlcy8uL3NyYy9tZXJnZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZ1bmN0aW9uIHBlcmZvcm1zIHRoZSBtZXJnZSBzb3J0IGFsZ29yaXRobSBvbiBhbiBhcnJheS5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZVNvcnQoYXJyKSB7XG4gICAgLy8gQmFzZSBjYXNlOiBpZiB0aGUgYXJyYXkgaGFzIDEgb3Igbm8gZWxlbWVudHMsIGl0J3MgYWxyZWFkeSBzb3J0ZWQuXG4gICAgaWYgKGFyci5sZW5ndGggPD0gMSkge1xuICAgICAgICByZXR1cm4gYXJyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFJlY3Vyc2l2ZSBjYXNlOiBzcGxpdCB0aGUgYXJyYXkgaW50byBoYWx2ZXMuXG4gICAgICAgIGxldCBtaWRkbGVJbmRleCA9IE1hdGguZmxvb3IoYXJyLmxlbmd0aCAvIDIpO1xuICAgICAgICBsZXQgZmlyc3RIYWxmID0gYXJyLnNsaWNlKDAsIG1pZGRsZUluZGV4KTtcbiAgICAgICAgbGV0IHNlY29uZEhhbGYgPSBhcnIuc2xpY2UobWlkZGxlSW5kZXgpO1xuXG4gICAgICAgIC8vIFJlY3Vyc2l2ZWx5IHNvcnQgYm90aCBoYWx2ZXMuXG4gICAgICAgIGxldCBmaXJzdFNvcnRlZCA9IG1lcmdlU29ydChmaXJzdEhhbGYpO1xuICAgICAgICBsZXQgc2Vjb25kU29ydGVkID0gbWVyZ2VTb3J0KHNlY29uZEhhbGYpO1xuXG4gICAgICAgIC8vIE1lcmdlIHRoZSB0d28gc29ydGVkIGhhbHZlcy5cbiAgICAgICAgcmV0dXJuIG1lcmdlKGZpcnN0U29ydGVkLCBzZWNvbmRTb3J0ZWQpO1xuICAgIH1cbn1cblxuLy8gVGhpcyBmdW5jdGlvbiBtZXJnZXMgdHdvIHNvcnRlZCBhcnJheXMgaW50byBvbmUgc29ydGVkIGFycmF5LlxuZnVuY3Rpb24gbWVyZ2UoYXJyMSwgYXJyMikge1xuICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICBsZXQgaSA9IDA7IC8vIFBvaW50ZXIgZm9yIGFycjFcbiAgICBsZXQgaiA9IDA7IC8vIFBvaW50ZXIgZm9yIGFycjJcblxuICAgIC8vIFRyYXZlcnNlIGJvdGggYXJyYXlzIGFuZCBpbnNlcnQgc21hbGxlciBvZiBib3RoIGVsZW1lbnRzIGluIHJlc3VsdFxuICAgIHdoaWxlIChpIDwgYXJyMS5sZW5ndGggJiYgaiA8IGFycjIubGVuZ3RoKSB7XG4gICAgICAgIGlmIChhcnIxW2ldIDwgYXJyMltqXSkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goYXJyMVtpXSk7XG4gICAgICAgICAgICBpKys7IC8vIE1vdmUgcG9pbnRlciBmb3IgYXJyMVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goYXJyMltqXSk7XG4gICAgICAgICAgICBqKys7IC8vIE1vdmUgcG9pbnRlciBmb3IgYXJyMlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ29uY2F0ZW5hdGUgdGhlIHJlbWFpbmluZyBlbGVtZW50cyBvZiBib3RoIGFycmF5cyAoaWYgYW55KS5cbiAgICByZXR1cm4gcmVzdWx0LmNvbmNhdChhcnIxLnNsaWNlKGkpLmNvbmNhdChhcnIyLnNsaWNlKGopKSk7XG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gcmVtb3ZlcyBkdXBsaWNhdGUgZWxlbWVudHMgZnJvbSBhIHNvcnRlZCBhcnJheS5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVEdXBsaWNhdGUoc29ydGVkQXJyYXkpIHtcbiAgICByZXR1cm4gc29ydGVkQXJyYXkuZmlsdGVyKChpdGVtLCBpbmRleCwgYXJyYXkpID0+IHtcbiAgICAgICAgLy8gS2VlcCBvbmx5IHRoZSBmaXJzdCBpbnN0YW5jZSBvZiBlYWNoIGVsZW1lbnQsIGlnbm9yaW5nIHN1YnNlcXVlbnQgZHVwbGljYXRlcy5cbiAgICAgICAgcmV0dXJuIGluZGV4ID09PSAwIHx8IGl0ZW0gIT09IGFycmF5W2luZGV4IC0gMV07XG4gICAgfSk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=