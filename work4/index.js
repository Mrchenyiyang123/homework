// 被围绕的区域
var solve = function(board) {
    if(board.length === 0) {
        return []
    }
    var m = board.length
    var n = board[0].length
    const dx = [-1, 0, 0, 1];    
    const dy = [0, -1, 1, 0];
    var bfs = function( sx, sy ) {
        var q = []
        q.push([sx,sy])
        // 入列的“root”染色一下,因为是从最外层的边界入手，所以肯定是不能渲染的
        board[sx][sy] = 'NO'  
        while(q.length > 0) {
            const now = q.shift()
            let x = now[0]
            let y = now[1]
            // 循环四个边
            for( var i = 0;i < 4; i++ ) {
                let nx = x + dx[i]
                let ny = y + dy[i]
                // 任何时候访问数组前，判断合法性
                if( nx < 0 || nx >= m || ny < 0 || ny >= n ) {
                    continue
                }
                // console.log(board,'board')
                if(board[nx][ny] === 'O') {
                     // 把要改变的O原封不动的还回去
                    q.push([nx,ny])
                    //  BFS：入队时标记NO                   
                    board[nx][ny] = 'NO'
                }
            }
        }
    }
    for( var i = 0;i< m; i++ ) {
        for( var j = 0; j<n; j++ ) {
            // // 从最外层的O，开始BFS
            if( i == 0 || i == m - 1 || j == 0 || j == n - 1) {    
                if (board[i][j] == 'O') {                
                    bfs(i, j);                
                }
            }
        }
    }
    for( var i = 0;i< m; i++ ) {
        for( var j = 0; j<n; j++ ) {
           if(board[i][j] === 'O') {
               board[i][j] = 'X'
           }else if(board[i][j] === 'NO') {
               board[i][j] = 'O'
           }
        }
    }
    // console.log(board,'==')
};

// 把二叉搜索树转换为累加树
// 非递归版本
var convertBST = function(root) {
    if(root === null){
        return null
    }
    var stack = []
    var cur = root
    var sum = 0
    // // 右子节点先不断压栈
    while(cur) {
        stack.push(cur)
        cur = cur.right
    }
    // 一直到清空递归栈
    while(stack.length > 0) {
        // 位于栈顶的节点出栈
        cur = stack.pop()
        // +=
        sum += cur.val
        // 把sum的值赋值给root.val
        cur.val = sum
        // 找左子节点
        cur = cur.left
        // 存在，让左子节点压栈
        while(cur) {
            // 放到stack里面
            stack.push(cur)
            // 让当前左子节点的右子节点不断压栈
            cur= cur.right
        }
    }
    return root
};
// 递归版本
var convertBST = function(root) {
  var sum = 0
  const inOrder = (root) =>{
    // 遍历到null节点，开始返回
    if(root === null) {
      return 
    }
    // 先递归右节点
    inOrder(root.right)
    // 节点值累加给sum
    sum += root.vla
    // 累加的结果，赋给root.val
    root.val = sum
    // 在递归左节点
    inOrder(root.left)
  }
  inOrder(root)
  return root
}
//  设计推特
var Twitter = function() {
    this.twitters = [];
    this.followMap = new Map();
};

/** 
 * @param {number} userId 
 * @param {number} tweetId
 * @return {void}
 */
Twitter.prototype.postTweet = function(userId, tweetId) {
    this.twitters.push({userId,tweetId})
};

/** 
 * @param {number} userId
 * @return {number[]}
 */
Twitter.prototype.getNewsFeed = function(userId) {
    const followerArr = this.followMap.get(userId);
    const ans = [];
    for (let i = this.twitters.length - 1; i > -1; i--) {
        if (ans.length === 10) {
        break;
        }
        if (this.twitters[i].userId === userId) {
        ans.push(this.twitters[i].tweetId);
        }
        if (followerArr) {
        for (let j = 0; j < followerArr.length; j++) {
            if (this.twitters[i].userId === followerArr[j]) {
            ans.push(this.twitters[i].tweetId);
            }
        }
        }
    }

    return ans;
};

/** 
 * @param {number} followerId 
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.follow = function(followerId, followeeId) {
    let followerArr = this.followMap.get(followerId)? this.followMap.get(followerId)
        : [];
    if (followerArr.indexOf(followeeId) === -1) {
        followerArr.push(followeeId);
        this.followMap.set(followerId, followerArr);
    }
};

/** 
 * @param {number} followerId 
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.unfollow = function(followerId, followeeId) {
    let followerArr = this.followMap.get(followerId);
    if (followerArr && followerArr.indexOf(followeeId) !== -1) {
        followerArr.splice(followerArr.indexOf(followeeId), 1);
        this.followMap.set(followerId, followerArr);
    }
};

/**
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */