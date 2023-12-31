# ShardDog 🤝 MEM next.js example template


## Getting Started

First, install dependencies

```bash
npm i
```

Then, set up a .local.env file:

```bash
# These work out of the box
ETH_ADMIN_PK=0469abbe263700f44b2c28e3c74d8800d22da73a3f87cbd936c1af6dd8aecdd1
INDEXER_API_KEY=ozBDwHM.67a4cabe9501bbf167ad0f23f53f028b
```

We use [arseeding](https://github.com/everFinance/arseeding-js) for storing data. In order to use it, deposit some `$AR` token to your ETH address in the [everpay app](app.everpay.io). You won't need more than 0.01 $AR to upload around a megabyte. Check [ar-fees.arweave.dev](https://ar-fees.arweave.dev/) for how much you'll need.

Finally, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Functions and where to go from here

We've marked TODOs across the application so you could change parts and variables to your needs.
Additionally, we've left comments to detail how or why for the code.


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
