import 'reflect-metadata';
import inversify, { injectable, inject } from 'inversify';
import { SYMBOLS } from '@/src/types';
import PostGraph from '.';
import Node from '@/src/data-binding/Model/PostGraph/Node/inversified';
import { DataType as PostNodeDataType } from '@/src/data-binding/Model/PostGraph/Node';
import type { ParameterizableNewable } from '@/src/inversify';

@injectable()
export default class Inversified extends PostGraph {
  constructor (
    @inject(SYMBOLS.PostNodeSummaries) postNodeSummaries: PostNodeDataType[],
    @inject(SYMBOLS.PostNodeNewable) postNodeNewable: ParameterizableNewable<Node, ConstructorParameters<typeof Node>>,
  ) {
    super({
      data: {
        // nodes: postNodeSummaries.map((v) => new postNodeNewable(v.id, v.title)),
        nodes: new Map<number, Node>(postNodeSummaries.map((v) => [v.id, new postNodeNewable(v.id, v.title)])),
      },
    });
  }
}
