export type User = {
  id: string;
  uuid: string;
  firstName?: string;
  lastName?: string;
  email: string;
  metadata?: {
    bumfiCustomerId: string;
  };
  admin: boolean;
};

export type UserAndToken = {
  token: string;
  authToken: string;
  user: User;
};
