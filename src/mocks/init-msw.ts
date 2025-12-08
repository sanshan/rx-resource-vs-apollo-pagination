export async function initMsw() {
  // Guard for SSR/Node and no SW capability
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

  // Dynamic imports keep bundle lean
  const [{ setupWorker }, { handlers }] = await Promise.all([
    import('msw/browser'),
    import('./handlers'),
  ]);

  // Create worker with your handlers
  const worker = setupWorker(...handlers);

  // Helpful request/response logging
  worker.events.on('request:start', ({ request }) => {
    // Debug: see every request that SW observes
    console.debug('[MSW][request:start]', request.method, request.url);
  });
  worker.events.on('request:match', ({ request }) => {
    console.debug('[MSW][request:match]', request.method, request.url);
  });
  worker.events.on('request:unhandled', ({ request }) => {
    // If you see your /graphql here — нет подходящего хэндлера
    console.warn('[MSW][request:unhandled]', request.method, request.url);
  });
  worker.events.on('request:end', ({ request }) => {
    console.debug('[MSW][request:end]', request.method, request.url);
  });

  await worker.start({
    // VERY IMPORTANT: serve from root so scope покрывает всё приложение
    serviceWorker: { url: '/mockServiceWorker.js' },

    // Пока отлаживаем — предупреждай об необработанных запросах
    onUnhandledRequest: 'warn',
  });

  // Optional: see what handlers are active
  // @ts-expect-error printHandlers exists in MSW for debugging
  worker.printHandlers?.();

  // Visual hint

  console.log('%cMSW started', 'color:#22c55e');

  return worker;
}
