export type TUser = {
          userId: string;
          role: string;
          iat: number;
          exp: number;
};

export type TAuthState = {
          user: undefined | TUser;
          token: undefined | string;
};

export type TUserDetails = {
          email: string,
          username: string,
          role: string,
          image: string,
}