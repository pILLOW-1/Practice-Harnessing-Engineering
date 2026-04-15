// 简单的开发服务器脚本

import { createServer } from 'http';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Document Management System - Dev Server\n');
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Dev server running on http://localhost:${PORT}`);
});
