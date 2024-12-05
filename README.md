# dremio-maintenance-api-tool
Utility to start swagger UI locally from open API yaml

## Usage
1. Clone the repository
2. Navigate in working directory: ```cd dremio-maintenance-api-tool```
3. Start dremio
4. Set environment variable:
   - ```export DREMIO_HOME=<path to dremio repo>```
   - ```export AUTH_TOKEN=<auth token>```(can be found in browser debug console)
5. Start Docker
6. Run the script: ```./start.sh```
7. Open browser and navigate to: ```http://localhost:3000/api-docs```