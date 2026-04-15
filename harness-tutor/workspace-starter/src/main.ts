// 主入口

import { DocumentService } from './DocumentService.js';
import { IndexingService } from './IndexingService.js';
import { QAService } from './QAService.js';
import { PersistenceService } from './PersistenceService.js';

async function main() {
  console.log('Document Management System');
  console.log('==========================');

  const docService = new DocumentService();
  const indexingService = new IndexingService();
  const qaService = new QAService();
  const persistenceService = new PersistenceService();

  // TODO: 实现应用逻辑
  console.log('System initialized. Ready for commands.');
}

main().catch(console.error);
