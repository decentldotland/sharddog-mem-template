import Busboy from "busboy";
import type { NextApiRequest, NextApiResponse } from "next";
import { uploadFileToArseedNode } from "@/helpers/arseed";

export const config = {
  api: {
    bodyParser: false,
  },
};

interface FileMetadata {
  filename: string;
  encoding: string;
  mimeType: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const busboy = Busboy({ headers: req.headers });

    const upload = new Promise<string>((resolve, reject) => {
      busboy.on(
        "file",
        (_: string, file: NodeJS.ReadableStream, metadata: FileMetadata) => {
          const chunks: any[] = [];
          file.on("data", (chunk) => {
            chunks.push(chunk);
          });

          file.on("end", async () => {
            const buffer = Buffer.concat(chunks);
            const type = metadata?.mimeType || "unknown";
            const result = await uploadFileToArseedNode(buffer, type);
            const itemId = result?.order?.itemId || "";
            resolve(itemId);
          });

          file.on("error", (error) => {
            reject(error);
          });
        }
      );

      req.pipe(busboy);
    });

    upload
      .then((itemId) => {
        res.status(200).json({ status: "success", data: itemId });
      })
      .catch((error) => {
        res.status(500).json({ status: "fail", message: error.message });
      });
  } else {
    res
      .status(405)
      .json({ status: "fail", message: "Only POST requests are accepted" });
  }
}
