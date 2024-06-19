"use strict";
(self["webpackChunkbinarysearchtrees"] = self["webpackChunkbinarysearchtrees"] || []).push([["index"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Tree: () => (/* binding */ Tree)
/* harmony export */ });
/* harmony import */ var _merge_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./merge.js */ "./src/merge.js");


class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor() {
        this.root = null;
    }

    buildTree(array) {
        let sortedArray = this.prepareArray(array);
        this.root = this.recursiveBuild(sortedArray);
        return this.root;
    }

    prepareArray(array) {
        if (array.length === 0) return [];
        return (0,_merge_js__WEBPACK_IMPORTED_MODULE_0__.removeDuplicate)((0,_merge_js__WEBPACK_IMPORTED_MODULE_0__.mergeSort)(array));
    }

    recursiveBuild(array) {
        if (array.length === 0) return null;
        if (array.length === 1) return new Node(array[0]);
        let middleIndex = Math.floor(array.length / 2);
        let newNode = new Node(array[middleIndex]);
        newNode.left = this.buildTree(array.slice(0, middleIndex));
        newNode.right = this.buildTree(array.slice(middleIndex + 1));
        return newNode;
    }

    insert(value) {
        this.root = this.insertRecursive(this.root, value);
        // let current = this.root;
        // this.insertLoop(value, current);
    }

    insertRecursive(current, value) {
        if (current === null) return new Node(value);
        if (value < current.data) current.left = this.insertRecursive(current.left, value);
        if (value > current.data) current.right = this.insertRecursive(current.right, value);
        return current;
    }

    prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(
                node.right,
                `${prefix}${isLeft ? "│   " : "    "}`,
                false
            );
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(
                node.left,
                `${prefix}${isLeft ? "    " : "│   "}`,
                true
            );
        }
    }
}

const tree = new Tree();
tree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(tree);
tree.prettyPrint(tree.root);
tree.insert(68);
tree.prettyPrint(tree.root);


