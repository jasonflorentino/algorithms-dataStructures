# Kruskal's Minimum Cost Spanning Tree

*From studying Tim Roughgarden's lectures on Greedy Algorithms and Union-Find*

Input: Undirected graph `G=(V,E)` edge costs `Ce`.  
Output: Minium cost spanning tree (no cyles, connected)  
Assumptions: `G` is connected; distinct edge costs (for proof simplicty)  
Cut Property: If `e` is the cheapest edge crossing some cut `(A,B)`,
then `e` belongs in the MST.

### Sample graph
```
      1
    /   \
   1     7
 /         \
2-----5-----3
| \         |
4   --3--   6
|         \ |
4-----2-----5
```
### Sample Input / Output
Let `G[i]` represent an undirected edge between `G[i][0]` and `G[i][1]`,
and `G[i][2]` be the cost of that edge.
```
G = [
  [1,2,1], [1,3,7],
  [2,3,5], [2,4,4], [2,5,3],
  [3,5,6],
  [4,5,2]
]

MST = [ 
  [1,2,1], [4,5,2], [2,5,3], [2,3,5] 
]
```
Pseudo code:
```
Sort edges in order of increating cost
Look at cheapest edge next
if it doesn't create a cycle,
include it in the output tree
```
Or:
```
sort edges 1,2,...,m so that C1 < C2 < ... < Cm
T = []
for i = 1 to m
  if T + i has no cycles
    add i to T
return T
```