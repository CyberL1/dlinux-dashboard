import createContainerSchema from "#src/schemas/createContainerSchema.ts";
import type { CreateContainerBody } from "#src/types/Container.ts";
import { createContainer, getContainers } from "#src/utils/containers.ts";
import type { FastifyInstance, FastifyRequest } from "fastify";

export default (fastify: FastifyInstance) => {
  fastify.get("/", () => {
    return getContainers();
  });

  fastify.post(
    "/",
    { schema: createContainerSchema },
    async (req: FastifyRequest<{ Body: CreateContainerBody }>) => {
      const container = await createContainer({ image: req.body.image });
      container.start();

      return container;
    },
  );
};
