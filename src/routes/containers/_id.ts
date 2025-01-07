import type { Container } from "#src/types/Container.ts";
import { inspectContainer } from "#src/utils/containers.ts";
import type { FastifyInstance, FastifyRequest } from "fastify";

export default (fastify: FastifyInstance) => {
  fastify.get("/", (req: FastifyRequest<{ Params: Container }>) => {
    return inspectContainer(req.params.id);
  });
};
