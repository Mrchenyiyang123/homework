//  转换成小写字母
var toLowerCase = function(s) {
  let ret = '';
  let str = s
  for(let i = 0; i < str.length; i++){
    // 字符串第一个字符的 Unicode 编码
    let code = str.charCodeAt(i);
    if(code <= 90 && code >= 65){ // 65~90 a~z
      // 将 Unicode 编码转为一个字符
      ret += String.fromCharCode(code + 32);
    }else{
      ret += str[i];
    }
  }
  return ret;
};
// 最后一个单词的长度
var lengthOfLastWord = function(s) {
    let end = s.length - 1;
    while(end >= 0 && s[end] == ' ') end--;
    if(end < 0) return 0;
    let start = end;
    while(start >= 0 && s[start] != ' ') start--;
    return end - start;
};

// 宝石与石头
var numJewelsInStones = function(jewels, stones) {
  const set = new Set();
  for(const s of jewels) {
    set.add(s);
  }
  let ans = 0;
  for(const s of stones) {
    if(set.has(s)){
      ans++;
    }
  }
  return ans;
};