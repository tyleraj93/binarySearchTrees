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
function mergeSort(arr) {
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

function removeDuplicate(sortedArray) {
    return sortedArray.filter((item, index, array) => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2UuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQU87QUFDUDtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0wiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iaW5hcnlzZWFyY2h0cmVlcy8uL3NyYy9tZXJnZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gbWVyZ2VTb3J0KGFycikge1xuICAgIGlmIChhcnIubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgcmV0dXJuIGFycjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgbWlkZGxlSW5kZXggPSBNYXRoLmZsb29yKGFyci5sZW5ndGggLyAyKTtcbiAgICAgICAgbGV0IGZpcnN0SGFsZiA9IGFyci5zbGljZSgwLCBtaWRkbGVJbmRleCk7XG4gICAgICAgIGxldCBzZWNvbmRIYWxmID0gYXJyLnNsaWNlKG1pZGRsZUluZGV4KTtcbiAgICAgICAgbGV0IGZpcnN0U29ydGVkID0gbWVyZ2VTb3J0KGZpcnN0SGFsZik7XG4gICAgICAgIGxldCBzZWNvbmRTb3J0ZWQgPSBtZXJnZVNvcnQoc2Vjb25kSGFsZik7XG4gICAgICAgIHJldHVybiBtZXJnZShmaXJzdFNvcnRlZCwgc2Vjb25kU29ydGVkKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1lcmdlKGFycjEsIGFycjIpIHtcbiAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgbGV0IGkgPSAwO1xuICAgIGxldCBqID0gMDtcblxuICAgIHdoaWxlIChpIDwgYXJyMS5sZW5ndGggJiYgaiA8IGFycjIubGVuZ3RoKSB7XG4gICAgICAgIGlmIChhcnIxW2ldIDwgYXJyMltqXSkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goYXJyMVtpXSk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChhcnIyW2pdKTtcbiAgICAgICAgICAgIGorKztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQuY29uY2F0KGFycjEuc2xpY2UoaSkuY29uY2F0KGFycjIuc2xpY2UoaikpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUR1cGxpY2F0ZShzb3J0ZWRBcnJheSkge1xuICAgIHJldHVybiBzb3J0ZWRBcnJheS5maWx0ZXIoKGl0ZW0sIGluZGV4LCBhcnJheSkgPT4ge1xuICAgICAgICByZXR1cm4gaW5kZXggPT09IDAgfHwgaXRlbSAhPT0gYXJyYXlbaW5kZXggLSAxXTtcbiAgICB9KTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==