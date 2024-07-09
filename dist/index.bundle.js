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


/**
 * Represents a single node within the binary search tree.
 * @param {number} data - The value stored in the node.
 * @param {Node} left - A pointer to the left child node.
 * @param {Node} right - A pointer to the right child node.
 */
class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left; // Left child node
        this.right = right; // Right child node
    }
}

/**
 * Represents a binary search tree and provides methods for inserting, deleting,
 * and searching for values, as well as tree traversal functions.
 */
class Tree {
    constructor() {
        this.root = null; // Root node of the tree, initially null
    }

    /**
     * Builds the binary search tree from an array of values.
     * @param {Array} array - The array of values to build the tree from.
     * @returns {Node} The root node of the tree.
     */
    buildTree(array) {
        let sortedArray = this.prepareArray(array); // Sorts array and removes duplicates
        this.root = this.recursiveBuild(sortedArray); // Builds the tree recursively from the sorted array
        return this.root;
    }

    /**
     * Prepares the array for building the tree by sorting and removing duplicates.
     * @param {Array} array - The array to prepare.
     * @returns {Array} The processed array.
     */
    prepareArray(array) {
        if (array.length === 0) return [];
        return (0,_merge_js__WEBPACK_IMPORTED_MODULE_0__.removeDuplicate)((0,_merge_js__WEBPACK_IMPORTED_MODULE_0__.mergeSort)(array)); // Uses external functions to sort and deduplicate
    }

    /**
     * Recursively builds a balanced binary search tree from a sorted array.
     * @param {Array} array - The sorted array to build the tree from.
     * @returns {Node} The node at the current recursive level.
     */
    recursiveBuild(array) {
        if (array.length === 0) return null; // No more elements to process
        if (array.length === 1) return new Node(array[0]); // Single element, make a node

        let middleIndex = Math.floor(array.length / 2); // Find the middle index
        let newNode = new Node(array[middleIndex]); // Create a node with the middle element
        newNode.left = this.buildTree(array.slice(0, middleIndex)); // Recursively build the left subtree
        newNode.right = this.buildTree(array.slice(middleIndex + 1)); // Recursively build the right subtree
        return newNode; // Return the newly created node
    }

    /**
     * Inserts a new value into the binary search tree.
     * @param {number} value - The value to insert.
     */
    insert(value) {
        this.root = this.insertRecursive(this.root, value); // Start the recursive insertion from the root
    }

    /**
     * Recursively inserts a new value into the tree.
     * @param {Node} current - The current node in the recursion.
     * @param {number} value - The value to insert.
     * @returns {Node} The updated node after insertion.
     */
    insertRecursive(current, value) {
        if (current === null) return new Node(value); // Base case: insert the new node here
        if (value < current.data) {
            current.left = this.insertRecursive(current.left, value); // Insert in the left subtree
        } else if (value > current.data) {
            current.right = this.insertRecursive(current.right, value); // Insert in the right subtree
        }
        return current; // Return the current node to link back properly
    }

    /**
     * Deletes a value from the binary search tree.
     * @param {number} value - The value to delete.
     */
    delete(value) {
        this.root = this.deleteRecursive(this.root, value); // Start the recursive deletion from the root
    }

    /**
     * Recursively deletes a node with the specified value from the tree.
     * @param {Node} current - The current node in the recursion.
     * @param {number} value - The value to be deleted.
     * @returns {Node} The updated node after deletion.
     */
    deleteRecursive(current, value) {
        if (current === null) return null; // Base case: value not found
        if (value < current.data) {
            current.left = this.deleteRecursive(current.left, value); // Value might be in the left subtree
        } else if (value > current.data) {
            current.right = this.deleteRecursive(current.right, value); // Value might be in the right subtree
        } else {
            // Found the node to delete
            if (current.left === null && current.right === null) {
                return null; // No children, simply remove it
            } else if (current.left === null) {
                return current.right; // Only a right child, replace the node with it
            } else if (current.right === null) {
                return current.left; // Only a left child, replace the node with it
            } else {
                // Node has two children, find the inorder successor
                let successor = this.findMin(current.right);
                current.data = successor.data; // Replace the data with successor's data
                current.right = this.deleteRecursive(
                    current.right,
                    successor.data
                ); // Remove the successor
            }
        }
        return current; // Return the current node to link back properly
    }

    /**
     * Finds the node with the minimum value in the subtree starting from the given node.
     * @param {Node} current - The current node from which to find the minimum.
     * @returns {Node} The node with the minimum value.
     */
    findMin(current) {
        while (current.left !== null) {
            current = current.left; // Keep going left to find the minimum value
        }
        return current; // Return the node with the minimum value
    }

    /**
     * Searches for a node with the given value starting from the root of the tree.
     * @param {number} value - The value to search for.
     * @returns {Node|null} The found node, or null if the node does not exist.
     */
    find(value) {
        let current = this.root; // Start from the root of the tree
        return this.findRecursive(current, value); // Begin recursive search
    }

    /**
     * Recursively searches for the specified value in the binary search tree.
     * @param {Node} current - The current node in the recursion.
     * @param {number} value - The value to search for.
     * @returns {Node|null} The found node, or null if the node does not exist in this path.
     */
    findRecursive(current, value) {
        if (current === null) return null; // Base case: no node to search
        if (current.data === value) return current; // Node found, return it
        if (value < current.data) {
            return this.findRecursive(current.left, value); // Search left subtree
        }
        return this.findRecursive(current.right, value); // Search right subtree
    }

    /**
     * Performs a level order traversal of the tree. If a callback is provided, applies it to each node,
     * otherwise collects and returns an array of node values.
     * @param {Function} callback - Optional function to apply to each node.
     * @returns {Array|null} An array of node values if no callback is provided, or null if a callback is used.
     */
    levelOrder(callback) {
        let root = this.root; // Start from the root
        if (root === null) return []; // Return empty array if tree is empty
        const queue = [root]; // Initialize queue with root node for BFS
        const breadthFirst = []; // Collects node values if no callback provided
        while (queue.length > 0) {
            let current = queue.shift(); // Process nodes one by one
            if (callback) {
                callback(current); // Apply callback if provided
            } else {
                breadthFirst.push(current.data); // Collect data if no callback
            }
            if (current.left !== null) queue.push(current.left); // Add left child to queue
            if (current.right !== null) queue.push(current.right); // Add right child to queue
        }
        if (!callback) return breadthFirst; // Return collected data if no callback used
    }

    /**
     * Performs an inorder traversal of the tree. If a callback is provided, applies it to each node,
     * otherwise collects and returns an array of node values.
     * @param {Function} callback - Optional function to apply to each node.
     * @returns {Array|null} An array of node values if no callback is provided, or null if a callback is used.
     */
    inOrder(callback) {
        const inOrderList = []; // List to collect node values
        this.inOrderRecursive(this.root, inOrderList, callback); // Start recursive traversal from root
        if (!callback) return inOrderList; // Return list if no callback provided
    }

    /**
     * Helper function to perform an inorder traversal of the tree recursively.
     * @param {Node} current - The current node being processed.
     * @param {Array} list - Array to collect node values.
     * @param {Function} callback - Optional function to apply to each node.
     */
    inOrderRecursive(current, list, callback) {
        if (current === null) return; // Base case: end of branch
        this.inOrderRecursive(current.left, list, callback); // Traverse left subtree
        if (callback) {
            callback(current); // Apply callback to current node
        } else {
            list.push(current.data); // Collect current node's data
        }
        this.inOrderRecursive(current.right, list, callback); // Traverse right subtree
    }

    /**
     * Performs a preorder traversal of the tree. If a callback is provided, applies it to each node,
     * otherwise collects and returns an array of node values.
     * @param {Function} callback - Optional function to apply to each node.
     * @returns {Array|null} An array of node values if no callback is provided, or null if a callback is used.
     */
    preOrder(callback) {
        const preOrderList = []; // List to collect node values
        this.preOrderRecursive(this.root, preOrderList, callback); // Start recursive traversal from root
        if (!callback) return preOrderList; // Return list if no callback provided
    }

    /**
     * Helper function to perform a preorder traversal of the tree recursively.
     * @param {Node} current - The current node being processed.
     * @param {Array} list - Array to collect node values.
     * @param {Function} callback - Optional function to apply to each node.
     */
    preOrderRecursive(current, list, callback) {
        if (current === null) return; // Base case: end of branch
        if (callback) {
            callback(current); // Apply callback to current node
        } else {
            list.push(current.data); // Collect current node's data
        }
        this.preOrderRecursive(current.left, list, callback); // Traverse left subtree
        this.preOrderRecursive(current.right, list, callback); // Traverse right subtree
    }

