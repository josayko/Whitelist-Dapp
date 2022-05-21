import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Web3Modal from 'web3modal';
import { providers, Contract } from 'ethers';
import { useEffect, useRef, useState } from 'react';
import { WHITELIST_CONTRACT_ADDRESS, abi } from '../constants';

export default function Home() {
  // keep track wheter wallet is connected
  const [walletConnected, setWalletConnected] = useState(false);

  // keep track wheter current address has joined the whitelist
  const [joinedWhitelist, setJoinedWhiteList] = useState(false);

  // set to true if waiting for transaction to get mined
  const [loading, setLoading] = useState(false);

  const [numberOfWhitelisted, setNumberOfWhitelisted] = useState(0);
  const web3ModalRef = useRef();

  /**
   * Returns a Provider or Signer object representing the Ethereum RPC with or
   * without the signing capabilities of the wallet attached
   *
   * A `Provider` is needed to interact with the blockchain -
   * reading transactions, reading balances, reading state, etc.
   *
   * A `Signer` is a special type of Provider used in case a `write` transaction
   * needs to be made to the blockchain, which involves the connected account
   * needing to make a digital signature to authorize the transaction being
   * sent. The wallet exposes a Signer API to allow your website to
   * request signatures from the user using Signer functions.
   *
   * @param {*} needSigner - True if you need the signer, default false otherwise
   */
  const getProviderOrSigner = async (needSigner = false) => {
    // connect to Provider, e.g: Metamask
    const provider = await web3ModalRef.current.connect();
    // get the underlying object of the Provider
    const web3Provider = new providers.Web3Provider(provider);

    // check if connected to Goerli network
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 5) {
      window.alert('Change the network to Goerli');
      throw new Error('Change network to Goerli');
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }

    return web3Provider;
  };

  /**
   * addAddressToWhitelist: Adds the current connected address to the whitelist
   */
  const addAddressToWhitelist = async () => {
    try {
      // get signer for write transaction on the blockchain
      const signer = await getProviderOrSigner(true);

      // create new instance of a contract with Signer (write access)
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      );

      // call function from contract
      const tx = await whitelistContract.addAddressToWhiteList();

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
      // get Provider from web3Modal
      // no Signer needed, reading state from blockchain
      const provider = await getProviderOrSigner();

      // contract instance with Provider (read-only access)
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        provider
      );

      // call numAddressesWhitelisted (uint8) from contract
      const _numberOfWhitelisted =
        await whitelistContract.numAddressesWhitelisted();
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
      // need Signer even though it is a read transaction
      // Signers are just special kinds of Providers
      const signer = await getProviderOrSigner(true);
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      );

      // get the address ssociated to the Signer
      const address = await signer.getAddress();

      // call the whitelistedAddresses (mapping) from the contract
      const _joinWhitelist = await whitelistContract.whitelistedAddresses(
        address
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
      // get the provider from web3Modal
      // when use for the first time, it prompts the user to connect wallet
      await getProviderOrSigner();
      setWalletConnected(true);

      checkIfAddressInWhitelist();
      getNumberOfWhitelisted();
    } catch (err) {
      console.error(err);
    }
  };

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
      } else {
        return (
          <button onClick={addAddressToWhitelist} className={styles.button}>
            Join the Whitelist
          </button>
        );
      }
    } else {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your wallet
        </button>
      );
    }
  };

  useEffect(() => {
    if (!walletConnected) {
      //  assign web3Modal instance to the reference object
      // `current` value is persisted throughout component lifetime
      web3ModalRef.current = new Web3Modal({
        network: 'hardhat',
        providerOptions: {},
        disableInjectedProvider: false
      });
      connectWallet();
    }
  }, [walletConnected]);

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
            It's an NFT collection for developers in Crypto.
          </div>
          <div className={styles.description}>
            {numberOfWhitelisted} have already joined the Whitelist
          </div>
          {renderButton()}
        </div>
        <div>
          <img className={styles.image} src="./crypto-devs.svg" />
        </div>
      </div>
      <footer className={styles.footer}>Made with &#10084; by josayko</footer>
    </div>
  );
}
