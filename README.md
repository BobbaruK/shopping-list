## Getting Started

1. Set the env file in the root of the project - there is a sample [here](./.env.sample)
2. Set the env file in the frontend app (webapp) - there is a sample [here](/webapp/.env.sample)

3. Run the server:

```bash
# dev
docker compose -f docker-compose.dev.yml up --watch
# prod multi stage
docker compose -f docker-compose.docker-compose.prod-without-multistage.yml up
# prod
docker compose -f docker-compose.docker-compose.prod.yml up
```
