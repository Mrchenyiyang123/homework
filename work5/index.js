
// 在 D 天内送达包裹的能力
var shipWithinDays = function(weights, days) {
  // 左边为weights里面单个最大重量
  var left = Math.max(...weights)
  // 右边有整个weights之和
  var right = weights.reduce((a,b)=> a + b )
  while(left < right) {
    // 选取左右边界的中点
    var mid = Math.floor((left + right) /2)
    // 进行计数，求取如果最大运载重量为mid的话，需要多少天来运送所有包裹
    // count为天数，temp为当天运载的重量和
    // 天数
    var count = 1
    var temp = 0
    for(let weight of weights) {
      temp += weight
      if( temp > mid) {
        count++
        temp = weight
      }
    }
    if(count <= days) {
      right = mid 
    }else {
      left = mid + 1 
    }
  }
  return right
};
// 爱吃香蕉的珂珂
var minEatingSpeed = function(piles, h) {
    var left = 1
    var right = Math.max(...piles)
    while(left < right) {
        var mid = (left + right ) >> 1
        if(canEat(piles,mid,h)) {
            right = mid  // 如果能吃完，则最大值调整为mid
        }else {
            left = mid + 1 // 如果不能吃完，则最小值调整为mid + 1
        }
    }
    return right
};
// 吃的速度
var canEat  = function(piles,speed,h) {
    var time = 0
    for(const pile of piles) {
        // 向上取整
        time += Math.ceil( pile / speed )
    }
    return time <= h
}
// 寻找旋转排序数组中的最小值 II
var findMin = function(nums) {
    if(nums.length === 1) {
        return nums[0]
    }
    var left = 0
    var right = nums.length - 1
    while(left < right) {
        var mid = left + Math.floor( (right - left) / 2 )
        if(nums[mid] < nums[right]) {
            right = mid
        }else if (nums[mid] > nums[right]) {
            left = mid + 1
        }else {
            right -= 1
        }
    }
    return nums[right]
};