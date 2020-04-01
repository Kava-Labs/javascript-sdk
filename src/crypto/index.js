const bech32 = require("bech32");

// secp256k1 privkey is 32 bytes
const DECODED_ADDRESS_LEN = 20;

/**
 * Decodes an address in bech32 format.
 * @param {string} value the bech32 address to decode
 */
const decodeAddress = value => {
  const decodeAddress = bech32.decode(value);
  return Buffer.from(bech32.fromWords(decodeAddress.words));
};

/**
 * Checks whether an address is valid.
 * @param {string} address the bech32 address to decode
 * @param {string} hrp the prefix to check for the bech32 address
 * @return {boolean}
 */
const checkAddress = (address, hrp) => {
  try {
    if (!address.startsWith(hrp)) {
      return false;
    }

    const decodedAddress = bech32.decode(address);
    const decodedAddressLength = decodeAddress(address).length;
    if (
      decodedAddressLength === DECODED_ADDRESS_LEN &&
      decodedAddress.prefix === hrp
    ) {
      return true;
    }

    return false;
  } catch (err) {
    return false;
  }
};

module.exports.crypto = {
  decodeAddress,
  checkAddress
};
