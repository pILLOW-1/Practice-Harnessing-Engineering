import { describe, it, expect } from 'vitest';
import { IndexingService } from '../src/IndexingService.js';

describe('IndexingService', () => {
  it('should index a document', async () => {
    const service = new IndexingService();
    // TODO: 实现后更新测试
    expect(service).toBeDefined();
  });

  it('should search documents', () => {
    const service = new IndexingService();
    const results = service.search('test');
    expect(results).toEqual([]);
  });
});
