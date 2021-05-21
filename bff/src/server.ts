import 'reflect-metadata';
import { createServer } from 'http';
import { createTerminus } from '@godaddy/terminus';
import App from './app';
import { PORT } from './lib/config';

function startServer(): void {
  const server = createServer(App());

  // Handle server graceful shutdown
  createTerminus(server, {
    signal: 'SIGTERM',
  });

  // eslint-disable-next-line no-console
  server.listen(PORT, () => console.log(`Server running at :${PORT}`));
}

try {
  startServer();
} catch (error) {
  // eslint-disable-next-line no-console
  console.log(error);
}
