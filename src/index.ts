import { Tree } from "./BST.ts"; 

const tree = new Tree([10, 5, 15,4,3,2,99]);

tree.insert(7);

tree.insert(10);
tree.prettyPrint();