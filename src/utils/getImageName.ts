export const getFallBackImageName = (name: string) => {
          return name?.split("name=")[1]?.split("&")[0];
}