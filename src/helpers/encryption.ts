import axios from "axios";
import {
  encryptWithPublicKey,
  publicKeyByPrivateKey,
  cipher,
  decryptWithPrivateKey,
} from "eth-crypto";

export async function sendAndEncrypt(text: string) {
  const request = await axios.post("/api/arseed-and-encrypt", { text });
  return request.data;
}

export async function encryptEVMMessage(message: string) {
  try {
    const originalMessage = message;
    const publicKey = publicKeyByPrivateKey("0x" + process.env.ETH_PK);
    const encryptedMessageObject = await encryptWithPublicKey(
      publicKey,
      originalMessage
    );
    const encryptedMessageString = cipher.stringify(encryptedMessageObject);
    return encryptedMessageString;
  } catch (error) {
    return false;
  }
}

export async function decryptEVMMessageWeb(hash: string) {
  const request = await axios.post("/api/decrypt", { hash });
  return request.data;
}

export async function decryptEVMMessageNode(hash: string) {
  try {
    const decryptedMessageObject = cipher.parse(hash);
    const decryptedMessage = await decryptWithPrivateKey(
      "0x" + process.env.ETH_PK!,
      decryptedMessageObject
    );
    return decryptedMessage;
  } catch (error) {
    console.log(error);
    return false;
  }
}
