import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import {
  CHAIN_ID,
  CHAIN_NAME,
  WHITELIST_CONTRACT_ADDRESS,
  abi
} from '../constants';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import {
  useAccount,
  useProvider,
  useSigner,
  useContract,
  useNetwork
} from 'wagmi';

export default function Home() {
  // keep track wheter wallet is connected
  const [walletConnected, setWalletConnected] = useState(false);

  // keep track wheter current address has joined the whitelist
  const [joinedWhitelist, setJoinedWhiteList] = useState(false);

  const [numberOfWhitelisted, setNumberOfWhitelisted] = useState(0);

  // set to true if waiting for transaction to get mined
  const [loading, setLoading] = useState(false);

  const { data: account } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { activeChain } = useNetwork();

  const signerContract = useContract({
    addressOrName: WHITELIST_CONTRACT_ADDRESS,
    contractInterface: abi,
    signerOrProvider: signer
  });

  const providerContract = useContract({
    addressOrName: WHITELIST_CONTRACT_ADDRESS,
    contractInterface: abi,
    signerOrProvider: provider
  });

  /**
   * addAddressToWhitelist: Adds the current connected address to the whitelist
   */
  const addAddressToWhitelist = async () => {
    try {
      // call function from contract
      const tx = await signerContract.addAddressToWhiteList();

      // wait for transaction to get mined
      setLoading(true);
      await tx.wait();
      setLoading(false);

      await getNumberOfWhitelisted();
      setJoinedWhiteList(true);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * getNumberOfWhitelisted:  gets the number of whitelisted addresses
   */
  const getNumberOfWhitelisted = async () => {
    try {
      const _numberOfWhitelisted =
        await providerContract.numAddressesWhitelisted();
      setNumberOfWhitelisted(_numberOfWhitelisted);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * checkIfAddressInWhitelist: Checks if the address is in whitelist
   */
  const checkIfAddressInWhitelist = async () => {
    try {
      const _joinWhitelist = await providerContract.whitelistedAddresses(
        account.address
      );
      setJoinedWhiteList(_joinWhitelist);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * connectWallet: Connects the wallet, e.g.: MetaMask
   */
  const connectWallet = async () => {
    try {
      if (account) {
        setWalletConnected(true);
        setJoinedWhiteList(false);
        if (activeChain.id === CHAIN_ID) {
          checkIfAddressInWhitelist();
          getNumberOfWhitelisted();
        }
      } else {
        setWalletConnected(false);
        setJoinedWhiteList(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    connectWallet();
  }, [account, activeChain]);

  /**
   * renderButton: Returns a button based on the state of the dapp
   */
  const renderButton = () => {
    if (walletConnected) {
      if (joinedWhitelist) {
        return (
          <div className={styles.description}>
            Thanks for joining the Whitelist !
          </div>
        );
      } else if (loading) {
        return <button className={styles.button}>Loading...</button>;
      } else if (account && activeChain.id === CHAIN_ID) {
        return (
          <button onClick={addAddressToWhitelist} className={styles.button}>
            Join the Whitelist
          </button>
        );
      }
    }
  };

  const renderInfo = () => {
    if (walletConnected) {
      if (activeChain && activeChain.id === CHAIN_ID) {
        return (
          <div className={styles.description}>
            {numberOfWhitelisted} have already joined the Whitelist !
          </div>
        );
      } else {
        return (
          <div className={styles.error}>
            {`Wrong Network ! Connect to ${CHAIN_NAME} testnet`}
          </div>
        );
      }
    }
  };

  return (
    <div>
      <Head>
        <title>Whitelist Dapp</title>
        <meta name="description" content="Whitelist-Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>Welcome to Crypto Devs !</h1>
          <div className={styles.description}>
            It&apos;s an NFT collection for developers in Crypto.
          </div>
          {renderInfo()}
          <ConnectButton />
          {renderButton()}
        </div>
        <div>
          <img
            className={styles.image}
            src="./crypto-devs.svg"
            alt="dev-logo"
          />
        </div>
      </div>
      <footer className={styles.footer}>Made with &#10084; by josayko</footer>
    </div>
  );
}
