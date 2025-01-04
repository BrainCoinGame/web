const assetMap = {
    js: 'application/javascript',
    css: 'text/css',
    html: 'text/html',
    png: 'image/png',
    jpg: 'image/jpeg',
    ico: 'image/x-icon',
  };
  
  async function handleRequest(request, env) {
    try {
      const url = new URL(request.url);
      let pathname = url.pathname;
  
      // Serve index.html for root path
      if (pathname === '/' || pathname === '') {
        const response = await env.ASSETS.get('index.html'); // Получаем index.html из assets
        if (!response) {
          throw new Error('index.html not found');
        }
        return new Response(response.body, {
          headers: { 'Content-Type': 'text/html' },
        });
      }
  
      // Remove leading slash if present
      pathname = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  
      // Try to fetch the file from assets (dist directory)
      const file = await env.ASSETS.get(pathname);
      if (!file) {
        // If file not found, return index.html for SPA routing
        const indexResponse = await env.ASSETS.get('index.html');
        if (!indexResponse) {
          throw new Error('index.html not found');
        }
        return new Response(indexResponse.body, {
          headers: { 'Content-Type': 'text/html' },
        });
      }
  
      // Get file extension
      const extension = pathname.split('.').pop().toLowerCase();
      const contentType = assetMap[extension] || 'text/plain';
  
      // Return the requested file
      return new Response(file.body, {
        headers: { 'Content-Type': contentType },
      });
    } catch (error) {
      // Return a proper error response
      return new Response(`Server Error: ${error.message}`, {
        status: 500,
        headers: { 'Content-Type': 'text/plain' },
      });
    }
  }
  
  addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event.request, event.target));
  });
  