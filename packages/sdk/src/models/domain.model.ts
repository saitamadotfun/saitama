export type Domain = {
  id: string;
  origin: string;
  site: string;
  createdAt: string;
  updatedAt: string;
};

export type DomainExist = {
  origin: string;
  exist: boolean;
  free: boolean;
};

