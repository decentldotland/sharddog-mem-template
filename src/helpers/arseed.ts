import axios from "axios";
import { genNodeAPI } from "arseeding-js";

import { EverPayResponse, SendAndPayInterface } from "../types/everpay";
import { arseedURL } from "@/constants";

export async function uploadFileWeb(
  file: File,
  uploadUrl = "/api/upload"
): Promise<any> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    formData.append("file", file);
    formData.append("type", file.type);

    xhr.open("POST", uploadUrl, true);
    xhr.setRequestHeader("filename", file.name);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded * 100) / event.total);
        console.log(`Current progress:`, progress);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject(new Error("Upload failed"));
      }
    };

    xhr.onerror = () => {
      reject(new Error("Upload failed"));
    };

    xhr.send(formData);
  });
}

export async function uploadAndEncrypt(TXes: string[]) {
  const request = await axios.post("/api/upload-and-encrypt", {
    TXes,
  });
  return request.data;
}

export async function downloadAndDecrypt(hash: string) {
  try {
    const request = (await axios.post("/api/decrypt-upload", { hash })).data;
    return request;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function uploadFileToArseedNode(
  file: Buffer,
  dataType: string,
  debug = false
): Promise<EverPayResponse | null> {
  const fundingWalletPK = process.env.ETH_PK!;
  const currency = "AR";
  const instance = genNodeAPI(fundingWalletPK);
  const sendAndPay = instance.sendAndPay as SendAndPayInterface;

  const options = {
    tags: [{ name: "Content-Type", value: dataType }],
  };

  try {
    const result = await sendAndPay(arseedURL, file, currency, options, false);
    if (debug) {
      console.log(result);
    }
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}
