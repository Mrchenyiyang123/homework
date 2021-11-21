/**
 * @param {number[]} nums
 * @return {boolean}
 */
// 跳跃游戏(动归)
var canJump = function(nums) {
  //特殊情况只有一个元素
  if (nums.length == 1) return true
  //状态dp，初始化为全false（true表示能到达，false表示无法到达）
  const dp = new Array(nums.length).fill(false)
  //第一个点一定能走到
  dp[0] = true
  //从第二个点开始判断能否到达该点？
  for (let i = 1; i < nums.length; ++i) {
    //想知道能否到达该点，则要看能否从该点之前的点跳跃过来，从后往前找的原因是越接近它的点越可能能够跳过来，可以减少循环次数
    for (let j = i-1; j >= 0; --j) {
      //如果前面有的点到达不了，就不必考虑从那个点跳不跳的过来了，因为那个点自己本身都到不了
      if (!dp[j]) continue
      //如果前面有点能达到，但是跳不了足够远到此点，也继续找再往前一个点
      if (nums[j] < i-j) continue
      //如果找到了可以跳到当前点的前面的点，则当前点可达到，更新他的状态为true，并退出循环
      dp[i] = true
      break
    }
  }
  //返回最后一个点是否能达到
  return dp[nums.length-1]
};
// 贪心
var canJump = function(nums) {
  if (nums.length <= 1) return true
  var cover = 0
  for(var i = 0; i <= cover; i++) {
    cover = Math.max(cover, i + nums[i])
    if(cover >= nums.length - 1) {
      return true
    }
  }
  return false
};

// 二叉树中的最大路径和

const maxPathSum = (root) => {
  let maxSum = Number.MIN_SAFE_INTEGER; // 最大路径和
  const dfs = (root) => {
    if (root == null) { // 遍历到null节点，收益0
      return 0;
    }
    const left = dfs(root.left);   // 左子树提供的最大路径和
    const right = dfs(root.right); // 右子树提供的最大路径和

    const innerMaxSum = left + root.val + right; // 当前子树内部的最大路径和
    maxSum = Math.max(maxSum, innerMaxSum);      // 挑战最大纪录

    const outputMaxSum = root.val + Math.max(0, left, right); // 当前子树对外提供的最大和

    // 如果对外提供的路径和为负，直接返回0。否则正常返回
    return outputMaxSum < 0 ? 0 : outputMaxSum;
  };
  dfs(root);  // 递归的入口
  return maxSum; 
};

// 最长回文子数
var longestPalindromeSubseq = function(s) {
  const n = s.length;
  const dp = new Array(n).fill(0).map(() => new Array(n).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    dp[i][i] = 1;
    const c1 = s[i];
    for (let j = i + 1; j < n; j++) {
      const c2 = s[j];
      if (c1 === c2) {
        dp[i][j] = dp[i + 1][j - 1] + 2;
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[0][n - 1];
};