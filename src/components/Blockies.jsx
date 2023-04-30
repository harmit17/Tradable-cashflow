import Blockies from "react-blockies";

export const myBlockies = (item) => (
  <Blockies
    seed={String(item)}
    size={10}
    scale={2}
    color="#402380"
    bgColor="#ffffff"
    spotColor="#abc"
    className="identicon"
  />
);
