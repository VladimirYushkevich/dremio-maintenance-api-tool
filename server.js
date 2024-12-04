const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./openapi.yaml');

const app = express();

const authkey = process.env.AUTH_TOKEN;

// Proxy middleware
app.use('/api', createProxyMiddleware({
  target: 'http://host.docker.internal:9047/api',
  changeOrigin: true,
  on: {
    proxyReq: (proxyReq, req) => {
      proxyReq.setHeader('Authorization', authkey);
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.setHeader('Accept', 'application/json');
      console.log(`Request: ${req.method}: ${req.url}`);
    },
    error: (err, req, res) => {
      console.error('Proxy error:', err);
      res.status(500).json({error: 'Proxy error', details: err.message});
    },
  },
}));

// Swagger middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handling middleware
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => {
  console.log(`Authorization key is resolved to: ${authkey}`);
  console.log('Server is running on http://localhost:3000');
  console.log('Swagger UI is available at http://localhost:3000/api-docs');
});