    /**
     * Performs a postorder traversal of the tree. If a callback is provided, applies it to each node,
     * otherwise collects and returns an array of node values.
     * @param {Function} callback - Optional function to apply to each node.
     * @returns {Array|null} An array of node values if no callback is provided, or null if a callback is used.
     */
    postOrder(callback) {
        const postOrderList = []; // List to collect node values
        this.postOrderRecursive(this.root, postOrderList, callback); // Start recursive traversal from root
        if (!callback) return postOrderList; // Return list if no callback provided
    }

    /**
     * Helper function to perform a postorder traversal of the tree recursively.
     * @param {Node} current - The current node being processed.
     * @param {Array} list - Array to collect node values.
     * @param {Function} callback - Optional function to apply to each node.
     */
    postOrderRecursive(current, list, callback) {
        if (current === null) return; // Base case: end of branch
        this.postOrderRecursive(current.left, list, callback); // Traverse left subtree
        this.postOrderRecursive(current.right, list, callback); // Traverse right subtree
        if (callback) {
            callback(current); // Apply callback to current node
        } else {
            list.push(current.data); // Collect current node's data
        }
    }

    /**
     * Calculates the height of the tree from a specific node.
     * Height is defined as the number of edges on the longest path from the node to a leaf.
     *
     * @param {number} node - The data of the node from which to calculate the height.
     * @returns {number|null} The height from the node to the deepest leaf or null if the node doesn't exist.
     */
    height(node) {
        const foundNode = this.find(node); // Attempt to locate the node in the tree
        if (foundNode) {
            // If the node is found, calculate the height from this node
            return this.heightRecursive(foundNode);
        }
        return null; // Return null if the node is not found in the tree
    }

    /**
     * Helper function to recursively calculate the height of the tree from the given node.
     *
     * @param {Node|null} node - The node from which to calculate the height.
     * @returns {number} The height of the tree from the given node.
     */
    heightRecursive(node) {
        if (node === null) return -1; // Base case: return -1 for null to account for the edge count correctly
        let left = this.heightRecursive(node.left); // Recursively calculate height of the left subtree
        let right = this.heightRecursive(node.right); // Recursively calculate height of the right subtree
        return Math.max(left, right) + 1; // Return the greater height plus one for the current node
    }

    /**
     * Calculates the depth of a specific node from the root of the tree.
     * Depth is defined as the number of edges from the root to the node.
     *
     * @param {number} node - The data of the node for which to calculate the depth.
     * @returns {number} The depth of the node, or Infinity if the node does not exist.
     */
    depth(node) {
        let current = this.root; // Start from the root of the tree
        return this.depthRecursive(node, current); // Initiate recursive depth calculation
    }

    /**
     * Helper function to recursively determine the depth of a specified node from the current node.
     *
     * @param {number} node - The data of the node for which to calculate the depth.
     * @param {Node} current - The current node in the tree during the recursive call.
     * @returns {number} The depth of the node, or Infinity if the node does not exist in this path.
     */
    depthRecursive(node, current) {
        if (current === null) return Infinity; // Base case: if current is null, node is not in this subtree
        if (node === current.data) return 0; // Base case: if the node is found, depth is 0

        let left = this.depthRecursive(node, current.left); // Recursively find depth in the left subtree
        let right = this.depthRecursive(node, current.right); // Recursively find depth in the right subtree

        if (left === Infinity && right === Infinity) {
            return Infinity; // Node not found in either subtree
        } else {
            return Math.min(left, right) + 1; // Return the minimum depth found plus one for the current node
        }
    }

