// 持久化服务 - 保存和加载数据

import { Document, DocumentChunk } from './types.js';

export class PersistenceService {
  private dataDir = './data';

  async saveDocuments(docs: Document[]): Promise<void> {
    // TODO: 实现持久化
    throw new Error('Not implemented');
  }

  async loadDocuments(): Promise<Document[]> {
    // TODO: 实现加载
    return [];
  }
}
