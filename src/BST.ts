class TreeNode {
  data: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(data: number, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.data = data;
    this.left = left;
    this.right = right;

  }
}

class Tree {
  root: TreeNode | null;
  constructor(arr: number[]) {
    const cleanArr = [... new Set(arr.sort((a, b) => a - b))] // remove duplicates and sort

    this.root = this.buildTree(cleanArr)
  }

  buildTree(arr: number[]): TreeNode | null {
    if (arr.length === 0)
      return null
    const mid = Math.floor(arr.length / 2)
    let node: TreeNode = new TreeNode(arr[mid], this.buildTree(arr.slice(0, mid)), this.buildTree(arr.slice(mid + 1)))
    return node
  }
  prettyPrint(node: TreeNode | null = this.root, prefix: string = "", isLeft: boolean = true): void {
    if (node === null) return;

    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
  insert(value: number) {

    if (this.root === null)
      this.root = new TreeNode(value);
    else{
      this.insertNode(this.root, value)
    }
  }
  private insertNode(node: TreeNode | null, value:number):TreeNode{
    if(node == null){
      return new TreeNode(value)
    }

    if(value < node.data){
      node.left = this.insertNode(node.left, value)
    }
    else if(value > node.data){
      node.right = this.insertNode(node.right, value)
    }

    return node

  }




}




export { TreeNode, Tree }