// 文档类型定义

export interface Document {
  id: string;
  filename: string;
  content: string;
  importedAt: Date;
}

export interface DocumentChunk {
  id: string;
  documentId: string;
  content: string;
  startIndex: number;
  endIndex: number;
}
