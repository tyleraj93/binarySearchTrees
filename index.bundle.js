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
     * Searches for a node with the given value, starting from the root of the tree or from a specified node.
     * @param {number} value - The value to search for.
     * @param {Node} current - The current node in the recursion, defaults to the root of the tree.
     * @returns {Node|null} The found node, or null if the node does not exist.
     */
    find(value, current = this.root) {
        if (current === null) return null; // Base case: no node to search
        if (current.data === value) return current; // Node found, return it
        if (value < current.data) {
            return this.find(value, current.left); // Search left subtree
        }
        return this.find(value, current.right); // Search right subtree
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
     * @param {Node} current - The current node being processed, defaults to the root of the tree.
     * @param {Array} list - Array to collect node values, initially empty.
     * @returns {Array|null} An array of node values if no callback is provided, or null if a callback is used.
     */
    postOrder(callback, current = this.root, list = []) {
        if (current === null) return; // Base case: end of branch
        this.postOrder(callback, current.left, list); // Traverse left subtree
        this.postOrder(callback, current.right, list); // Traverse right subtree
        if (callback) {
            callback(current); // Apply callback to current node
        } else {
            list.push(current.data); // Collect current node's data
        }
        if (!callback && current === this.root) {
            return list; // Return collected data only on the initial call if no callback is provided
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
     * Calculates the depth of a specified node from the root of the tree, or from another specified node.
     * Depth is defined as the number of edges from the starting node to the target node.
     *
     * @param {number} target - The data of the node for which to calculate the depth.
     * @param {Node} current - The current node in the tree during the recursive call, defaults to the root.
     * @returns {number} The depth of the target node, or Infinity if the node does not exist.
     */
    depth(target, current = this.root) {
        if (current === null) return Infinity; // Base case: if current is null, target is not in this subtree
        if (target === current.data) return 0; // Base case: if the target is found, depth is 0

        let leftDepth = this.depth(target, current.left); // Recursively find depth in the left subtree
        let rightDepth = this.depth(target, current.right); // Recursively find depth in the right subtree

        if (leftDepth === Infinity && rightDepth === Infinity) {
            return Infinity; // Node not found in either subtree
        } else {
            return Math.min(leftDepth, rightDepth) + 1; // Return the minimum depth found plus one for the current node
        }
    }

    /**
     * Determines if the binary search tree is balanced.
     * A binary tree is considered balanced if, for every node, the height difference
     * between its left and right subtree is no more than one.
     *
     * @returns {boolean} True if the tree is balanced, otherwise false.
     */
    isBalanced() {
        let current = this.root; // Start checking balance from the root of the tree
        // Calls the recursive function to check balance from the root
        // Converts the result to boolean (false if unbalanced, true if balanced)
        return this.checkBalance(current) !== false;
    }

    /**
     * Recursively checks if the tree is balanced by comparing the heights of the left and right subtrees
     * for each node. The function also calculates the height of the tree from the current node downwards.
     *
     * @param {Node} node - The current node from which to check the balance.
     * @returns {number|boolean} Returns the height of the subtree rooted at 'node' if it is balanced,
     * or false if it is unbalanced. If the node is null, it returns -1, indicating no height.
     */
    checkBalance(node) {
        if (node === null) return -1; // Base case: A null node has a height of -1

        // Recursively calculate the height of the left subtree
        // If left subtree is unbalanced, return false immediately
        let leftHeight = this.checkBalance(node.left);
        if (leftHeight === false) return false;

        // Recursively calculate the height of the right subtree
        // If right subtree is unbalanced, return false immediately
        let rightHeight = this.checkBalance(node.right);
        if (rightHeight === false) return false;

        // Check if the current node is balanced by comparing the heights of its subtrees
        if (Math.abs(leftHeight - rightHeight) > 1) {
            // If the height difference is greater than 1, tree is unbalanced at this node
            return false;
        } else {
            // If balanced, return the height of the tree from this node
            return Math.max(leftHeight, rightHeight) + 1;
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
// tree.insert(48);
// tree.insert(15);
// tree.insert(17);
// tree.delete(4);
// tree.prettyPrint(tree.root);
// console.log(tree.find(67));
// console.log(tree.find(14));
// console.log(tree.levelOrder());
// console.log(tree.inOrder());
// console.log(tree.preOrder());
// console.log(tree.postOrder());
// console.log(tree.height(3));
// console.log(tree.depth(7));
// console.log(tree.isBalanced());


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCIsInNvdXJjZXMiOlsid2VicGFjazovL2JpbmFyeXNlYXJjaHRyZWVzLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JpbmFyeXNlYXJjaHRyZWVzLy4vc3JjL21lcmdlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG1lcmdlU29ydCwgcmVtb3ZlRHVwbGljYXRlIH0gZnJvbSBcIi4vbWVyZ2UuanNcIjtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgc2luZ2xlIG5vZGUgd2l0aGluIHRoZSBiaW5hcnkgc2VhcmNoIHRyZWUuXG4gKiBAcGFyYW0ge251bWJlcn0gZGF0YSAtIFRoZSB2YWx1ZSBzdG9yZWQgaW4gdGhlIG5vZGUuXG4gKiBAcGFyYW0ge05vZGV9IGxlZnQgLSBBIHBvaW50ZXIgdG8gdGhlIGxlZnQgY2hpbGQgbm9kZS5cbiAqIEBwYXJhbSB7Tm9kZX0gcmlnaHQgLSBBIHBvaW50ZXIgdG8gdGhlIHJpZ2h0IGNoaWxkIG5vZGUuXG4gKi9cbmNsYXNzIE5vZGUge1xuICAgIGNvbnN0cnVjdG9yKGRhdGEsIGxlZnQgPSBudWxsLCByaWdodCA9IG51bGwpIHtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5sZWZ0ID0gbGVmdDsgLy8gTGVmdCBjaGlsZCBub2RlXG4gICAgICAgIHRoaXMucmlnaHQgPSByaWdodDsgLy8gUmlnaHQgY2hpbGQgbm9kZVxuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgYmluYXJ5IHNlYXJjaCB0cmVlIGFuZCBwcm92aWRlcyBtZXRob2RzIGZvciBpbnNlcnRpbmcsIGRlbGV0aW5nLFxuICogYW5kIHNlYXJjaGluZyBmb3IgdmFsdWVzLCBhcyB3ZWxsIGFzIHRyZWUgdHJhdmVyc2FsIGZ1bmN0aW9ucy5cbiAqL1xuZXhwb3J0IGNsYXNzIFRyZWUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnJvb3QgPSBudWxsOyAvLyBSb290IG5vZGUgb2YgdGhlIHRyZWUsIGluaXRpYWxseSBudWxsXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQnVpbGRzIHRoZSBiaW5hcnkgc2VhcmNoIHRyZWUgZnJvbSBhbiBhcnJheSBvZiB2YWx1ZXMuXG4gICAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgLSBUaGUgYXJyYXkgb2YgdmFsdWVzIHRvIGJ1aWxkIHRoZSB0cmVlIGZyb20uXG4gICAgICogQHJldHVybnMge05vZGV9IFRoZSByb290IG5vZGUgb2YgdGhlIHRyZWUuXG4gICAgICovXG4gICAgYnVpbGRUcmVlKGFycmF5KSB7XG4gICAgICAgIGxldCBzb3J0ZWRBcnJheSA9IHRoaXMucHJlcGFyZUFycmF5KGFycmF5KTsgLy8gU29ydHMgYXJyYXkgYW5kIHJlbW92ZXMgZHVwbGljYXRlc1xuICAgICAgICB0aGlzLnJvb3QgPSB0aGlzLnJlY3Vyc2l2ZUJ1aWxkKHNvcnRlZEFycmF5KTsgLy8gQnVpbGRzIHRoZSB0cmVlIHJlY3Vyc2l2ZWx5IGZyb20gdGhlIHNvcnRlZCBhcnJheVxuICAgICAgICByZXR1cm4gdGhpcy5yb290O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByZXBhcmVzIHRoZSBhcnJheSBmb3IgYnVpbGRpbmcgdGhlIHRyZWUgYnkgc29ydGluZyBhbmQgcmVtb3ZpbmcgZHVwbGljYXRlcy5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSAtIFRoZSBhcnJheSB0byBwcmVwYXJlLlxuICAgICAqIEByZXR1cm5zIHtBcnJheX0gVGhlIHByb2Nlc3NlZCBhcnJheS5cbiAgICAgKi9cbiAgICBwcmVwYXJlQXJyYXkoYXJyYXkpIHtcbiAgICAgICAgaWYgKGFycmF5Lmxlbmd0aCA9PT0gMCkgcmV0dXJuIFtdO1xuICAgICAgICByZXR1cm4gcmVtb3ZlRHVwbGljYXRlKG1lcmdlU29ydChhcnJheSkpOyAvLyBVc2VzIGV4dGVybmFsIGZ1bmN0aW9ucyB0byBzb3J0IGFuZCBkZWR1cGxpY2F0ZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlY3Vyc2l2ZWx5IGJ1aWxkcyBhIGJhbGFuY2VkIGJpbmFyeSBzZWFyY2ggdHJlZSBmcm9tIGEgc29ydGVkIGFycmF5LlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IC0gVGhlIHNvcnRlZCBhcnJheSB0byBidWlsZCB0aGUgdHJlZSBmcm9tLlxuICAgICAqIEByZXR1cm5zIHtOb2RlfSBUaGUgbm9kZSBhdCB0aGUgY3VycmVudCByZWN1cnNpdmUgbGV2ZWwuXG4gICAgICovXG4gICAgcmVjdXJzaXZlQnVpbGQoYXJyYXkpIHtcbiAgICAgICAgaWYgKGFycmF5Lmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7IC8vIE5vIG1vcmUgZWxlbWVudHMgdG8gcHJvY2Vzc1xuICAgICAgICBpZiAoYXJyYXkubGVuZ3RoID09PSAxKSByZXR1cm4gbmV3IE5vZGUoYXJyYXlbMF0pOyAvLyBTaW5nbGUgZWxlbWVudCwgbWFrZSBhIG5vZGVcblxuICAgICAgICBsZXQgbWlkZGxlSW5kZXggPSBNYXRoLmZsb29yKGFycmF5Lmxlbmd0aCAvIDIpOyAvLyBGaW5kIHRoZSBtaWRkbGUgaW5kZXhcbiAgICAgICAgbGV0IG5ld05vZGUgPSBuZXcgTm9kZShhcnJheVttaWRkbGVJbmRleF0pOyAvLyBDcmVhdGUgYSBub2RlIHdpdGggdGhlIG1pZGRsZSBlbGVtZW50XG4gICAgICAgIG5ld05vZGUubGVmdCA9IHRoaXMuYnVpbGRUcmVlKGFycmF5LnNsaWNlKDAsIG1pZGRsZUluZGV4KSk7IC8vIFJlY3Vyc2l2ZWx5IGJ1aWxkIHRoZSBsZWZ0IHN1YnRyZWVcbiAgICAgICAgbmV3Tm9kZS5yaWdodCA9IHRoaXMuYnVpbGRUcmVlKGFycmF5LnNsaWNlKG1pZGRsZUluZGV4ICsgMSkpOyAvLyBSZWN1cnNpdmVseSBidWlsZCB0aGUgcmlnaHQgc3VidHJlZVxuICAgICAgICByZXR1cm4gbmV3Tm9kZTsgLy8gUmV0dXJuIHRoZSBuZXdseSBjcmVhdGVkIG5vZGVcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIGEgbmV3IHZhbHVlIGludG8gdGhlIGJpbmFyeSBzZWFyY2ggdHJlZS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gaW5zZXJ0LlxuICAgICAqL1xuICAgIGluc2VydCh2YWx1ZSkge1xuICAgICAgICB0aGlzLnJvb3QgPSB0aGlzLmluc2VydFJlY3Vyc2l2ZSh0aGlzLnJvb3QsIHZhbHVlKTsgLy8gU3RhcnQgdGhlIHJlY3Vyc2l2ZSBpbnNlcnRpb24gZnJvbSB0aGUgcm9vdFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlY3Vyc2l2ZWx5IGluc2VydHMgYSBuZXcgdmFsdWUgaW50byB0aGUgdHJlZS5cbiAgICAgKiBAcGFyYW0ge05vZGV9IGN1cnJlbnQgLSBUaGUgY3VycmVudCBub2RlIGluIHRoZSByZWN1cnNpb24uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gVGhlIHZhbHVlIHRvIGluc2VydC5cbiAgICAgKiBAcmV0dXJucyB7Tm9kZX0gVGhlIHVwZGF0ZWQgbm9kZSBhZnRlciBpbnNlcnRpb24uXG4gICAgICovXG4gICAgaW5zZXJ0UmVjdXJzaXZlKGN1cnJlbnQsIHZhbHVlKSB7XG4gICAgICAgIGlmIChjdXJyZW50ID09PSBudWxsKSByZXR1cm4gbmV3IE5vZGUodmFsdWUpOyAvLyBCYXNlIGNhc2U6IGluc2VydCB0aGUgbmV3IG5vZGUgaGVyZVxuICAgICAgICBpZiAodmFsdWUgPCBjdXJyZW50LmRhdGEpIHtcbiAgICAgICAgICAgIGN1cnJlbnQubGVmdCA9IHRoaXMuaW5zZXJ0UmVjdXJzaXZlKGN1cnJlbnQubGVmdCwgdmFsdWUpOyAvLyBJbnNlcnQgaW4gdGhlIGxlZnQgc3VidHJlZVxuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID4gY3VycmVudC5kYXRhKSB7XG4gICAgICAgICAgICBjdXJyZW50LnJpZ2h0ID0gdGhpcy5pbnNlcnRSZWN1cnNpdmUoY3VycmVudC5yaWdodCwgdmFsdWUpOyAvLyBJbnNlcnQgaW4gdGhlIHJpZ2h0IHN1YnRyZWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VycmVudDsgLy8gUmV0dXJuIHRoZSBjdXJyZW50IG5vZGUgdG8gbGluayBiYWNrIHByb3Blcmx5XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlcyBhIHZhbHVlIGZyb20gdGhlIGJpbmFyeSBzZWFyY2ggdHJlZS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gZGVsZXRlLlxuICAgICAqL1xuICAgIGRlbGV0ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLnJvb3QgPSB0aGlzLmRlbGV0ZVJlY3Vyc2l2ZSh0aGlzLnJvb3QsIHZhbHVlKTsgLy8gU3RhcnQgdGhlIHJlY3Vyc2l2ZSBkZWxldGlvbiBmcm9tIHRoZSByb290XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVjdXJzaXZlbHkgZGVsZXRlcyBhIG5vZGUgd2l0aCB0aGUgc3BlY2lmaWVkIHZhbHVlIGZyb20gdGhlIHRyZWUuXG4gICAgICogQHBhcmFtIHtOb2RlfSBjdXJyZW50IC0gVGhlIGN1cnJlbnQgbm9kZSBpbiB0aGUgcmVjdXJzaW9uLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBiZSBkZWxldGVkLlxuICAgICAqIEByZXR1cm5zIHtOb2RlfSBUaGUgdXBkYXRlZCBub2RlIGFmdGVyIGRlbGV0aW9uLlxuICAgICAqL1xuICAgIGRlbGV0ZVJlY3Vyc2l2ZShjdXJyZW50LCB2YWx1ZSkge1xuICAgICAgICBpZiAoY3VycmVudCA9PT0gbnVsbCkgcmV0dXJuIG51bGw7IC8vIEJhc2UgY2FzZTogdmFsdWUgbm90IGZvdW5kXG4gICAgICAgIGlmICh2YWx1ZSA8IGN1cnJlbnQuZGF0YSkge1xuICAgICAgICAgICAgY3VycmVudC5sZWZ0ID0gdGhpcy5kZWxldGVSZWN1cnNpdmUoY3VycmVudC5sZWZ0LCB2YWx1ZSk7IC8vIFZhbHVlIG1pZ2h0IGJlIGluIHRoZSBsZWZ0IHN1YnRyZWVcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA+IGN1cnJlbnQuZGF0YSkge1xuICAgICAgICAgICAgY3VycmVudC5yaWdodCA9IHRoaXMuZGVsZXRlUmVjdXJzaXZlKGN1cnJlbnQucmlnaHQsIHZhbHVlKTsgLy8gVmFsdWUgbWlnaHQgYmUgaW4gdGhlIHJpZ2h0IHN1YnRyZWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEZvdW5kIHRoZSBub2RlIHRvIGRlbGV0ZVxuICAgICAgICAgICAgaWYgKGN1cnJlbnQubGVmdCA9PT0gbnVsbCAmJiBjdXJyZW50LnJpZ2h0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7IC8vIE5vIGNoaWxkcmVuLCBzaW1wbHkgcmVtb3ZlIGl0XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnQubGVmdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50LnJpZ2h0OyAvLyBPbmx5IGEgcmlnaHQgY2hpbGQsIHJlcGxhY2UgdGhlIG5vZGUgd2l0aCBpdFxuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50LnJpZ2h0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQubGVmdDsgLy8gT25seSBhIGxlZnQgY2hpbGQsIHJlcGxhY2UgdGhlIG5vZGUgd2l0aCBpdFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBOb2RlIGhhcyB0d28gY2hpbGRyZW4sIGZpbmQgdGhlIGlub3JkZXIgc3VjY2Vzc29yXG4gICAgICAgICAgICAgICAgbGV0IHN1Y2Nlc3NvciA9IHRoaXMuZmluZE1pbihjdXJyZW50LnJpZ2h0KTtcbiAgICAgICAgICAgICAgICBjdXJyZW50LmRhdGEgPSBzdWNjZXNzb3IuZGF0YTsgLy8gUmVwbGFjZSB0aGUgZGF0YSB3aXRoIHN1Y2Nlc3NvcidzIGRhdGFcbiAgICAgICAgICAgICAgICBjdXJyZW50LnJpZ2h0ID0gdGhpcy5kZWxldGVSZWN1cnNpdmUoXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQucmlnaHQsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3Nvci5kYXRhXG4gICAgICAgICAgICAgICAgKTsgLy8gUmVtb3ZlIHRoZSBzdWNjZXNzb3JcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VycmVudDsgLy8gUmV0dXJuIHRoZSBjdXJyZW50IG5vZGUgdG8gbGluayBiYWNrIHByb3Blcmx5XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZHMgdGhlIG5vZGUgd2l0aCB0aGUgbWluaW11bSB2YWx1ZSBpbiB0aGUgc3VidHJlZSBzdGFydGluZyBmcm9tIHRoZSBnaXZlbiBub2RlLlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gY3VycmVudCAtIFRoZSBjdXJyZW50IG5vZGUgZnJvbSB3aGljaCB0byBmaW5kIHRoZSBtaW5pbXVtLlxuICAgICAqIEByZXR1cm5zIHtOb2RlfSBUaGUgbm9kZSB3aXRoIHRoZSBtaW5pbXVtIHZhbHVlLlxuICAgICAqL1xuICAgIGZpbmRNaW4oY3VycmVudCkge1xuICAgICAgICB3aGlsZSAoY3VycmVudC5sZWZ0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5sZWZ0OyAvLyBLZWVwIGdvaW5nIGxlZnQgdG8gZmluZCB0aGUgbWluaW11bSB2YWx1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjdXJyZW50OyAvLyBSZXR1cm4gdGhlIG5vZGUgd2l0aCB0aGUgbWluaW11bSB2YWx1ZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlYXJjaGVzIGZvciBhIG5vZGUgd2l0aCB0aGUgZ2l2ZW4gdmFsdWUsIHN0YXJ0aW5nIGZyb20gdGhlIHJvb3Qgb2YgdGhlIHRyZWUgb3IgZnJvbSBhIHNwZWNpZmllZCBub2RlLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gY3VycmVudCAtIFRoZSBjdXJyZW50IG5vZGUgaW4gdGhlIHJlY3Vyc2lvbiwgZGVmYXVsdHMgdG8gdGhlIHJvb3Qgb2YgdGhlIHRyZWUuXG4gICAgICogQHJldHVybnMge05vZGV8bnVsbH0gVGhlIGZvdW5kIG5vZGUsIG9yIG51bGwgaWYgdGhlIG5vZGUgZG9lcyBub3QgZXhpc3QuXG4gICAgICovXG4gICAgZmluZCh2YWx1ZSwgY3VycmVudCA9IHRoaXMucm9vdCkge1xuICAgICAgICBpZiAoY3VycmVudCA9PT0gbnVsbCkgcmV0dXJuIG51bGw7IC8vIEJhc2UgY2FzZTogbm8gbm9kZSB0byBzZWFyY2hcbiAgICAgICAgaWYgKGN1cnJlbnQuZGF0YSA9PT0gdmFsdWUpIHJldHVybiBjdXJyZW50OyAvLyBOb2RlIGZvdW5kLCByZXR1cm4gaXRcbiAgICAgICAgaWYgKHZhbHVlIDwgY3VycmVudC5kYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maW5kKHZhbHVlLCBjdXJyZW50LmxlZnQpOyAvLyBTZWFyY2ggbGVmdCBzdWJ0cmVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZCh2YWx1ZSwgY3VycmVudC5yaWdodCk7IC8vIFNlYXJjaCByaWdodCBzdWJ0cmVlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYSBsZXZlbCBvcmRlciB0cmF2ZXJzYWwgb2YgdGhlIHRyZWUuIElmIGEgY2FsbGJhY2sgaXMgcHJvdmlkZWQsIGFwcGxpZXMgaXQgdG8gZWFjaCBub2RlLFxuICAgICAqIG90aGVyd2lzZSBjb2xsZWN0cyBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiBub2RlIHZhbHVlcy5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIE9wdGlvbmFsIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2ggbm9kZS5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl8bnVsbH0gQW4gYXJyYXkgb2Ygbm9kZSB2YWx1ZXMgaWYgbm8gY2FsbGJhY2sgaXMgcHJvdmlkZWQsIG9yIG51bGwgaWYgYSBjYWxsYmFjayBpcyB1c2VkLlxuICAgICAqL1xuICAgIGxldmVsT3JkZXIoY2FsbGJhY2spIHtcbiAgICAgICAgbGV0IHJvb3QgPSB0aGlzLnJvb3Q7IC8vIFN0YXJ0IGZyb20gdGhlIHJvb3RcbiAgICAgICAgaWYgKHJvb3QgPT09IG51bGwpIHJldHVybiBbXTsgLy8gUmV0dXJuIGVtcHR5IGFycmF5IGlmIHRyZWUgaXMgZW1wdHlcbiAgICAgICAgY29uc3QgcXVldWUgPSBbcm9vdF07IC8vIEluaXRpYWxpemUgcXVldWUgd2l0aCByb290IG5vZGUgZm9yIEJGU1xuICAgICAgICBjb25zdCBicmVhZHRoRmlyc3QgPSBbXTsgLy8gQ29sbGVjdHMgbm9kZSB2YWx1ZXMgaWYgbm8gY2FsbGJhY2sgcHJvdmlkZWRcbiAgICAgICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50ID0gcXVldWUuc2hpZnQoKTsgLy8gUHJvY2VzcyBub2RlcyBvbmUgYnkgb25lXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhjdXJyZW50KTsgLy8gQXBwbHkgY2FsbGJhY2sgaWYgcHJvdmlkZWRcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYnJlYWR0aEZpcnN0LnB1c2goY3VycmVudC5kYXRhKTsgLy8gQ29sbGVjdCBkYXRhIGlmIG5vIGNhbGxiYWNrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY3VycmVudC5sZWZ0ICE9PSBudWxsKSBxdWV1ZS5wdXNoKGN1cnJlbnQubGVmdCk7IC8vIEFkZCBsZWZ0IGNoaWxkIHRvIHF1ZXVlXG4gICAgICAgICAgICBpZiAoY3VycmVudC5yaWdodCAhPT0gbnVsbCkgcXVldWUucHVzaChjdXJyZW50LnJpZ2h0KTsgLy8gQWRkIHJpZ2h0IGNoaWxkIHRvIHF1ZXVlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjYWxsYmFjaykgcmV0dXJuIGJyZWFkdGhGaXJzdDsgLy8gUmV0dXJuIGNvbGxlY3RlZCBkYXRhIGlmIG5vIGNhbGxiYWNrIHVzZWRcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhbiBpbm9yZGVyIHRyYXZlcnNhbCBvZiB0aGUgdHJlZS4gSWYgYSBjYWxsYmFjayBpcyBwcm92aWRlZCwgYXBwbGllcyBpdCB0byBlYWNoIG5vZGUsXG4gICAgICogb3RoZXJ3aXNlIGNvbGxlY3RzIGFuZCByZXR1cm5zIGFuIGFycmF5IG9mIG5vZGUgdmFsdWVzLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gT3B0aW9uYWwgZnVuY3Rpb24gdG8gYXBwbHkgdG8gZWFjaCBub2RlLlxuICAgICAqIEByZXR1cm5zIHtBcnJheXxudWxsfSBBbiBhcnJheSBvZiBub2RlIHZhbHVlcyBpZiBubyBjYWxsYmFjayBpcyBwcm92aWRlZCwgb3IgbnVsbCBpZiBhIGNhbGxiYWNrIGlzIHVzZWQuXG4gICAgICovXG4gICAgaW5PcmRlcihjYWxsYmFjaykge1xuICAgICAgICBjb25zdCBpbk9yZGVyTGlzdCA9IFtdOyAvLyBMaXN0IHRvIGNvbGxlY3Qgbm9kZSB2YWx1ZXNcbiAgICAgICAgdGhpcy5pbk9yZGVyUmVjdXJzaXZlKHRoaXMucm9vdCwgaW5PcmRlckxpc3QsIGNhbGxiYWNrKTsgLy8gU3RhcnQgcmVjdXJzaXZlIHRyYXZlcnNhbCBmcm9tIHJvb3RcbiAgICAgICAgaWYgKCFjYWxsYmFjaykgcmV0dXJuIGluT3JkZXJMaXN0OyAvLyBSZXR1cm4gbGlzdCBpZiBubyBjYWxsYmFjayBwcm92aWRlZFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhlbHBlciBmdW5jdGlvbiB0byBwZXJmb3JtIGFuIGlub3JkZXIgdHJhdmVyc2FsIG9mIHRoZSB0cmVlIHJlY3Vyc2l2ZWx5LlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gY3VycmVudCAtIFRoZSBjdXJyZW50IG5vZGUgYmVpbmcgcHJvY2Vzc2VkLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgLSBBcnJheSB0byBjb2xsZWN0IG5vZGUgdmFsdWVzLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gT3B0aW9uYWwgZnVuY3Rpb24gdG8gYXBwbHkgdG8gZWFjaCBub2RlLlxuICAgICAqL1xuICAgIGluT3JkZXJSZWN1cnNpdmUoY3VycmVudCwgbGlzdCwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKGN1cnJlbnQgPT09IG51bGwpIHJldHVybjsgLy8gQmFzZSBjYXNlOiBlbmQgb2YgYnJhbmNoXG4gICAgICAgIHRoaXMuaW5PcmRlclJlY3Vyc2l2ZShjdXJyZW50LmxlZnQsIGxpc3QsIGNhbGxiYWNrKTsgLy8gVHJhdmVyc2UgbGVmdCBzdWJ0cmVlXG4gICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgY2FsbGJhY2soY3VycmVudCk7IC8vIEFwcGx5IGNhbGxiYWNrIHRvIGN1cnJlbnQgbm9kZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGlzdC5wdXNoKGN1cnJlbnQuZGF0YSk7IC8vIENvbGxlY3QgY3VycmVudCBub2RlJ3MgZGF0YVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5PcmRlclJlY3Vyc2l2ZShjdXJyZW50LnJpZ2h0LCBsaXN0LCBjYWxsYmFjayk7IC8vIFRyYXZlcnNlIHJpZ2h0IHN1YnRyZWVcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhIHByZW9yZGVyIHRyYXZlcnNhbCBvZiB0aGUgdHJlZS4gSWYgYSBjYWxsYmFjayBpcyBwcm92aWRlZCwgYXBwbGllcyBpdCB0byBlYWNoIG5vZGUsXG4gICAgICogb3RoZXJ3aXNlIGNvbGxlY3RzIGFuZCByZXR1cm5zIGFuIGFycmF5IG9mIG5vZGUgdmFsdWVzLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gT3B0aW9uYWwgZnVuY3Rpb24gdG8gYXBwbHkgdG8gZWFjaCBub2RlLlxuICAgICAqIEByZXR1cm5zIHtBcnJheXxudWxsfSBBbiBhcnJheSBvZiBub2RlIHZhbHVlcyBpZiBubyBjYWxsYmFjayBpcyBwcm92aWRlZCwgb3IgbnVsbCBpZiBhIGNhbGxiYWNrIGlzIHVzZWQuXG4gICAgICovXG4gICAgcHJlT3JkZXIoY2FsbGJhY2spIHtcbiAgICAgICAgY29uc3QgcHJlT3JkZXJMaXN0ID0gW107IC8vIExpc3QgdG8gY29sbGVjdCBub2RlIHZhbHVlc1xuICAgICAgICB0aGlzLnByZU9yZGVyUmVjdXJzaXZlKHRoaXMucm9vdCwgcHJlT3JkZXJMaXN0LCBjYWxsYmFjayk7IC8vIFN0YXJ0IHJlY3Vyc2l2ZSB0cmF2ZXJzYWwgZnJvbSByb290XG4gICAgICAgIGlmICghY2FsbGJhY2spIHJldHVybiBwcmVPcmRlckxpc3Q7IC8vIFJldHVybiBsaXN0IGlmIG5vIGNhbGxiYWNrIHByb3ZpZGVkXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGVscGVyIGZ1bmN0aW9uIHRvIHBlcmZvcm0gYSBwcmVvcmRlciB0cmF2ZXJzYWwgb2YgdGhlIHRyZWUgcmVjdXJzaXZlbHkuXG4gICAgICogQHBhcmFtIHtOb2RlfSBjdXJyZW50IC0gVGhlIGN1cnJlbnQgbm9kZSBiZWluZyBwcm9jZXNzZWQuXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCAtIEFycmF5IHRvIGNvbGxlY3Qgbm9kZSB2YWx1ZXMuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBPcHRpb25hbCBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoIG5vZGUuXG4gICAgICovXG4gICAgcHJlT3JkZXJSZWN1cnNpdmUoY3VycmVudCwgbGlzdCwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKGN1cnJlbnQgPT09IG51bGwpIHJldHVybjsgLy8gQmFzZSBjYXNlOiBlbmQgb2YgYnJhbmNoXG4gICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgY2FsbGJhY2soY3VycmVudCk7IC8vIEFwcGx5IGNhbGxiYWNrIHRvIGN1cnJlbnQgbm9kZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGlzdC5wdXNoKGN1cnJlbnQuZGF0YSk7IC8vIENvbGxlY3QgY3VycmVudCBub2RlJ3MgZGF0YVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJlT3JkZXJSZWN1cnNpdmUoY3VycmVudC5sZWZ0LCBsaXN0LCBjYWxsYmFjayk7IC8vIFRyYXZlcnNlIGxlZnQgc3VidHJlZVxuICAgICAgICB0aGlzLnByZU9yZGVyUmVjdXJzaXZlKGN1cnJlbnQucmlnaHQsIGxpc3QsIGNhbGxiYWNrKTsgLy8gVHJhdmVyc2UgcmlnaHQgc3VidHJlZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGEgcG9zdG9yZGVyIHRyYXZlcnNhbCBvZiB0aGUgdHJlZS4gSWYgYSBjYWxsYmFjayBpcyBwcm92aWRlZCwgYXBwbGllcyBpdCB0byBlYWNoIG5vZGUsXG4gICAgICogb3RoZXJ3aXNlIGNvbGxlY3RzIGFuZCByZXR1cm5zIGFuIGFycmF5IG9mIG5vZGUgdmFsdWVzLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gT3B0aW9uYWwgZnVuY3Rpb24gdG8gYXBwbHkgdG8gZWFjaCBub2RlLlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gY3VycmVudCAtIFRoZSBjdXJyZW50IG5vZGUgYmVpbmcgcHJvY2Vzc2VkLCBkZWZhdWx0cyB0byB0aGUgcm9vdCBvZiB0aGUgdHJlZS5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IC0gQXJyYXkgdG8gY29sbGVjdCBub2RlIHZhbHVlcywgaW5pdGlhbGx5IGVtcHR5LlxuICAgICAqIEByZXR1cm5zIHtBcnJheXxudWxsfSBBbiBhcnJheSBvZiBub2RlIHZhbHVlcyBpZiBubyBjYWxsYmFjayBpcyBwcm92aWRlZCwgb3IgbnVsbCBpZiBhIGNhbGxiYWNrIGlzIHVzZWQuXG4gICAgICovXG4gICAgcG9zdE9yZGVyKGNhbGxiYWNrLCBjdXJyZW50ID0gdGhpcy5yb290LCBsaXN0ID0gW10pIHtcbiAgICAgICAgaWYgKGN1cnJlbnQgPT09IG51bGwpIHJldHVybjsgLy8gQmFzZSBjYXNlOiBlbmQgb2YgYnJhbmNoXG4gICAgICAgIHRoaXMucG9zdE9yZGVyKGNhbGxiYWNrLCBjdXJyZW50LmxlZnQsIGxpc3QpOyAvLyBUcmF2ZXJzZSBsZWZ0IHN1YnRyZWVcbiAgICAgICAgdGhpcy5wb3N0T3JkZXIoY2FsbGJhY2ssIGN1cnJlbnQucmlnaHQsIGxpc3QpOyAvLyBUcmF2ZXJzZSByaWdodCBzdWJ0cmVlXG4gICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgY2FsbGJhY2soY3VycmVudCk7IC8vIEFwcGx5IGNhbGxiYWNrIHRvIGN1cnJlbnQgbm9kZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGlzdC5wdXNoKGN1cnJlbnQuZGF0YSk7IC8vIENvbGxlY3QgY3VycmVudCBub2RlJ3MgZGF0YVxuICAgICAgICB9XG4gICAgICAgIGlmICghY2FsbGJhY2sgJiYgY3VycmVudCA9PT0gdGhpcy5yb290KSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdDsgLy8gUmV0dXJuIGNvbGxlY3RlZCBkYXRhIG9ubHkgb24gdGhlIGluaXRpYWwgY2FsbCBpZiBubyBjYWxsYmFjayBpcyBwcm92aWRlZFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlcyB0aGUgaGVpZ2h0IG9mIHRoZSB0cmVlIGZyb20gYSBzcGVjaWZpYyBub2RlLlxuICAgICAqIEhlaWdodCBpcyBkZWZpbmVkIGFzIHRoZSBudW1iZXIgb2YgZWRnZXMgb24gdGhlIGxvbmdlc3QgcGF0aCBmcm9tIHRoZSBub2RlIHRvIGEgbGVhZi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBub2RlIC0gVGhlIGRhdGEgb2YgdGhlIG5vZGUgZnJvbSB3aGljaCB0byBjYWxjdWxhdGUgdGhlIGhlaWdodC5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfG51bGx9IFRoZSBoZWlnaHQgZnJvbSB0aGUgbm9kZSB0byB0aGUgZGVlcGVzdCBsZWFmIG9yIG51bGwgaWYgdGhlIG5vZGUgZG9lc24ndCBleGlzdC5cbiAgICAgKi9cbiAgICBoZWlnaHQobm9kZSkge1xuICAgICAgICBjb25zdCBmb3VuZE5vZGUgPSB0aGlzLmZpbmQobm9kZSk7IC8vIEF0dGVtcHQgdG8gbG9jYXRlIHRoZSBub2RlIGluIHRoZSB0cmVlXG4gICAgICAgIGlmIChmb3VuZE5vZGUpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBub2RlIGlzIGZvdW5kLCBjYWxjdWxhdGUgdGhlIGhlaWdodCBmcm9tIHRoaXMgbm9kZVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0UmVjdXJzaXZlKGZvdW5kTm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7IC8vIFJldHVybiBudWxsIGlmIHRoZSBub2RlIGlzIG5vdCBmb3VuZCBpbiB0aGUgdHJlZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhlbHBlciBmdW5jdGlvbiB0byByZWN1cnNpdmVseSBjYWxjdWxhdGUgdGhlIGhlaWdodCBvZiB0aGUgdHJlZSBmcm9tIHRoZSBnaXZlbiBub2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOb2RlfG51bGx9IG5vZGUgLSBUaGUgbm9kZSBmcm9tIHdoaWNoIHRvIGNhbGN1bGF0ZSB0aGUgaGVpZ2h0LlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBoZWlnaHQgb2YgdGhlIHRyZWUgZnJvbSB0aGUgZ2l2ZW4gbm9kZS5cbiAgICAgKi9cbiAgICBoZWlnaHRSZWN1cnNpdmUobm9kZSkge1xuICAgICAgICBpZiAobm9kZSA9PT0gbnVsbCkgcmV0dXJuIC0xOyAvLyBCYXNlIGNhc2U6IHJldHVybiAtMSBmb3IgbnVsbCB0byBhY2NvdW50IGZvciB0aGUgZWRnZSBjb3VudCBjb3JyZWN0bHlcbiAgICAgICAgbGV0IGxlZnQgPSB0aGlzLmhlaWdodFJlY3Vyc2l2ZShub2RlLmxlZnQpOyAvLyBSZWN1cnNpdmVseSBjYWxjdWxhdGUgaGVpZ2h0IG9mIHRoZSBsZWZ0IHN1YnRyZWVcbiAgICAgICAgbGV0IHJpZ2h0ID0gdGhpcy5oZWlnaHRSZWN1cnNpdmUobm9kZS5yaWdodCk7IC8vIFJlY3Vyc2l2ZWx5IGNhbGN1bGF0ZSBoZWlnaHQgb2YgdGhlIHJpZ2h0IHN1YnRyZWVcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KGxlZnQsIHJpZ2h0KSArIDE7IC8vIFJldHVybiB0aGUgZ3JlYXRlciBoZWlnaHQgcGx1cyBvbmUgZm9yIHRoZSBjdXJyZW50IG5vZGVcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBkZXB0aCBvZiBhIHNwZWNpZmllZCBub2RlIGZyb20gdGhlIHJvb3Qgb2YgdGhlIHRyZWUsIG9yIGZyb20gYW5vdGhlciBzcGVjaWZpZWQgbm9kZS5cbiAgICAgKiBEZXB0aCBpcyBkZWZpbmVkIGFzIHRoZSBudW1iZXIgb2YgZWRnZXMgZnJvbSB0aGUgc3RhcnRpbmcgbm9kZSB0byB0aGUgdGFyZ2V0IG5vZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGFyZ2V0IC0gVGhlIGRhdGEgb2YgdGhlIG5vZGUgZm9yIHdoaWNoIHRvIGNhbGN1bGF0ZSB0aGUgZGVwdGguXG4gICAgICogQHBhcmFtIHtOb2RlfSBjdXJyZW50IC0gVGhlIGN1cnJlbnQgbm9kZSBpbiB0aGUgdHJlZSBkdXJpbmcgdGhlIHJlY3Vyc2l2ZSBjYWxsLCBkZWZhdWx0cyB0byB0aGUgcm9vdC5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgZGVwdGggb2YgdGhlIHRhcmdldCBub2RlLCBvciBJbmZpbml0eSBpZiB0aGUgbm9kZSBkb2VzIG5vdCBleGlzdC5cbiAgICAgKi9cbiAgICBkZXB0aCh0YXJnZXQsIGN1cnJlbnQgPSB0aGlzLnJvb3QpIHtcbiAgICAgICAgaWYgKGN1cnJlbnQgPT09IG51bGwpIHJldHVybiBJbmZpbml0eTsgLy8gQmFzZSBjYXNlOiBpZiBjdXJyZW50IGlzIG51bGwsIHRhcmdldCBpcyBub3QgaW4gdGhpcyBzdWJ0cmVlXG4gICAgICAgIGlmICh0YXJnZXQgPT09IGN1cnJlbnQuZGF0YSkgcmV0dXJuIDA7IC8vIEJhc2UgY2FzZTogaWYgdGhlIHRhcmdldCBpcyBmb3VuZCwgZGVwdGggaXMgMFxuXG4gICAgICAgIGxldCBsZWZ0RGVwdGggPSB0aGlzLmRlcHRoKHRhcmdldCwgY3VycmVudC5sZWZ0KTsgLy8gUmVjdXJzaXZlbHkgZmluZCBkZXB0aCBpbiB0aGUgbGVmdCBzdWJ0cmVlXG4gICAgICAgIGxldCByaWdodERlcHRoID0gdGhpcy5kZXB0aCh0YXJnZXQsIGN1cnJlbnQucmlnaHQpOyAvLyBSZWN1cnNpdmVseSBmaW5kIGRlcHRoIGluIHRoZSByaWdodCBzdWJ0cmVlXG5cbiAgICAgICAgaWYgKGxlZnREZXB0aCA9PT0gSW5maW5pdHkgJiYgcmlnaHREZXB0aCA9PT0gSW5maW5pdHkpIHtcbiAgICAgICAgICAgIHJldHVybiBJbmZpbml0eTsgLy8gTm9kZSBub3QgZm91bmQgaW4gZWl0aGVyIHN1YnRyZWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1pbihsZWZ0RGVwdGgsIHJpZ2h0RGVwdGgpICsgMTsgLy8gUmV0dXJuIHRoZSBtaW5pbXVtIGRlcHRoIGZvdW5kIHBsdXMgb25lIGZvciB0aGUgY3VycmVudCBub2RlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBiaW5hcnkgc2VhcmNoIHRyZWUgaXMgYmFsYW5jZWQuXG4gICAgICogQSBiaW5hcnkgdHJlZSBpcyBjb25zaWRlcmVkIGJhbGFuY2VkIGlmLCBmb3IgZXZlcnkgbm9kZSwgdGhlIGhlaWdodCBkaWZmZXJlbmNlXG4gICAgICogYmV0d2VlbiBpdHMgbGVmdCBhbmQgcmlnaHQgc3VidHJlZSBpcyBubyBtb3JlIHRoYW4gb25lLlxuICAgICAqXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHRyZWUgaXMgYmFsYW5jZWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBpc0JhbGFuY2VkKCkge1xuICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMucm9vdDsgLy8gU3RhcnQgY2hlY2tpbmcgYmFsYW5jZSBmcm9tIHRoZSByb290IG9mIHRoZSB0cmVlXG4gICAgICAgIC8vIENhbGxzIHRoZSByZWN1cnNpdmUgZnVuY3Rpb24gdG8gY2hlY2sgYmFsYW5jZSBmcm9tIHRoZSByb290XG4gICAgICAgIC8vIENvbnZlcnRzIHRoZSByZXN1bHQgdG8gYm9vbGVhbiAoZmFsc2UgaWYgdW5iYWxhbmNlZCwgdHJ1ZSBpZiBiYWxhbmNlZClcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tCYWxhbmNlKGN1cnJlbnQpICE9PSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWN1cnNpdmVseSBjaGVja3MgaWYgdGhlIHRyZWUgaXMgYmFsYW5jZWQgYnkgY29tcGFyaW5nIHRoZSBoZWlnaHRzIG9mIHRoZSBsZWZ0IGFuZCByaWdodCBzdWJ0cmVlc1xuICAgICAqIGZvciBlYWNoIG5vZGUuIFRoZSBmdW5jdGlvbiBhbHNvIGNhbGN1bGF0ZXMgdGhlIGhlaWdodCBvZiB0aGUgdHJlZSBmcm9tIHRoZSBjdXJyZW50IG5vZGUgZG93bndhcmRzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOb2RlfSBub2RlIC0gVGhlIGN1cnJlbnQgbm9kZSBmcm9tIHdoaWNoIHRvIGNoZWNrIHRoZSBiYWxhbmNlLlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ8Ym9vbGVhbn0gUmV0dXJucyB0aGUgaGVpZ2h0IG9mIHRoZSBzdWJ0cmVlIHJvb3RlZCBhdCAnbm9kZScgaWYgaXQgaXMgYmFsYW5jZWQsXG4gICAgICogb3IgZmFsc2UgaWYgaXQgaXMgdW5iYWxhbmNlZC4gSWYgdGhlIG5vZGUgaXMgbnVsbCwgaXQgcmV0dXJucyAtMSwgaW5kaWNhdGluZyBubyBoZWlnaHQuXG4gICAgICovXG4gICAgY2hlY2tCYWxhbmNlKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHJldHVybiAtMTsgLy8gQmFzZSBjYXNlOiBBIG51bGwgbm9kZSBoYXMgYSBoZWlnaHQgb2YgLTFcblxuICAgICAgICAvLyBSZWN1cnNpdmVseSBjYWxjdWxhdGUgdGhlIGhlaWdodCBvZiB0aGUgbGVmdCBzdWJ0cmVlXG4gICAgICAgIC8vIElmIGxlZnQgc3VidHJlZSBpcyB1bmJhbGFuY2VkLCByZXR1cm4gZmFsc2UgaW1tZWRpYXRlbHlcbiAgICAgICAgbGV0IGxlZnRIZWlnaHQgPSB0aGlzLmNoZWNrQmFsYW5jZShub2RlLmxlZnQpO1xuICAgICAgICBpZiAobGVmdEhlaWdodCA9PT0gZmFsc2UpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAvLyBSZWN1cnNpdmVseSBjYWxjdWxhdGUgdGhlIGhlaWdodCBvZiB0aGUgcmlnaHQgc3VidHJlZVxuICAgICAgICAvLyBJZiByaWdodCBzdWJ0cmVlIGlzIHVuYmFsYW5jZWQsIHJldHVybiBmYWxzZSBpbW1lZGlhdGVseVxuICAgICAgICBsZXQgcmlnaHRIZWlnaHQgPSB0aGlzLmNoZWNrQmFsYW5jZShub2RlLnJpZ2h0KTtcbiAgICAgICAgaWYgKHJpZ2h0SGVpZ2h0ID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBjdXJyZW50IG5vZGUgaXMgYmFsYW5jZWQgYnkgY29tcGFyaW5nIHRoZSBoZWlnaHRzIG9mIGl0cyBzdWJ0cmVlc1xuICAgICAgICBpZiAoTWF0aC5hYnMobGVmdEhlaWdodCAtIHJpZ2h0SGVpZ2h0KSA+IDEpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBoZWlnaHQgZGlmZmVyZW5jZSBpcyBncmVhdGVyIHRoYW4gMSwgdHJlZSBpcyB1bmJhbGFuY2VkIGF0IHRoaXMgbm9kZVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSWYgYmFsYW5jZWQsIHJldHVybiB0aGUgaGVpZ2h0IG9mIHRoZSB0cmVlIGZyb20gdGhpcyBub2RlXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgobGVmdEhlaWdodCwgcmlnaHRIZWlnaHQpICsgMTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBBIHV0aWxpdHkgZnVuY3Rpb24gdG8gdmlzdWFsbHkgcHJpbnQgdGhlIHN0cnVjdHVyZSBvZiB0aGUgdHJlZS4gRGlzcGxheXMgdGhlIHRyZWVcbiAgICAgKiB3aXRoIGVhY2ggbm9kZSBpbiBpdHMgcmVsYXRpdmUgcG9zaXRpb24sIGFpZGluZyBpbiB1bmRlcnN0YW5kaW5nIHRoZSB0cmVlIGxheW91dC5cbiAgICAgKiBAcGFyYW0ge05vZGV9IG5vZGUgLSBUaGUgc3RhcnRpbmcgbm9kZSB0byBwcmludCBmcm9tLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcmVmaXggLSBUaGUgcHJlZml4IHVzZWQgdG8gaW5kaWNhdGUgbGluZSBzdGFydHMgaW4gdGhlIHRyZWUgcHJpbnRvdXQuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc0xlZnQgLSBJbmRpY2F0ZXMgaWYgdGhlIGN1cnJlbnQgbm9kZSBpcyBhIGxlZnQgY2hpbGQuXG4gICAgICovXG4gICAgcHJldHR5UHJpbnQobm9kZSwgcHJlZml4ID0gXCJcIiwgaXNMZWZ0ID0gdHJ1ZSkge1xuICAgICAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlLnJpZ2h0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnByZXR0eVByaW50KFxuICAgICAgICAgICAgICAgIG5vZGUucmlnaHQsXG4gICAgICAgICAgICAgICAgYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCLilIIgICBcIiA6IFwiICAgIFwifWAsXG4gICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCLilJTilIDilIAgXCIgOiBcIuKUjOKUgOKUgCBcIn0ke25vZGUuZGF0YX1gKTtcbiAgICAgICAgaWYgKG5vZGUubGVmdCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5wcmV0dHlQcmludChcbiAgICAgICAgICAgICAgICBub2RlLmxlZnQsXG4gICAgICAgICAgICAgICAgYCR7cHJlZml4fSR7aXNMZWZ0ID8gXCIgICAgXCIgOiBcIuKUgiAgIFwifWAsXG4gICAgICAgICAgICAgICAgdHJ1ZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY29uc3QgdHJlZSA9IG5ldyBUcmVlKCk7XG50cmVlLmJ1aWxkVHJlZShbMSwgNywgNCwgMjMsIDgsIDksIDQsIDMsIDUsIDcsIDksIDY3LCA2MzQ1LCAzMjRdKTtcbmNvbnNvbGUubG9nKHRyZWUpO1xudHJlZS5wcmV0dHlQcmludCh0cmVlLnJvb3QpO1xuLy8gdHJlZS5pbnNlcnQoNDgpO1xuLy8gdHJlZS5pbnNlcnQoMTUpO1xuLy8gdHJlZS5pbnNlcnQoMTcpO1xuLy8gdHJlZS5kZWxldGUoNCk7XG4vLyB0cmVlLnByZXR0eVByaW50KHRyZWUucm9vdCk7XG4vLyBjb25zb2xlLmxvZyh0cmVlLmZpbmQoNjcpKTtcbi8vIGNvbnNvbGUubG9nKHRyZWUuZmluZCgxNCkpO1xuLy8gY29uc29sZS5sb2codHJlZS5sZXZlbE9yZGVyKCkpO1xuLy8gY29uc29sZS5sb2codHJlZS5pbk9yZGVyKCkpO1xuLy8gY29uc29sZS5sb2codHJlZS5wcmVPcmRlcigpKTtcbi8vIGNvbnNvbGUubG9nKHRyZWUucG9zdE9yZGVyKCkpO1xuLy8gY29uc29sZS5sb2codHJlZS5oZWlnaHQoMykpO1xuLy8gY29uc29sZS5sb2codHJlZS5kZXB0aCg3KSk7XG4vLyBjb25zb2xlLmxvZyh0cmVlLmlzQmFsYW5jZWQoKSk7XG4iLCIvLyBUaGlzIGZ1bmN0aW9uIHBlcmZvcm1zIHRoZSBtZXJnZSBzb3J0IGFsZ29yaXRobSBvbiBhbiBhcnJheS5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZVNvcnQoYXJyKSB7XG4gICAgLy8gQmFzZSBjYXNlOiBpZiB0aGUgYXJyYXkgaGFzIDEgb3Igbm8gZWxlbWVudHMsIGl0J3MgYWxyZWFkeSBzb3J0ZWQuXG4gICAgaWYgKGFyci5sZW5ndGggPD0gMSkge1xuICAgICAgICByZXR1cm4gYXJyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFJlY3Vyc2l2ZSBjYXNlOiBzcGxpdCB0aGUgYXJyYXkgaW50byBoYWx2ZXMuXG4gICAgICAgIGxldCBtaWRkbGVJbmRleCA9IE1hdGguZmxvb3IoYXJyLmxlbmd0aCAvIDIpO1xuICAgICAgICBsZXQgZmlyc3RIYWxmID0gYXJyLnNsaWNlKDAsIG1pZGRsZUluZGV4KTtcbiAgICAgICAgbGV0IHNlY29uZEhhbGYgPSBhcnIuc2xpY2UobWlkZGxlSW5kZXgpO1xuXG4gICAgICAgIC8vIFJlY3Vyc2l2ZWx5IHNvcnQgYm90aCBoYWx2ZXMuXG4gICAgICAgIGxldCBmaXJzdFNvcnRlZCA9IG1lcmdlU29ydChmaXJzdEhhbGYpO1xuICAgICAgICBsZXQgc2Vjb25kU29ydGVkID0gbWVyZ2VTb3J0KHNlY29uZEhhbGYpO1xuXG4gICAgICAgIC8vIE1lcmdlIHRoZSB0d28gc29ydGVkIGhhbHZlcy5cbiAgICAgICAgcmV0dXJuIG1lcmdlKGZpcnN0U29ydGVkLCBzZWNvbmRTb3J0ZWQpO1xuICAgIH1cbn1cblxuLy8gVGhpcyBmdW5jdGlvbiBtZXJnZXMgdHdvIHNvcnRlZCBhcnJheXMgaW50byBvbmUgc29ydGVkIGFycmF5LlxuZnVuY3Rpb24gbWVyZ2UoYXJyMSwgYXJyMikge1xuICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICBsZXQgaSA9IDA7IC8vIFBvaW50ZXIgZm9yIGFycjFcbiAgICBsZXQgaiA9IDA7IC8vIFBvaW50ZXIgZm9yIGFycjJcblxuICAgIC8vIFRyYXZlcnNlIGJvdGggYXJyYXlzIGFuZCBpbnNlcnQgc21hbGxlciBvZiBib3RoIGVsZW1lbnRzIGluIHJlc3VsdFxuICAgIHdoaWxlIChpIDwgYXJyMS5sZW5ndGggJiYgaiA8IGFycjIubGVuZ3RoKSB7XG4gICAgICAgIGlmIChhcnIxW2ldIDwgYXJyMltqXSkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goYXJyMVtpXSk7XG4gICAgICAgICAgICBpKys7IC8vIE1vdmUgcG9pbnRlciBmb3IgYXJyMVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goYXJyMltqXSk7XG4gICAgICAgICAgICBqKys7IC8vIE1vdmUgcG9pbnRlciBmb3IgYXJyMlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ29uY2F0ZW5hdGUgdGhlIHJlbWFpbmluZyBlbGVtZW50cyBvZiBib3RoIGFycmF5cyAoaWYgYW55KS5cbiAgICByZXR1cm4gcmVzdWx0LmNvbmNhdChhcnIxLnNsaWNlKGkpLmNvbmNhdChhcnIyLnNsaWNlKGopKSk7XG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gcmVtb3ZlcyBkdXBsaWNhdGUgZWxlbWVudHMgZnJvbSBhIHNvcnRlZCBhcnJheS5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVEdXBsaWNhdGUoc29ydGVkQXJyYXkpIHtcbiAgICByZXR1cm4gc29ydGVkQXJyYXkuZmlsdGVyKChpdGVtLCBpbmRleCwgYXJyYXkpID0+IHtcbiAgICAgICAgLy8gS2VlcCBvbmx5IHRoZSBmaXJzdCBpbnN0YW5jZSBvZiBlYWNoIGVsZW1lbnQsIGlnbm9yaW5nIHN1YnNlcXVlbnQgZHVwbGljYXRlcy5cbiAgICAgICAgcmV0dXJuIGluZGV4ID09PSAwIHx8IGl0ZW0gIT09IGFycmF5W2luZGV4IC0gMV07XG4gICAgfSk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=