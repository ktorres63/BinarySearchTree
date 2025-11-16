import { Tree } from "./BST.ts"; 

const tree = new Tree([]);
tree.insert(1);
tree.insert(2);
tree.insert(3);
tree.insert(4);
tree.insert(5);
tree.insert(6);
tree.insert(7);

tree.prettyPrint();


console.log("---------------------------------------");

tree.rebalance();

tree.prettyPrint();