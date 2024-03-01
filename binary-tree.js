/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

minDepth(){
  if(!this.root) return 0;
  let minDepth =1;
  let nodeList = [this.root];

  //using breadth first search (bfs)

  while(nodeList.length){
    (console.log("Inside level:", nodeList.length, "Min Depth:", minDepth))
    let treeLevel = nodeList.length;
    
    while(treeLevel){
      console.log("Current treeLevel:",treeLevel)
      let currentNode = nodeList.shift();
      if(currentNode.left === null && currentNode.right ===null){
        console.log("Min depth:", minDepth)
        return minDepth;
      }else{
        if(currentNode.left)nodeList.push(currentNode.left);
        if(currentNode.right)nodeList.push(currentNode.right);
      }
      treeLevel--;
    }
    minDepth++;
  }
  return minDepth;

  }


//SB solution using recursion:

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  // minDepth() {
  //   if (!this.root) return 0;

  //   function minDepthHelper(node) {
  //     if (node.left === null && node.right === null) return 1;
  //     if (node.left === null) return minDepthHelper(node.right) + 1;
  //     if (node.right === null) return minDepthHelper(node.left) + 1;
  //     return (
  //       Math.min(minDepthHelper(node.left), minDepthHelper(node.right)) + 1
  //     );
  //   }

  //   return minDepthHelper(this.root);
  // }







  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;

    function maxDepthHelper(node) {
      if (node.left === null && node.right === null) return 1;
      if (node.left === null) return maxDepthHelper(node.right) + 1;
      if (node.right === null) return maxDepthHelper(node.left) + 1;
      return (
        Math.max(maxDepthHelper(node.left), maxDepthHelper(node.right)) + 1
      );
    }

    return maxDepthHelper(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let max = 0;

    function depthFirstSearch(node) {
      if (!node) return 0;
      
      let left = Math.max(0,depthFirstSearch(node.left));
      let right = Math.max(0,depthFirstSearch(node.right));
      let curMax = left + node.val + right;

      max = Math.max(curMax, max);

      return node.val + Math.max(left,right);
    }



    depthFirstSearch(this.root);
    return max;
  }





  //SB Solution:

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  // maxSum() {
  //   let result = 0;

  //   function maxSumHelper(node) {
  //     if (node === null) return 0;
  //     const leftSum = maxSumHelper(node.left);
  //     const rightSum = maxSumHelper(node.right);
  //     result = Math.max(result, node.val + leftSum + rightSum);
  //     return Math.max(0, leftSum + node.val, rightSum + node.val);
  //   }

  //   maxSumHelper(this.root);
  //   return result;
  // }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;

    // let's use BFS for this!
    let queue = [this.root];
    let closest = null;

    while (queue.length) {
      let currentNode = queue.shift();
      let currentVal = currentNode.val;
      let higherThanLowerBound = currentVal > lowerBound;
      let shouldReassignClosest = currentVal < closest || closest === null;

      if (higherThanLowerBound && shouldReassignClosest) {
        closest = currentVal;
      }

      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }

    return closest;
  }

//Need to Review Further Study
//The solutions below are from SB source code:

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if (node1 === this.root || node2 === this.root) return false;

    function findLevelAndParent(
      nodeToFind,
      currentNode,
      level = 0,
      data = { level: 0, parent: null }
    ) {
      if (data.parent) return data;
      if (currentNode.left === nodeToFind || currentNode.right === nodeToFind) {
        data.level = level + 1;
        data.parent = currentNode;
      }
      if (currentNode.left) {
        findLevelAndParent(nodeToFind, currentNode.left, level + 1, data);
      }
      if (currentNode.right) {
        findLevelAndParent(nodeToFind, currentNode.right, level + 1, data);
      }
      return data;
    }

    let node1Info = findLevelAndParent(node1, this.root);
    let node2Info = findLevelAndParent(node2, this.root);

    let sameLevel =
      node1Info && node2Info && node1Info.level === node2Info.level;
    let differentParents =
      node1Info && node2Info && node1Info.parent !== node2Info.parent;
    return sameLevel && differentParents;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string.
   *
   * Output looks like this:
   *   1 2 # # 3 4 # # 5 # #
   *  Where # represents # children with a pre-order traversal.
   */

  static serialize(tree) {
    const values = [];

    function traverse(node) {
      if (node) {
        values.push(node.val);
        traverse(node.left);
        traverse(node.right);
      } else {
        values.push("#");
      }
    }

    traverse(tree.root);
    return values.join(" ");
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    if (!stringTree) return null;

    const values = stringTree.split(" ");

    function buildTree() {
      // building a tree starting from the beginning of the array
      if (values.length) {
        const currentVal = values.shift();

        if (currentVal === "#") return null;

        // remember to convert values back into numbers
        let currentNode = new BinaryTreeNode(+currentVal);
        currentNode.left = buildTree();
        currentNode.right = buildTree();

        return currentNode;
      }
    }

    const root = buildTree();
    return new BinaryTree(root);
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2, currentNode=this.root) {
    // base case 1: empty tree
    if (currentNode === null) return null;

    // base case 2: root is one of the target nodes
    if (currentNode === node1 || currentNode === node2) return currentNode;

    // recursively search the left sub-tree
    const left = this.lowestCommonAncestor(node1, node2, currentNode.left);

    // recursively search the right sub-tree
    const right = this.lowestCommonAncestor(node1, node2, currentNode.right);

    // if neither left nor right is null, currentNode is the ancestor
    if (left !== null && right !== null) return currentNode;
    
    // if one node is not null, return it
    if (left !== null || right !== null) return left || right;
    
    // left and right are both null, return null
    if (left === null && right === null) return null;
  }
}





// // build small tree;
// let smallLeft = new BinaryTreeNode(5);
// let smallRight = new BinaryTreeNode(5);
// let smallRoot = new BinaryTreeNode(6, smallLeft, smallRight);
// smallTree = new BinaryTree(smallRoot);


// // build large tree 
// let node4 = new BinaryTreeNode(7);
// let node3 = new BinaryTreeNode(15);
// let node2 = new BinaryTreeNode(20, node3, node4);
// let node1 = new BinaryTreeNode(9);
// let root = new BinaryTreeNode(3, node1, node2);
// largeTree = new BinaryTree(root);

module.exports = { BinaryTree, BinaryTreeNode };