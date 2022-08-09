450. 删除二叉搜索树中的节点

原题链接
要点

    理解二叉搜索树中序遍历是有序数组

    理解怎么遍历二叉搜索树

        欲查找的值如果与某个结点比较时，继续在这个节点的右边查找，反之左边，相等返回结果。

    删除时保证而二叉搜索树的性质不变。

解法

450. 删除二叉搜索树中的节点

    找到欲删除的节点位置。
    找到一个值能够替换它(之后将它删除，否则将有两个相同元素)，保持中序遍历数组的有序性。

代码片段
```go
class Solution {
	public int rightMin(TreeNode root) {//1.找到以某个结点为根节点的右子树最小值。
		root = root.right;
		while (root.left != null) root = root.left;//1.1循环往左找到最小值。
		return root.val;
	}

	public int leftMax(TreeNode root) {//2.找到以某个结点为根节点的左子树最大值。
		root = root.left;
		while (root.right != null) root = root.right;
		return root.val;
	}

	public TreeNode deleteNode(TreeNode root, int key) {
		if (root == null) {//3.递归终止条件
			return null;
		}
		if (key > root.val) {//4.如果查找的结点比根节点大，继续在右子树查找删除该结点
			root.right = deleteNode(root.right, key);
		} else if (key < root.val) {//5.如果查找的结点比根节点小，继续在左子树查找删除该结点
			root.left = deleteNode(root.left, key);
		} else {//6.如果找到了该结点，删除它
			if (root.left == null && root.right == null) {//7.以叶子节点为根节点的二叉搜索树只有一个元素，可以直接删除。
				root = null;
			} else if (root.right != null) {//8.如果有右子树，只要找到该右子树的最小值来替换，之后将它删除即可。
				root.val = rightMin(root);
				root.right = deleteNode(root.right, root.val);//9.将这个右子树的最小值替换根节点，此时存在两个相同节点，将这个节点删除即可。
			} else {//10.如果有左子树，只要找到该左子树的最大值来替换，之后将它删除即可。
				root.val = leftMax(root);
				root.left = deleteNode(root.left, root.val);//9.将这个左子树的最大值替换根节点，此时存在两个相同节点，将这个节点删除即可。
			}
		}
		return root;
	}
}
```

编译通过了

```cpp
class Solution {
    public:
	 int rightMin(TreeNode* root) {//1->找到以某个结点为根节点的右子树最小值。
		root = root->right;
		while (root->left != nullptr) root = root->left;//1->1循环往左找到最大值。
		return root->val;
	}

	 int leftMax(TreeNode* root) {//2->找到以某个结点为根节点的左子树最大值。
		root = root->left;
		while (root->right != nullptr) root = root->right;
		return root->val;
	}

	 TreeNode* deleteNode(TreeNode* root, int key) {
		if (root == nullptr) {//3->递归终止条件
			return root;
		}
		if (key > root->val) {//4->如果查找的结点比根节点大，继续在右子树查找删除该结点
			root->right = deleteNode(root->right, key);
		} else if (key < root->val) {//5->如果查找的结点比根节点小，继续在左子树查找删除该结点
			root->left = deleteNode(root->left, key);
		} else {//6->如果找到了该结点，删除它
			if (root->left == nullptr && root->right == nullptr) {//7->以叶子节点为根节点的二叉搜索树只有一个元素，可以直接删除。
				root = nullptr;
			} else if (root->right != nullptr) {//8->如果有右子树，只要找到该右子树的最小值来替换，之后将它删除即可。
				root->val = rightMin(root);
				root->right = deleteNode(root->right, root->val);//9->将这个右子树的最小值替换根节点，此时存在两个相同节点，将这个节点删除即可。
			} else {//10->如果有左子树，只要找到该左子树的最大值来替换，之后将它删除即可。
				root->val = leftMax(root);
				root->left = deleteNode(root->left, root->val);//9->将这个左子树的最大值替换根节点，此时存在两个相同节点，将这个节点删除即可。
			}
		}
		return root;
	}
};

```