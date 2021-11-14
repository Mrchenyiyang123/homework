//  爬楼梯
var cache = []
var climbStairs = function(n) {
    if(n < 2) {
        return 1
    }
    if(cache[n]) {
        return cache[n]
    }
    cache[n] = climbStairs(n -1) + climbStairs(n -2)
    return cache[n]
};
// 最长递增子序列的个数
var findNumberOfLIS = function(nums) {
    var ans = 0
    var n = nums.length
    var f = new Array(n).fill(1)
    var pre = new Array(n).fill(1)
    for(var i = 1; i < nums.length; i++) {
        // str.push(nums[i])
        for(var j = 0;j<i;j++) {
            if(nums[j] < nums[i]) {
                if(f[i] < f[j] + 1) {
                    f[i] = f[j] + 1
                    pre[i] = pre[j]
                }else if (f[i] === f[j] + 1) {
                    pre[i] += pre[j]
                }
            }
        }
    }
    var max = Math.max(...f)
    for(var i = 0;i<n;i++) {
        if(f[i] === max) {
            ans += pre[i]
        }
    }
    return ans 
};
// 三角形最小路径和（Medium）
var minimumTotal = function(triangle) {
    for(var i = triangle.length-2;i >= 0;i--){
        for(var j = 0;j < triangle[i].length;j++){
            triangle[i][j] = Math.min(triangle[i+1][j],triangle[i+1][j+1]) + triangle[i][j];
        }
    }
    return triangle[0][0];
};