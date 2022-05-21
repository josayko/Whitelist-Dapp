import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Web3Modal from 'web3modal';
import { providers, Contract } from 'ethers';
import { useEffect, useRef, useState } from 'react';
import { WHITELIST_CONTRACT_ADDRESS, abi } from '../constants';

export default function Home() {
  // keep track wheter wallet is connected
  const [walletConnected, setWalletConnected] = useState(false);

  // keep track wheter current address has joined the whitelist
  const [joinedWhitelist, setJoinWhiteList] = useState(false);

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
    // connect to provider, e.g: Metamask
    const provider = await web3ModalRef.current.connect();
    // get the underlying object of the provider
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
  const addAddressToWhitelist = async () => {};

  return <div>Hello</div>;
}
