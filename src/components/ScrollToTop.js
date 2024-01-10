import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const ScrollToTop = () => {
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });

    // Cleanup the listener when the component is unmounted
    return () => {
      unlisten();
    };
  }, [history]);

  return null;
};

export default ScrollToTop;
