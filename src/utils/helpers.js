function decodeHexArray(hexString) {
  // return hexArray.map((hexString) => {
    // Remove any '0x' prefix if present
    if (hexString.startsWith('0x') || hexString.startsWith('0X')) {
      hexString = hexString.slice(2);
    }

    // Ensure even length of hex string
    if (hexString.length % 2 !== 0) {
      console.error('Invalid hex string:', hexString);
      return null;
    }

    // Convert hex string to ASCII
    let asciiString = '';
    for (let i = 0; i < hexString.length; i += 2) {
      const byte = hexString.substr(i, 2);
      const charCode = parseInt(byte, 16);
      asciiString += String.fromCharCode(charCode);
    }

    // Try to parse the ASCII string as JSON
    try {
      return JSON.parse(asciiString);
    } catch (e) {
      // If parsing fails, return the ASCII string as is
      return asciiString;
    }
  // });
}

export {
  decodeHexArray,
}