/***/ }),

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
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQXdEOztBQUV4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLDBEQUFlLENBQUMsb0RBQVM7QUFDeEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE9BQU8sRUFBRSx5QkFBeUI7QUFDckQ7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxVQUFVO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixPQUFPLEVBQUUseUJBQXlCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDNUVPO0FBQ1A7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmluYXJ5c2VhcmNodHJlZXMvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmluYXJ5c2VhcmNodHJlZXMvLi9zcmMvbWVyZ2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbWVyZ2VTb3J0LCByZW1vdmVEdXBsaWNhdGUgfSBmcm9tIFwiLi9tZXJnZS5qc1wiO1xuXG5jbGFzcyBOb2RlIHtcbiAgICBjb25zdHJ1Y3RvcihkYXRhLCBsZWZ0ID0gbnVsbCwgcmlnaHQgPSBudWxsKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMubGVmdCA9IGxlZnQ7XG4gICAgICAgIHRoaXMucmlnaHQgPSByaWdodDtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUcmVlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5yb290ID0gbnVsbDtcbiAgICB9XG5cbiAgICBidWlsZFRyZWUoYXJyYXkpIHtcbiAgICAgICAgbGV0IHNvcnRlZEFycmF5ID0gdGhpcy5wcmVwYXJlQXJyYXkoYXJyYXkpO1xuICAgICAgICB0aGlzLnJvb3QgPSB0aGlzLnJlY3Vyc2l2ZUJ1aWxkKHNvcnRlZEFycmF5KTtcbiAgICAgICAgcmV0dXJuIHRoaXMucm9vdDtcbiAgICB9XG5cbiAgICBwcmVwYXJlQXJyYXkoYXJyYXkpIHtcbiAgICAgICAgaWYgKGFycmF5Lmxlbmd0aCA9PT0gMCkgcmV0dXJuIFtdO1xuICAgICAgICByZXR1cm4gcmVtb3ZlRHVwbGljYXRlKG1lcmdlU29ydChhcnJheSkpO1xuICAgIH1cblxuICAgIHJlY3Vyc2l2ZUJ1aWxkKGFycmF5KSB7XG4gICAgICAgIGlmIChhcnJheS5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xuICAgICAgICBpZiAoYXJyYXkubGVuZ3RoID09PSAxKSByZXR1cm4gbmV3IE5vZGUoYXJyYXlbMF0pO1xuICAgICAgICBsZXQgbWlkZGxlSW5kZXggPSBNYXRoLmZsb29yKGFycmF5Lmxlbmd0aCAvIDIpO1xuICAgICAgICBsZXQgbmV3Tm9kZSA9IG5ldyBOb2RlKGFycmF5W21pZGRsZUluZGV4XSk7XG4gICAgICAgIG5ld05vZGUubGVmdCA9IHRoaXMuYnVpbGRUcmVlKGFycmF5LnNsaWNlKDAsIG1pZGRsZUluZGV4KSk7XG4gICAgICAgIG5ld05vZGUucmlnaHQgPSB0aGlzLmJ1aWxkVHJlZShhcnJheS5zbGljZShtaWRkbGVJbmRleCArIDEpKTtcbiAgICAgICAgcmV0dXJuIG5ld05vZGU7XG4gICAgfVxuXG4gICAgaW5zZXJ0KHZhbHVlKSB7XG4gICAgICAgIHRoaXMucm9vdCA9IHRoaXMuaW5zZXJ0UmVjdXJzaXZlKHRoaXMucm9vdCwgdmFsdWUpO1xuICAgICAgICAvLyBsZXQgY3VycmVudCA9IHRoaXMucm9vdDtcbiAgICAgICAgLy8gdGhpcy5pbnNlcnRMb29wKHZhbHVlLCBjdXJyZW50KTtcbiAgICB9XG5cbiAgICBpbnNlcnRSZWN1cnNpdmUoY3VycmVudCwgdmFsdWUpIHtcbiAgICAgICAgaWYgKGN1cnJlbnQgPT09IG51bGwpIHJldHVybiBuZXcgTm9kZSh2YWx1ZSk7XG4gICAgICAgIGlmICh2YWx1ZSA8IGN1cnJlbnQuZGF0YSkgY3VycmVudC5sZWZ0ID0gdGhpcy5pbnNlcnRSZWN1cnNpdmUoY3VycmVudC5sZWZ0LCB2YWx1ZSk7XG4gICAgICAgIGlmICh2YWx1ZSA+IGN1cnJlbnQuZGF0YSkgY3VycmVudC5yaWdodCA9IHRoaXMuaW5zZXJ0UmVjdXJzaXZlKGN1cnJlbnQucmlnaHQsIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgfVxuXG4gICAgcHJldHR5UHJpbnQobm9kZSwgcHJlZml4ID0gXCJcIiwgaXNMZWZ0ID0gdHJ1ZSkge1xuICAgICAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlLnJpZ2h0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnByZXR0eVByaW50KFxuICAgICAgICAgICAgICAgIG5vZGUucmlnaHQsXG4gICAgICAgICAgICAgICAgYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCLilIIgICBcIiA6IFwiICAgIFwifWAsXG4gICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCLilJTilIDilIAgXCIgOiBcIuKUjOKUgOKUgCBcIn0ke25vZGUuZGF0YX1gKTtcbiAgICAgICAgaWYgKG5vZGUubGVmdCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5wcmV0dHlQcmludChcbiAgICAgICAgICAgICAgICBub2RlLmxlZnQsXG4gICAgICAgICAgICAgICAgYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCIgICAgXCIgOiBcIuKUgiAgIFwifWAsXG4gICAgICAgICAgICAgICAgdHJ1ZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY29uc3QgdHJlZSA9IG5ldyBUcmVlKCk7XG50cmVlLmJ1aWxkVHJlZShbMSwgNywgNCwgMjMsIDgsIDksIDQsIDMsIDUsIDcsIDksIDY3LCA2MzQ1LCAzMjRdKTtcbmNvbnNvbGUubG9nKHRyZWUpO1xudHJlZS5wcmV0dHlQcmludCh0cmVlLnJvb3QpO1xudHJlZS5pbnNlcnQoNjgpO1xudHJlZS5wcmV0dHlQcmludCh0cmVlLnJvb3QpO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIG1lcmdlU29ydChhcnIpIHtcbiAgICBpZiAoYXJyLmxlbmd0aCA8PSAxKSB7XG4gICAgICAgIHJldHVybiBhcnI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IG1pZGRsZUluZGV4ID0gTWF0aC5mbG9vcihhcnIubGVuZ3RoIC8gMik7XG4gICAgICAgIGxldCBmaXJzdEhhbGYgPSBhcnIuc2xpY2UoMCwgbWlkZGxlSW5kZXgpO1xuICAgICAgICBsZXQgc2Vjb25kSGFsZiA9IGFyci5zbGljZShtaWRkbGVJbmRleCk7XG4gICAgICAgIGxldCBmaXJzdFNvcnRlZCA9IG1lcmdlU29ydChmaXJzdEhhbGYpO1xuICAgICAgICBsZXQgc2Vjb25kU29ydGVkID0gbWVyZ2VTb3J0KHNlY29uZEhhbGYpO1xuICAgICAgICByZXR1cm4gbWVyZ2UoZmlyc3RTb3J0ZWQsIHNlY29uZFNvcnRlZCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBtZXJnZShhcnIxLCBhcnIyKSB7XG4gICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgIGxldCBpID0gMDtcbiAgICBsZXQgaiA9IDA7XG5cbiAgICB3aGlsZSAoaSA8IGFycjEubGVuZ3RoICYmIGogPCBhcnIyLmxlbmd0aCkge1xuICAgICAgICBpZiAoYXJyMVtpXSA8IGFycjJbal0pIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGFycjFbaV0pO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goYXJyMltqXSk7XG4gICAgICAgICAgICBqKys7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0LmNvbmNhdChhcnIxLnNsaWNlKGkpLmNvbmNhdChhcnIyLnNsaWNlKGopKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVEdXBsaWNhdGUoc29ydGVkQXJyYXkpIHtcbiAgICByZXR1cm4gc29ydGVkQXJyYXkuZmlsdGVyKChpdGVtLCBpbmRleCwgYXJyYXkpID0+IHtcbiAgICAgICAgcmV0dXJuIGluZGV4ID09PSAwIHx8IGl0ZW0gIT09IGFycmF5W2luZGV4IC0gMV07XG4gICAgfSk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=