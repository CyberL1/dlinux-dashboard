export interface Container {
  id: string;
  name: string;
  image: string;
}

export interface CreateContainerBody {
  image: string;
}
