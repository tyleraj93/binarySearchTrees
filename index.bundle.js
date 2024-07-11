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

const generateRandomNumbers = (count = 20, max = 100) =>
    Array.from({ length: count }, () => Math.floor(Math.random() * max));

const tree = new Tree();
tree.buildTree(generateRandomNumbers());
console.log("Original Tree:");
tree.prettyPrint(tree.root);
console.log(`Is tree balanced: ${tree.isBalanced()}`);
// console.log(tree.levelOrder());
// console.log(tree.inOrder());
// console.log(tree.preOrder());
// console.log(tree.postOrder());
tree.insert(76);
tree.insert(34);
tree.insert(35);
tree.insert(36);
tree.insert(37);
tree.insert(83);
tree.insert(23);
tree.insert(7);
tree.insert(92);
tree.insert(56);
tree.insert(15);
tree.insert(64);
tree.insert(4);
tree.insert(89);
tree.insert(57);
tree.insert(73);
tree.insert(38);
console.log("Modified Tree:");
tree.prettyPrint(tree.root);
console.log(`Is tree balanced: ${tree.isBalanced()}`);
tree.rebalance();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZixlQUFlOztBQUVmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLFVBQVU7QUFDVjtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmluYXJ5c2VhcmNodHJlZXMvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmluYXJ5c2VhcmNodHJlZXMvLi9zcmMvbWVyZ2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbWVyZ2VTb3J0LCByZW1vdmVEdXBsaWNhdGUgfSBmcm9tIFwiLi9tZXJnZS5qc1wiO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBzaW5nbGUgbm9kZSB3aXRoaW4gdGhlIGJpbmFyeSBzZWFyY2ggdHJlZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBkYXRhIC0gVGhlIHZhbHVlIHN0b3JlZCBpbiB0aGUgbm9kZS5cbiAqIEBwYXJhbSB7Tm9kZX0gbGVmdCAtIEEgcG9pbnRlciB0byB0aGUgbGVmdCBjaGlsZCBub2RlLlxuICogQHBhcmFtIHtOb2RlfSByaWdodCAtIEEgcG9pbnRlciB0byB0aGUgcmlnaHQgY2hpbGQgbm9kZS5cbiAqL1xuY2xhc3MgTm9kZSB7XG4gICAgY29uc3RydWN0b3IoZGF0YSwgbGVmdCA9IG51bGwsIHJpZ2h0ID0gbnVsbCkge1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLmxlZnQgPSBsZWZ0OyAvLyBMZWZ0IGNoaWxkIG5vZGVcbiAgICAgICAgdGhpcy5yaWdodCA9IHJpZ2h0OyAvLyBSaWdodCBjaGlsZCBub2RlXG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBiaW5hcnkgc2VhcmNoIHRyZWUgYW5kIHByb3ZpZGVzIG1ldGhvZHMgZm9yIGluc2VydGluZywgZGVsZXRpbmcsXG4gKiBhbmQgc2VhcmNoaW5nIGZvciB2YWx1ZXMsIGFzIHdlbGwgYXMgdHJlZSB0cmF2ZXJzYWwgZnVuY3Rpb25zLlxuICovXG5leHBvcnQgY2xhc3MgVHJlZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucm9vdCA9IG51bGw7IC8vIFJvb3Qgbm9kZSBvZiB0aGUgdHJlZSwgaW5pdGlhbGx5IG51bGxcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZHMgdGhlIGJpbmFyeSBzZWFyY2ggdHJlZSBmcm9tIGFuIGFycmF5IG9mIHZhbHVlcy5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSAtIFRoZSBhcnJheSBvZiB2YWx1ZXMgdG8gYnVpbGQgdGhlIHRyZWUgZnJvbS5cbiAgICAgKiBAcmV0dXJucyB7Tm9kZX0gVGhlIHJvb3Qgbm9kZSBvZiB0aGUgdHJlZS5cbiAgICAgKi9cbiAgICBidWlsZFRyZWUoYXJyYXkpIHtcbiAgICAgICAgbGV0IHNvcnRlZEFycmF5ID0gdGhpcy5wcmVwYXJlQXJyYXkoYXJyYXkpOyAvLyBTb3J0cyBhcnJheSBhbmQgcmVtb3ZlcyBkdXBsaWNhdGVzXG4gICAgICAgIHRoaXMucm9vdCA9IHRoaXMucmVjdXJzaXZlQnVpbGQoc29ydGVkQXJyYXkpOyAvLyBCdWlsZHMgdGhlIHRyZWUgcmVjdXJzaXZlbHkgZnJvbSB0aGUgc29ydGVkIGFycmF5XG4gICAgICAgIHJldHVybiB0aGlzLnJvb3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJlcGFyZXMgdGhlIGFycmF5IGZvciBidWlsZGluZyB0aGUgdHJlZSBieSBzb3J0aW5nIGFuZCByZW1vdmluZyBkdXBsaWNhdGVzLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IC0gVGhlIGFycmF5IHRvIHByZXBhcmUuXG4gICAgICogQHJldHVybnMge0FycmF5fSBUaGUgcHJvY2Vzc2VkIGFycmF5LlxuICAgICAqL1xuICAgIHByZXBhcmVBcnJheShhcnJheSkge1xuICAgICAgICBpZiAoYXJyYXkubGVuZ3RoID09PSAwKSByZXR1cm4gW107XG4gICAgICAgIHJldHVybiByZW1vdmVEdXBsaWNhdGUobWVyZ2VTb3J0KGFycmF5KSk7IC8vIFVzZXMgZXh0ZXJuYWwgZnVuY3Rpb25zIHRvIHNvcnQgYW5kIGRlZHVwbGljYXRlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVjdXJzaXZlbHkgYnVpbGRzIGEgYmFsYW5jZWQgYmluYXJ5IHNlYXJjaCB0cmVlIGZyb20gYSBzb3J0ZWQgYXJyYXkuXG4gICAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgLSBUaGUgc29ydGVkIGFycmF5IHRvIGJ1aWxkIHRoZSB0cmVlIGZyb20uXG4gICAgICogQHJldHVybnMge05vZGV9IFRoZSBub2RlIGF0IHRoZSBjdXJyZW50IHJlY3Vyc2l2ZSBsZXZlbC5cbiAgICAgKi9cbiAgICByZWN1cnNpdmVCdWlsZChhcnJheSkge1xuICAgICAgICBpZiAoYXJyYXkubGVuZ3RoID09PSAwKSByZXR1cm4gbnVsbDsgLy8gTm8gbW9yZSBlbGVtZW50cyB0byBwcm9jZXNzXG4gICAgICAgIGlmIChhcnJheS5sZW5ndGggPT09IDEpIHJldHVybiBuZXcgTm9kZShhcnJheVswXSk7IC8vIFNpbmdsZSBlbGVtZW50LCBtYWtlIGEgbm9kZVxuXG4gICAgICAgIGxldCBtaWRkbGVJbmRleCA9IE1hdGguZmxvb3IoYXJyYXkubGVuZ3RoIC8gMik7IC8vIEZpbmQgdGhlIG1pZGRsZSBpbmRleFxuICAgICAgICBsZXQgbmV3Tm9kZSA9IG5ldyBOb2RlKGFycmF5W21pZGRsZUluZGV4XSk7IC8vIENyZWF0ZSBhIG5vZGUgd2l0aCB0aGUgbWlkZGxlIGVsZW1lbnRcbiAgICAgICAgbmV3Tm9kZS5sZWZ0ID0gdGhpcy5idWlsZFRyZWUoYXJyYXkuc2xpY2UoMCwgbWlkZGxlSW5kZXgpKTsgLy8gUmVjdXJzaXZlbHkgYnVpbGQgdGhlIGxlZnQgc3VidHJlZVxuICAgICAgICBuZXdOb2RlLnJpZ2h0ID0gdGhpcy5idWlsZFRyZWUoYXJyYXkuc2xpY2UobWlkZGxlSW5kZXggKyAxKSk7IC8vIFJlY3Vyc2l2ZWx5IGJ1aWxkIHRoZSByaWdodCBzdWJ0cmVlXG4gICAgICAgIHJldHVybiBuZXdOb2RlOyAvLyBSZXR1cm4gdGhlIG5ld2x5IGNyZWF0ZWQgbm9kZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluc2VydHMgYSBuZXcgdmFsdWUgaW50byB0aGUgYmluYXJ5IHNlYXJjaCB0cmVlLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBpbnNlcnQuXG4gICAgICovXG4gICAgaW5zZXJ0KHZhbHVlKSB7XG4gICAgICAgIHRoaXMucm9vdCA9IHRoaXMuaW5zZXJ0UmVjdXJzaXZlKHRoaXMucm9vdCwgdmFsdWUpOyAvLyBTdGFydCB0aGUgcmVjdXJzaXZlIGluc2VydGlvbiBmcm9tIHRoZSByb290XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVjdXJzaXZlbHkgaW5zZXJ0cyBhIG5ldyB2YWx1ZSBpbnRvIHRoZSB0cmVlLlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gY3VycmVudCAtIFRoZSBjdXJyZW50IG5vZGUgaW4gdGhlIHJlY3Vyc2lvbi5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gaW5zZXJ0LlxuICAgICAqIEByZXR1cm5zIHtOb2RlfSBUaGUgdXBkYXRlZCBub2RlIGFmdGVyIGluc2VydGlvbi5cbiAgICAgKi9cbiAgICBpbnNlcnRSZWN1cnNpdmUoY3VycmVudCwgdmFsdWUpIHtcbiAgICAgICAgaWYgKGN1cnJlbnQgPT09IG51bGwpIHJldHVybiBuZXcgTm9kZSh2YWx1ZSk7IC8vIEJhc2UgY2FzZTogaW5zZXJ0IHRoZSBuZXcgbm9kZSBoZXJlXG4gICAgICAgIGlmICh2YWx1ZSA8IGN1cnJlbnQuZGF0YSkge1xuICAgICAgICAgICAgY3VycmVudC5sZWZ0ID0gdGhpcy5pbnNlcnRSZWN1cnNpdmUoY3VycmVudC5sZWZ0LCB2YWx1ZSk7IC8vIEluc2VydCBpbiB0aGUgbGVmdCBzdWJ0cmVlXG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPiBjdXJyZW50LmRhdGEpIHtcbiAgICAgICAgICAgIGN1cnJlbnQucmlnaHQgPSB0aGlzLmluc2VydFJlY3Vyc2l2ZShjdXJyZW50LnJpZ2h0LCB2YWx1ZSk7IC8vIEluc2VydCBpbiB0aGUgcmlnaHQgc3VidHJlZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjdXJyZW50OyAvLyBSZXR1cm4gdGhlIGN1cnJlbnQgbm9kZSB0byBsaW5rIGJhY2sgcHJvcGVybHlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGVzIGEgdmFsdWUgZnJvbSB0aGUgYmluYXJ5IHNlYXJjaCB0cmVlLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBkZWxldGUuXG4gICAgICovXG4gICAgZGVsZXRlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMucm9vdCA9IHRoaXMuZGVsZXRlUmVjdXJzaXZlKHRoaXMucm9vdCwgdmFsdWUpOyAvLyBTdGFydCB0aGUgcmVjdXJzaXZlIGRlbGV0aW9uIGZyb20gdGhlIHJvb3RcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWN1cnNpdmVseSBkZWxldGVzIGEgbm9kZSB3aXRoIHRoZSBzcGVjaWZpZWQgdmFsdWUgZnJvbSB0aGUgdHJlZS5cbiAgICAgKiBAcGFyYW0ge05vZGV9IGN1cnJlbnQgLSBUaGUgY3VycmVudCBub2RlIGluIHRoZSByZWN1cnNpb24uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gVGhlIHZhbHVlIHRvIGJlIGRlbGV0ZWQuXG4gICAgICogQHJldHVybnMge05vZGV9IFRoZSB1cGRhdGVkIG5vZGUgYWZ0ZXIgZGVsZXRpb24uXG4gICAgICovXG4gICAgZGVsZXRlUmVjdXJzaXZlKGN1cnJlbnQsIHZhbHVlKSB7XG4gICAgICAgIGlmIChjdXJyZW50ID09PSBudWxsKSByZXR1cm4gbnVsbDsgLy8gQmFzZSBjYXNlOiB2YWx1ZSBub3QgZm91bmRcbiAgICAgICAgaWYgKHZhbHVlIDwgY3VycmVudC5kYXRhKSB7XG4gICAgICAgICAgICBjdXJyZW50LmxlZnQgPSB0aGlzLmRlbGV0ZVJlY3Vyc2l2ZShjdXJyZW50LmxlZnQsIHZhbHVlKTsgLy8gVmFsdWUgbWlnaHQgYmUgaW4gdGhlIGxlZnQgc3VidHJlZVxuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID4gY3VycmVudC5kYXRhKSB7XG4gICAgICAgICAgICBjdXJyZW50LnJpZ2h0ID0gdGhpcy5kZWxldGVSZWN1cnNpdmUoY3VycmVudC5yaWdodCwgdmFsdWUpOyAvLyBWYWx1ZSBtaWdodCBiZSBpbiB0aGUgcmlnaHQgc3VidHJlZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gRm91bmQgdGhlIG5vZGUgdG8gZGVsZXRlXG4gICAgICAgICAgICBpZiAoY3VycmVudC5sZWZ0ID09PSBudWxsICYmIGN1cnJlbnQucmlnaHQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDsgLy8gTm8gY2hpbGRyZW4sIHNpbXBseSByZW1vdmUgaXRcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudC5sZWZ0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQucmlnaHQ7IC8vIE9ubHkgYSByaWdodCBjaGlsZCwgcmVwbGFjZSB0aGUgbm9kZSB3aXRoIGl0XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnQucmlnaHQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudC5sZWZ0OyAvLyBPbmx5IGEgbGVmdCBjaGlsZCwgcmVwbGFjZSB0aGUgbm9kZSB3aXRoIGl0XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE5vZGUgaGFzIHR3byBjaGlsZHJlbiwgZmluZCB0aGUgaW5vcmRlciBzdWNjZXNzb3JcbiAgICAgICAgICAgICAgICBsZXQgc3VjY2Vzc29yID0gdGhpcy5maW5kTWluKGN1cnJlbnQucmlnaHQpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnQuZGF0YSA9IHN1Y2Nlc3Nvci5kYXRhOyAvLyBSZXBsYWNlIHRoZSBkYXRhIHdpdGggc3VjY2Vzc29yJ3MgZGF0YVxuICAgICAgICAgICAgICAgIGN1cnJlbnQucmlnaHQgPSB0aGlzLmRlbGV0ZVJlY3Vyc2l2ZShcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudC5yaWdodCxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc29yLmRhdGFcbiAgICAgICAgICAgICAgICApOyAvLyBSZW1vdmUgdGhlIHN1Y2Nlc3NvclxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjdXJyZW50OyAvLyBSZXR1cm4gdGhlIGN1cnJlbnQgbm9kZSB0byBsaW5rIGJhY2sgcHJvcGVybHlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyB0aGUgbm9kZSB3aXRoIHRoZSBtaW5pbXVtIHZhbHVlIGluIHRoZSBzdWJ0cmVlIHN0YXJ0aW5nIGZyb20gdGhlIGdpdmVuIG5vZGUuXG4gICAgICogQHBhcmFtIHtOb2RlfSBjdXJyZW50IC0gVGhlIGN1cnJlbnQgbm9kZSBmcm9tIHdoaWNoIHRvIGZpbmQgdGhlIG1pbmltdW0uXG4gICAgICogQHJldHVybnMge05vZGV9IFRoZSBub2RlIHdpdGggdGhlIG1pbmltdW0gdmFsdWUuXG4gICAgICovXG4gICAgZmluZE1pbihjdXJyZW50KSB7XG4gICAgICAgIHdoaWxlIChjdXJyZW50LmxlZnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LmxlZnQ7IC8vIEtlZXAgZ29pbmcgbGVmdCB0byBmaW5kIHRoZSBtaW5pbXVtIHZhbHVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGN1cnJlbnQ7IC8vIFJldHVybiB0aGUgbm9kZSB3aXRoIHRoZSBtaW5pbXVtIHZhbHVlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VhcmNoZXMgZm9yIGEgbm9kZSB3aXRoIHRoZSBnaXZlbiB2YWx1ZSwgc3RhcnRpbmcgZnJvbSB0aGUgcm9vdCBvZiB0aGUgdHJlZSBvciBmcm9tIGEgc3BlY2lmaWVkIG5vZGUuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHBhcmFtIHtOb2RlfSBjdXJyZW50IC0gVGhlIGN1cnJlbnQgbm9kZSBpbiB0aGUgcmVjdXJzaW9uLCBkZWZhdWx0cyB0byB0aGUgcm9vdCBvZiB0aGUgdHJlZS5cbiAgICAgKiBAcmV0dXJucyB7Tm9kZXxudWxsfSBUaGUgZm91bmQgbm9kZSwgb3IgbnVsbCBpZiB0aGUgbm9kZSBkb2VzIG5vdCBleGlzdC5cbiAgICAgKi9cbiAgICBmaW5kKHZhbHVlLCBjdXJyZW50ID0gdGhpcy5yb290KSB7XG4gICAgICAgIGlmIChjdXJyZW50ID09PSBudWxsKSByZXR1cm4gbnVsbDsgLy8gQmFzZSBjYXNlOiBubyBub2RlIHRvIHNlYXJjaFxuICAgICAgICBpZiAoY3VycmVudC5kYXRhID09PSB2YWx1ZSkgcmV0dXJuIGN1cnJlbnQ7IC8vIE5vZGUgZm91bmQsIHJldHVybiBpdFxuICAgICAgICBpZiAodmFsdWUgPCBjdXJyZW50LmRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbmQodmFsdWUsIGN1cnJlbnQubGVmdCk7IC8vIFNlYXJjaCBsZWZ0IHN1YnRyZWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5maW5kKHZhbHVlLCBjdXJyZW50LnJpZ2h0KTsgLy8gU2VhcmNoIHJpZ2h0IHN1YnRyZWVcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhIGxldmVsIG9yZGVyIHRyYXZlcnNhbCBvZiB0aGUgdHJlZS4gSWYgYSBjYWxsYmFjayBpcyBwcm92aWRlZCwgYXBwbGllcyBpdCB0byBlYWNoIG5vZGUsXG4gICAgICogb3RoZXJ3aXNlIGNvbGxlY3RzIGFuZCByZXR1cm5zIGFuIGFycmF5IG9mIG5vZGUgdmFsdWVzLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gT3B0aW9uYWwgZnVuY3Rpb24gdG8gYXBwbHkgdG8gZWFjaCBub2RlLlxuICAgICAqIEByZXR1cm5zIHtBcnJheXxudWxsfSBBbiBhcnJheSBvZiBub2RlIHZhbHVlcyBpZiBubyBjYWxsYmFjayBpcyBwcm92aWRlZCwgb3IgbnVsbCBpZiBhIGNhbGxiYWNrIGlzIHVzZWQuXG4gICAgICovXG4gICAgbGV2ZWxPcmRlcihjYWxsYmFjaykge1xuICAgICAgICBsZXQgcm9vdCA9IHRoaXMucm9vdDsgLy8gU3RhcnQgZnJvbSB0aGUgcm9vdFxuICAgICAgICBpZiAocm9vdCA9PT0gbnVsbCkgcmV0dXJuIFtdOyAvLyBSZXR1cm4gZW1wdHkgYXJyYXkgaWYgdHJlZSBpcyBlbXB0eVxuICAgICAgICBjb25zdCBxdWV1ZSA9IFtyb290XTsgLy8gSW5pdGlhbGl6ZSBxdWV1ZSB3aXRoIHJvb3Qgbm9kZSBmb3IgQkZTXG4gICAgICAgIGNvbnN0IGJyZWFkdGhGaXJzdCA9IFtdOyAvLyBDb2xsZWN0cyBub2RlIHZhbHVlcyBpZiBubyBjYWxsYmFjayBwcm92aWRlZFxuICAgICAgICB3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IGN1cnJlbnQgPSBxdWV1ZS5zaGlmdCgpOyAvLyBQcm9jZXNzIG5vZGVzIG9uZSBieSBvbmVcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGN1cnJlbnQpOyAvLyBBcHBseSBjYWxsYmFjayBpZiBwcm92aWRlZFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBicmVhZHRoRmlyc3QucHVzaChjdXJyZW50LmRhdGEpOyAvLyBDb2xsZWN0IGRhdGEgaWYgbm8gY2FsbGJhY2tcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjdXJyZW50LmxlZnQgIT09IG51bGwpIHF1ZXVlLnB1c2goY3VycmVudC5sZWZ0KTsgLy8gQWRkIGxlZnQgY2hpbGQgdG8gcXVldWVcbiAgICAgICAgICAgIGlmIChjdXJyZW50LnJpZ2h0ICE9PSBudWxsKSBxdWV1ZS5wdXNoKGN1cnJlbnQucmlnaHQpOyAvLyBBZGQgcmlnaHQgY2hpbGQgdG8gcXVldWVcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNhbGxiYWNrKSByZXR1cm4gYnJlYWR0aEZpcnN0OyAvLyBSZXR1cm4gY29sbGVjdGVkIGRhdGEgaWYgbm8gY2FsbGJhY2sgdXNlZFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGFuIGlub3JkZXIgdHJhdmVyc2FsIG9mIHRoZSB0cmVlLiBJZiBhIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBhcHBsaWVzIGl0IHRvIGVhY2ggbm9kZSxcbiAgICAgKiBvdGhlcndpc2UgY29sbGVjdHMgYW5kIHJldHVybnMgYW4gYXJyYXkgb2Ygbm9kZSB2YWx1ZXMuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBPcHRpb25hbCBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoIG5vZGUuXG4gICAgICogQHJldHVybnMge0FycmF5fG51bGx9IEFuIGFycmF5IG9mIG5vZGUgdmFsdWVzIGlmIG5vIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBvciBudWxsIGlmIGEgY2FsbGJhY2sgaXMgdXNlZC5cbiAgICAgKi9cbiAgICBpbk9yZGVyKGNhbGxiYWNrKSB7XG4gICAgICAgIGNvbnN0IGluT3JkZXJMaXN0ID0gW107IC8vIExpc3QgdG8gY29sbGVjdCBub2RlIHZhbHVlc1xuICAgICAgICB0aGlzLmluT3JkZXJSZWN1cnNpdmUodGhpcy5yb290LCBpbk9yZGVyTGlzdCwgY2FsbGJhY2spOyAvLyBTdGFydCByZWN1cnNpdmUgdHJhdmVyc2FsIGZyb20gcm9vdFxuICAgICAgICBpZiAoIWNhbGxiYWNrKSByZXR1cm4gaW5PcmRlckxpc3Q7IC8vIFJldHVybiBsaXN0IGlmIG5vIGNhbGxiYWNrIHByb3ZpZGVkXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGVscGVyIGZ1bmN0aW9uIHRvIHBlcmZvcm0gYW4gaW5vcmRlciB0cmF2ZXJzYWwgb2YgdGhlIHRyZWUgcmVjdXJzaXZlbHkuXG4gICAgICogQHBhcmFtIHtOb2RlfSBjdXJyZW50IC0gVGhlIGN1cnJlbnQgbm9kZSBiZWluZyBwcm9jZXNzZWQuXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCAtIEFycmF5IHRvIGNvbGxlY3Qgbm9kZSB2YWx1ZXMuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBPcHRpb25hbCBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoIG5vZGUuXG4gICAgICovXG4gICAgaW5PcmRlclJlY3Vyc2l2ZShjdXJyZW50LCBsaXN0LCBjYWxsYmFjaykge1xuICAgICAgICBpZiAoY3VycmVudCA9PT0gbnVsbCkgcmV0dXJuOyAvLyBCYXNlIGNhc2U6IGVuZCBvZiBicmFuY2hcbiAgICAgICAgdGhpcy5pbk9yZGVyUmVjdXJzaXZlKGN1cnJlbnQubGVmdCwgbGlzdCwgY2FsbGJhY2spOyAvLyBUcmF2ZXJzZSBsZWZ0IHN1YnRyZWVcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhjdXJyZW50KTsgLy8gQXBwbHkgY2FsbGJhY2sgdG8gY3VycmVudCBub2RlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsaXN0LnB1c2goY3VycmVudC5kYXRhKTsgLy8gQ29sbGVjdCBjdXJyZW50IG5vZGUncyBkYXRhXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbk9yZGVyUmVjdXJzaXZlKGN1cnJlbnQucmlnaHQsIGxpc3QsIGNhbGxiYWNrKTsgLy8gVHJhdmVyc2UgcmlnaHQgc3VidHJlZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGEgcHJlb3JkZXIgdHJhdmVyc2FsIG9mIHRoZSB0cmVlLiBJZiBhIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBhcHBsaWVzIGl0IHRvIGVhY2ggbm9kZSxcbiAgICAgKiBvdGhlcndpc2UgY29sbGVjdHMgYW5kIHJldHVybnMgYW4gYXJyYXkgb2Ygbm9kZSB2YWx1ZXMuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBPcHRpb25hbCBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoIG5vZGUuXG4gICAgICogQHJldHVybnMge0FycmF5fG51bGx9IEFuIGFycmF5IG9mIG5vZGUgdmFsdWVzIGlmIG5vIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBvciBudWxsIGlmIGEgY2FsbGJhY2sgaXMgdXNlZC5cbiAgICAgKi9cbiAgICBwcmVPcmRlcihjYWxsYmFjaykge1xuICAgICAgICBjb25zdCBwcmVPcmRlckxpc3QgPSBbXTsgLy8gTGlzdCB0byBjb2xsZWN0IG5vZGUgdmFsdWVzXG4gICAgICAgIHRoaXMucHJlT3JkZXJSZWN1cnNpdmUodGhpcy5yb290LCBwcmVPcmRlckxpc3QsIGNhbGxiYWNrKTsgLy8gU3RhcnQgcmVjdXJzaXZlIHRyYXZlcnNhbCBmcm9tIHJvb3RcbiAgICAgICAgaWYgKCFjYWxsYmFjaykgcmV0dXJuIHByZU9yZGVyTGlzdDsgLy8gUmV0dXJuIGxpc3QgaWYgbm8gY2FsbGJhY2sgcHJvdmlkZWRcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIZWxwZXIgZnVuY3Rpb24gdG8gcGVyZm9ybSBhIHByZW9yZGVyIHRyYXZlcnNhbCBvZiB0aGUgdHJlZSByZWN1cnNpdmVseS5cbiAgICAgKiBAcGFyYW0ge05vZGV9IGN1cnJlbnQgLSBUaGUgY3VycmVudCBub2RlIGJlaW5nIHByb2Nlc3NlZC5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IC0gQXJyYXkgdG8gY29sbGVjdCBub2RlIHZhbHVlcy5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIE9wdGlvbmFsIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2ggbm9kZS5cbiAgICAgKi9cbiAgICBwcmVPcmRlclJlY3Vyc2l2ZShjdXJyZW50LCBsaXN0LCBjYWxsYmFjaykge1xuICAgICAgICBpZiAoY3VycmVudCA9PT0gbnVsbCkgcmV0dXJuOyAvLyBCYXNlIGNhc2U6IGVuZCBvZiBicmFuY2hcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhjdXJyZW50KTsgLy8gQXBwbHkgY2FsbGJhY2sgdG8gY3VycmVudCBub2RlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsaXN0LnB1c2goY3VycmVudC5kYXRhKTsgLy8gQ29sbGVjdCBjdXJyZW50IG5vZGUncyBkYXRhXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcmVPcmRlclJlY3Vyc2l2ZShjdXJyZW50LmxlZnQsIGxpc3QsIGNhbGxiYWNrKTsgLy8gVHJhdmVyc2UgbGVmdCBzdWJ0cmVlXG4gICAgICAgIHRoaXMucHJlT3JkZXJSZWN1cnNpdmUoY3VycmVudC5yaWdodCwgbGlzdCwgY2FsbGJhY2spOyAvLyBUcmF2ZXJzZSByaWdodCBzdWJ0cmVlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYSBwb3N0b3JkZXIgdHJhdmVyc2FsIG9mIHRoZSB0cmVlLiBJZiBhIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBhcHBsaWVzIGl0IHRvIGVhY2ggbm9kZSxcbiAgICAgKiBvdGhlcndpc2UgY29sbGVjdHMgYW5kIHJldHVybnMgYW4gYXJyYXkgb2Ygbm9kZSB2YWx1ZXMuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBPcHRpb25hbCBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoIG5vZGUuXG4gICAgICogQHBhcmFtIHtOb2RlfSBjdXJyZW50IC0gVGhlIGN1cnJlbnQgbm9kZSBiZWluZyBwcm9jZXNzZWQsIGRlZmF1bHRzIHRvIHRoZSByb290IG9mIHRoZSB0cmVlLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgLSBBcnJheSB0byBjb2xsZWN0IG5vZGUgdmFsdWVzLCBpbml0aWFsbHkgZW1wdHkuXG4gICAgICogQHJldHVybnMge0FycmF5fG51bGx9IEFuIGFycmF5IG9mIG5vZGUgdmFsdWVzIGlmIG5vIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBvciBudWxsIGlmIGEgY2FsbGJhY2sgaXMgdXNlZC5cbiAgICAgKi9cbiAgICBwb3N0T3JkZXIoY2FsbGJhY2ssIGN1cnJlbnQgPSB0aGlzLnJvb3QsIGxpc3QgPSBbXSkge1xuICAgICAgICBpZiAoY3VycmVudCA9PT0gbnVsbCkgcmV0dXJuOyAvLyBCYXNlIGNhc2U6IGVuZCBvZiBicmFuY2hcbiAgICAgICAgdGhpcy5wb3N0T3JkZXIoY2FsbGJhY2ssIGN1cnJlbnQubGVmdCwgbGlzdCk7IC8vIFRyYXZlcnNlIGxlZnQgc3VidHJlZVxuICAgICAgICB0aGlzLnBvc3RPcmRlcihjYWxsYmFjaywgY3VycmVudC5yaWdodCwgbGlzdCk7IC8vIFRyYXZlcnNlIHJpZ2h0IHN1YnRyZWVcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhjdXJyZW50KTsgLy8gQXBwbHkgY2FsbGJhY2sgdG8gY3VycmVudCBub2RlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsaXN0LnB1c2goY3VycmVudC5kYXRhKTsgLy8gQ29sbGVjdCBjdXJyZW50IG5vZGUncyBkYXRhXG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjYWxsYmFjayAmJiBjdXJyZW50ID09PSB0aGlzLnJvb3QpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0OyAvLyBSZXR1cm4gY29sbGVjdGVkIGRhdGEgb25seSBvbiB0aGUgaW5pdGlhbCBjYWxsIGlmIG5vIGNhbGxiYWNrIGlzIHByb3ZpZGVkXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBoZWlnaHQgb2YgdGhlIHRyZWUgZnJvbSBhIHNwZWNpZmljIG5vZGUuXG4gICAgICogSGVpZ2h0IGlzIGRlZmluZWQgYXMgdGhlIG51bWJlciBvZiBlZGdlcyBvbiB0aGUgbG9uZ2VzdCBwYXRoIGZyb20gdGhlIG5vZGUgdG8gYSBsZWFmLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG5vZGUgLSBUaGUgZGF0YSBvZiB0aGUgbm9kZSBmcm9tIHdoaWNoIHRvIGNhbGN1bGF0ZSB0aGUgaGVpZ2h0LlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ8bnVsbH0gVGhlIGhlaWdodCBmcm9tIHRoZSBub2RlIHRvIHRoZSBkZWVwZXN0IGxlYWYgb3IgbnVsbCBpZiB0aGUgbm9kZSBkb2Vzbid0IGV4aXN0LlxuICAgICAqL1xuICAgIGhlaWdodChub2RlKSB7XG4gICAgICAgIGNvbnN0IGZvdW5kTm9kZSA9IHRoaXMuZmluZChub2RlKTsgLy8gQXR0ZW1wdCB0byBsb2NhdGUgdGhlIG5vZGUgaW4gdGhlIHRyZWVcbiAgICAgICAgaWYgKGZvdW5kTm9kZSkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIG5vZGUgaXMgZm91bmQsIGNhbGN1bGF0ZSB0aGUgaGVpZ2h0IGZyb20gdGhpcyBub2RlXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHRSZWN1cnNpdmUoZm91bmROb2RlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDsgLy8gUmV0dXJuIG51bGwgaWYgdGhlIG5vZGUgaXMgbm90IGZvdW5kIGluIHRoZSB0cmVlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGVscGVyIGZ1bmN0aW9uIHRvIHJlY3Vyc2l2ZWx5IGNhbGN1bGF0ZSB0aGUgaGVpZ2h0IG9mIHRoZSB0cmVlIGZyb20gdGhlIGdpdmVuIG5vZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge05vZGV8bnVsbH0gbm9kZSAtIFRoZSBub2RlIGZyb20gd2hpY2ggdG8gY2FsY3VsYXRlIHRoZSBoZWlnaHQuXG4gICAgICogQHJldHVybnMge251bWJlcn0gVGhlIGhlaWdodCBvZiB0aGUgdHJlZSBmcm9tIHRoZSBnaXZlbiBub2RlLlxuICAgICAqL1xuICAgIGhlaWdodFJlY3Vyc2l2ZShub2RlKSB7XG4gICAgICAgIGlmIChub2RlID09PSBudWxsKSByZXR1cm4gLTE7IC8vIEJhc2UgY2FzZTogcmV0dXJuIC0xIGZvciBudWxsIHRvIGFjY291bnQgZm9yIHRoZSBlZGdlIGNvdW50IGNvcnJlY3RseVxuICAgICAgICBsZXQgbGVmdCA9IHRoaXMuaGVpZ2h0UmVjdXJzaXZlKG5vZGUubGVmdCk7IC8vIFJlY3Vyc2l2ZWx5IGNhbGN1bGF0ZSBoZWlnaHQgb2YgdGhlIGxlZnQgc3VidHJlZVxuICAgICAgICBsZXQgcmlnaHQgPSB0aGlzLmhlaWdodFJlY3Vyc2l2ZShub2RlLnJpZ2h0KTsgLy8gUmVjdXJzaXZlbHkgY2FsY3VsYXRlIGhlaWdodCBvZiB0aGUgcmlnaHQgc3VidHJlZVxuICAgICAgICByZXR1cm4gTWF0aC5tYXgobGVmdCwgcmlnaHQpICsgMTsgLy8gUmV0dXJuIHRoZSBncmVhdGVyIGhlaWdodCBwbHVzIG9uZSBmb3IgdGhlIGN1cnJlbnQgbm9kZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgdGhlIGRlcHRoIG9mIGEgc3BlY2lmaWVkIG5vZGUgZnJvbSB0aGUgcm9vdCBvZiB0aGUgdHJlZSwgb3IgZnJvbSBhbm90aGVyIHNwZWNpZmllZCBub2RlLlxuICAgICAqIERlcHRoIGlzIGRlZmluZWQgYXMgdGhlIG51bWJlciBvZiBlZGdlcyBmcm9tIHRoZSBzdGFydGluZyBub2RlIHRvIHRoZSB0YXJnZXQgbm9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0YXJnZXQgLSBUaGUgZGF0YSBvZiB0aGUgbm9kZSBmb3Igd2hpY2ggdG8gY2FsY3VsYXRlIHRoZSBkZXB0aC5cbiAgICAgKiBAcGFyYW0ge05vZGV9IGN1cnJlbnQgLSBUaGUgY3VycmVudCBub2RlIGluIHRoZSB0cmVlIGR1cmluZyB0aGUgcmVjdXJzaXZlIGNhbGwsIGRlZmF1bHRzIHRvIHRoZSByb290LlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBkZXB0aCBvZiB0aGUgdGFyZ2V0IG5vZGUsIG9yIEluZmluaXR5IGlmIHRoZSBub2RlIGRvZXMgbm90IGV4aXN0LlxuICAgICAqL1xuICAgIGRlcHRoKHRhcmdldCwgY3VycmVudCA9IHRoaXMucm9vdCkge1xuICAgICAgICBpZiAoY3VycmVudCA9PT0gbnVsbCkgcmV0dXJuIEluZmluaXR5OyAvLyBCYXNlIGNhc2U6IGlmIGN1cnJlbnQgaXMgbnVsbCwgdGFyZ2V0IGlzIG5vdCBpbiB0aGlzIHN1YnRyZWVcbiAgICAgICAgaWYgKHRhcmdldCA9PT0gY3VycmVudC5kYXRhKSByZXR1cm4gMDsgLy8gQmFzZSBjYXNlOiBpZiB0aGUgdGFyZ2V0IGlzIGZvdW5kLCBkZXB0aCBpcyAwXG5cbiAgICAgICAgbGV0IGxlZnREZXB0aCA9IHRoaXMuZGVwdGgodGFyZ2V0LCBjdXJyZW50LmxlZnQpOyAvLyBSZWN1cnNpdmVseSBmaW5kIGRlcHRoIGluIHRoZSBsZWZ0IHN1YnRyZWVcbiAgICAgICAgbGV0IHJpZ2h0RGVwdGggPSB0aGlzLmRlcHRoKHRhcmdldCwgY3VycmVudC5yaWdodCk7IC8vIFJlY3Vyc2l2ZWx5IGZpbmQgZGVwdGggaW4gdGhlIHJpZ2h0IHN1YnRyZWVcblxuICAgICAgICBpZiAobGVmdERlcHRoID09PSBJbmZpbml0eSAmJiByaWdodERlcHRoID09PSBJbmZpbml0eSkge1xuICAgICAgICAgICAgcmV0dXJuIEluZmluaXR5OyAvLyBOb2RlIG5vdCBmb3VuZCBpbiBlaXRoZXIgc3VidHJlZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWluKGxlZnREZXB0aCwgcmlnaHREZXB0aCkgKyAxOyAvLyBSZXR1cm4gdGhlIG1pbmltdW0gZGVwdGggZm91bmQgcGx1cyBvbmUgZm9yIHRoZSBjdXJyZW50IG5vZGVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgaWYgdGhlIGJpbmFyeSBzZWFyY2ggdHJlZSBpcyBiYWxhbmNlZC5cbiAgICAgKiBBIGJpbmFyeSB0cmVlIGlzIGNvbnNpZGVyZWQgYmFsYW5jZWQgaWYsIGZvciBldmVyeSBub2RlLCB0aGUgaGVpZ2h0IGRpZmZlcmVuY2VcbiAgICAgKiBiZXR3ZWVuIGl0cyBsZWZ0IGFuZCByaWdodCBzdWJ0cmVlIGlzIG5vIG1vcmUgdGhhbiBvbmUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdHJlZSBpcyBiYWxhbmNlZCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIGlzQmFsYW5jZWQoKSB7XG4gICAgICAgIGxldCBjdXJyZW50ID0gdGhpcy5yb290OyAvLyBTdGFydCBjaGVja2luZyBiYWxhbmNlIGZyb20gdGhlIHJvb3Qgb2YgdGhlIHRyZWVcbiAgICAgICAgLy8gQ2FsbHMgdGhlIHJlY3Vyc2l2ZSBmdW5jdGlvbiB0byBjaGVjayBiYWxhbmNlIGZyb20gdGhlIHJvb3RcbiAgICAgICAgLy8gQ29udmVydHMgdGhlIHJlc3VsdCB0byBib29sZWFuIChmYWxzZSBpZiB1bmJhbGFuY2VkLCB0cnVlIGlmIGJhbGFuY2VkKVxuICAgICAgICByZXR1cm4gdGhpcy5jaGVja0JhbGFuY2UoY3VycmVudCkgIT09IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlY3Vyc2l2ZWx5IGNoZWNrcyBpZiB0aGUgdHJlZSBpcyBiYWxhbmNlZCBieSBjb21wYXJpbmcgdGhlIGhlaWdodHMgb2YgdGhlIGxlZnQgYW5kIHJpZ2h0IHN1YnRyZWVzXG4gICAgICogZm9yIGVhY2ggbm9kZS4gVGhlIGZ1bmN0aW9uIGFsc28gY2FsY3VsYXRlcyB0aGUgaGVpZ2h0IG9mIHRoZSB0cmVlIGZyb20gdGhlIGN1cnJlbnQgbm9kZSBkb3dud2FyZHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge05vZGV9IG5vZGUgLSBUaGUgY3VycmVudCBub2RlIGZyb20gd2hpY2ggdG8gY2hlY2sgdGhlIGJhbGFuY2UuXG4gICAgICogQHJldHVybnMge251bWJlcnxib29sZWFufSBSZXR1cm5zIHRoZSBoZWlnaHQgb2YgdGhlIHN1YnRyZWUgcm9vdGVkIGF0ICdub2RlJyBpZiBpdCBpcyBiYWxhbmNlZCxcbiAgICAgKiBvciBmYWxzZSBpZiBpdCBpcyB1bmJhbGFuY2VkLiBJZiB0aGUgbm9kZSBpcyBudWxsLCBpdCByZXR1cm5zIC0xLCBpbmRpY2F0aW5nIG5vIGhlaWdodC5cbiAgICAgKi9cbiAgICBjaGVja0JhbGFuY2Uobm9kZSkge1xuICAgICAgICBpZiAobm9kZSA9PT0gbnVsbCkgcmV0dXJuIC0xOyAvLyBCYXNlIGNhc2U6IEEgbnVsbCBub2RlIGhhcyBhIGhlaWdodCBvZiAtMVxuXG4gICAgICAgIC8vIFJlY3Vyc2l2ZWx5IGNhbGN1bGF0ZSB0aGUgaGVpZ2h0IG9mIHRoZSBsZWZ0IHN1YnRyZWVcbiAgICAgICAgLy8gSWYgbGVmdCBzdWJ0cmVlIGlzIHVuYmFsYW5jZWQsIHJldHVybiBmYWxzZSBpbW1lZGlhdGVseVxuICAgICAgICBsZXQgbGVmdEhlaWdodCA9IHRoaXMuY2hlY2tCYWxhbmNlKG5vZGUubGVmdCk7XG4gICAgICAgIGlmIChsZWZ0SGVpZ2h0ID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIC8vIFJlY3Vyc2l2ZWx5IGNhbGN1bGF0ZSB0aGUgaGVpZ2h0IG9mIHRoZSByaWdodCBzdWJ0cmVlXG4gICAgICAgIC8vIElmIHJpZ2h0IHN1YnRyZWUgaXMgdW5iYWxhbmNlZCwgcmV0dXJuIGZhbHNlIGltbWVkaWF0ZWx5XG4gICAgICAgIGxldCByaWdodEhlaWdodCA9IHRoaXMuY2hlY2tCYWxhbmNlKG5vZGUucmlnaHQpO1xuICAgICAgICBpZiAocmlnaHRIZWlnaHQgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGN1cnJlbnQgbm9kZSBpcyBiYWxhbmNlZCBieSBjb21wYXJpbmcgdGhlIGhlaWdodHMgb2YgaXRzIHN1YnRyZWVzXG4gICAgICAgIGlmIChNYXRoLmFicyhsZWZ0SGVpZ2h0IC0gcmlnaHRIZWlnaHQpID4gMSkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIGhlaWdodCBkaWZmZXJlbmNlIGlzIGdyZWF0ZXIgdGhhbiAxLCB0cmVlIGlzIHVuYmFsYW5jZWQgYXQgdGhpcyBub2RlXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJZiBiYWxhbmNlZCwgcmV0dXJuIHRoZSBoZWlnaHQgb2YgdGhlIHRyZWUgZnJvbSB0aGlzIG5vZGVcbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1heChsZWZ0SGVpZ2h0LCByaWdodEhlaWdodCkgKyAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmViYWxhbmNlcyB0aGUgYmluYXJ5IHNlYXJjaCB0cmVlIGJ5IHJlYnVpbGRpbmcgaXQgZnJvbSBhbiBpbm9yZGVyIHRyYXZlcnNhbCB0byBlbnN1cmUgb3B0aW1hbCBiYWxhbmNlLlxuICAgICAqL1xuICAgIHJlYmFsYW5jZSgpIHtcbiAgICAgICAgLy8gQ29sbGVjdCBub2RlIHZhbHVlcyBpbiBzb3J0ZWQgb3JkZXIgdmlhIGlub3JkZXIgdHJhdmVyc2FsXG4gICAgICAgIGNvbnN0IGFyciA9IHRoaXMuaW5PcmRlcigpO1xuXG4gICAgICAgIC8vIFJlYnVpbGQgdGhlIHRyZWUgZnJvbSB0aGUgc29ydGVkIGFycmF5IHRvIGVuc3VyZSBpdCBpcyBiYWxhbmNlZFxuICAgICAgICB0aGlzLnJvb3QgPSB0aGlzLmJ1aWxkVHJlZShhcnIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgdXRpbGl0eSBmdW5jdGlvbiB0byB2aXN1YWxseSBwcmludCB0aGUgc3RydWN0dXJlIG9mIHRoZSB0cmVlLiBEaXNwbGF5cyB0aGUgdHJlZVxuICAgICAqIHdpdGggZWFjaCBub2RlIGluIGl0cyByZWxhdGl2ZSBwb3NpdGlvbiwgYWlkaW5nIGluIHVuZGVyc3RhbmRpbmcgdGhlIHRyZWUgbGF5b3V0LlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gbm9kZSAtIFRoZSBzdGFydGluZyBub2RlIHRvIHByaW50IGZyb20uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeCAtIFRoZSBwcmVmaXggdXNlZCB0byBpbmRpY2F0ZSBsaW5lIHN0YXJ0cyBpbiB0aGUgdHJlZSBwcmludG91dC5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzTGVmdCAtIEluZGljYXRlcyBpZiB0aGUgY3VycmVudCBub2RlIGlzIGEgbGVmdCBjaGlsZC5cbiAgICAgKi9cbiAgICBwcmV0dHlQcmludChub2RlLCBwcmVmaXggPSBcIlwiLCBpc0xlZnQgPSB0cnVlKSB7XG4gICAgICAgIGlmIChub2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUucmlnaHQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMucHJldHR5UHJpbnQoXG4gICAgICAgICAgICAgICAgbm9kZS5yaWdodCxcbiAgICAgICAgICAgICAgICBgJHtwcmVmaXh9JHtpc0xlZnQgPyBcIuKUgiAgIFwiIDogXCIgICAgXCJ9YCxcbiAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhgJHtwcmVmaXh9JHtpc0xlZnQgPyBcIuKUlOKUgOKUgCBcIiA6IFwi4pSM4pSA4pSAIFwifSR7bm9kZS5kYXRhfWApO1xuICAgICAgICBpZiAobm9kZS5sZWZ0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnByZXR0eVByaW50KFxuICAgICAgICAgICAgICAgIG5vZGUubGVmdCxcbiAgICAgICAgICAgICAgICBgJHtwcmVmaXh9JHtpc0xlZnQgPyBcIiAgICBcIiA6IFwi4pSCICAgXCJ9YCxcbiAgICAgICAgICAgICAgICB0cnVlXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5jb25zdCBnZW5lcmF0ZVJhbmRvbU51bWJlcnMgPSAoY291bnQgPSAyMCwgbWF4ID0gMTAwKSA9PlxuICAgIEFycmF5LmZyb20oeyBsZW5ndGg6IGNvdW50IH0sICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCkpO1xuXG5jb25zdCB0cmVlID0gbmV3IFRyZWUoKTtcbnRyZWUuYnVpbGRUcmVlKGdlbmVyYXRlUmFuZG9tTnVtYmVycygpKTtcbmNvbnNvbGUubG9nKFwiT3JpZ2luYWwgVHJlZTpcIik7XG50cmVlLnByZXR0eVByaW50KHRyZWUucm9vdCk7XG5jb25zb2xlLmxvZyhgSXMgdHJlZSBiYWxhbmNlZDogJHt0cmVlLmlzQmFsYW5jZWQoKX1gKTtcbi8vIGNvbnNvbGUubG9nKHRyZWUubGV2ZWxPcmRlcigpKTtcbi8vIGNvbnNvbGUubG9nKHRyZWUuaW5PcmRlcigpKTtcbi8vIGNvbnNvbGUubG9nKHRyZWUucHJlT3JkZXIoKSk7XG4vLyBjb25zb2xlLmxvZyh0cmVlLnBvc3RPcmRlcigpKTtcbnRyZWUuaW5zZXJ0KDc2KTtcbnRyZWUuaW5zZXJ0KDM0KTtcbnRyZWUuaW5zZXJ0KDM1KTtcbnRyZWUuaW5zZXJ0KDM2KTtcbnRyZWUuaW5zZXJ0KDM3KTtcbnRyZWUuaW5zZXJ0KDgzKTtcbnRyZWUuaW5zZXJ0KDIzKTtcbnRyZWUuaW5zZXJ0KDcpO1xudHJlZS5pbnNlcnQoOTIpO1xudHJlZS5pbnNlcnQoNTYpO1xudHJlZS5pbnNlcnQoMTUpO1xudHJlZS5pbnNlcnQoNjQpO1xudHJlZS5pbnNlcnQoNCk7XG50cmVlLmluc2VydCg4OSk7XG50cmVlLmluc2VydCg1Nyk7XG50cmVlLmluc2VydCg3Myk7XG50cmVlLmluc2VydCgzOCk7XG5jb25zb2xlLmxvZyhcIk1vZGlmaWVkIFRyZWU6XCIpO1xudHJlZS5wcmV0dHlQcmludCh0cmVlLnJvb3QpO1xuY29uc29sZS5sb2coYElzIHRyZWUgYmFsYW5jZWQ6ICR7dHJlZS5pc0JhbGFuY2VkKCl9YCk7XG50cmVlLnJlYmFsYW5jZSgpO1xuY29uc29sZS5sb2coXCJSZWJhbGFuY2VkIFRyZWU6XCIpXG50cmVlLnByZXR0eVByaW50KHRyZWUucm9vdCk7XG5jb25zb2xlLmxvZyhgSXMgdHJlZSBiYWxhbmNlZDogJHt0cmVlLmlzQmFsYW5jZWQoKX1gKTsiLCIvLyBUaGlzIGZ1bmN0aW9uIHBlcmZvcm1zIHRoZSBtZXJnZSBzb3J0IGFsZ29yaXRobSBvbiBhbiBhcnJheS5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZVNvcnQoYXJyKSB7XG4gICAgLy8gQmFzZSBjYXNlOiBpZiB0aGUgYXJyYXkgaGFzIDEgb3Igbm8gZWxlbWVudHMsIGl0J3MgYWxyZWFkeSBzb3J0ZWQuXG4gICAgaWYgKGFyci5sZW5ndGggPD0gMSkge1xuICAgICAgICByZXR1cm4gYXJyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFJlY3Vyc2l2ZSBjYXNlOiBzcGxpdCB0aGUgYXJyYXkgaW50byBoYWx2ZXMuXG4gICAgICAgIGxldCBtaWRkbGVJbmRleCA9IE1hdGguZmxvb3IoYXJyLmxlbmd0aCAvIDIpO1xuICAgICAgICBsZXQgZmlyc3RIYWxmID0gYXJyLnNsaWNlKDAsIG1pZGRsZUluZGV4KTtcbiAgICAgICAgbGV0IHNlY29uZEhhbGYgPSBhcnIuc2xpY2UobWlkZGxlSW5kZXgpO1xuXG4gICAgICAgIC8vIFJlY3Vyc2l2ZWx5IHNvcnQgYm90aCBoYWx2ZXMuXG4gICAgICAgIGxldCBmaXJzdFNvcnRlZCA9IG1lcmdlU29ydChmaXJzdEhhbGYpO1xuICAgICAgICBsZXQgc2Vjb25kU29ydGVkID0gbWVyZ2VTb3J0KHNlY29uZEhhbGYpO1xuXG4gICAgICAgIC8vIE1lcmdlIHRoZSB0d28gc29ydGVkIGhhbHZlcy5cbiAgICAgICAgcmV0dXJuIG1lcmdlKGZpcnN0U29ydGVkLCBzZWNvbmRTb3J0ZWQpO1xuICAgIH1cbn1cblxuLy8gVGhpcyBmdW5jdGlvbiBtZXJnZXMgdHdvIHNvcnRlZCBhcnJheXMgaW50byBvbmUgc29ydGVkIGFycmF5LlxuZnVuY3Rpb24gbWVyZ2UoYXJyMSwgYXJyMikge1xuICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICBsZXQgaSA9IDA7IC8vIFBvaW50ZXIgZm9yIGFycjFcbiAgICBsZXQgaiA9IDA7IC8vIFBvaW50ZXIgZm9yIGFycjJcblxuICAgIC8vIFRyYXZlcnNlIGJvdGggYXJyYXlzIGFuZCBpbnNlcnQgc21hbGxlciBvZiBib3RoIGVsZW1lbnRzIGluIHJlc3VsdFxuICAgIHdoaWxlIChpIDwgYXJyMS5sZW5ndGggJiYgaiA8IGFycjIubGVuZ3RoKSB7XG4gICAgICAgIGlmIChhcnIxW2ldIDwgYXJyMltqXSkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goYXJyMVtpXSk7XG4gICAgICAgICAgICBpKys7IC8vIE1vdmUgcG9pbnRlciBmb3IgYXJyMVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goYXJyMltqXSk7XG4gICAgICAgICAgICBqKys7IC8vIE1vdmUgcG9pbnRlciBmb3IgYXJyMlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ29uY2F0ZW5hdGUgdGhlIHJlbWFpbmluZyBlbGVtZW50cyBvZiBib3RoIGFycmF5cyAoaWYgYW55KS5cbiAgICByZXR1cm4gcmVzdWx0LmNvbmNhdChhcnIxLnNsaWNlKGkpLmNvbmNhdChhcnIyLnNsaWNlKGopKSk7XG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gcmVtb3ZlcyBkdXBsaWNhdGUgZWxlbWVudHMgZnJvbSBhIHNvcnRlZCBhcnJheS5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVEdXBsaWNhdGUoc29ydGVkQXJyYXkpIHtcbiAgICByZXR1cm4gc29ydGVkQXJyYXkuZmlsdGVyKChpdGVtLCBpbmRleCwgYXJyYXkpID0+IHtcbiAgICAgICAgLy8gS2VlcCBvbmx5IHRoZSBmaXJzdCBpbnN0YW5jZSBvZiBlYWNoIGVsZW1lbnQsIGlnbm9yaW5nIHN1YnNlcXVlbnQgZHVwbGljYXRlcy5cbiAgICAgICAgcmV0dXJuIGluZGV4ID09PSAwIHx8IGl0ZW0gIT09IGFycmF5W2luZGV4IC0gMV07XG4gICAgfSk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=