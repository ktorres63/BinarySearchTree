import { Tree } from "./BST.ts"; 

const tree = new Tree([10, 7, 15,4,3,2,20,43]);

tree.prettyPrint();


console.log("---------------------------------------");


console.log(tree.find(7));  // devuelve el nodo con data = 7
console.log(tree.find(20)); // null