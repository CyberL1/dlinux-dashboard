export interface Container {
  id: string;
  name: string;
  image: string;
  status: string;
  ip: string;
}

export interface CreateContainerBody {
  name: string;
  image: string;
}

export interface RemoveContainerParams {
  id: string;
}

export interface RemoveContainerQuery {
  force: string;
}
