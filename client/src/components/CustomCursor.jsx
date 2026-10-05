import {
  useEffect,
  useRef,
} from "react";

import "./CustomCursor.css";


function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);


  useEffect(() => {

    const isTouchDevice =
      window.matchMedia(
        "(pointer: coarse)"
      ).matches;

    if (isTouchDevice) {
      return;
    }


    let mouseX = -100;
    let mouseY = -100;

    let ringX = -100;
    let ringY = -100;

    let animationFrame;


    /* =========================
       MOUSE POSITION
    ========================= */

    const handleMouseMove = (event) => {

      mouseX = event.clientX;
      mouseY = event.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };


    /* =========================
       SMOOTH FOLLOW
    ========================= */

    const animateCursor = () => {

      ringX +=
        (mouseX - ringX) * 0.18;

      ringY +=
        (mouseY - ringY) * 0.18;


      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate3d(${ringX}px, ${ringY}px, 0)`;
      }


      animationFrame =
        requestAnimationFrame(
          animateCursor
        );
    };


    /* =========================
       HOVER EFFECT
    ========================= */

    const handleMouseOver = (event) => {

      const interactive =
        event.target.closest(
          "a, button, .food-card, .premium-food-card, .carousel-card, .gallery-image"
        );

      if (
        interactive &&
        ringRef.current
      ) {
        ringRef.current.classList.add(
          "cursor-hover"
        );
      }
    };


    const handleMouseOut = (event) => {

      const interactive =
        event.target.closest(
          "a, button, .food-card, .premium-food-card, .carousel-card, .gallery-image"
        );

      if (
        interactive &&
        ringRef.current
      ) {
        ringRef.current.classList.remove(
          "cursor-hover"
        );
      }
    };


    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    document.addEventListener(
      "mouseover",
      handleMouseOver
    );

    document.addEventListener(
      "mouseout",
      handleMouseOut
    );


    animateCursor();


    return () => {

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      document.removeEventListener(
        "mouseover",
        handleMouseOver
      );

      document.removeEventListener(
        "mouseout",
        handleMouseOut
      );

      cancelAnimationFrame(
        animationFrame
      );
    };

  }, []);


  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor-dot"
      />

      <div
        ref={ringRef}
        className="custom-cursor-ring"
      />
    </>
  );
}


export default CustomCursor;