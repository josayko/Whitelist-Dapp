// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

contract Whitelist {
    // max number of whitelisted addresses allowed
    uint8 public maxWhitelistedAddresses;

    // if address is whitelisted => true
    mapping(address => bool) public whitelistedAddresses;

    // number of whitelisted addresses
    uint8 public numAddressesWhitelisted;

    // set max number of whitelisted addresses at deployment
    constructor(uint8 _maxWhitelistedAddresses) {
        maxWhitelistedAddresses = _maxWhitelistedAddresses;
    }

    /**
     * addAddressToWhitelist - This function adds the address of the sender to
     * the whitelist
     */
    function addAddressToWhiteList() public {
        // check if already been whitelisted
        require(
            !whitelistedAddresses[msg.sender],
            "Sender has already been whitelisted"
        );
        // check if max number of whitelisted addresses is reached
        require(
            numAddressesWhitelisted < maxWhitelistedAddresses,
            "More addresses cant be added, limit reached"
        );
        // add to whitelist
        whitelistedAddresses[msg.sender] = true;
        numAddressesWhitelisted += 1;
    }
}
