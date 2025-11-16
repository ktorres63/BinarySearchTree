class TreeNode {
  data: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(
    data: number,
    left: TreeNode | null = null,
    right: TreeNode | null = null
  ) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  root: TreeNode | null;
  constructor(arr: number[]) {
    const cleanArr = [...new Set(arr.sort((a, b) => a - b))]; // remove duplicates and sort

    this.root = this.buildTree(cleanArr);
  }

  buildTree(arr: number[]): TreeNode | null {
    if (arr.length === 0) return null;
    const mid = Math.floor(arr.length / 2);
    let node: TreeNode = new TreeNode(
      arr[mid],
      this.buildTree(arr.slice(0, mid)),
      this.buildTree(arr.slice(mid + 1))
    );
    return node;
  }
  prettyPrint(
    node: TreeNode | null = this.root,
    prefix: string = "",
    isLeft: boolean = true
  ): void {
    if (node === null) return;

    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
  insert(value: number) {
    if (this.root === null) this.root = new TreeNode(value);
    else {
      this.insertNode(this.root, value);
    }
  }
  private insertNode(node: TreeNode | null, value: number): TreeNode {
    if (node == null) {
      return new TreeNode(value);
    }
    if (value < node.data) {
      node.left = this.insertNode(node.left, value);
    } else if (value > node.data) {
      node.right = this.insertNode(node.right, value);
    }

    return node;
  }
  deleteItem(value: number) {
    if (this.root === null) return;
    else {
      this.root = this.deleteNode(this.root, value);
    }
  }
  private deleteNode(node: TreeNode | null, value: number): TreeNode | null {
    if (node == null) {
      return null;
    }
    if (node.data > value) {
      node.left = this.deleteNode(node.left, value);
    } else if (node.data < value)
      node.right = this.deleteNode(node.right, value);
    else {
      if (node.left == null) {
        return node.right;
      } else if (node.right == null) {
        return node.left;
      }

      const succ = this.getSuccesor(node);
      node.data = succ.data;
      node.right = this.deleteNode(node.right, succ.data);
    }
    return node;
  }
  private getSuccesor(curr: TreeNode): TreeNode {
    let node = curr.right!;
    while (node.left !== null) node = node.left;
    return node;
  }

  find(value: number): TreeNode | null {
    if (this.root === null) return null;

    return this.findNode(this.root, value);
  }
  private findNode(node: TreeNode | null, value: number): TreeNode | null {
    if (node == null) {
      return null;
    }
    if (node.data > value) {
      return this.findNode(node.left, value);
    } else if (node.data < value) return this.findNode(node.right, value);

    return node;
  }

  levelOrderForEach(callback: (node: TreeNode) => void): void {
    if (!callback) {
      throw new Error("A callback function is required");
    }
    if (this.root === null) return;
    let queue: Array<TreeNode> = [this.root];

    while (queue.length > 0) {
      const curr = queue.shift()!;

      callback(curr);

      if (curr.left !== null) {
        queue.push(curr.left);
      }
      if (curr.right !== null) {
        queue.push(curr.right);
      }
    }
  }

  inOrderForEach(callback: (node: TreeNode) => void): void {
    if (!callback) {
      throw new Error("A callback function is required");
    }
    if (this.root === null) return;
    this.inOrder(this.root, callback);
  }
  private inOrder(node: TreeNode | null, callback: (node: TreeNode) => void) {
    if (node === null) return;
    this.inOrder(node.left, callback);
    callback(node);
    this.inOrder(node.right, callback);
  }
  preOrderForEach(callback: (node: TreeNode) => void): void {
    if (!callback) {
      throw new Error("A callback function is required");
    }
    if (this.root === null) return;
    this.preOrder(this.root, callback);
  }
  private preOrder(node: TreeNode | null, callback: (node: TreeNode) => void) {
    if (node === null) return;
    callback(node);
    this.preOrder(node.left, callback);
    this.preOrder(node.right, callback);
  }
  postOrderForEach(callback: (node: TreeNode) => void): void {
    if (!callback) {
      throw new Error("A callback function is required");
    }
    if (this.root === null) return;
    this.postOrder(this.root, callback);
  }
  private postOrder(node: TreeNode | null, callback: (node: TreeNode) => void) {
    if (node === null) return;
    this.postOrder(node.left, callback);
    this.postOrder(node.right, callback);
    callback(node);
  }
  height(value: number): number | null {
    const currNode = this.find(value);
    if (currNode == null) {
      return null;
    }
    return this.recHeight(currNode);
  }
  private recHeight(node: TreeNode | null): number {
    if (node == null) {
      return -1;
    }
    const leftHeight = this.recHeight(node.left);
    const rightHeight = this.recHeight(node.right);

    return 1 + Math.max(leftHeight, rightHeight);
  }

  depth(value: number): number | null {
    if (this.root === null) return null;
    const d = this.recDepth(this.root, value);
    return d === -1 ? null : d;
  }
  private recDepth(node: TreeNode | null, value: number): number {
    let leftDepth = 0;
    let rightDepth = 0;
    if (node == null) {
      return -1;
    }
    if (node.data == value) {
      return 0;
    }
    if (node.data > value) {
      leftDepth = this.recDepth(node.left, value);
      return leftDepth + 1;
    } else if (node.data < value) {
      rightDepth = this.recDepth(node.right, value);
      return rightDepth + 1;
    }
    return -1;
  }
  isBalanced(): boolean {
    if (this.root === null) return false;

    return this.check(this.root).balanced;
  }
  check(node: TreeNode | null): { height: number; balanced: boolean } {
    if (node == null) {
      return { height: -1, balanced: true };
    }
    const left = this.check(node.left);
    const right = this.check(node.right);

    const balanced= Math.abs(left.height - right.height) <= 1 && left.balanced && right.balanced 
    const height = 1+ Math.max(left.height,right.height)
    return {height,balanced}
  }

}

export { TreeNode, Tree };
