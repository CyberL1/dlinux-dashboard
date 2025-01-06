import type { Image } from "#src/types.ts";
import { inspectImage } from "#src/utils/images.ts";
import type { FastifyInstance, FastifyRequest } from "fastify";

export default (fastify: FastifyInstance) => {
  fastify.get("/", (req: FastifyRequest<{ Params: Image }>) => {
    return inspectImage(req.params.name);
  });
};
