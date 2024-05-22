export const FileService = {
  fetchImage: async (url: string, fileName: string) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], fileName, { type: "image/jpeg" });
  },
};