    /**
     * A utility function to visually print the structure of the tree. Displays the tree
     * with each node in its relative position, aiding in understanding the tree layout.
     * @param {Node} node - The starting node to print from.
     * @param {string} prefix - The prefix used to indicate line starts in the tree printout.
     * @param {boolean} isLeft - Indicates if the current node is a left child.
     */
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
tree.insert(48);
tree.insert(15);
tree.delete(4);
tree.prettyPrint(tree.root);
console.log(tree.find(67));
console.log(tree.find(14));
console.log(tree.levelOrder());
console.log(tree.inOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.height(3));
console.log(tree.depth(15));


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
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQXdEOztBQUV4RDtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsTUFBTTtBQUNqQixXQUFXLE1BQU07QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUIsNEJBQTRCO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0EsMEJBQTBCO0FBQzFCOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsaUJBQWlCLE1BQU07QUFDdkI7QUFDQTtBQUNBLG9EQUFvRDtBQUNwRCxzREFBc0Q7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBLGVBQWUsMERBQWUsQ0FBQyxvREFBUyxVQUFVO0FBQ2xEOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsaUJBQWlCLE1BQU07QUFDdkI7QUFDQTtBQUNBLDZDQUE2QztBQUM3QywyREFBMkQ7O0FBRTNELHdEQUF3RDtBQUN4RCxvREFBb0Q7QUFDcEQsb0VBQW9FO0FBQ3BFLHNFQUFzRTtBQUN0RSx3QkFBd0I7QUFDeEI7O0FBRUE7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0EsNERBQTREO0FBQzVEOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE1BQU07QUFDckIsZUFBZSxRQUFRO0FBQ3ZCLGlCQUFpQixNQUFNO0FBQ3ZCO0FBQ0E7QUFDQSxzREFBc0Q7QUFDdEQ7QUFDQSxzRUFBc0U7QUFDdEUsVUFBVTtBQUNWLHdFQUF3RTtBQUN4RTtBQUNBLHdCQUF3QjtBQUN4Qjs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQSw0REFBNEQ7QUFDNUQ7O0FBRUE7QUFDQTtBQUNBLGVBQWUsTUFBTTtBQUNyQixlQUFlLFFBQVE7QUFDdkIsaUJBQWlCLE1BQU07QUFDdkI7QUFDQTtBQUNBLDJDQUEyQztBQUMzQztBQUNBLHNFQUFzRTtBQUN0RSxVQUFVO0FBQ1Ysd0VBQXdFO0FBQ3hFLFVBQVU7QUFDVjtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCLGNBQWM7QUFDZCxzQ0FBc0M7QUFDdEMsY0FBYztBQUNkLHFDQUFxQztBQUNyQyxjQUFjO0FBQ2Q7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBLHdCQUF3QjtBQUN4Qjs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxNQUFNO0FBQ3JCLGlCQUFpQixNQUFNO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBLHdCQUF3QjtBQUN4Qjs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGlCQUFpQixXQUFXO0FBQzVCO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMsbURBQW1EO0FBQ25EOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE1BQU07QUFDckIsZUFBZSxRQUFRO0FBQ3ZCLGlCQUFpQixXQUFXO0FBQzVCO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0Msb0RBQW9EO0FBQ3BEO0FBQ0EsNERBQTREO0FBQzVEO0FBQ0EseURBQXlEO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsVUFBVTtBQUN6QixpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCLHNDQUFzQztBQUN0Qyw4QkFBOEI7QUFDOUIsaUNBQWlDO0FBQ2pDO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0EsbUNBQW1DO0FBQ25DLGNBQWM7QUFDZCxpREFBaUQ7QUFDakQ7QUFDQSxpRUFBaUU7QUFDakUsbUVBQW1FO0FBQ25FO0FBQ0EsNENBQTRDO0FBQzVDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsVUFBVTtBQUN6QixpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDLGlFQUFpRTtBQUNqRSwyQ0FBMkM7QUFDM0M7O0FBRUE7QUFDQTtBQUNBLGVBQWUsTUFBTTtBQUNyQixlQUFlLE9BQU87QUFDdEIsZUFBZSxVQUFVO0FBQ3pCO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEMsNkRBQTZEO0FBQzdEO0FBQ0EsK0JBQStCO0FBQy9CLFVBQVU7QUFDVixxQ0FBcUM7QUFDckM7QUFDQSw4REFBOEQ7QUFDOUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxVQUFVO0FBQ3pCLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMsbUVBQW1FO0FBQ25FLDRDQUE0QztBQUM1Qzs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxNQUFNO0FBQ3JCLGVBQWUsT0FBTztBQUN0QixlQUFlLFVBQVU7QUFDekI7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBLCtCQUErQjtBQUMvQixVQUFVO0FBQ1YscUNBQXFDO0FBQ3JDO0FBQ0EsOERBQThEO0FBQzlELCtEQUErRDtBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFVBQVU7QUFDekIsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTtBQUNBLGtDQUFrQztBQUNsQyxxRUFBcUU7QUFDckUsNkNBQTZDO0FBQzdDOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE1BQU07QUFDckIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsVUFBVTtBQUN6QjtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDLCtEQUErRDtBQUMvRCxnRUFBZ0U7QUFDaEU7QUFDQSwrQkFBK0I7QUFDL0IsVUFBVTtBQUNWLHFDQUFxQztBQUNyQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGlCQUFpQixhQUFhO0FBQzlCO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxXQUFXO0FBQzFCLGlCQUFpQixRQUFRO0FBQ3pCO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEMsb0RBQW9EO0FBQ3BELHNEQUFzRDtBQUN0RCwwQ0FBMEM7QUFDMUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkIsaUJBQWlCLFFBQVE7QUFDekI7QUFDQTtBQUNBLGlDQUFpQztBQUNqQyxtREFBbUQ7QUFDbkQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGVBQWUsTUFBTTtBQUNyQixpQkFBaUIsUUFBUTtBQUN6QjtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DLDZDQUE2Qzs7QUFFN0MsNERBQTREO0FBQzVELDhEQUE4RDs7QUFFOUQ7QUFDQSw2QkFBNkI7QUFDN0IsVUFBVTtBQUNWLDhDQUE4QztBQUM5QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsTUFBTTtBQUNyQixlQUFlLFFBQVE7QUFDdkIsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsT0FBTyxFQUFFLHlCQUF5QjtBQUNyRDtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFVBQVU7QUFDckU7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE9BQU8sRUFBRSx5QkFBeUI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzdYQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsZUFBZTs7QUFFZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixVQUFVO0FBQ1Y7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCIsInNvdXJjZXMiOlsid2VicGFjazovL2JpbmFyeXNlYXJjaHRyZWVzLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JpbmFyeXNlYXJjaHRyZWVzLy4vc3JjL21lcmdlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG1lcmdlU29ydCwgcmVtb3ZlRHVwbGljYXRlIH0gZnJvbSBcIi4vbWVyZ2UuanNcIjtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgc2luZ2xlIG5vZGUgd2l0aGluIHRoZSBiaW5hcnkgc2VhcmNoIHRyZWUuXG4gKiBAcGFyYW0ge251bWJlcn0gZGF0YSAtIFRoZSB2YWx1ZSBzdG9yZWQgaW4gdGhlIG5vZGUuXG4gKiBAcGFyYW0ge05vZGV9IGxlZnQgLSBBIHBvaW50ZXIgdG8gdGhlIGxlZnQgY2hpbGQgbm9kZS5cbiAqIEBwYXJhbSB7Tm9kZX0gcmlnaHQgLSBBIHBvaW50ZXIgdG8gdGhlIHJpZ2h0IGNoaWxkIG5vZGUuXG4gKi9cbmNsYXNzIE5vZGUge1xuICAgIGNvbnN0cnVjdG9yKGRhdGEsIGxlZnQgPSBudWxsLCByaWdodCA9IG51bGwpIHtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5sZWZ0ID0gbGVmdDsgLy8gTGVmdCBjaGlsZCBub2RlXG4gICAgICAgIHRoaXMucmlnaHQgPSByaWdodDsgLy8gUmlnaHQgY2hpbGQgbm9kZVxuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgYmluYXJ5IHNlYXJjaCB0cmVlIGFuZCBwcm92aWRlcyBtZXRob2RzIGZvciBpbnNlcnRpbmcsIGRlbGV0aW5nLFxuICogYW5kIHNlYXJjaGluZyBmb3IgdmFsdWVzLCBhcyB3ZWxsIGFzIHRyZWUgdHJhdmVyc2FsIGZ1bmN0aW9ucy5cbiAqL1xuZXhwb3J0IGNsYXNzIFRyZWUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnJvb3QgPSBudWxsOyAvLyBSb290IG5vZGUgb2YgdGhlIHRyZWUsIGluaXRpYWxseSBudWxsXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQnVpbGRzIHRoZSBiaW5hcnkgc2VhcmNoIHRyZWUgZnJvbSBhbiBhcnJheSBvZiB2YWx1ZXMuXG4gICAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgLSBUaGUgYXJyYXkgb2YgdmFsdWVzIHRvIGJ1aWxkIHRoZSB0cmVlIGZyb20uXG4gICAgICogQHJldHVybnMge05vZGV9IFRoZSByb290IG5vZGUgb2YgdGhlIHRyZWUuXG4gICAgICovXG4gICAgYnVpbGRUcmVlKGFycmF5KSB7XG4gICAgICAgIGxldCBzb3J0ZWRBcnJheSA9IHRoaXMucHJlcGFyZUFycmF5KGFycmF5KTsgLy8gU29ydHMgYXJyYXkgYW5kIHJlbW92ZXMgZHVwbGljYXRlc1xuICAgICAgICB0aGlzLnJvb3QgPSB0aGlzLnJlY3Vyc2l2ZUJ1aWxkKHNvcnRlZEFycmF5KTsgLy8gQnVpbGRzIHRoZSB0cmVlIHJlY3Vyc2l2ZWx5IGZyb20gdGhlIHNvcnRlZCBhcnJheVxuICAgICAgICByZXR1cm4gdGhpcy5yb290O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByZXBhcmVzIHRoZSBhcnJheSBmb3IgYnVpbGRpbmcgdGhlIHRyZWUgYnkgc29ydGluZyBhbmQgcmVtb3ZpbmcgZHVwbGljYXRlcy5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSAtIFRoZSBhcnJheSB0byBwcmVwYXJlLlxuICAgICAqIEByZXR1cm5zIHtBcnJheX0gVGhlIHByb2Nlc3NlZCBhcnJheS5cbiAgICAgKi9cbiAgICBwcmVwYXJlQXJyYXkoYXJyYXkpIHtcbiAgICAgICAgaWYgKGFycmF5Lmxlbmd0aCA9PT0gMCkgcmV0dXJuIFtdO1xuICAgICAgICByZXR1cm4gcmVtb3ZlRHVwbGljYXRlKG1lcmdlU29ydChhcnJheSkpOyAvLyBVc2VzIGV4dGVybmFsIGZ1bmN0aW9ucyB0byBzb3J0IGFuZCBkZWR1cGxpY2F0ZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlY3Vyc2l2ZWx5IGJ1aWxkcyBhIGJhbGFuY2VkIGJpbmFyeSBzZWFyY2ggdHJlZSBmcm9tIGEgc29ydGVkIGFycmF5LlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IC0gVGhlIHNvcnRlZCBhcnJheSB0byBidWlsZCB0aGUgdHJlZSBmcm9tLlxuICAgICAqIEByZXR1cm5zIHtOb2RlfSBUaGUgbm9kZSBhdCB0aGUgY3VycmVudCByZWN1cnNpdmUgbGV2ZWwuXG4gICAgICovXG4gICAgcmVjdXJzaXZlQnVpbGQoYXJyYXkpIHtcbiAgICAgICAgaWYgKGFycmF5Lmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7IC8vIE5vIG1vcmUgZWxlbWVudHMgdG8gcHJvY2Vzc1xuICAgICAgICBpZiAoYXJyYXkubGVuZ3RoID09PSAxKSByZXR1cm4gbmV3IE5vZGUoYXJyYXlbMF0pOyAvLyBTaW5nbGUgZWxlbWVudCwgbWFrZSBhIG5vZGVcblxuICAgICAgICBsZXQgbWlkZGxlSW5kZXggPSBNYXRoLmZsb29yKGFycmF5Lmxlbmd0aCAvIDIpOyAvLyBGaW5kIHRoZSBtaWRkbGUgaW5kZXhcbiAgICAgICAgbGV0IG5ld05vZGUgPSBuZXcgTm9kZShhcnJheVttaWRkbGVJbmRleF0pOyAvLyBDcmVhdGUgYSBub2RlIHdpdGggdGhlIG1pZGRsZSBlbGVtZW50XG4gICAgICAgIG5ld05vZGUubGVmdCA9IHRoaXMuYnVpbGRUcmVlKGFycmF5LnNsaWNlKDAsIG1pZGRsZUluZGV4KSk7IC8vIFJlY3Vyc2l2ZWx5IGJ1aWxkIHRoZSBsZWZ0IHN1YnRyZWVcbiAgICAgICAgbmV3Tm9kZS5yaWdodCA9IHRoaXMuYnVpbGRUcmVlKGFycmF5LnNsaWNlKG1pZGRsZUluZGV4ICsgMSkpOyAvLyBSZWN1cnNpdmVseSBidWlsZCB0aGUgcmlnaHQgc3VidHJlZVxuICAgICAgICByZXR1cm4gbmV3Tm9kZTsgLy8gUmV0dXJuIHRoZSBuZXdseSBjcmVhdGVkIG5vZGVcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIGEgbmV3IHZhbHVlIGludG8gdGhlIGJpbmFyeSBzZWFyY2ggdHJlZS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gaW5zZXJ0LlxuICAgICAqL1xuICAgIGluc2VydCh2YWx1ZSkge1xuICAgICAgICB0aGlzLnJvb3QgPSB0aGlzLmluc2VydFJlY3Vyc2l2ZSh0aGlzLnJvb3QsIHZhbHVlKTsgLy8gU3RhcnQgdGhlIHJlY3Vyc2l2ZSBpbnNlcnRpb24gZnJvbSB0aGUgcm9vdFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlY3Vyc2l2ZWx5IGluc2VydHMgYSBuZXcgdmFsdWUgaW50byB0aGUgdHJlZS5cbiAgICAgKiBAcGFyYW0ge05vZGV9IGN1cnJlbnQgLSBUaGUgY3VycmVudCBub2RlIGluIHRoZSByZWN1cnNpb24uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gVGhlIHZhbHVlIHRvIGluc2VydC5cbiAgICAgKiBAcmV0dXJucyB7Tm9kZX0gVGhlIHVwZGF0ZWQgbm9kZSBhZnRlciBpbnNlcnRpb24uXG4gICAgICovXG4gICAgaW5zZXJ0UmVjdXJzaXZlKGN1cnJlbnQsIHZhbHVlKSB7XG4gICAgICAgIGlmIChjdXJyZW50ID09PSBudWxsKSByZXR1cm4gbmV3IE5vZGUodmFsdWUpOyAvLyBCYXNlIGNhc2U6IGluc2VydCB0aGUgbmV3IG5vZGUgaGVyZVxuICAgICAgICBpZiAodmFsdWUgPCBjdXJyZW50LmRhdGEpIHtcbiAgICAgICAgICAgIGN1cnJlbnQubGVmdCA9IHRoaXMuaW5zZXJ0UmVjdXJzaXZlKGN1cnJlbnQubGVmdCwgdmFsdWUpOyAvLyBJbnNlcnQgaW4gdGhlIGxlZnQgc3VidHJlZVxuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID4gY3VycmVudC5kYXRhKSB7XG4gICAgICAgICAgICBjdXJyZW50LnJpZ2h0ID0gdGhpcy5pbnNlcnRSZWN1cnNpdmUoY3VycmVudC5yaWdodCwgdmFsdWUpOyAvLyBJbnNlcnQgaW4gdGhlIHJpZ2h0IHN1YnRyZWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VycmVudDsgLy8gUmV0dXJuIHRoZSBjdXJyZW50IG5vZGUgdG8gbGluayBiYWNrIHByb3Blcmx5XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlcyBhIHZhbHVlIGZyb20gdGhlIGJpbmFyeSBzZWFyY2ggdHJlZS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gZGVsZXRlLlxuICAgICAqL1xuICAgIGRlbGV0ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLnJvb3QgPSB0aGlzLmRlbGV0ZVJlY3Vyc2l2ZSh0aGlzLnJvb3QsIHZhbHVlKTsgLy8gU3RhcnQgdGhlIHJlY3Vyc2l2ZSBkZWxldGlvbiBmcm9tIHRoZSByb290XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVjdXJzaXZlbHkgZGVsZXRlcyBhIG5vZGUgd2l0aCB0aGUgc3BlY2lmaWVkIHZhbHVlIGZyb20gdGhlIHRyZWUuXG4gICAgICogQHBhcmFtIHtOb2RlfSBjdXJyZW50IC0gVGhlIGN1cnJlbnQgbm9kZSBpbiB0aGUgcmVjdXJzaW9uLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBiZSBkZWxldGVkLlxuICAgICAqIEByZXR1cm5zIHtOb2RlfSBUaGUgdXBkYXRlZCBub2RlIGFmdGVyIGRlbGV0aW9uLlxuICAgICAqL1xuICAgIGRlbGV0ZVJlY3Vyc2l2ZShjdXJyZW50LCB2YWx1ZSkge1xuICAgICAgICBpZiAoY3VycmVudCA9PT0gbnVsbCkgcmV0dXJuIG51bGw7IC8vIEJhc2UgY2FzZTogdmFsdWUgbm90IGZvdW5kXG4gICAgICAgIGlmICh2YWx1ZSA8IGN1cnJlbnQuZGF0YSkge1xuICAgICAgICAgICAgY3VycmVudC5sZWZ0ID0gdGhpcy5kZWxldGVSZWN1cnNpdmUoY3VycmVudC5sZWZ0LCB2YWx1ZSk7IC8vIFZhbHVlIG1pZ2h0IGJlIGluIHRoZSBsZWZ0IHN1YnRyZWVcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA+IGN1cnJlbnQuZGF0YSkge1xuICAgICAgICAgICAgY3VycmVudC5yaWdodCA9IHRoaXMuZGVsZXRlUmVjdXJzaXZlKGN1cnJlbnQucmlnaHQsIHZhbHVlKTsgLy8gVmFsdWUgbWlnaHQgYmUgaW4gdGhlIHJpZ2h0IHN1YnRyZWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEZvdW5kIHRoZSBub2RlIHRvIGRlbGV0ZVxuICAgICAgICAgICAgaWYgKGN1cnJlbnQubGVmdCA9PT0gbnVsbCAmJiBjdXJyZW50LnJpZ2h0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7IC8vIE5vIGNoaWxkcmVuLCBzaW1wbHkgcmVtb3ZlIGl0XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnQubGVmdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50LnJpZ2h0OyAvLyBPbmx5IGEgcmlnaHQgY2hpbGQsIHJlcGxhY2UgdGhlIG5vZGUgd2l0aCBpdFxuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50LnJpZ2h0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQubGVmdDsgLy8gT25seSBhIGxlZnQgY2hpbGQsIHJlcGxhY2UgdGhlIG5vZGUgd2l0aCBpdFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBOb2RlIGhhcyB0d28gY2hpbGRyZW4sIGZpbmQgdGhlIGlub3JkZXIgc3VjY2Vzc29yXG4gICAgICAgICAgICAgICAgbGV0IHN1Y2Nlc3NvciA9IHRoaXMuZmluZE1pbihjdXJyZW50LnJpZ2h0KTtcbiAgICAgICAgICAgICAgICBjdXJyZW50LmRhdGEgPSBzdWNjZXNzb3IuZGF0YTsgLy8gUmVwbGFjZSB0aGUgZGF0YSB3aXRoIHN1Y2Nlc3NvcidzIGRhdGFcbiAgICAgICAgICAgICAgICBjdXJyZW50LnJpZ2h0ID0gdGhpcy5kZWxldGVSZWN1cnNpdmUoXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQucmlnaHQsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3Nvci5kYXRhXG4gICAgICAgICAgICAgICAgKTsgLy8gUmVtb3ZlIHRoZSBzdWNjZXNzb3JcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VycmVudDsgLy8gUmV0dXJuIHRoZSBjdXJyZW50IG5vZGUgdG8gbGluayBiYWNrIHByb3Blcmx5XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZHMgdGhlIG5vZGUgd2l0aCB0aGUgbWluaW11bSB2YWx1ZSBpbiB0aGUgc3VidHJlZSBzdGFydGluZyBmcm9tIHRoZSBnaXZlbiBub2RlLlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gY3VycmVudCAtIFRoZSBjdXJyZW50IG5vZGUgZnJvbSB3aGljaCB0byBmaW5kIHRoZSBtaW5pbXVtLlxuICAgICAqIEByZXR1cm5zIHtOb2RlfSBUaGUgbm9kZSB3aXRoIHRoZSBtaW5pbXVtIHZhbHVlLlxuICAgICAqL1xuICAgIGZpbmRNaW4oY3VycmVudCkge1xuICAgICAgICB3aGlsZSAoY3VycmVudC5sZWZ0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5sZWZ0OyAvLyBLZWVwIGdvaW5nIGxlZnQgdG8gZmluZCB0aGUgbWluaW11bSB2YWx1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjdXJyZW50OyAvLyBSZXR1cm4gdGhlIG5vZGUgd2l0aCB0aGUgbWluaW11bSB2YWx1ZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlYXJjaGVzIGZvciBhIG5vZGUgd2l0aCB0aGUgZ2l2ZW4gdmFsdWUgc3RhcnRpbmcgZnJvbSB0aGUgcm9vdCBvZiB0aGUgdHJlZS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcmV0dXJucyB7Tm9kZXxudWxsfSBUaGUgZm91bmQgbm9kZSwgb3IgbnVsbCBpZiB0aGUgbm9kZSBkb2VzIG5vdCBleGlzdC5cbiAgICAgKi9cbiAgICBmaW5kKHZhbHVlKSB7XG4gICAgICAgIGxldCBjdXJyZW50ID0gdGhpcy5yb290OyAvLyBTdGFydCBmcm9tIHRoZSByb290IG9mIHRoZSB0cmVlXG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRSZWN1cnNpdmUoY3VycmVudCwgdmFsdWUpOyAvLyBCZWdpbiByZWN1cnNpdmUgc2VhcmNoXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVjdXJzaXZlbHkgc2VhcmNoZXMgZm9yIHRoZSBzcGVjaWZpZWQgdmFsdWUgaW4gdGhlIGJpbmFyeSBzZWFyY2ggdHJlZS5cbiAgICAgKiBAcGFyYW0ge05vZGV9IGN1cnJlbnQgLSBUaGUgY3VycmVudCBub2RlIGluIHRoZSByZWN1cnNpb24uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHJldHVybnMge05vZGV8bnVsbH0gVGhlIGZvdW5kIG5vZGUsIG9yIG51bGwgaWYgdGhlIG5vZGUgZG9lcyBub3QgZXhpc3QgaW4gdGhpcyBwYXRoLlxuICAgICAqL1xuICAgIGZpbmRSZWN1cnNpdmUoY3VycmVudCwgdmFsdWUpIHtcbiAgICAgICAgaWYgKGN1cnJlbnQgPT09IG51bGwpIHJldHVybiBudWxsOyAvLyBCYXNlIGNhc2U6IG5vIG5vZGUgdG8gc2VhcmNoXG4gICAgICAgIGlmIChjdXJyZW50LmRhdGEgPT09IHZhbHVlKSByZXR1cm4gY3VycmVudDsgLy8gTm9kZSBmb3VuZCwgcmV0dXJuIGl0XG4gICAgICAgIGlmICh2YWx1ZSA8IGN1cnJlbnQuZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluZFJlY3Vyc2l2ZShjdXJyZW50LmxlZnQsIHZhbHVlKTsgLy8gU2VhcmNoIGxlZnQgc3VidHJlZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRSZWN1cnNpdmUoY3VycmVudC5yaWdodCwgdmFsdWUpOyAvLyBTZWFyY2ggcmlnaHQgc3VidHJlZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGEgbGV2ZWwgb3JkZXIgdHJhdmVyc2FsIG9mIHRoZSB0cmVlLiBJZiBhIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBhcHBsaWVzIGl0IHRvIGVhY2ggbm9kZSxcbiAgICAgKiBvdGhlcndpc2UgY29sbGVjdHMgYW5kIHJldHVybnMgYW4gYXJyYXkgb2Ygbm9kZSB2YWx1ZXMuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBPcHRpb25hbCBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoIG5vZGUuXG4gICAgICogQHJldHVybnMge0FycmF5fG51bGx9IEFuIGFycmF5IG9mIG5vZGUgdmFsdWVzIGlmIG5vIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBvciBudWxsIGlmIGEgY2FsbGJhY2sgaXMgdXNlZC5cbiAgICAgKi9cbiAgICBsZXZlbE9yZGVyKGNhbGxiYWNrKSB7XG4gICAgICAgIGxldCByb290ID0gdGhpcy5yb290OyAvLyBTdGFydCBmcm9tIHRoZSByb290XG4gICAgICAgIGlmIChyb290ID09PSBudWxsKSByZXR1cm4gW107IC8vIFJldHVybiBlbXB0eSBhcnJheSBpZiB0cmVlIGlzIGVtcHR5XG4gICAgICAgIGNvbnN0IHF1ZXVlID0gW3Jvb3RdOyAvLyBJbml0aWFsaXplIHF1ZXVlIHdpdGggcm9vdCBub2RlIGZvciBCRlNcbiAgICAgICAgY29uc3QgYnJlYWR0aEZpcnN0ID0gW107IC8vIENvbGxlY3RzIG5vZGUgdmFsdWVzIGlmIG5vIGNhbGxiYWNrIHByb3ZpZGVkXG4gICAgICAgIHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudCA9IHF1ZXVlLnNoaWZ0KCk7IC8vIFByb2Nlc3Mgbm9kZXMgb25lIGJ5IG9uZVxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soY3VycmVudCk7IC8vIEFwcGx5IGNhbGxiYWNrIGlmIHByb3ZpZGVkXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJyZWFkdGhGaXJzdC5wdXNoKGN1cnJlbnQuZGF0YSk7IC8vIENvbGxlY3QgZGF0YSBpZiBubyBjYWxsYmFja1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGN1cnJlbnQubGVmdCAhPT0gbnVsbCkgcXVldWUucHVzaChjdXJyZW50LmxlZnQpOyAvLyBBZGQgbGVmdCBjaGlsZCB0byBxdWV1ZVxuICAgICAgICAgICAgaWYgKGN1cnJlbnQucmlnaHQgIT09IG51bGwpIHF1ZXVlLnB1c2goY3VycmVudC5yaWdodCk7IC8vIEFkZCByaWdodCBjaGlsZCB0byBxdWV1ZVxuICAgICAgICB9XG4gICAgICAgIGlmICghY2FsbGJhY2spIHJldHVybiBicmVhZHRoRmlyc3Q7IC8vIFJldHVybiBjb2xsZWN0ZWQgZGF0YSBpZiBubyBjYWxsYmFjayB1c2VkXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYW4gaW5vcmRlciB0cmF2ZXJzYWwgb2YgdGhlIHRyZWUuIElmIGEgY2FsbGJhY2sgaXMgcHJvdmlkZWQsIGFwcGxpZXMgaXQgdG8gZWFjaCBub2RlLFxuICAgICAqIG90aGVyd2lzZSBjb2xsZWN0cyBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiBub2RlIHZhbHVlcy5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIE9wdGlvbmFsIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2ggbm9kZS5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl8bnVsbH0gQW4gYXJyYXkgb2Ygbm9kZSB2YWx1ZXMgaWYgbm8gY2FsbGJhY2sgaXMgcHJvdmlkZWQsIG9yIG51bGwgaWYgYSBjYWxsYmFjayBpcyB1c2VkLlxuICAgICAqL1xuICAgIGluT3JkZXIoY2FsbGJhY2spIHtcbiAgICAgICAgY29uc3QgaW5PcmRlckxpc3QgPSBbXTsgLy8gTGlzdCB0byBjb2xsZWN0IG5vZGUgdmFsdWVzXG4gICAgICAgIHRoaXMuaW5PcmRlclJlY3Vyc2l2ZSh0aGlzLnJvb3QsIGluT3JkZXJMaXN0LCBjYWxsYmFjayk7IC8vIFN0YXJ0IHJlY3Vyc2l2ZSB0cmF2ZXJzYWwgZnJvbSByb290XG4gICAgICAgIGlmICghY2FsbGJhY2spIHJldHVybiBpbk9yZGVyTGlzdDsgLy8gUmV0dXJuIGxpc3QgaWYgbm8gY2FsbGJhY2sgcHJvdmlkZWRcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIZWxwZXIgZnVuY3Rpb24gdG8gcGVyZm9ybSBhbiBpbm9yZGVyIHRyYXZlcnNhbCBvZiB0aGUgdHJlZSByZWN1cnNpdmVseS5cbiAgICAgKiBAcGFyYW0ge05vZGV9IGN1cnJlbnQgLSBUaGUgY3VycmVudCBub2RlIGJlaW5nIHByb2Nlc3NlZC5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IC0gQXJyYXkgdG8gY29sbGVjdCBub2RlIHZhbHVlcy5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIE9wdGlvbmFsIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2ggbm9kZS5cbiAgICAgKi9cbiAgICBpbk9yZGVyUmVjdXJzaXZlKGN1cnJlbnQsIGxpc3QsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChjdXJyZW50ID09PSBudWxsKSByZXR1cm47IC8vIEJhc2UgY2FzZTogZW5kIG9mIGJyYW5jaFxuICAgICAgICB0aGlzLmluT3JkZXJSZWN1cnNpdmUoY3VycmVudC5sZWZ0LCBsaXN0LCBjYWxsYmFjayk7IC8vIFRyYXZlcnNlIGxlZnQgc3VidHJlZVxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGN1cnJlbnQpOyAvLyBBcHBseSBjYWxsYmFjayB0byBjdXJyZW50IG5vZGVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxpc3QucHVzaChjdXJyZW50LmRhdGEpOyAvLyBDb2xsZWN0IGN1cnJlbnQgbm9kZSdzIGRhdGFcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluT3JkZXJSZWN1cnNpdmUoY3VycmVudC5yaWdodCwgbGlzdCwgY2FsbGJhY2spOyAvLyBUcmF2ZXJzZSByaWdodCBzdWJ0cmVlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYSBwcmVvcmRlciB0cmF2ZXJzYWwgb2YgdGhlIHRyZWUuIElmIGEgY2FsbGJhY2sgaXMgcHJvdmlkZWQsIGFwcGxpZXMgaXQgdG8gZWFjaCBub2RlLFxuICAgICAqIG90aGVyd2lzZSBjb2xsZWN0cyBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiBub2RlIHZhbHVlcy5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIE9wdGlvbmFsIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2ggbm9kZS5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl8bnVsbH0gQW4gYXJyYXkgb2Ygbm9kZSB2YWx1ZXMgaWYgbm8gY2FsbGJhY2sgaXMgcHJvdmlkZWQsIG9yIG51bGwgaWYgYSBjYWxsYmFjayBpcyB1c2VkLlxuICAgICAqL1xuICAgIHByZU9yZGVyKGNhbGxiYWNrKSB7XG4gICAgICAgIGNvbnN0IHByZU9yZGVyTGlzdCA9IFtdOyAvLyBMaXN0IHRvIGNvbGxlY3Qgbm9kZSB2YWx1ZXNcbiAgICAgICAgdGhpcy5wcmVPcmRlclJlY3Vyc2l2ZSh0aGlzLnJvb3QsIHByZU9yZGVyTGlzdCwgY2FsbGJhY2spOyAvLyBTdGFydCByZWN1cnNpdmUgdHJhdmVyc2FsIGZyb20gcm9vdFxuICAgICAgICBpZiAoIWNhbGxiYWNrKSByZXR1cm4gcHJlT3JkZXJMaXN0OyAvLyBSZXR1cm4gbGlzdCBpZiBubyBjYWxsYmFjayBwcm92aWRlZFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhlbHBlciBmdW5jdGlvbiB0byBwZXJmb3JtIGEgcHJlb3JkZXIgdHJhdmVyc2FsIG9mIHRoZSB0cmVlIHJlY3Vyc2l2ZWx5LlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gY3VycmVudCAtIFRoZSBjdXJyZW50IG5vZGUgYmVpbmcgcHJvY2Vzc2VkLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgLSBBcnJheSB0byBjb2xsZWN0IG5vZGUgdmFsdWVzLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gT3B0aW9uYWwgZnVuY3Rpb24gdG8gYXBwbHkgdG8gZWFjaCBub2RlLlxuICAgICAqL1xuICAgIHByZU9yZGVyUmVjdXJzaXZlKGN1cnJlbnQsIGxpc3QsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChjdXJyZW50ID09PSBudWxsKSByZXR1cm47IC8vIEJhc2UgY2FzZTogZW5kIG9mIGJyYW5jaFxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGN1cnJlbnQpOyAvLyBBcHBseSBjYWxsYmFjayB0byBjdXJyZW50IG5vZGVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxpc3QucHVzaChjdXJyZW50LmRhdGEpOyAvLyBDb2xsZWN0IGN1cnJlbnQgbm9kZSdzIGRhdGFcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByZU9yZGVyUmVjdXJzaXZlKGN1cnJlbnQubGVmdCwgbGlzdCwgY2FsbGJhY2spOyAvLyBUcmF2ZXJzZSBsZWZ0IHN1YnRyZWVcbiAgICAgICAgdGhpcy5wcmVPcmRlclJlY3Vyc2l2ZShjdXJyZW50LnJpZ2h0LCBsaXN0LCBjYWxsYmFjayk7IC8vIFRyYXZlcnNlIHJpZ2h0IHN1YnRyZWVcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhIHBvc3RvcmRlciB0cmF2ZXJzYWwgb2YgdGhlIHRyZWUuIElmIGEgY2FsbGJhY2sgaXMgcHJvdmlkZWQsIGFwcGxpZXMgaXQgdG8gZWFjaCBub2RlLFxuICAgICAqIG90aGVyd2lzZSBjb2xsZWN0cyBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiBub2RlIHZhbHVlcy5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIE9wdGlvbmFsIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2ggbm9kZS5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl8bnVsbH0gQW4gYXJyYXkgb2Ygbm9kZSB2YWx1ZXMgaWYgbm8gY2FsbGJhY2sgaXMgcHJvdmlkZWQsIG9yIG51bGwgaWYgYSBjYWxsYmFjayBpcyB1c2VkLlxuICAgICAqL1xuICAgIHBvc3RPcmRlcihjYWxsYmFjaykge1xuICAgICAgICBjb25zdCBwb3N0T3JkZXJMaXN0ID0gW107IC8vIExpc3QgdG8gY29sbGVjdCBub2RlIHZhbHVlc1xuICAgICAgICB0aGlzLnBvc3RPcmRlclJlY3Vyc2l2ZSh0aGlzLnJvb3QsIHBvc3RPcmRlckxpc3QsIGNhbGxiYWNrKTsgLy8gU3RhcnQgcmVjdXJzaXZlIHRyYXZlcnNhbCBmcm9tIHJvb3RcbiAgICAgICAgaWYgKCFjYWxsYmFjaykgcmV0dXJuIHBvc3RPcmRlckxpc3Q7IC8vIFJldHVybiBsaXN0IGlmIG5vIGNhbGxiYWNrIHByb3ZpZGVkXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGVscGVyIGZ1bmN0aW9uIHRvIHBlcmZvcm0gYSBwb3N0b3JkZXIgdHJhdmVyc2FsIG9mIHRoZSB0cmVlIHJlY3Vyc2l2ZWx5LlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gY3VycmVudCAtIFRoZSBjdXJyZW50IG5vZGUgYmVpbmcgcHJvY2Vzc2VkLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgLSBBcnJheSB0byBjb2xsZWN0IG5vZGUgdmFsdWVzLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gT3B0aW9uYWwgZnVuY3Rpb24gdG8gYXBwbHkgdG8gZWFjaCBub2RlLlxuICAgICAqL1xuICAgIHBvc3RPcmRlclJlY3Vyc2l2ZShjdXJyZW50LCBsaXN0LCBjYWxsYmFjaykge1xuICAgICAgICBpZiAoY3VycmVudCA9PT0gbnVsbCkgcmV0dXJuOyAvLyBCYXNlIGNhc2U6IGVuZCBvZiBicmFuY2hcbiAgICAgICAgdGhpcy5wb3N0T3JkZXJSZWN1cnNpdmUoY3VycmVudC5sZWZ0LCBsaXN0LCBjYWxsYmFjayk7IC8vIFRyYXZlcnNlIGxlZnQgc3VidHJlZVxuICAgICAgICB0aGlzLnBvc3RPcmRlclJlY3Vyc2l2ZShjdXJyZW50LnJpZ2h0LCBsaXN0LCBjYWxsYmFjayk7IC8vIFRyYXZlcnNlIHJpZ2h0IHN1YnRyZWVcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhjdXJyZW50KTsgLy8gQXBwbHkgY2FsbGJhY2sgdG8gY3VycmVudCBub2RlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsaXN0LnB1c2goY3VycmVudC5kYXRhKTsgLy8gQ29sbGVjdCBjdXJyZW50IG5vZGUncyBkYXRhXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBoZWlnaHQgb2YgdGhlIHRyZWUgZnJvbSBhIHNwZWNpZmljIG5vZGUuXG4gICAgICogSGVpZ2h0IGlzIGRlZmluZWQgYXMgdGhlIG51bWJlciBvZiBlZGdlcyBvbiB0aGUgbG9uZ2VzdCBwYXRoIGZyb20gdGhlIG5vZGUgdG8gYSBsZWFmLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG5vZGUgLSBUaGUgZGF0YSBvZiB0aGUgbm9kZSBmcm9tIHdoaWNoIHRvIGNhbGN1bGF0ZSB0aGUgaGVpZ2h0LlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ8bnVsbH0gVGhlIGhlaWdodCBmcm9tIHRoZSBub2RlIHRvIHRoZSBkZWVwZXN0IGxlYWYgb3IgbnVsbCBpZiB0aGUgbm9kZSBkb2Vzbid0IGV4aXN0LlxuICAgICAqL1xuICAgIGhlaWdodChub2RlKSB7XG4gICAgICAgIGNvbnN0IGZvdW5kTm9kZSA9IHRoaXMuZmluZChub2RlKTsgLy8gQXR0ZW1wdCB0byBsb2NhdGUgdGhlIG5vZGUgaW4gdGhlIHRyZWVcbiAgICAgICAgaWYgKGZvdW5kTm9kZSkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIG5vZGUgaXMgZm91bmQsIGNhbGN1bGF0ZSB0aGUgaGVpZ2h0IGZyb20gdGhpcyBub2RlXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHRSZWN1cnNpdmUoZm91bmROb2RlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDsgLy8gUmV0dXJuIG51bGwgaWYgdGhlIG5vZGUgaXMgbm90IGZvdW5kIGluIHRoZSB0cmVlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGVscGVyIGZ1bmN0aW9uIHRvIHJlY3Vyc2l2ZWx5IGNhbGN1bGF0ZSB0aGUgaGVpZ2h0IG9mIHRoZSB0cmVlIGZyb20gdGhlIGdpdmVuIG5vZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge05vZGV8bnVsbH0gbm9kZSAtIFRoZSBub2RlIGZyb20gd2hpY2ggdG8gY2FsY3VsYXRlIHRoZSBoZWlnaHQuXG4gICAgICogQHJldHVybnMge251bWJlcn0gVGhlIGhlaWdodCBvZiB0aGUgdHJlZSBmcm9tIHRoZSBnaXZlbiBub2RlLlxuICAgICAqL1xuICAgIGhlaWdodFJlY3Vyc2l2ZShub2RlKSB7XG4gICAgICAgIGlmIChub2RlID09PSBudWxsKSByZXR1cm4gLTE7IC8vIEJhc2UgY2FzZTogcmV0dXJuIC0xIGZvciBudWxsIHRvIGFjY291bnQgZm9yIHRoZSBlZGdlIGNvdW50IGNvcnJlY3RseVxuICAgICAgICBsZXQgbGVmdCA9IHRoaXMuaGVpZ2h0UmVjdXJzaXZlKG5vZGUubGVmdCk7IC8vIFJlY3Vyc2l2ZWx5IGNhbGN1bGF0ZSBoZWlnaHQgb2YgdGhlIGxlZnQgc3VidHJlZVxuICAgICAgICBsZXQgcmlnaHQgPSB0aGlzLmhlaWdodFJlY3Vyc2l2ZShub2RlLnJpZ2h0KTsgLy8gUmVjdXJzaXZlbHkgY2FsY3VsYXRlIGhlaWdodCBvZiB0aGUgcmlnaHQgc3VidHJlZVxuICAgICAgICByZXR1cm4gTWF0aC5tYXgobGVmdCwgcmlnaHQpICsgMTsgLy8gUmV0dXJuIHRoZSBncmVhdGVyIGhlaWdodCBwbHVzIG9uZSBmb3IgdGhlIGN1cnJlbnQgbm9kZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgdGhlIGRlcHRoIG9mIGEgc3BlY2lmaWMgbm9kZSBmcm9tIHRoZSByb290IG9mIHRoZSB0cmVlLlxuICAgICAqIERlcHRoIGlzIGRlZmluZWQgYXMgdGhlIG51bWJlciBvZiBlZGdlcyBmcm9tIHRoZSByb290IHRvIHRoZSBub2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG5vZGUgLSBUaGUgZGF0YSBvZiB0aGUgbm9kZSBmb3Igd2hpY2ggdG8gY2FsY3VsYXRlIHRoZSBkZXB0aC5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgZGVwdGggb2YgdGhlIG5vZGUsIG9yIEluZmluaXR5IGlmIHRoZSBub2RlIGRvZXMgbm90IGV4aXN0LlxuICAgICAqL1xuICAgIGRlcHRoKG5vZGUpIHtcbiAgICAgICAgbGV0IGN1cnJlbnQgPSB0aGlzLnJvb3Q7IC8vIFN0YXJ0IGZyb20gdGhlIHJvb3Qgb2YgdGhlIHRyZWVcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVwdGhSZWN1cnNpdmUobm9kZSwgY3VycmVudCk7IC8vIEluaXRpYXRlIHJlY3Vyc2l2ZSBkZXB0aCBjYWxjdWxhdGlvblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhlbHBlciBmdW5jdGlvbiB0byByZWN1cnNpdmVseSBkZXRlcm1pbmUgdGhlIGRlcHRoIG9mIGEgc3BlY2lmaWVkIG5vZGUgZnJvbSB0aGUgY3VycmVudCBub2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG5vZGUgLSBUaGUgZGF0YSBvZiB0aGUgbm9kZSBmb3Igd2hpY2ggdG8gY2FsY3VsYXRlIHRoZSBkZXB0aC5cbiAgICAgKiBAcGFyYW0ge05vZGV9IGN1cnJlbnQgLSBUaGUgY3VycmVudCBub2RlIGluIHRoZSB0cmVlIGR1cmluZyB0aGUgcmVjdXJzaXZlIGNhbGwuXG4gICAgICogQHJldHVybnMge251bWJlcn0gVGhlIGRlcHRoIG9mIHRoZSBub2RlLCBvciBJbmZpbml0eSBpZiB0aGUgbm9kZSBkb2VzIG5vdCBleGlzdCBpbiB0aGlzIHBhdGguXG4gICAgICovXG4gICAgZGVwdGhSZWN1cnNpdmUobm9kZSwgY3VycmVudCkge1xuICAgICAgICBpZiAoY3VycmVudCA9PT0gbnVsbCkgcmV0dXJuIEluZmluaXR5OyAvLyBCYXNlIGNhc2U6IGlmIGN1cnJlbnQgaXMgbnVsbCwgbm9kZSBpcyBub3QgaW4gdGhpcyBzdWJ0cmVlXG4gICAgICAgIGlmIChub2RlID09PSBjdXJyZW50LmRhdGEpIHJldHVybiAwOyAvLyBCYXNlIGNhc2U6IGlmIHRoZSBub2RlIGlzIGZvdW5kLCBkZXB0aCBpcyAwXG5cbiAgICAgICAgbGV0IGxlZnQgPSB0aGlzLmRlcHRoUmVjdXJzaXZlKG5vZGUsIGN1cnJlbnQubGVmdCk7IC8vIFJlY3Vyc2l2ZWx5IGZpbmQgZGVwdGggaW4gdGhlIGxlZnQgc3VidHJlZVxuICAgICAgICBsZXQgcmlnaHQgPSB0aGlzLmRlcHRoUmVjdXJzaXZlKG5vZGUsIGN1cnJlbnQucmlnaHQpOyAvLyBSZWN1cnNpdmVseSBmaW5kIGRlcHRoIGluIHRoZSByaWdodCBzdWJ0cmVlXG5cbiAgICAgICAgaWYgKGxlZnQgPT09IEluZmluaXR5ICYmIHJpZ2h0ID09PSBJbmZpbml0eSkge1xuICAgICAgICAgICAgcmV0dXJuIEluZmluaXR5OyAvLyBOb2RlIG5vdCBmb3VuZCBpbiBlaXRoZXIgc3VidHJlZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWluKGxlZnQsIHJpZ2h0KSArIDE7IC8vIFJldHVybiB0aGUgbWluaW11bSBkZXB0aCBmb3VuZCBwbHVzIG9uZSBmb3IgdGhlIGN1cnJlbnQgbm9kZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSB1dGlsaXR5IGZ1bmN0aW9uIHRvIHZpc3VhbGx5IHByaW50IHRoZSBzdHJ1Y3R1cmUgb2YgdGhlIHRyZWUuIERpc3BsYXlzIHRoZSB0cmVlXG4gICAgICogd2l0aCBlYWNoIG5vZGUgaW4gaXRzIHJlbGF0aXZlIHBvc2l0aW9uLCBhaWRpbmcgaW4gdW5kZXJzdGFuZGluZyB0aGUgdHJlZSBsYXlvdXQuXG4gICAgICogQHBhcmFtIHtOb2RlfSBub2RlIC0gVGhlIHN0YXJ0aW5nIG5vZGUgdG8gcHJpbnQgZnJvbS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4IC0gVGhlIHByZWZpeCB1c2VkIHRvIGluZGljYXRlIGxpbmUgc3RhcnRzIGluIHRoZSB0cmVlIHByaW50b3V0LlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNMZWZ0IC0gSW5kaWNhdGVzIGlmIHRoZSBjdXJyZW50IG5vZGUgaXMgYSBsZWZ0IGNoaWxkLlxuICAgICAqL1xuICAgIHByZXR0eVByaW50KG5vZGUsIHByZWZpeCA9IFwiXCIsIGlzTGVmdCA9IHRydWUpIHtcbiAgICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZS5yaWdodCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5wcmV0dHlQcmludChcbiAgICAgICAgICAgICAgICBub2RlLnJpZ2h0LFxuICAgICAgICAgICAgICAgIGAke3ByZWZpeH0ke2lzTGVmdCA/IFwi4pSCICAgXCIgOiBcIiAgICBcIn1gLFxuICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGAke3ByZWZpeH0ke2lzTGVmdCA/IFwi4pSU4pSA4pSAIFwiIDogXCLilIzilIDilIAgXCJ9JHtub2RlLmRhdGF9YCk7XG4gICAgICAgIGlmIChub2RlLmxlZnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMucHJldHR5UHJpbnQoXG4gICAgICAgICAgICAgICAgbm9kZS5sZWZ0LFxuICAgICAgICAgICAgICAgIGAke3ByZWZpeH0ke2lzTGVmdCA/IFwiICAgIFwiIDogXCLilIIgICBcIn1gLFxuICAgICAgICAgICAgICAgIHRydWVcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNvbnN0IHRyZWUgPSBuZXcgVHJlZSgpO1xudHJlZS5idWlsZFRyZWUoWzEsIDcsIDQsIDIzLCA4LCA5LCA0LCAzLCA1LCA3LCA5LCA2NywgNjM0NSwgMzI0XSk7XG5jb25zb2xlLmxvZyh0cmVlKTtcbnRyZWUucHJldHR5UHJpbnQodHJlZS5yb290KTtcbnRyZWUuaW5zZXJ0KDQ4KTtcbnRyZWUuaW5zZXJ0KDE1KTtcbnRyZWUuZGVsZXRlKDQpO1xudHJlZS5wcmV0dHlQcmludCh0cmVlLnJvb3QpO1xuY29uc29sZS5sb2codHJlZS5maW5kKDY3KSk7XG5jb25zb2xlLmxvZyh0cmVlLmZpbmQoMTQpKTtcbmNvbnNvbGUubG9nKHRyZWUubGV2ZWxPcmRlcigpKTtcbmNvbnNvbGUubG9nKHRyZWUuaW5PcmRlcigpKTtcbmNvbnNvbGUubG9nKHRyZWUucHJlT3JkZXIoKSk7XG5jb25zb2xlLmxvZyh0cmVlLnBvc3RPcmRlcigpKTtcbmNvbnNvbGUubG9nKHRyZWUuaGVpZ2h0KDMpKTtcbmNvbnNvbGUubG9nKHRyZWUuZGVwdGgoMTUpKTtcbiIsIi8vIFRoaXMgZnVuY3Rpb24gcGVyZm9ybXMgdGhlIG1lcmdlIHNvcnQgYWxnb3JpdGhtIG9uIGFuIGFycmF5LlxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlU29ydChhcnIpIHtcbiAgICAvLyBCYXNlIGNhc2U6IGlmIHRoZSBhcnJheSBoYXMgMSBvciBubyBlbGVtZW50cywgaXQncyBhbHJlYWR5IHNvcnRlZC5cbiAgICBpZiAoYXJyLmxlbmd0aCA8PSAxKSB7XG4gICAgICAgIHJldHVybiBhcnI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUmVjdXJzaXZlIGNhc2U6IHNwbGl0IHRoZSBhcnJheSBpbnRvIGhhbHZlcy5cbiAgICAgICAgbGV0IG1pZGRsZUluZGV4ID0gTWF0aC5mbG9vcihhcnIubGVuZ3RoIC8gMik7XG4gICAgICAgIGxldCBmaXJzdEhhbGYgPSBhcnIuc2xpY2UoMCwgbWlkZGxlSW5kZXgpO1xuICAgICAgICBsZXQgc2Vjb25kSGFsZiA9IGFyci5zbGljZShtaWRkbGVJbmRleCk7XG5cbiAgICAgICAgLy8gUmVjdXJzaXZlbHkgc29ydCBib3RoIGhhbHZlcy5cbiAgICAgICAgbGV0IGZpcnN0U29ydGVkID0gbWVyZ2VTb3J0KGZpcnN0SGFsZik7XG4gICAgICAgIGxldCBzZWNvbmRTb3J0ZWQgPSBtZXJnZVNvcnQoc2Vjb25kSGFsZik7XG5cbiAgICAgICAgLy8gTWVyZ2UgdGhlIHR3byBzb3J0ZWQgaGFsdmVzLlxuICAgICAgICByZXR1cm4gbWVyZ2UoZmlyc3RTb3J0ZWQsIHNlY29uZFNvcnRlZCk7XG4gICAgfVxufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIG1lcmdlcyB0d28gc29ydGVkIGFycmF5cyBpbnRvIG9uZSBzb3J0ZWQgYXJyYXkuXG5mdW5jdGlvbiBtZXJnZShhcnIxLCBhcnIyKSB7XG4gICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgIGxldCBpID0gMDsgLy8gUG9pbnRlciBmb3IgYXJyMVxuICAgIGxldCBqID0gMDsgLy8gUG9pbnRlciBmb3IgYXJyMlxuXG4gICAgLy8gVHJhdmVyc2UgYm90aCBhcnJheXMgYW5kIGluc2VydCBzbWFsbGVyIG9mIGJvdGggZWxlbWVudHMgaW4gcmVzdWx0XG4gICAgd2hpbGUgKGkgPCBhcnIxLmxlbmd0aCAmJiBqIDwgYXJyMi5sZW5ndGgpIHtcbiAgICAgICAgaWYgKGFycjFbaV0gPCBhcnIyW2pdKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChhcnIxW2ldKTtcbiAgICAgICAgICAgIGkrKzsgLy8gTW92ZSBwb2ludGVyIGZvciBhcnIxXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChhcnIyW2pdKTtcbiAgICAgICAgICAgIGorKzsgLy8gTW92ZSBwb2ludGVyIGZvciBhcnIyXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDb25jYXRlbmF0ZSB0aGUgcmVtYWluaW5nIGVsZW1lbnRzIG9mIGJvdGggYXJyYXlzIChpZiBhbnkpLlxuICAgIHJldHVybiByZXN1bHQuY29uY2F0KGFycjEuc2xpY2UoaSkuY29uY2F0KGFycjIuc2xpY2UoaikpKTtcbn1cblxuLy8gVGhpcyBmdW5jdGlvbiByZW1vdmVzIGR1cGxpY2F0ZSBlbGVtZW50cyBmcm9tIGEgc29ydGVkIGFycmF5LlxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUR1cGxpY2F0ZShzb3J0ZWRBcnJheSkge1xuICAgIHJldHVybiBzb3J0ZWRBcnJheS5maWx0ZXIoKGl0ZW0sIGluZGV4LCBhcnJheSkgPT4ge1xuICAgICAgICAvLyBLZWVwIG9ubHkgdGhlIGZpcnN0IGluc3RhbmNlIG9mIGVhY2ggZWxlbWVudCwgaWdub3Jpbmcgc3Vic2VxdWVudCBkdXBsaWNhdGVzLlxuICAgICAgICByZXR1cm4gaW5kZXggPT09IDAgfHwgaXRlbSAhPT0gYXJyYXlbaW5kZXggLSAxXTtcbiAgICB9KTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==