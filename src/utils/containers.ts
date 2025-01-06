import type { CreateContainerBody } from "#src/types/Container.ts";
import Dockerode from "dockerode";

const dockerode = new Dockerode();

export const getContainers = () => {
  const containers = dockerode.listContainers({
    filters: { label: ["code-containers.image"] },
    all: true,
  });

  return containers;
};

export const inspectContainer = (id: string) => {
  const container = dockerode.getContainer(id);
  return container.inspect();
};

export const createContainer = ({ image }: CreateContainerBody) => {
  const container = dockerode.createContainer({
    Image: `code-containers/${image}`,
    Labels: {
      "code-containers.image": image,
    },
  });

  return container;
};
