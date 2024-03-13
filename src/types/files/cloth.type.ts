export type TCloth = {
          _id?: string;
          title: string;
          description: string;
          category: string;
          size: string[];
          image: {
                    url: string;
                    publicId: string;
          };
          createdAt?: string;
          updatedAt?: string;
}