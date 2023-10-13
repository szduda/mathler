# Mathler
Find the hidden equation
---
### Development

```bash
yarn dev
```
### E2E tests
#### .local.env
```bash
FIX_SEED=0
```
#### build * serve + test
```bash
yarn build && yarn start
yarn test:e2e
```

### Production

```bash
yarn build && yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
