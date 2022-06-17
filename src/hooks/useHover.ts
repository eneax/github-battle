import * as React from "react";

const useHover = () => {
  const [hovering, setHovering] = React.useState(false);

  const onMouseOver = () => setHovering(true);
  const onMouseOut = () => setHovering(false);

  return [hovering, { onMouseOver, onMouseOut }];
};

export default useHover;
