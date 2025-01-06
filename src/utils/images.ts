import Dockerode from "dockerode";

const dockerode = new Dockerode();

export const getImages = () => {
  const images = dockerode.listImages({
    filters: { reference: ["code-containers/*"] },
  });

  return images;
};

export const inspectImage = async (name: string) => {
  const image = dockerode.getImage(`code-containers/${name}`);
  return image.inspect();
};
