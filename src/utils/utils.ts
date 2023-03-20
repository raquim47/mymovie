export const makeImagePath = (id: string, format?: string) => {
  return `https://image.tmdb.org/t/p/${format ? format : 'original'}/${id}`;
}

export const openCenteredPopup = (url: string, width: number, height: number) => {
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;
  return window.open(
    url,
    "_blank",
    `width=${width},height=${height},left=${left},top=${top}`
  );
};