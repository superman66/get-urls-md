// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import urlsMD from "urls-md";
import initMiddleware from "../../lib/InitMiddleware";

const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET"],
  })
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { site } = req.query;
  // Run cors
  await cors(req, res);
  try {
    const urls = await urlsMD(site);
    res.status(200).json(urls);
  } catch (error) {
    res.status(500).json({ error: "url 不合法" });
  }
}
