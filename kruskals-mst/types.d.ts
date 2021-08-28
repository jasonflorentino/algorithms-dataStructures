export type WeightedEdge = [number, number, number]
export type EdgeList = Array<WeightedEdge>
export interface Test { input: EdgeList; mst: EdgeList }
export interface LookUpTable { [prop: number]: undefined | true }