import { describe, it, expect } from 'vitest';
import { DocumentService } from '../src/DocumentService.js';

describe('DocumentService', () => {
  it('should import a document', async () => {
    const service = new DocumentService();
    // TODO: 实现后更新测试
    expect(service).toBeDefined();
  });

  it('should get a document by id', () => {
    const service = new DocumentService();
    // TODO: 实现后更新测试
    expect(service.getDocument('test')).toBeUndefined();
  });
});
