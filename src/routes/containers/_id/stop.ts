import type { Container } from "#src/types/Container.ts";
import { getContainer, getContainerResponse } from "#src/utils/containers.ts";
import type { FastifyInstance, FastifyRequest } from "fastify";

export default (fastify: FastifyInstance) => {
  fastify.put("/", async (req: FastifyRequest<{ Params: Container }>) => {
    const container = getContainer(req.params.id);

    await container.stop();
    return getContainerResponse(container);
  });
};
