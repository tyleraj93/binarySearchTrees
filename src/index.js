import { mergeSort, removeDuplicate } from "./merge.js";

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
export class Tree {
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
        return removeDuplicate(mergeSort(array)); // Uses external functions to sort and deduplicate
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
