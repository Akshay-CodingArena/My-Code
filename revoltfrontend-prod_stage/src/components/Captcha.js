import { useEffect, useRef, memo } from "react";

const Captcha = ({ captchaRef }) => {
  const canvasRef = useRef();
  console.log(Math.random());
  console.log("Environment", process.env.REACT_APP_LOCAL_ENV);
  let rand1 =
    process.env.REACT_APP_LOCAL_ENV == "testing"
      ? 2
      : Math.ceil(Math.random() * 10);
  let rand2 =
    process.env.REACT_APP_LOCAL_ENV == "testing"
      ? 2
      : Math.ceil(Math.random() * 10);

  let ans = rand1 + rand2;

  useEffect(() => {
    if (canvasRef.current?.getContext("2d")) {
      const ctx = canvasRef?.current.getContext("2d");
      ctx.font = "bold 85px Montserrat";
      ctx.textAlign = "center";
      ctx.fillText(`${rand1} + ${rand2}`, 150, 95);
      captchaRef.current = { result: ans };
    } else {
      captchaRef.current = { result: ans };
    }
  }, []);

  const handleInputChange = (e) => {
    captchaRef.current = { ...captchaRef.current, entry: e.target.value };
  };
  return (
    <>
      <div className="captchaBlock">
        <canvas className="captchaBox" ref={canvasRef}></canvas>
        <span> = </span>
        <input
          className="form-control inputfield captchaInput"
          placeholder="Enter Captcha"
          id="captcha"
          type="text"
          onChange={handleInputChange}
        />
      </div>
    </>
  );
};

export default memo(Captcha);
