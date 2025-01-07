import type { Container } from "#src/types/Container.ts";
import { getContainer } from "#src/utils/containers.ts";
import type { FastifyInstance, FastifyRequest } from "fastify";

export default (fastify: FastifyInstance) => {
  fastify.get("/", (req: FastifyRequest<{ Params: Container }>) => {
    const container = getContainer(req.params.id);
    return container.inspect();
  });
};
