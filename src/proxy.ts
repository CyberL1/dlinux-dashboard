import fastify from "fastify";
import { getContainer } from "./utils/containers.ts";

const app = fastify();

app.all(
  "/*",
  { constraints: { host: new RegExp(`.*\.${process.env.PROXY_DOMAIN}`) } },
  async (req) => {
    const subdomains = req.headers.host.split(".");

    const port = subdomains[0].startsWith("port-")
      ? subdomains[0].slice(5)
      : 80;

    const containerName = subdomains[subdomains[0].startsWith("port-") ? 1 : 0];

    const { NetworkSettings } = await getContainer(containerName).inspect();
    const { IPAddress: ip } = NetworkSettings;

    const proxyRequest = await fetch(`http://${ip}:${port}${req.url}`, {
      headers: req.headers,
      method: req.method,
    });

    const proxyResponse = await proxyRequest.text();
    return proxyResponse;
  },
);

await app.listen({
  port: Number(process.env.PROXY_PORT),
  host: process.env.HOST,
});

console.log(
  "Proxy ready on",
  `http://${process.env.HOST}:${Number(process.env.PROXY_PORT)}`,
);
