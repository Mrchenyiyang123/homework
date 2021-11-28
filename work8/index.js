
//  冗余连接
var findRedundantConnection = function(edges) {
  const n = edges.length;
  const parent = new Array(n + 1).fill(0).map((value, index) => index);
  for (let i = 0; i < n; i++) {
    const edge = edges[i];
    const node1 = edge[0], node2 = edge[1];
    if (find(parent, node1) != find(parent, node2)) {
      union(parent, node1, node2);
    } else {
      return edge;
    }
  }
  return [0];
};

const union = (parent, index1, index2) => {
  parent[find(parent, index1)] = find(parent, index2);
}

const find = (parent, index) => {
  if (parent[index] !== index) {
    parent[index] = find(parent, parent[index]);
  }
  return parent[index];
}

// 岛屿数量
var numIslands = function(grid) {
  const Y = grid.length;
  const X = grid[0].length;
  const uf = new UnionFind();

  for(let i = 0; i < Y; i++) {
    for(let j = 0; j < X; j++) {
      if(grid[i][j] == 1) uf.makeSet([i, j]);
    }
  }

  for(let i = 0; i < Y; i++) {
    for(let j = 0; j < X; j++) {
      if (grid[i][j] == 1) {
        console.log(i , j)
        if ((i + 1 < Y) && (grid[i + 1][j] == 1)) uf.union([i, j], [i + 1, j]); // 右侧
        if ((j + 1 < X) && (grid[i][j + 1] == 1)) uf.union([i, j], [i, j + 1]); // 下侧
      }
    }
  }

  return uf.getCount();
};
class UnionFind {
  constructor() {
    this.parents = {};
    this.count = 0;
  }
  makeSet(x) {
    this.parents[x] = x + '';
    this.count++;
  }
  findSet(x) { // 路径压缩，查x的根节点
    while (this.parents[x] !== (x + '')) {
      x = this.parents[x];
    }
    return x + '';
  }
  union(x, y) {
    this.link(this.findSet(x), this.findSet(y));
  }
  link(x, y) {
    if (x === y) return;
    this.parents[x] = y;
    this.count--;
  }
  getCount() {
    return this.count;
  }
}