import "dotenv/config";
import fastify from "fastify";
import { readdirSync } from "fs";
import "./proxy.ts";

const app = fastify();

const routes = readdirSync(`${import.meta.dirname}/routes`, {
  recursive: true,
});

for (let file of routes) {
  if (typeof file === "string") {
    if (!file.endsWith(".ts")) {
      continue;
    }

    file = file.replaceAll("\\", "/");

    let route = `/${file.split(".").slice(0, -1).join(".")}`;
    route = route.replaceAll("_", ":");

    const routePath = route.endsWith("/index") ? route.slice(0, -6) : route;
    console.log(`Loading route: ${routePath}`);

    app.register((await import(`./routes/${file}`)).default, {
      prefix: routePath,
    });
  }
}

await app.listen({ port: Number(process.env.PORT), host: process.env.HOST });

console.log("App ready on", `http://${process.env.HOST}:${process.env.PORT}`);
