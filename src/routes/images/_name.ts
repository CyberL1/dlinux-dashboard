import type { Image } from "#src/types/Image.ts";
import { getImage } from "#src/utils/images.ts";
import type { FastifyInstance, FastifyRequest } from "fastify";

export default (fastify: FastifyInstance) => {
  fastify.get("/", (req: FastifyRequest<{ Params: Image }>) => {
    const image = getImage(req.params.name);
    return image.inspect();
  });
};
