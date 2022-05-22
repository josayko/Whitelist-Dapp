# Whitelist Dapp

A simple Dapp which user can connect their wallet an register their address to a whitelist.

> The original project is from [LearnWeb3DAO - Whitelist Dapp](https://github.com/LearnWeb3DAO/Whitelist-Dapp)

- Branch `v1.0` is basically the same code
- `main` branch differs from the original with the use of [Rainbow Kit](https://github.com/rainbow-me/rainbow) and [wagmi](https://github.com/tmm/wagmi) instead of `web3Modal`

- The app has been deployed with Vercel at
  https://whitelist-dapp-teal-seven.vercel.app, but the the limit of whitelisted addresses has been set to 10
- You can deploy a new instance of the smart contract and run the frontend app locally if the limit has been reached

## Get started

#### Prerequisites

- `node` >= 16, `yarn` >= 1.22

#### Clone repository

```bash
$ git clone https://github.com/josayko/Whitelist-Dapp.git
```

#### Install dependencies

```bash
$ cd Whitelist-Dapp/app
$ yarn
```

#### Run locally

1. Create a `.env.local` file in `app/` directory and set your `ALCHEMY_ID`
   > You need to create a new app on [Alchemy](https://www.alchemy.com) to get an API KEY (or ALCHEMY_ID). Alternatively you can create an app on [Infura](https://infura.io).

```bash
# app/.env.local
ALCHEMY_ID=<YOUR_API_KEY>
```

2. Build and run the app

```bash
$ yarn build
$ yarn start
```

> App is running on http://localhost:3000

## How to deploy a new instance of the smart contract

- Check this project's [hardhat directory](https://github.com/josayko/Whitelist-Dapp/tree/main/hardhat)

## Author

- Jonny Saykosy <josayko@pm.me>

## License & copyright

© Jonny Saykosy

Licensed under the [MIT License](LICENSE).
