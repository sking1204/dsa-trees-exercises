/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */
  /* Given a n-ary tree of integers, return the sum of all the integers.  */

  sumValues() {
    if (!this.root) return 0;

    /* total initally contains value of root node */
    let total = this.root.val;

  /* helper function sumHelper(node) to recursively
  traverse the tree and accumulate the sum of values. */

    function sumHelper(node) {
      // go through all the children for a Node
      for (let child of node.children) {
        // accumulate all values
        total += child.val;
        // if it has any children
        if (child.children.length > 0) {
          // recurse with the child as the root
          sumHelper(child);
        }
      }
    }

    sumHelper(this.root);
    return total;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    if (!this.root) return 0;

    let count = this.root.val % 2 === 0 ? 1 : 0;

    function countEvensHelper(node) {
  //     // go through all the children for a Node
      for (let child of node.children) {
        // count the child if the value is even
        if (child.val % 2 === 0) count++;
        // if it has any children
        if (child.children.length > 0) {
          // recurse with the child as the root
          countEvensHelper(child);
        }
      }
    }

    countEvensHelper(this.root);
    return count;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    if (!this.root) return 0;

    let count = this.root.val > lowerBound ? 1 : 0;

    function countEvensHelper(node) {
      // go through all the children for a Node
      for (let child of node.children) {
        // count the child if the value is greater than lowerBound
        if (child.val > lowerBound) count++;
        // if it has any children
        if (child.children.length > 0) {
          // recurse with the child as the root
          countEvensHelper(child);
        }
      }
    }

    countEvensHelper(this.root);
    return count; 
  }

}


  // // build large tree
  // let n = new TreeNode(1);
  // let n2 = new TreeNode(2);
  // let n3 = new TreeNode(3);
  // let n4 = new TreeNode(4);
  // let n5 = new TreeNode(5);
  // let n6 = new TreeNode(6);
  // let n7 = new TreeNode(7);
  // let n8 = new TreeNode(8);

  // n.children = [n2, n3, n4];

  // n4.children.push(n5, n6);
  // n6.children.push(n7);
  // n7.children.push(n8);

  // largeTree = new Tree(n);

module.exports = { Tree, TreeNode };
