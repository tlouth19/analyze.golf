export const getPlayer = (): HTMLVideoElement => {
  try {
    const player = document.getElementsByTagName("video")[0];
    return player;
  } catch (err) {
    throw Error("Player not found");
  }
};
