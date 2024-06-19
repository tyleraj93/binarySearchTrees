import { mergeSort, removeDuplicate } from "./merge.js";

class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

export class Tree {
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
        return removeDuplicate(mergeSort(array));
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
