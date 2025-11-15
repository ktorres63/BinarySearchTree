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
  private findNode(node: TreeNode, value: number): TreeNode | null {
    if (node == null) {
      return null;
    }
    if (node.data > value) {
      return this.findNode(node.left!, value);
    } else if (node.data < value) return this.findNode(node.right!, value);

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
    this.inOrder(this.root,callback)

  }
  private inOrder(node:TreeNode | null,callback: (node: TreeNode) => void){
    if (node === null) return;
    this.inOrder(node.left,callback)
    callback(node)
    this.inOrder(node.right,callback)
  }

  
}


export { TreeNode, Tree };
