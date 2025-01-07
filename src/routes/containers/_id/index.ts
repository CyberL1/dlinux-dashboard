import type {
  Container,
  RemoveContainerParams,
  RemoveContainerQuery,
} from "#src/types/Container.ts";
import { getContainer } from "#src/utils/containers.ts";
import type { FastifyInstance, FastifyRequest } from "fastify";

export default (fastify: FastifyInstance) => {
  fastify.get("/", (req: FastifyRequest<{ Params: Container }>) => {
    const container = getContainer(req.params.id);
    return container.inspect();
  });

  fastify.delete(
    "/",
    async (
      req: FastifyRequest<{
        Params: RemoveContainerParams;
        Querystring: RemoveContainerQuery;
      }>,
    ) => {
      const container = getContainer(req.params.id);

      await container.remove({ force: req.query.force === "true" });
      return container;
    },
  );
};
