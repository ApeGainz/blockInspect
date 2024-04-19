## Block Inspect

### Built by Akshit Singh

##### Steps to run the application locally:

1. Get an API key for etherscan.io and polygonscan.com. The docs to get the API key for both the services are here:
   https://docs.etherscan.io/getting-started/viewing-api-usage-statistics and https://docs.polygonscan.com/getting-started/viewing-api-usage-statistics
2. Clone this project using git clone.
3. Install all dependencies using yarn install
4. Create a .env.local file and create these two environment variables:
   1. NEXT_PUBLIC_POLYGONSCAN_API_KEY=YOUR_API_KEY_HERE
   2. NEXT_PUBLIC_ETHERSCAN_API_KEY=YOUR_API_KEY_HERE
5. Run the command below on your terminal

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Hosted

This dApp is deployed at vercel: https://block-inspect.vercel.app/

## Notes

The API from etherscan and polygonscan can be surprisingly slow at times.
I also made use of Wagmi hooks to interact with Polygon and Ethereum.
