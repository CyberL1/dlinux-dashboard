import type { FastifyInstance } from "fastify";

export default (fastify: FastifyInstance) => {
  fastify.get("/", () => {
    return { appName: "code-containers" };
  });
};
