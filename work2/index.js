//  和为 K 的子数组（Medium）
 var subarraySum = function(nums, k) {
    var hashMap = new Map()
    hashMap.set(0,1)
    var pre = 0
    var sum = 0
    for(let i = 0;i<nums.length;i++) {
        pre += nums[i]
        const result = pre - k
        if(hashMap.has(result)) {
            sum += hashMap.get(result)
        }
        if(hashMap.has(pre)) {
            hashMap.set(pre,hashMap.get(pre) + 1)
        }else {
            hashMap.set(pre,1)
        }
    }
    return sum
};

// 数组的度
var findShortestSubArray = function(nums) {
    var hashMap = new Map()
    var count  = 0
    for(let i = 0;i< nums.length; i++) {
        if(hashMap.has(nums[i])) {
            const arr = hashMap.get(nums[i])
            arr[2] = i
            hashMap.set(nums[i],[arr[0]+1,arr[1],arr[2]])
        }else {
            hashMap.set(nums[i],[1,i,i])
        }
    }
    console.log(hashMap,'map')
    var maxNum = 0
    var minLen = 0
    for(const [count, left, right] of hashMap.values()) {
        if(maxNum < count) {
            maxNum = count
            minLen = right - left + 1
        }else if (maxNum === count) {
            if(minLen > right - left + 1) { 
                minLen = right - left + 1
            }
        }
    }
    return minLen
};