import type { Container, CreateContainerBody } from "#src/types/Container.ts";
import Dockerode from "dockerode";

const dockerode = new Dockerode();

export const getContainers = () => {
  const containers = dockerode.listContainers({
    filters: { label: ["code-containers.image"] },
    all: true,
  });

  return containers;
};

export const getContainer = (id: string) => {
  const container = dockerode.getContainer(id);
  return container;
};

export const createContainer = ({ name, image }: CreateContainerBody) => {
  const container = dockerode.createContainer({
    name,
    Image: `code-containers/${image}`,
    Labels: {
      "code-containers.image": image,
    },
  });

  return container;
};

export const getContainerResponse = async (container: Dockerode.Container) => {
  const inspect = await container.inspect();

  const response = {
    id: inspect.Id,
    name: inspect.Name.slice(1),
    image: inspect.Config.Image,
    status: inspect.State.Status,
    ip: inspect.NetworkSettings.Networks.bridge.IPAddress,
  } as Container;

  return response;
};
