import { getImages } from "#src/utils/images.ts";
import type { FastifyInstance, FastifyRequest } from "fastify";

export default (fastify: FastifyInstance) => {
  fastify.get("/", () => {
    return getImages();
  });
};
