// 问答服务 - 基于索引文档回答问题

import { DocumentChunk } from './types.js';

export interface QAResponse {
  answer: string;
  citations: DocumentChunk[];
}

export class QAService {
  // TODO: 实现问答功能
  async answerQuestion(question: string): Promise<QAResponse> {
    throw new Error('Not implemented');
  }
}
