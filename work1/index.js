
//  合并两个有序链表
var mergeTwoLists = function(l1, l2) {
    let protect = new ListNode(-1)
    let prev = protect
    while(l1 !== null && l2 !== null) {
        if(l1.val <= l2.val) {
            prev.next = l1
            l1 = l1.next
        }else {
            prev.next = l2
            l2 = l2.next
        }
        prev = prev.next
    }
    // 合并后 l1 和 l2 最多只有一个还未被合并完，我们直接将链表末尾指向未合并完的链表即可
    prev.next = l1 === null ?l2:l1
    return protect.next
};

//  加一
var plusOne = function(digits) {
    const len = digits.length
    if(len === 0) {
        return null
    }
    for(let i = len -1;i >=0;i--) {
        digits[i]++
        // 如果最后一位数字+1=10的话，把当前数字变为0
        if(digits[i] % 10 === 0) {
            digits[i] = 0
        }else {
            return digits
        }
    }
    // 如果遍历完所有的没有返回digits，则证明是[9,9,9]这种，则往头部添加一个1就可以
    digits.unshift(1)
    return digits
};