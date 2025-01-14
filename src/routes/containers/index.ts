import createContainerSchema from "#src/schemas/createContainerSchema.ts";
import type { CreateContainerBody, Container } from "#src/types/Container.ts";
import {
  createContainer,
  getContainerResponse,
  getContainers,
} from "#src/utils/containers.ts";
import type { FastifyInstance, FastifyRequest } from "fastify";

export default (fastify: FastifyInstance) => {
  fastify.get("/", async () => {
    const containers = await getContainers();
    const containersResponse = [];

    for (const container of containers) {
      const response = {
        id: container.Id,
        name: container.Names[0].slice(1),
        image: container.Image,
        status: container.State,
      } as Omit<Container, "ip">;

      containersResponse.push(response);
    }

    return containersResponse;
  });

  fastify.post(
    "/",
    { schema: createContainerSchema },
    async (req: FastifyRequest<{ Body: CreateContainerBody }>) => {
      const container = await createContainer({ image: req.body.image });
      await container.start();

      return getContainerResponse(container);
    },
  );
};
