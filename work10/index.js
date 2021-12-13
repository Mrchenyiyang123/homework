// 设计跳表
const maxLevel = 16
const power = 2
const maxRand = power ** maxLevel - 1
const randLevel = () => maxLevel - parseInt(Math.log(1 + Math.random() * maxRand) / Math.log(power))

var SkipNode = function(value) {
    this.value = value
    this.right = null
    this.down = null
}

var Skiplist = function() {
    const left = Array.from({length: maxLevel}, () => new SkipNode(-Infinity))
    const right = Array.from({length: maxLevel}, () => new SkipNode(Infinity))
    for (let i = 0; i < maxLevel - 1; ++i) {
        left[i].right = right[i]
        left[i].down = left[i + 1]
        right[i].down = right[i + 1]
    }
    left[maxLevel - 1].right = right[maxLevel - 1]
    this.head = left[0]
};

Skiplist.prototype.search = function(target) {
    let node = this.head
    while (node) {
        if (node.right.value > target) {
            node = node.down
        } else if (node.right.value < target) {
            node = node.right
        } else {
            return true
        }
    }
    return false
};

Skiplist.prototype.add = function(num) {
    const prev = []
    let node = this.head
    while (node) {
        if (node.right.value >= num) {
            prev.push(node)
            node = node.down
        } else {
            node = node.right
        }
    }
    const arr = Array.from({length: randLevel()}, () => new SkipNode(num))
    let t = new SkipNode(NaN)
    for (let i = 0, n = arr.length, j = maxLevel - n; i < n; ++i, ++j) {
        const [a, p] = [arr[i], prev[j]]
        a.right = p.right
        p.right = a
        t.down = a
        t = a
    }
};

Skiplist.prototype.erase = function(num) {
    let node = this.head
    let ans = false
    while (node) {
        if (node.right.value > num) {
            node = node.down
        } else if (node.right.value < num) {
            node = node.right
        } else {
            ans = true
            node.right = node.right.right
            node = node.down
        }
    }
    return ans
};
// 滑动窗口最大值
var maxSlidingWindow = function(nums, k) {  
    if(nums.length === 0) {
        return []
    }

    // 队列数组（存放的是元素下标，为了取值方便）
  const q = [];
  // 结果数组
  const ans = [];
  for (let i = 0; i < nums.length; i++) {
    // 若队列不为空，且当前元素大于等于队尾所存下标的元素，则弹出队尾
    while (q.length && nums[i] >= nums[q[q.length - 1]]) {
      q.pop();
    }
    // 入队当前元素下标
    q.push(i);
    // 判断当前最大值（即队首元素）是否在窗口中，若不在便将其出队
    while (q[0] <= i - k) {
      q.shift();
    }
    // 当达到窗口大小时便开始向结果中添加数据
    if (i >= k - 1) ans.push(nums[q[0]]);
  }
  return ans;
};