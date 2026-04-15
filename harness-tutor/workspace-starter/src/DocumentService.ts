// 文档服务 - 管理文档导入和存储

import { Document } from './types.js';

export class DocumentService {
  private documents: Map<string, Document> = new Map();

  async importDocument(filename: string, content: string): Promise<Document> {
    // TODO: 实现文档导入
    throw new Error('Not implemented');
  }

  getDocument(id: string): Document | undefined {
    return this.documents.get(id);
  }

  getAllDocuments(): Document[] {
    return Array.from(this.documents.values());
  }
}
