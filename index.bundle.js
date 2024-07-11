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
     * Rebalances the binary search tree by rebuilding it from an inorder traversal to ensure optimal balance.
     */
    rebalance() {
        // Collect node values in sorted order via inorder traversal
        const arr = this.inOrder();

        // Rebuild the tree from the sorted array to ensure it is balanced
        this.root = this.buildTree(arr);
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
console.log("Original Tree:");
tree.prettyPrint(tree.root);
tree.insert(48);
tree.insert(15);
tree.insert(17);
tree.insert(16);
tree.delete(4);
console.log("Modified Tree:");
tree.prettyPrint(tree.root);
// console.log(tree.find(67));
// console.log(tree.find(14));
// console.log(tree.levelOrder());
// console.log(tree.inOrder());
// console.log(tree.preOrder());
// console.log(tree.postOrder());
// console.log(tree.height(3));
// console.log(tree.depth(7));
console.log(`Is tree balanced: ${tree.isBalanced()}`);
tree.rebalance();
// console.log(tree);
console.log("Rebalanced Tree:")
tree.prettyPrint(tree.root);
console.log(`Is tree balanced: ${tree.isBalanced()}`);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGVBQWU7O0FBRWY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsVUFBVTtBQUNWO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iaW5hcnlzZWFyY2h0cmVlcy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iaW5hcnlzZWFyY2h0cmVlcy8uL3NyYy9tZXJnZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBtZXJnZVNvcnQsIHJlbW92ZUR1cGxpY2F0ZSB9IGZyb20gXCIuL21lcmdlLmpzXCI7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHNpbmdsZSBub2RlIHdpdGhpbiB0aGUgYmluYXJ5IHNlYXJjaCB0cmVlLlxuICogQHBhcmFtIHtudW1iZXJ9IGRhdGEgLSBUaGUgdmFsdWUgc3RvcmVkIGluIHRoZSBub2RlLlxuICogQHBhcmFtIHtOb2RlfSBsZWZ0IC0gQSBwb2ludGVyIHRvIHRoZSBsZWZ0IGNoaWxkIG5vZGUuXG4gKiBAcGFyYW0ge05vZGV9IHJpZ2h0IC0gQSBwb2ludGVyIHRvIHRoZSByaWdodCBjaGlsZCBub2RlLlxuICovXG5jbGFzcyBOb2RlIHtcbiAgICBjb25zdHJ1Y3RvcihkYXRhLCBsZWZ0ID0gbnVsbCwgcmlnaHQgPSBudWxsKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMubGVmdCA9IGxlZnQ7IC8vIExlZnQgY2hpbGQgbm9kZVxuICAgICAgICB0aGlzLnJpZ2h0ID0gcmlnaHQ7IC8vIFJpZ2h0IGNoaWxkIG5vZGVcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGJpbmFyeSBzZWFyY2ggdHJlZSBhbmQgcHJvdmlkZXMgbWV0aG9kcyBmb3IgaW5zZXJ0aW5nLCBkZWxldGluZyxcbiAqIGFuZCBzZWFyY2hpbmcgZm9yIHZhbHVlcywgYXMgd2VsbCBhcyB0cmVlIHRyYXZlcnNhbCBmdW5jdGlvbnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBUcmVlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5yb290ID0gbnVsbDsgLy8gUm9vdCBub2RlIG9mIHRoZSB0cmVlLCBpbml0aWFsbHkgbnVsbFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJ1aWxkcyB0aGUgYmluYXJ5IHNlYXJjaCB0cmVlIGZyb20gYW4gYXJyYXkgb2YgdmFsdWVzLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IC0gVGhlIGFycmF5IG9mIHZhbHVlcyB0byBidWlsZCB0aGUgdHJlZSBmcm9tLlxuICAgICAqIEByZXR1cm5zIHtOb2RlfSBUaGUgcm9vdCBub2RlIG9mIHRoZSB0cmVlLlxuICAgICAqL1xuICAgIGJ1aWxkVHJlZShhcnJheSkge1xuICAgICAgICBsZXQgc29ydGVkQXJyYXkgPSB0aGlzLnByZXBhcmVBcnJheShhcnJheSk7IC8vIFNvcnRzIGFycmF5IGFuZCByZW1vdmVzIGR1cGxpY2F0ZXNcbiAgICAgICAgdGhpcy5yb290ID0gdGhpcy5yZWN1cnNpdmVCdWlsZChzb3J0ZWRBcnJheSk7IC8vIEJ1aWxkcyB0aGUgdHJlZSByZWN1cnNpdmVseSBmcm9tIHRoZSBzb3J0ZWQgYXJyYXlcbiAgICAgICAgcmV0dXJuIHRoaXMucm9vdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcmVwYXJlcyB0aGUgYXJyYXkgZm9yIGJ1aWxkaW5nIHRoZSB0cmVlIGJ5IHNvcnRpbmcgYW5kIHJlbW92aW5nIGR1cGxpY2F0ZXMuXG4gICAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgLSBUaGUgYXJyYXkgdG8gcHJlcGFyZS5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFRoZSBwcm9jZXNzZWQgYXJyYXkuXG4gICAgICovXG4gICAgcHJlcGFyZUFycmF5KGFycmF5KSB7XG4gICAgICAgIGlmIChhcnJheS5sZW5ndGggPT09IDApIHJldHVybiBbXTtcbiAgICAgICAgcmV0dXJuIHJlbW92ZUR1cGxpY2F0ZShtZXJnZVNvcnQoYXJyYXkpKTsgLy8gVXNlcyBleHRlcm5hbCBmdW5jdGlvbnMgdG8gc29ydCBhbmQgZGVkdXBsaWNhdGVcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWN1cnNpdmVseSBidWlsZHMgYSBiYWxhbmNlZCBiaW5hcnkgc2VhcmNoIHRyZWUgZnJvbSBhIHNvcnRlZCBhcnJheS5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSAtIFRoZSBzb3J0ZWQgYXJyYXkgdG8gYnVpbGQgdGhlIHRyZWUgZnJvbS5cbiAgICAgKiBAcmV0dXJucyB7Tm9kZX0gVGhlIG5vZGUgYXQgdGhlIGN1cnJlbnQgcmVjdXJzaXZlIGxldmVsLlxuICAgICAqL1xuICAgIHJlY3Vyc2l2ZUJ1aWxkKGFycmF5KSB7XG4gICAgICAgIGlmIChhcnJheS5sZW5ndGggPT09IDApIHJldHVybiBudWxsOyAvLyBObyBtb3JlIGVsZW1lbnRzIHRvIHByb2Nlc3NcbiAgICAgICAgaWYgKGFycmF5Lmxlbmd0aCA9PT0gMSkgcmV0dXJuIG5ldyBOb2RlKGFycmF5WzBdKTsgLy8gU2luZ2xlIGVsZW1lbnQsIG1ha2UgYSBub2RlXG5cbiAgICAgICAgbGV0IG1pZGRsZUluZGV4ID0gTWF0aC5mbG9vcihhcnJheS5sZW5ndGggLyAyKTsgLy8gRmluZCB0aGUgbWlkZGxlIGluZGV4XG4gICAgICAgIGxldCBuZXdOb2RlID0gbmV3IE5vZGUoYXJyYXlbbWlkZGxlSW5kZXhdKTsgLy8gQ3JlYXRlIGEgbm9kZSB3aXRoIHRoZSBtaWRkbGUgZWxlbWVudFxuICAgICAgICBuZXdOb2RlLmxlZnQgPSB0aGlzLmJ1aWxkVHJlZShhcnJheS5zbGljZSgwLCBtaWRkbGVJbmRleCkpOyAvLyBSZWN1cnNpdmVseSBidWlsZCB0aGUgbGVmdCBzdWJ0cmVlXG4gICAgICAgIG5ld05vZGUucmlnaHQgPSB0aGlzLmJ1aWxkVHJlZShhcnJheS5zbGljZShtaWRkbGVJbmRleCArIDEpKTsgLy8gUmVjdXJzaXZlbHkgYnVpbGQgdGhlIHJpZ2h0IHN1YnRyZWVcbiAgICAgICAgcmV0dXJuIG5ld05vZGU7IC8vIFJldHVybiB0aGUgbmV3bHkgY3JlYXRlZCBub2RlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyBhIG5ldyB2YWx1ZSBpbnRvIHRoZSBiaW5hcnkgc2VhcmNoIHRyZWUuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gVGhlIHZhbHVlIHRvIGluc2VydC5cbiAgICAgKi9cbiAgICBpbnNlcnQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5yb290ID0gdGhpcy5pbnNlcnRSZWN1cnNpdmUodGhpcy5yb290LCB2YWx1ZSk7IC8vIFN0YXJ0IHRoZSByZWN1cnNpdmUgaW5zZXJ0aW9uIGZyb20gdGhlIHJvb3RcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWN1cnNpdmVseSBpbnNlcnRzIGEgbmV3IHZhbHVlIGludG8gdGhlIHRyZWUuXG4gICAgICogQHBhcmFtIHtOb2RlfSBjdXJyZW50IC0gVGhlIGN1cnJlbnQgbm9kZSBpbiB0aGUgcmVjdXJzaW9uLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBpbnNlcnQuXG4gICAgICogQHJldHVybnMge05vZGV9IFRoZSB1cGRhdGVkIG5vZGUgYWZ0ZXIgaW5zZXJ0aW9uLlxuICAgICAqL1xuICAgIGluc2VydFJlY3Vyc2l2ZShjdXJyZW50LCB2YWx1ZSkge1xuICAgICAgICBpZiAoY3VycmVudCA9PT0gbnVsbCkgcmV0dXJuIG5ldyBOb2RlKHZhbHVlKTsgLy8gQmFzZSBjYXNlOiBpbnNlcnQgdGhlIG5ldyBub2RlIGhlcmVcbiAgICAgICAgaWYgKHZhbHVlIDwgY3VycmVudC5kYXRhKSB7XG4gICAgICAgICAgICBjdXJyZW50LmxlZnQgPSB0aGlzLmluc2VydFJlY3Vyc2l2ZShjdXJyZW50LmxlZnQsIHZhbHVlKTsgLy8gSW5zZXJ0IGluIHRoZSBsZWZ0IHN1YnRyZWVcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA+IGN1cnJlbnQuZGF0YSkge1xuICAgICAgICAgICAgY3VycmVudC5yaWdodCA9IHRoaXMuaW5zZXJ0UmVjdXJzaXZlKGN1cnJlbnQucmlnaHQsIHZhbHVlKTsgLy8gSW5zZXJ0IGluIHRoZSByaWdodCBzdWJ0cmVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGN1cnJlbnQ7IC8vIFJldHVybiB0aGUgY3VycmVudCBub2RlIHRvIGxpbmsgYmFjayBwcm9wZXJseVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZXMgYSB2YWx1ZSBmcm9tIHRoZSBiaW5hcnkgc2VhcmNoIHRyZWUuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gVGhlIHZhbHVlIHRvIGRlbGV0ZS5cbiAgICAgKi9cbiAgICBkZWxldGUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5yb290ID0gdGhpcy5kZWxldGVSZWN1cnNpdmUodGhpcy5yb290LCB2YWx1ZSk7IC8vIFN0YXJ0IHRoZSByZWN1cnNpdmUgZGVsZXRpb24gZnJvbSB0aGUgcm9vdFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlY3Vyc2l2ZWx5IGRlbGV0ZXMgYSBub2RlIHdpdGggdGhlIHNwZWNpZmllZCB2YWx1ZSBmcm9tIHRoZSB0cmVlLlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gY3VycmVudCAtIFRoZSBjdXJyZW50IG5vZGUgaW4gdGhlIHJlY3Vyc2lvbi5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gYmUgZGVsZXRlZC5cbiAgICAgKiBAcmV0dXJucyB7Tm9kZX0gVGhlIHVwZGF0ZWQgbm9kZSBhZnRlciBkZWxldGlvbi5cbiAgICAgKi9cbiAgICBkZWxldGVSZWN1cnNpdmUoY3VycmVudCwgdmFsdWUpIHtcbiAgICAgICAgaWYgKGN1cnJlbnQgPT09IG51bGwpIHJldHVybiBudWxsOyAvLyBCYXNlIGNhc2U6IHZhbHVlIG5vdCBmb3VuZFxuICAgICAgICBpZiAodmFsdWUgPCBjdXJyZW50LmRhdGEpIHtcbiAgICAgICAgICAgIGN1cnJlbnQubGVmdCA9IHRoaXMuZGVsZXRlUmVjdXJzaXZlKGN1cnJlbnQubGVmdCwgdmFsdWUpOyAvLyBWYWx1ZSBtaWdodCBiZSBpbiB0aGUgbGVmdCBzdWJ0cmVlXG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPiBjdXJyZW50LmRhdGEpIHtcbiAgICAgICAgICAgIGN1cnJlbnQucmlnaHQgPSB0aGlzLmRlbGV0ZVJlY3Vyc2l2ZShjdXJyZW50LnJpZ2h0LCB2YWx1ZSk7IC8vIFZhbHVlIG1pZ2h0IGJlIGluIHRoZSByaWdodCBzdWJ0cmVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBGb3VuZCB0aGUgbm9kZSB0byBkZWxldGVcbiAgICAgICAgICAgIGlmIChjdXJyZW50LmxlZnQgPT09IG51bGwgJiYgY3VycmVudC5yaWdodCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsOyAvLyBObyBjaGlsZHJlbiwgc2ltcGx5IHJlbW92ZSBpdFxuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50LmxlZnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudC5yaWdodDsgLy8gT25seSBhIHJpZ2h0IGNoaWxkLCByZXBsYWNlIHRoZSBub2RlIHdpdGggaXRcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudC5yaWdodCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50LmxlZnQ7IC8vIE9ubHkgYSBsZWZ0IGNoaWxkLCByZXBsYWNlIHRoZSBub2RlIHdpdGggaXRcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gTm9kZSBoYXMgdHdvIGNoaWxkcmVuLCBmaW5kIHRoZSBpbm9yZGVyIHN1Y2Nlc3NvclxuICAgICAgICAgICAgICAgIGxldCBzdWNjZXNzb3IgPSB0aGlzLmZpbmRNaW4oY3VycmVudC5yaWdodCk7XG4gICAgICAgICAgICAgICAgY3VycmVudC5kYXRhID0gc3VjY2Vzc29yLmRhdGE7IC8vIFJlcGxhY2UgdGhlIGRhdGEgd2l0aCBzdWNjZXNzb3IncyBkYXRhXG4gICAgICAgICAgICAgICAgY3VycmVudC5yaWdodCA9IHRoaXMuZGVsZXRlUmVjdXJzaXZlKFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50LnJpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzb3IuZGF0YVxuICAgICAgICAgICAgICAgICk7IC8vIFJlbW92ZSB0aGUgc3VjY2Vzc29yXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGN1cnJlbnQ7IC8vIFJldHVybiB0aGUgY3VycmVudCBub2RlIHRvIGxpbmsgYmFjayBwcm9wZXJseVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpbmRzIHRoZSBub2RlIHdpdGggdGhlIG1pbmltdW0gdmFsdWUgaW4gdGhlIHN1YnRyZWUgc3RhcnRpbmcgZnJvbSB0aGUgZ2l2ZW4gbm9kZS5cbiAgICAgKiBAcGFyYW0ge05vZGV9IGN1cnJlbnQgLSBUaGUgY3VycmVudCBub2RlIGZyb20gd2hpY2ggdG8gZmluZCB0aGUgbWluaW11bS5cbiAgICAgKiBAcmV0dXJucyB7Tm9kZX0gVGhlIG5vZGUgd2l0aCB0aGUgbWluaW11bSB2YWx1ZS5cbiAgICAgKi9cbiAgICBmaW5kTWluKGN1cnJlbnQpIHtcbiAgICAgICAgd2hpbGUgKGN1cnJlbnQubGVmdCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubGVmdDsgLy8gS2VlcCBnb2luZyBsZWZ0IHRvIGZpbmQgdGhlIG1pbmltdW0gdmFsdWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VycmVudDsgLy8gUmV0dXJuIHRoZSBub2RlIHdpdGggdGhlIG1pbmltdW0gdmFsdWVcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWFyY2hlcyBmb3IgYSBub2RlIHdpdGggdGhlIGdpdmVuIHZhbHVlLCBzdGFydGluZyBmcm9tIHRoZSByb290IG9mIHRoZSB0cmVlIG9yIGZyb20gYSBzcGVjaWZpZWQgbm9kZS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcGFyYW0ge05vZGV9IGN1cnJlbnQgLSBUaGUgY3VycmVudCBub2RlIGluIHRoZSByZWN1cnNpb24sIGRlZmF1bHRzIHRvIHRoZSByb290IG9mIHRoZSB0cmVlLlxuICAgICAqIEByZXR1cm5zIHtOb2RlfG51bGx9IFRoZSBmb3VuZCBub2RlLCBvciBudWxsIGlmIHRoZSBub2RlIGRvZXMgbm90IGV4aXN0LlxuICAgICAqL1xuICAgIGZpbmQodmFsdWUsIGN1cnJlbnQgPSB0aGlzLnJvb3QpIHtcbiAgICAgICAgaWYgKGN1cnJlbnQgPT09IG51bGwpIHJldHVybiBudWxsOyAvLyBCYXNlIGNhc2U6IG5vIG5vZGUgdG8gc2VhcmNoXG4gICAgICAgIGlmIChjdXJyZW50LmRhdGEgPT09IHZhbHVlKSByZXR1cm4gY3VycmVudDsgLy8gTm9kZSBmb3VuZCwgcmV0dXJuIGl0XG4gICAgICAgIGlmICh2YWx1ZSA8IGN1cnJlbnQuZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluZCh2YWx1ZSwgY3VycmVudC5sZWZ0KTsgLy8gU2VhcmNoIGxlZnQgc3VidHJlZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmZpbmQodmFsdWUsIGN1cnJlbnQucmlnaHQpOyAvLyBTZWFyY2ggcmlnaHQgc3VidHJlZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGEgbGV2ZWwgb3JkZXIgdHJhdmVyc2FsIG9mIHRoZSB0cmVlLiBJZiBhIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBhcHBsaWVzIGl0IHRvIGVhY2ggbm9kZSxcbiAgICAgKiBvdGhlcndpc2UgY29sbGVjdHMgYW5kIHJldHVybnMgYW4gYXJyYXkgb2Ygbm9kZSB2YWx1ZXMuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBPcHRpb25hbCBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoIG5vZGUuXG4gICAgICogQHJldHVybnMge0FycmF5fG51bGx9IEFuIGFycmF5IG9mIG5vZGUgdmFsdWVzIGlmIG5vIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBvciBudWxsIGlmIGEgY2FsbGJhY2sgaXMgdXNlZC5cbiAgICAgKi9cbiAgICBsZXZlbE9yZGVyKGNhbGxiYWNrKSB7XG4gICAgICAgIGxldCByb290ID0gdGhpcy5yb290OyAvLyBTdGFydCBmcm9tIHRoZSByb290XG4gICAgICAgIGlmIChyb290ID09PSBudWxsKSByZXR1cm4gW107IC8vIFJldHVybiBlbXB0eSBhcnJheSBpZiB0cmVlIGlzIGVtcHR5XG4gICAgICAgIGNvbnN0IHF1ZXVlID0gW3Jvb3RdOyAvLyBJbml0aWFsaXplIHF1ZXVlIHdpdGggcm9vdCBub2RlIGZvciBCRlNcbiAgICAgICAgY29uc3QgYnJlYWR0aEZpcnN0ID0gW107IC8vIENvbGxlY3RzIG5vZGUgdmFsdWVzIGlmIG5vIGNhbGxiYWNrIHByb3ZpZGVkXG4gICAgICAgIHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudCA9IHF1ZXVlLnNoaWZ0KCk7IC8vIFByb2Nlc3Mgbm9kZXMgb25lIGJ5IG9uZVxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soY3VycmVudCk7IC8vIEFwcGx5IGNhbGxiYWNrIGlmIHByb3ZpZGVkXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJyZWFkdGhGaXJzdC5wdXNoKGN1cnJlbnQuZGF0YSk7IC8vIENvbGxlY3QgZGF0YSBpZiBubyBjYWxsYmFja1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGN1cnJlbnQubGVmdCAhPT0gbnVsbCkgcXVldWUucHVzaChjdXJyZW50LmxlZnQpOyAvLyBBZGQgbGVmdCBjaGlsZCB0byBxdWV1ZVxuICAgICAgICAgICAgaWYgKGN1cnJlbnQucmlnaHQgIT09IG51bGwpIHF1ZXVlLnB1c2goY3VycmVudC5yaWdodCk7IC8vIEFkZCByaWdodCBjaGlsZCB0byBxdWV1ZVxuICAgICAgICB9XG4gICAgICAgIGlmICghY2FsbGJhY2spIHJldHVybiBicmVhZHRoRmlyc3Q7IC8vIFJldHVybiBjb2xsZWN0ZWQgZGF0YSBpZiBubyBjYWxsYmFjayB1c2VkXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYW4gaW5vcmRlciB0cmF2ZXJzYWwgb2YgdGhlIHRyZWUuIElmIGEgY2FsbGJhY2sgaXMgcHJvdmlkZWQsIGFwcGxpZXMgaXQgdG8gZWFjaCBub2RlLFxuICAgICAqIG90aGVyd2lzZSBjb2xsZWN0cyBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiBub2RlIHZhbHVlcy5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIE9wdGlvbmFsIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2ggbm9kZS5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl8bnVsbH0gQW4gYXJyYXkgb2Ygbm9kZSB2YWx1ZXMgaWYgbm8gY2FsbGJhY2sgaXMgcHJvdmlkZWQsIG9yIG51bGwgaWYgYSBjYWxsYmFjayBpcyB1c2VkLlxuICAgICAqL1xuICAgIGluT3JkZXIoY2FsbGJhY2spIHtcbiAgICAgICAgY29uc3QgaW5PcmRlckxpc3QgPSBbXTsgLy8gTGlzdCB0byBjb2xsZWN0IG5vZGUgdmFsdWVzXG4gICAgICAgIHRoaXMuaW5PcmRlclJlY3Vyc2l2ZSh0aGlzLnJvb3QsIGluT3JkZXJMaXN0LCBjYWxsYmFjayk7IC8vIFN0YXJ0IHJlY3Vyc2l2ZSB0cmF2ZXJzYWwgZnJvbSByb290XG4gICAgICAgIGlmICghY2FsbGJhY2spIHJldHVybiBpbk9yZGVyTGlzdDsgLy8gUmV0dXJuIGxpc3QgaWYgbm8gY2FsbGJhY2sgcHJvdmlkZWRcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIZWxwZXIgZnVuY3Rpb24gdG8gcGVyZm9ybSBhbiBpbm9yZGVyIHRyYXZlcnNhbCBvZiB0aGUgdHJlZSByZWN1cnNpdmVseS5cbiAgICAgKiBAcGFyYW0ge05vZGV9IGN1cnJlbnQgLSBUaGUgY3VycmVudCBub2RlIGJlaW5nIHByb2Nlc3NlZC5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IC0gQXJyYXkgdG8gY29sbGVjdCBub2RlIHZhbHVlcy5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIE9wdGlvbmFsIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2ggbm9kZS5cbiAgICAgKi9cbiAgICBpbk9yZGVyUmVjdXJzaXZlKGN1cnJlbnQsIGxpc3QsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChjdXJyZW50ID09PSBudWxsKSByZXR1cm47IC8vIEJhc2UgY2FzZTogZW5kIG9mIGJyYW5jaFxuICAgICAgICB0aGlzLmluT3JkZXJSZWN1cnNpdmUoY3VycmVudC5sZWZ0LCBsaXN0LCBjYWxsYmFjayk7IC8vIFRyYXZlcnNlIGxlZnQgc3VidHJlZVxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGN1cnJlbnQpOyAvLyBBcHBseSBjYWxsYmFjayB0byBjdXJyZW50IG5vZGVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxpc3QucHVzaChjdXJyZW50LmRhdGEpOyAvLyBDb2xsZWN0IGN1cnJlbnQgbm9kZSdzIGRhdGFcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluT3JkZXJSZWN1cnNpdmUoY3VycmVudC5yaWdodCwgbGlzdCwgY2FsbGJhY2spOyAvLyBUcmF2ZXJzZSByaWdodCBzdWJ0cmVlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYSBwcmVvcmRlciB0cmF2ZXJzYWwgb2YgdGhlIHRyZWUuIElmIGEgY2FsbGJhY2sgaXMgcHJvdmlkZWQsIGFwcGxpZXMgaXQgdG8gZWFjaCBub2RlLFxuICAgICAqIG90aGVyd2lzZSBjb2xsZWN0cyBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiBub2RlIHZhbHVlcy5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIE9wdGlvbmFsIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2ggbm9kZS5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl8bnVsbH0gQW4gYXJyYXkgb2Ygbm9kZSB2YWx1ZXMgaWYgbm8gY2FsbGJhY2sgaXMgcHJvdmlkZWQsIG9yIG51bGwgaWYgYSBjYWxsYmFjayBpcyB1c2VkLlxuICAgICAqL1xuICAgIHByZU9yZGVyKGNhbGxiYWNrKSB7XG4gICAgICAgIGNvbnN0IHByZU9yZGVyTGlzdCA9IFtdOyAvLyBMaXN0IHRvIGNvbGxlY3Qgbm9kZSB2YWx1ZXNcbiAgICAgICAgdGhpcy5wcmVPcmRlclJlY3Vyc2l2ZSh0aGlzLnJvb3QsIHByZU9yZGVyTGlzdCwgY2FsbGJhY2spOyAvLyBTdGFydCByZWN1cnNpdmUgdHJhdmVyc2FsIGZyb20gcm9vdFxuICAgICAgICBpZiAoIWNhbGxiYWNrKSByZXR1cm4gcHJlT3JkZXJMaXN0OyAvLyBSZXR1cm4gbGlzdCBpZiBubyBjYWxsYmFjayBwcm92aWRlZFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhlbHBlciBmdW5jdGlvbiB0byBwZXJmb3JtIGEgcHJlb3JkZXIgdHJhdmVyc2FsIG9mIHRoZSB0cmVlIHJlY3Vyc2l2ZWx5LlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gY3VycmVudCAtIFRoZSBjdXJyZW50IG5vZGUgYmVpbmcgcHJvY2Vzc2VkLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgLSBBcnJheSB0byBjb2xsZWN0IG5vZGUgdmFsdWVzLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gT3B0aW9uYWwgZnVuY3Rpb24gdG8gYXBwbHkgdG8gZWFjaCBub2RlLlxuICAgICAqL1xuICAgIHByZU9yZGVyUmVjdXJzaXZlKGN1cnJlbnQsIGxpc3QsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChjdXJyZW50ID09PSBudWxsKSByZXR1cm47IC8vIEJhc2UgY2FzZTogZW5kIG9mIGJyYW5jaFxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGN1cnJlbnQpOyAvLyBBcHBseSBjYWxsYmFjayB0byBjdXJyZW50IG5vZGVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxpc3QucHVzaChjdXJyZW50LmRhdGEpOyAvLyBDb2xsZWN0IGN1cnJlbnQgbm9kZSdzIGRhdGFcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByZU9yZGVyUmVjdXJzaXZlKGN1cnJlbnQubGVmdCwgbGlzdCwgY2FsbGJhY2spOyAvLyBUcmF2ZXJzZSBsZWZ0IHN1YnRyZWVcbiAgICAgICAgdGhpcy5wcmVPcmRlclJlY3Vyc2l2ZShjdXJyZW50LnJpZ2h0LCBsaXN0LCBjYWxsYmFjayk7IC8vIFRyYXZlcnNlIHJpZ2h0IHN1YnRyZWVcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhIHBvc3RvcmRlciB0cmF2ZXJzYWwgb2YgdGhlIHRyZWUuIElmIGEgY2FsbGJhY2sgaXMgcHJvdmlkZWQsIGFwcGxpZXMgaXQgdG8gZWFjaCBub2RlLFxuICAgICAqIG90aGVyd2lzZSBjb2xsZWN0cyBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiBub2RlIHZhbHVlcy5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIE9wdGlvbmFsIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2ggbm9kZS5cbiAgICAgKiBAcGFyYW0ge05vZGV9IGN1cnJlbnQgLSBUaGUgY3VycmVudCBub2RlIGJlaW5nIHByb2Nlc3NlZCwgZGVmYXVsdHMgdG8gdGhlIHJvb3Qgb2YgdGhlIHRyZWUuXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCAtIEFycmF5IHRvIGNvbGxlY3Qgbm9kZSB2YWx1ZXMsIGluaXRpYWxseSBlbXB0eS5cbiAgICAgKiBAcmV0dXJucyB7QXJyYXl8bnVsbH0gQW4gYXJyYXkgb2Ygbm9kZSB2YWx1ZXMgaWYgbm8gY2FsbGJhY2sgaXMgcHJvdmlkZWQsIG9yIG51bGwgaWYgYSBjYWxsYmFjayBpcyB1c2VkLlxuICAgICAqL1xuICAgIHBvc3RPcmRlcihjYWxsYmFjaywgY3VycmVudCA9IHRoaXMucm9vdCwgbGlzdCA9IFtdKSB7XG4gICAgICAgIGlmIChjdXJyZW50ID09PSBudWxsKSByZXR1cm47IC8vIEJhc2UgY2FzZTogZW5kIG9mIGJyYW5jaFxuICAgICAgICB0aGlzLnBvc3RPcmRlcihjYWxsYmFjaywgY3VycmVudC5sZWZ0LCBsaXN0KTsgLy8gVHJhdmVyc2UgbGVmdCBzdWJ0cmVlXG4gICAgICAgIHRoaXMucG9zdE9yZGVyKGNhbGxiYWNrLCBjdXJyZW50LnJpZ2h0LCBsaXN0KTsgLy8gVHJhdmVyc2UgcmlnaHQgc3VidHJlZVxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGN1cnJlbnQpOyAvLyBBcHBseSBjYWxsYmFjayB0byBjdXJyZW50IG5vZGVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxpc3QucHVzaChjdXJyZW50LmRhdGEpOyAvLyBDb2xsZWN0IGN1cnJlbnQgbm9kZSdzIGRhdGFcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNhbGxiYWNrICYmIGN1cnJlbnQgPT09IHRoaXMucm9vdCkge1xuICAgICAgICAgICAgcmV0dXJuIGxpc3Q7IC8vIFJldHVybiBjb2xsZWN0ZWQgZGF0YSBvbmx5IG9uIHRoZSBpbml0aWFsIGNhbGwgaWYgbm8gY2FsbGJhY2sgaXMgcHJvdmlkZWRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgdGhlIGhlaWdodCBvZiB0aGUgdHJlZSBmcm9tIGEgc3BlY2lmaWMgbm9kZS5cbiAgICAgKiBIZWlnaHQgaXMgZGVmaW5lZCBhcyB0aGUgbnVtYmVyIG9mIGVkZ2VzIG9uIHRoZSBsb25nZXN0IHBhdGggZnJvbSB0aGUgbm9kZSB0byBhIGxlYWYuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbm9kZSAtIFRoZSBkYXRhIG9mIHRoZSBub2RlIGZyb20gd2hpY2ggdG8gY2FsY3VsYXRlIHRoZSBoZWlnaHQuXG4gICAgICogQHJldHVybnMge251bWJlcnxudWxsfSBUaGUgaGVpZ2h0IGZyb20gdGhlIG5vZGUgdG8gdGhlIGRlZXBlc3QgbGVhZiBvciBudWxsIGlmIHRoZSBub2RlIGRvZXNuJ3QgZXhpc3QuXG4gICAgICovXG4gICAgaGVpZ2h0KG5vZGUpIHtcbiAgICAgICAgY29uc3QgZm91bmROb2RlID0gdGhpcy5maW5kKG5vZGUpOyAvLyBBdHRlbXB0IHRvIGxvY2F0ZSB0aGUgbm9kZSBpbiB0aGUgdHJlZVxuICAgICAgICBpZiAoZm91bmROb2RlKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgbm9kZSBpcyBmb3VuZCwgY2FsY3VsYXRlIHRoZSBoZWlnaHQgZnJvbSB0aGlzIG5vZGVcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhlaWdodFJlY3Vyc2l2ZShmb3VuZE5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsOyAvLyBSZXR1cm4gbnVsbCBpZiB0aGUgbm9kZSBpcyBub3QgZm91bmQgaW4gdGhlIHRyZWVcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIZWxwZXIgZnVuY3Rpb24gdG8gcmVjdXJzaXZlbHkgY2FsY3VsYXRlIHRoZSBoZWlnaHQgb2YgdGhlIHRyZWUgZnJvbSB0aGUgZ2l2ZW4gbm9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Tm9kZXxudWxsfSBub2RlIC0gVGhlIG5vZGUgZnJvbSB3aGljaCB0byBjYWxjdWxhdGUgdGhlIGhlaWdodC5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgaGVpZ2h0IG9mIHRoZSB0cmVlIGZyb20gdGhlIGdpdmVuIG5vZGUuXG4gICAgICovXG4gICAgaGVpZ2h0UmVjdXJzaXZlKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHJldHVybiAtMTsgLy8gQmFzZSBjYXNlOiByZXR1cm4gLTEgZm9yIG51bGwgdG8gYWNjb3VudCBmb3IgdGhlIGVkZ2UgY291bnQgY29ycmVjdGx5XG4gICAgICAgIGxldCBsZWZ0ID0gdGhpcy5oZWlnaHRSZWN1cnNpdmUobm9kZS5sZWZ0KTsgLy8gUmVjdXJzaXZlbHkgY2FsY3VsYXRlIGhlaWdodCBvZiB0aGUgbGVmdCBzdWJ0cmVlXG4gICAgICAgIGxldCByaWdodCA9IHRoaXMuaGVpZ2h0UmVjdXJzaXZlKG5vZGUucmlnaHQpOyAvLyBSZWN1cnNpdmVseSBjYWxjdWxhdGUgaGVpZ2h0IG9mIHRoZSByaWdodCBzdWJ0cmVlXG4gICAgICAgIHJldHVybiBNYXRoLm1heChsZWZ0LCByaWdodCkgKyAxOyAvLyBSZXR1cm4gdGhlIGdyZWF0ZXIgaGVpZ2h0IHBsdXMgb25lIGZvciB0aGUgY3VycmVudCBub2RlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlcyB0aGUgZGVwdGggb2YgYSBzcGVjaWZpZWQgbm9kZSBmcm9tIHRoZSByb290IG9mIHRoZSB0cmVlLCBvciBmcm9tIGFub3RoZXIgc3BlY2lmaWVkIG5vZGUuXG4gICAgICogRGVwdGggaXMgZGVmaW5lZCBhcyB0aGUgbnVtYmVyIG9mIGVkZ2VzIGZyb20gdGhlIHN0YXJ0aW5nIG5vZGUgdG8gdGhlIHRhcmdldCBub2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRhcmdldCAtIFRoZSBkYXRhIG9mIHRoZSBub2RlIGZvciB3aGljaCB0byBjYWxjdWxhdGUgdGhlIGRlcHRoLlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gY3VycmVudCAtIFRoZSBjdXJyZW50IG5vZGUgaW4gdGhlIHRyZWUgZHVyaW5nIHRoZSByZWN1cnNpdmUgY2FsbCwgZGVmYXVsdHMgdG8gdGhlIHJvb3QuXG4gICAgICogQHJldHVybnMge251bWJlcn0gVGhlIGRlcHRoIG9mIHRoZSB0YXJnZXQgbm9kZSwgb3IgSW5maW5pdHkgaWYgdGhlIG5vZGUgZG9lcyBub3QgZXhpc3QuXG4gICAgICovXG4gICAgZGVwdGgodGFyZ2V0LCBjdXJyZW50ID0gdGhpcy5yb290KSB7XG4gICAgICAgIGlmIChjdXJyZW50ID09PSBudWxsKSByZXR1cm4gSW5maW5pdHk7IC8vIEJhc2UgY2FzZTogaWYgY3VycmVudCBpcyBudWxsLCB0YXJnZXQgaXMgbm90IGluIHRoaXMgc3VidHJlZVxuICAgICAgICBpZiAodGFyZ2V0ID09PSBjdXJyZW50LmRhdGEpIHJldHVybiAwOyAvLyBCYXNlIGNhc2U6IGlmIHRoZSB0YXJnZXQgaXMgZm91bmQsIGRlcHRoIGlzIDBcblxuICAgICAgICBsZXQgbGVmdERlcHRoID0gdGhpcy5kZXB0aCh0YXJnZXQsIGN1cnJlbnQubGVmdCk7IC8vIFJlY3Vyc2l2ZWx5IGZpbmQgZGVwdGggaW4gdGhlIGxlZnQgc3VidHJlZVxuICAgICAgICBsZXQgcmlnaHREZXB0aCA9IHRoaXMuZGVwdGgodGFyZ2V0LCBjdXJyZW50LnJpZ2h0KTsgLy8gUmVjdXJzaXZlbHkgZmluZCBkZXB0aCBpbiB0aGUgcmlnaHQgc3VidHJlZVxuXG4gICAgICAgIGlmIChsZWZ0RGVwdGggPT09IEluZmluaXR5ICYmIHJpZ2h0RGVwdGggPT09IEluZmluaXR5KSB7XG4gICAgICAgICAgICByZXR1cm4gSW5maW5pdHk7IC8vIE5vZGUgbm90IGZvdW5kIGluIGVpdGhlciBzdWJ0cmVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5taW4obGVmdERlcHRoLCByaWdodERlcHRoKSArIDE7IC8vIFJldHVybiB0aGUgbWluaW11bSBkZXB0aCBmb3VuZCBwbHVzIG9uZSBmb3IgdGhlIGN1cnJlbnQgbm9kZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyBpZiB0aGUgYmluYXJ5IHNlYXJjaCB0cmVlIGlzIGJhbGFuY2VkLlxuICAgICAqIEEgYmluYXJ5IHRyZWUgaXMgY29uc2lkZXJlZCBiYWxhbmNlZCBpZiwgZm9yIGV2ZXJ5IG5vZGUsIHRoZSBoZWlnaHQgZGlmZmVyZW5jZVxuICAgICAqIGJldHdlZW4gaXRzIGxlZnQgYW5kIHJpZ2h0IHN1YnRyZWUgaXMgbm8gbW9yZSB0aGFuIG9uZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB0cmVlIGlzIGJhbGFuY2VkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgaXNCYWxhbmNlZCgpIHtcbiAgICAgICAgbGV0IGN1cnJlbnQgPSB0aGlzLnJvb3Q7IC8vIFN0YXJ0IGNoZWNraW5nIGJhbGFuY2UgZnJvbSB0aGUgcm9vdCBvZiB0aGUgdHJlZVxuICAgICAgICAvLyBDYWxscyB0aGUgcmVjdXJzaXZlIGZ1bmN0aW9uIHRvIGNoZWNrIGJhbGFuY2UgZnJvbSB0aGUgcm9vdFxuICAgICAgICAvLyBDb252ZXJ0cyB0aGUgcmVzdWx0IHRvIGJvb2xlYW4gKGZhbHNlIGlmIHVuYmFsYW5jZWQsIHRydWUgaWYgYmFsYW5jZWQpXG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrQmFsYW5jZShjdXJyZW50KSAhPT0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVjdXJzaXZlbHkgY2hlY2tzIGlmIHRoZSB0cmVlIGlzIGJhbGFuY2VkIGJ5IGNvbXBhcmluZyB0aGUgaGVpZ2h0cyBvZiB0aGUgbGVmdCBhbmQgcmlnaHQgc3VidHJlZXNcbiAgICAgKiBmb3IgZWFjaCBub2RlLiBUaGUgZnVuY3Rpb24gYWxzbyBjYWxjdWxhdGVzIHRoZSBoZWlnaHQgb2YgdGhlIHRyZWUgZnJvbSB0aGUgY3VycmVudCBub2RlIGRvd253YXJkcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gbm9kZSAtIFRoZSBjdXJyZW50IG5vZGUgZnJvbSB3aGljaCB0byBjaGVjayB0aGUgYmFsYW5jZS5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfGJvb2xlYW59IFJldHVybnMgdGhlIGhlaWdodCBvZiB0aGUgc3VidHJlZSByb290ZWQgYXQgJ25vZGUnIGlmIGl0IGlzIGJhbGFuY2VkLFxuICAgICAqIG9yIGZhbHNlIGlmIGl0IGlzIHVuYmFsYW5jZWQuIElmIHRoZSBub2RlIGlzIG51bGwsIGl0IHJldHVybnMgLTEsIGluZGljYXRpbmcgbm8gaGVpZ2h0LlxuICAgICAqL1xuICAgIGNoZWNrQmFsYW5jZShub2RlKSB7XG4gICAgICAgIGlmIChub2RlID09PSBudWxsKSByZXR1cm4gLTE7IC8vIEJhc2UgY2FzZTogQSBudWxsIG5vZGUgaGFzIGEgaGVpZ2h0IG9mIC0xXG5cbiAgICAgICAgLy8gUmVjdXJzaXZlbHkgY2FsY3VsYXRlIHRoZSBoZWlnaHQgb2YgdGhlIGxlZnQgc3VidHJlZVxuICAgICAgICAvLyBJZiBsZWZ0IHN1YnRyZWUgaXMgdW5iYWxhbmNlZCwgcmV0dXJuIGZhbHNlIGltbWVkaWF0ZWx5XG4gICAgICAgIGxldCBsZWZ0SGVpZ2h0ID0gdGhpcy5jaGVja0JhbGFuY2Uobm9kZS5sZWZ0KTtcbiAgICAgICAgaWYgKGxlZnRIZWlnaHQgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgLy8gUmVjdXJzaXZlbHkgY2FsY3VsYXRlIHRoZSBoZWlnaHQgb2YgdGhlIHJpZ2h0IHN1YnRyZWVcbiAgICAgICAgLy8gSWYgcmlnaHQgc3VidHJlZSBpcyB1bmJhbGFuY2VkLCByZXR1cm4gZmFsc2UgaW1tZWRpYXRlbHlcbiAgICAgICAgbGV0IHJpZ2h0SGVpZ2h0ID0gdGhpcy5jaGVja0JhbGFuY2Uobm9kZS5yaWdodCk7XG4gICAgICAgIGlmIChyaWdodEhlaWdodCA9PT0gZmFsc2UpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgY3VycmVudCBub2RlIGlzIGJhbGFuY2VkIGJ5IGNvbXBhcmluZyB0aGUgaGVpZ2h0cyBvZiBpdHMgc3VidHJlZXNcbiAgICAgICAgaWYgKE1hdGguYWJzKGxlZnRIZWlnaHQgLSByaWdodEhlaWdodCkgPiAxKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgaGVpZ2h0IGRpZmZlcmVuY2UgaXMgZ3JlYXRlciB0aGFuIDEsIHRyZWUgaXMgdW5iYWxhbmNlZCBhdCB0aGlzIG5vZGVcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIElmIGJhbGFuY2VkLCByZXR1cm4gdGhlIGhlaWdodCBvZiB0aGUgdHJlZSBmcm9tIHRoaXMgbm9kZVxuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KGxlZnRIZWlnaHQsIHJpZ2h0SGVpZ2h0KSArIDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWJhbGFuY2VzIHRoZSBiaW5hcnkgc2VhcmNoIHRyZWUgYnkgcmVidWlsZGluZyBpdCBmcm9tIGFuIGlub3JkZXIgdHJhdmVyc2FsIHRvIGVuc3VyZSBvcHRpbWFsIGJhbGFuY2UuXG4gICAgICovXG4gICAgcmViYWxhbmNlKCkge1xuICAgICAgICAvLyBDb2xsZWN0IG5vZGUgdmFsdWVzIGluIHNvcnRlZCBvcmRlciB2aWEgaW5vcmRlciB0cmF2ZXJzYWxcbiAgICAgICAgY29uc3QgYXJyID0gdGhpcy5pbk9yZGVyKCk7XG5cbiAgICAgICAgLy8gUmVidWlsZCB0aGUgdHJlZSBmcm9tIHRoZSBzb3J0ZWQgYXJyYXkgdG8gZW5zdXJlIGl0IGlzIGJhbGFuY2VkXG4gICAgICAgIHRoaXMucm9vdCA9IHRoaXMuYnVpbGRUcmVlKGFycik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSB1dGlsaXR5IGZ1bmN0aW9uIHRvIHZpc3VhbGx5IHByaW50IHRoZSBzdHJ1Y3R1cmUgb2YgdGhlIHRyZWUuIERpc3BsYXlzIHRoZSB0cmVlXG4gICAgICogd2l0aCBlYWNoIG5vZGUgaW4gaXRzIHJlbGF0aXZlIHBvc2l0aW9uLCBhaWRpbmcgaW4gdW5kZXJzdGFuZGluZyB0aGUgdHJlZSBsYXlvdXQuXG4gICAgICogQHBhcmFtIHtOb2RlfSBub2RlIC0gVGhlIHN0YXJ0aW5nIG5vZGUgdG8gcHJpbnQgZnJvbS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4IC0gVGhlIHByZWZpeCB1c2VkIHRvIGluZGljYXRlIGxpbmUgc3RhcnRzIGluIHRoZSB0cmVlIHByaW50b3V0LlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNMZWZ0IC0gSW5kaWNhdGVzIGlmIHRoZSBjdXJyZW50IG5vZGUgaXMgYSBsZWZ0IGNoaWxkLlxuICAgICAqL1xuICAgIHByZXR0eVByaW50KG5vZGUsIHByZWZpeCA9IFwiXCIsIGlzTGVmdCA9IHRydWUpIHtcbiAgICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZS5yaWdodCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5wcmV0dHlQcmludChcbiAgICAgICAgICAgICAgICBub2RlLnJpZ2h0LFxuICAgICAgICAgICAgICAgIGAke3ByZWZpeH0ke2lzTGVmdCA/IFwi4pSCICAgXCIgOiBcIiAgICBcIn1gLFxuICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGAke3ByZWZpeH0ke2lzTGVmdCA/IFwi4pSU4pSA4pSAIFwiIDogXCLilIzilIDilIAgXCJ9JHtub2RlLmRhdGF9YCk7XG4gICAgICAgIGlmIChub2RlLmxlZnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMucHJldHR5UHJpbnQoXG4gICAgICAgICAgICAgICAgbm9kZS5sZWZ0LFxuICAgICAgICAgICAgICAgIGAke3ByZWZpeH0ke2lzTGVmdCA/IFwiICAgIFwiIDogXCLilIIgICBcIn1gLFxuICAgICAgICAgICAgICAgIHRydWVcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNvbnN0IHRyZWUgPSBuZXcgVHJlZSgpO1xudHJlZS5idWlsZFRyZWUoWzEsIDcsIDQsIDIzLCA4LCA5LCA0LCAzLCA1LCA3LCA5LCA2NywgNjM0NSwgMzI0XSk7XG5jb25zb2xlLmxvZyhcIk9yaWdpbmFsIFRyZWU6XCIpO1xudHJlZS5wcmV0dHlQcmludCh0cmVlLnJvb3QpO1xudHJlZS5pbnNlcnQoNDgpO1xudHJlZS5pbnNlcnQoMTUpO1xudHJlZS5pbnNlcnQoMTcpO1xudHJlZS5pbnNlcnQoMTYpO1xudHJlZS5kZWxldGUoNCk7XG5jb25zb2xlLmxvZyhcIk1vZGlmaWVkIFRyZWU6XCIpO1xudHJlZS5wcmV0dHlQcmludCh0cmVlLnJvb3QpO1xuLy8gY29uc29sZS5sb2codHJlZS5maW5kKDY3KSk7XG4vLyBjb25zb2xlLmxvZyh0cmVlLmZpbmQoMTQpKTtcbi8vIGNvbnNvbGUubG9nKHRyZWUubGV2ZWxPcmRlcigpKTtcbi8vIGNvbnNvbGUubG9nKHRyZWUuaW5PcmRlcigpKTtcbi8vIGNvbnNvbGUubG9nKHRyZWUucHJlT3JkZXIoKSk7XG4vLyBjb25zb2xlLmxvZyh0cmVlLnBvc3RPcmRlcigpKTtcbi8vIGNvbnNvbGUubG9nKHRyZWUuaGVpZ2h0KDMpKTtcbi8vIGNvbnNvbGUubG9nKHRyZWUuZGVwdGgoNykpO1xuY29uc29sZS5sb2coYElzIHRyZWUgYmFsYW5jZWQ6ICR7dHJlZS5pc0JhbGFuY2VkKCl9YCk7XG50cmVlLnJlYmFsYW5jZSgpO1xuLy8gY29uc29sZS5sb2codHJlZSk7XG5jb25zb2xlLmxvZyhcIlJlYmFsYW5jZWQgVHJlZTpcIilcbnRyZWUucHJldHR5UHJpbnQodHJlZS5yb290KTtcbmNvbnNvbGUubG9nKGBJcyB0cmVlIGJhbGFuY2VkOiAke3RyZWUuaXNCYWxhbmNlZCgpfWApOyIsIi8vIFRoaXMgZnVuY3Rpb24gcGVyZm9ybXMgdGhlIG1lcmdlIHNvcnQgYWxnb3JpdGhtIG9uIGFuIGFycmF5LlxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlU29ydChhcnIpIHtcbiAgICAvLyBCYXNlIGNhc2U6IGlmIHRoZSBhcnJheSBoYXMgMSBvciBubyBlbGVtZW50cywgaXQncyBhbHJlYWR5IHNvcnRlZC5cbiAgICBpZiAoYXJyLmxlbmd0aCA8PSAxKSB7XG4gICAgICAgIHJldHVybiBhcnI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUmVjdXJzaXZlIGNhc2U6IHNwbGl0IHRoZSBhcnJheSBpbnRvIGhhbHZlcy5cbiAgICAgICAgbGV0IG1pZGRsZUluZGV4ID0gTWF0aC5mbG9vcihhcnIubGVuZ3RoIC8gMik7XG4gICAgICAgIGxldCBmaXJzdEhhbGYgPSBhcnIuc2xpY2UoMCwgbWlkZGxlSW5kZXgpO1xuICAgICAgICBsZXQgc2Vjb25kSGFsZiA9IGFyci5zbGljZShtaWRkbGVJbmRleCk7XG5cbiAgICAgICAgLy8gUmVjdXJzaXZlbHkgc29ydCBib3RoIGhhbHZlcy5cbiAgICAgICAgbGV0IGZpcnN0U29ydGVkID0gbWVyZ2VTb3J0KGZpcnN0SGFsZik7XG4gICAgICAgIGxldCBzZWNvbmRTb3J0ZWQgPSBtZXJnZVNvcnQoc2Vjb25kSGFsZik7XG5cbiAgICAgICAgLy8gTWVyZ2UgdGhlIHR3byBzb3J0ZWQgaGFsdmVzLlxuICAgICAgICByZXR1cm4gbWVyZ2UoZmlyc3RTb3J0ZWQsIHNlY29uZFNvcnRlZCk7XG4gICAgfVxufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIG1lcmdlcyB0d28gc29ydGVkIGFycmF5cyBpbnRvIG9uZSBzb3J0ZWQgYXJyYXkuXG5mdW5jdGlvbiBtZXJnZShhcnIxLCBhcnIyKSB7XG4gICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgIGxldCBpID0gMDsgLy8gUG9pbnRlciBmb3IgYXJyMVxuICAgIGxldCBqID0gMDsgLy8gUG9pbnRlciBmb3IgYXJyMlxuXG4gICAgLy8gVHJhdmVyc2UgYm90aCBhcnJheXMgYW5kIGluc2VydCBzbWFsbGVyIG9mIGJvdGggZWxlbWVudHMgaW4gcmVzdWx0XG4gICAgd2hpbGUgKGkgPCBhcnIxLmxlbmd0aCAmJiBqIDwgYXJyMi5sZW5ndGgpIHtcbiAgICAgICAgaWYgKGFycjFbaV0gPCBhcnIyW2pdKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChhcnIxW2ldKTtcbiAgICAgICAgICAgIGkrKzsgLy8gTW92ZSBwb2ludGVyIGZvciBhcnIxXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChhcnIyW2pdKTtcbiAgICAgICAgICAgIGorKzsgLy8gTW92ZSBwb2ludGVyIGZvciBhcnIyXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDb25jYXRlbmF0ZSB0aGUgcmVtYWluaW5nIGVsZW1lbnRzIG9mIGJvdGggYXJyYXlzIChpZiBhbnkpLlxuICAgIHJldHVybiByZXN1bHQuY29uY2F0KGFycjEuc2xpY2UoaSkuY29uY2F0KGFycjIuc2xpY2UoaikpKTtcbn1cblxuLy8gVGhpcyBmdW5jdGlvbiByZW1vdmVzIGR1cGxpY2F0ZSBlbGVtZW50cyBmcm9tIGEgc29ydGVkIGFycmF5LlxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUR1cGxpY2F0ZShzb3J0ZWRBcnJheSkge1xuICAgIHJldHVybiBzb3J0ZWRBcnJheS5maWx0ZXIoKGl0ZW0sIGluZGV4LCBhcnJheSkgPT4ge1xuICAgICAgICAvLyBLZWVwIG9ubHkgdGhlIGZpcnN0IGluc3RhbmNlIG9mIGVhY2ggZWxlbWVudCwgaWdub3Jpbmcgc3Vic2VxdWVudCBkdXBsaWNhdGVzLlxuICAgICAgICByZXR1cm4gaW5kZXggPT09IDAgfHwgaXRlbSAhPT0gYXJyYXlbaW5kZXggLSAxXTtcbiAgICB9KTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==