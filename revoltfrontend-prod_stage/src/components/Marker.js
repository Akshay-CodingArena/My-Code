import { useEffect } from "react";

const Marker = ({
  id,
  location,
  title,
  description,
  image,
  isOpen,
  onClick,
  setOpenIndex,
}) => {
  const WIDTH = 300;
  const GAP = 40;
  const HEIGHT_GAP = 40;
  const MAX_HEIGHT = 320;
  const SPLIT = id.split("-");
  const SLIDE_INDEX = SPLIT[1];
  const MODAL_INDEX = SPLIT[2];
  const PREV_INDEX = parseInt(MODAL_INDEX) - 1;
  const NEXT_INDEX = parseInt(MODAL_INDEX) + 1;

  let x = location.left;
  let y = location.top;
  x = parseFloat(x.replace("%", ""));
  y = parseFloat(y.replace("%", ""));
  let leftAfter = x;
  const ModalStyle = {
    ...location,
    position: "absolute",
    background: "white",
    height: isOpen ? MAX_HEIGHT : "0",
    width: `${WIDTH}px`,
    borderRadius: "8px",
    padding: isOpen ? "33px 10px 10px 10px" : "0",
    maxHeight: "60%",
    overflowY: isOpen ? "auto" : "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    transition: "height 0.3s ease, opacity 0.3s ease",
    pointerEvents: isOpen ? "auto" : "none",
    borderBottom: "4px solid #50abf1",
    opacity: isOpen ? 1 : 0,
    gap: "15px",
    zIndex: 99999,
  };

  if (document.documentElement.clientWidth > 750) {
    if (x >= 50) {
      ModalStyle.left = `calc(${x}% - ${WIDTH + GAP / 2}px)`;
      ModalStyle.boxShadow = "-10px 4px 20px rgba(0, 0, 0, 0.2)";
      leftAfter = 0;
    } else {
      ModalStyle.left = `calc(${x}% + ${GAP}px)`;
      ModalStyle.boxShadow = "10px 4px 20px rgba(0, 0, 0, 0.2)";
      leftAfter = 1;
    }
  }

  useEffect(() => {
    let modalContainer = document?.getElementById(id);
    if (modalContainer) {
      let { height, top } = modalContainer.getBoundingClientRect();
      let diff = window.innerHeight - (top + height);
      if (window.innerWidth <= 768) {
        modalContainer.style.left = "auto";
        modalContainer.style.right = "0px";
        modalContainer.style.top = "auto";
        modalContainer.style.bottom = "-150px";
        modalContainer.style.maxHeight = "80vh";
      } else {
        if (y >= 60) {
          modalContainer.style.top = `calc(${y}% + (${diff - HEIGHT_GAP}px))`;
        } else if (y >= 50) {
          modalContainer.style.top = `calc(${y}% + (${diff - HEIGHT_GAP}px))`;
        } else {
          modalContainer.style.top = `calc(${y}% - ${GAP}px)`;
        }
      }

      const markerContainer = document.querySelector(`.marker-${id}`);
      if (markerContainer) {
        console.log("Marker container details:", markerContainer?.getBoundingClientRect(), id);
      }
    }
  }, [isOpen]);

  return (
    <>
      <div
        id={`marker-${id}`}
        className="marker-pos"
        style={{ ...location }}
        onClick={onClick}
      >
        <div
          className={isOpen ? `marker-icon-wrapper-fixed` : `marker-icon-wrapper`}
        ></div>
        <div className="marker-icon">+</div>
      </div>
      {isOpen ? (
        <>
          <div
            id={"notche" + id}
            className="marker-container-notche"
            style={{
              position: "absolute",
              top: `calc(${location.top} + 8px)`,
              left: leftAfter
                ? `calc(${ModalStyle.left} - 5px )`
                : `calc(${ModalStyle.left} + ${WIDTH}px - 5px )`,
            }}
          ></div>
          <div
            id={id}
            className="marker-container"
            style={ModalStyle}
          >
            <div
            className="marker-pointer"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                fontWeight: "bold",
                position: "absolute",
                left: '-10px',
                top: '10px'
              }}
            >
              <p onClick={() => setOpenIndex(`${SLIDE_INDEX}-${PREV_INDEX}`)}>
                <i className="fa fa-angle-left"></i>
              </p>
              <p onClick={() => setOpenIndex(`${SLIDE_INDEX}-${NEXT_INDEX}`)}>
                <i className="fa fa-angle-right"></i>
              </p>
              <p onClick={() => setOpenIndex(null)} >
                <i style={{fontSize:"14px"}} className="fa fa-close" />
              </p>
            </div>
            <h1 className="modal-container-text">{title}</h1>
            <img
              className="modal-container-img"
              style={{ height: "120px" }}
              src={image}
              alt={title}
            />
            <p className="modal-container-p">{description}</p>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Marker;
