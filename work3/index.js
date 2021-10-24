// 全排列 II
var permuteUnique = function(nums) {
    var s = []
    var ans = []
    var used = []
    nums.sort((a,b)=>a-b)  //先排序

    const find = (index) =>{
        if(index  === nums.length) {
            ans.push(s.slice())
            return  
        }
        for(let i = 0; i < nums.length; i++) {
            // 判断去重
            if (used[i]) {                      // 这个数使用过了，跳过。
                continue;
            }
            if( i > 0 && nums[i] === nums[i - 1] && !used[i-1]) {
                continue
            }
            s.push(nums[i])
            used[i] = true
            find(index+1)
            s.pop()
            used[i] = false

        }
    }
    find(0)
    return ans
};
// 合并K个升序链表
var mergeKLists = function(lists) {
    if(!lists.length) { 
       return null
    }
    if (lists.length === 1) return lists[0]
    lists.splice(0,2,merge(lists[0],lists[1]))
   
    return mergeKLists(lists)
};
 function merge(l1,l2){
    let protect = new ListNode(-1)
    let prev = protect
    while(l1 !== null && l2 !== null ) {
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
}