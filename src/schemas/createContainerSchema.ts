import type { FastifySchema } from "fastify";

const createContainerSchema: FastifySchema = {
  body: {
    type: "object",
    properties: {
      image: { type: "string", minLength: 1 },
    },
    required: ["image"],
  },
};

export default createContainerSchema;
