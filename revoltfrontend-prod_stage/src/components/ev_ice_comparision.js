import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { duration } from "moment/moment";
import { Link } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const wrapper = () => {
  let id;
  var isExecuted = false;
  return () => {
    let audioElement = document.getElementById("audio-outer4");
    if (id) {
      clearInterval(id);
    }
    id = setTimeout(() => {
      audioElement.pause();
      audioElement.currentTime = 0;
      isExecuted = true;
    }, 2500);
  };
};

// const wrapper2 = ()=>{
//   let id
//   var isExecuted = false
//   return ()=>{
//     let audioElement = document.getElementById("audio-outer4")
//     if(id){
//       clearInterval(id)
//     }
//     audioElement.play()
//     // id = setTimeout(()=>{
//     //   audioElement.pause()

//     // },2500)
//   }
// }
const pauseSound = wrapper();
// const playSound = wrapper2()

const EvStatistics = () => {
  const [state, setState] = useState({
    minTravel: 15,
    maxTravel: 150,
    dailyTravel: 50,
    pertrolPrice: 100,
    electricityPrice: 6,
    averageICE: 60,
    averageElectric: 31.25,
  });

  const [toggle, setToggle] = useState(false);

  const dailyTravel = useRef(50);

  const [isMonth, setIsMonth] = useState(true);
  const monthlyDistance = state.dailyTravel * 30;
  let cost_ice = parseFloat(state.pertrolPrice / state.averageICE);
  let cost_ev = parseFloat(state.electricityPrice / state.averageElectric);
  console.log("pricess are", cost_ice, cost_ev);
  const ice_cost = parseInt(monthlyDistance * cost_ice);
  const electric_cost = parseInt(monthlyDistance * cost_ev);
  const savings = ice_cost - electric_cost;
  const [text, setText] = useState("");
  console.log(
    "total",
    monthlyDistance,
    state.averageElectric,
    state.electricityPrice
  );

  const numberFormatPrice = (value) => {
    let numberVal = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
    let result1 = numberVal.split("₹");
    let result2 = result1[1].split(".");
    let result =
      "₹ " + result2[0] + (parseInt(result2[1]) > 0 ? "." + result2[1] : "");
    return result;
  };

  const dataPoints = [
    {
      value: 0,
      label: numberFormatPrice(0),
    },
    {
      value: 1000,
      label: numberFormatPrice(1000),
    },
    {
      value: 2000,
      label: numberFormatPrice(2000),
    },
    {
      value: 3000,
      label: numberFormatPrice(3000),
    },
    {
      value: 4000,
      label: numberFormatPrice(4000),
    },
    {
      value: 5000,
      label: numberFormatPrice(5000),
    },
    {
      value: 6000,
      label: numberFormatPrice(6000),
    },
    {
      value: 7000,
      label: numberFormatPrice(7000),
    },
    {
      value: 8000,
      label: numberFormatPrice(8000),
    },
  ];

  const data = {
    labels: ["ICE Engine", "RV400"],
    datasets: [
      {
        label: "ICE Engine",
        data: [ice_cost, 0],
        backgroundColor: "#CC3B1E",
        barPercentage: 0.4,
      },
      {
        label: "RV400",
        data: [0, electric_cost],
        backgroundColor: "green",
        barPercentage: 0.4,
      },
      // {
      //   label: "SAVINGS",
      //   data: [0, savings],
      //   backgroundColor: "green",
      //   barPercentage: 0.4,
      // },
    ],
  };

  const options = {
    layout: {},
    animation: {
      duration: 500, // Animation duration in milliseconds
      easing: "easeInOutQuad", // Animation easing function
      // onComplete: function() {
      //   this.reset();
      // },
      // Additional property for starting from 0
      animateScale: true,
      animateRotate: true,
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            const value = context.parsed.y;
            // Prepend rupee symbol to the value
            label += numberFormatPrice(value.toFixed(2));
            return label;
          },
        },
      },
      title: {
        display: true,
        text: "ICE Two Wheeler vs RV400 Monthly Running Cost",
      },
      legend: {
        labels: {
          // generateLabels(chart) {
          //     const labels = chart.data.labels.map((label, index) => {
          //       const values = chart.data.datasets.map((dataset)=>{
          //         return dataset.data[index];
          //       })
          //      return `₹ ${chart.data.datasets[0].data[index]}`; // Add "%" symbol
          //     });
          //     return chart;
          //   }
        },
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        beforeBuildTicks: (scale) => {
          console.log("Chhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh", scale);
          scale.max = 8000;
        },
        stacked: true,
        ticks: {
          autoSkip: false,
          // count: 7,
          padding: 0,
          height: 100,
          suggestedMin: 0, // Minimum value on the Y-axis
          suggestedMax: 8000, // Maximum value on the Y-axis
          min: 0,
          max: 8000,
          beginAtZero: true,
          stepSize: Math.ceil(1000),
          callback: function (value, index, values) {
            const customTicks = [
              0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000,
            ];
            if (index == 0) {
              for (let i = 0; i < 9; i++) {
                values[i] = dataPoints[i];
              }
            }
            return customTicks.includes(value)
              ? numberFormatPrice(value)
              : null;
          },
        },
      },
    },
  };

  useEffect(() => {
    let draggable;
    if (document.documentElement.clientWidth > 700) {
      draggable = document.querySelectorAll(
        ".savingSlider.rangeslider-horizontal  .rangeslider__handle"
      )[1];
    } else {
      draggable = document.querySelectorAll(
        ".savingSlider.rangeslider-horizontal  .rangeslider__handle"
      )[0];
    }
    const mouseDownCallback = function (event) {
      event.preventDefault();
      let audioElement = document.getElementById("audio-outer4");
      audioElement.currentTime = 0; // Set the current playback time to the beginning
      audioElement.play().catch(function (error) {
        console.log("Playback failed:", error);
      });
      draggable.classList.add("dragging");
    };
    const mouseUpCallBack = (event) => {
      event.preventDefault();
      let audioElement = document.getElementById("audio-outer4");
      audioElement.pause();
      draggable.classList.remove("dragging");
    };
    draggable?.addEventListener("mousedown", mouseDownCallback);
    draggable?.addEventListener("touchstart", mouseDownCallback, false);

    draggable?.addEventListener("mouseup", mouseUpCallBack);
    draggable?.addEventListener("touchend", mouseUpCallBack, false);

    return () => {
      draggable?.removeEventListener("mousedown", mouseDownCallback);
      draggable?.removeEventListener("mouseup", mouseUpCallBack);
      draggable?.removeEventListener("touchend", mouseUpCallBack);
      draggable?.removeEventListener("touchstart", mouseDownCallback);
    };
  }, []);

  const numberFormat = (value) => {
    let result = value + "KM";
    return result;
  };

  const axes = useMemo(
    () => [
      { primary: true, type: "ordinal", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );

  const series = useMemo(
    () => ({
      type: "bar",
    }),
    []
  );

  useLayoutEffect(() => {
    //   // let sliderWidth = document.querySelector(".rangeslider.rangeslider-horizontal.savingSlider").getBoundingClientRect().width
    //   // if(document.querySelector(".rangeslider__fill") && dailyTravel.current !=state.dailyTravel){
    //   //   let width = document.querySelector(".rangeslider__fill").getBoundingClientRect().width
    //   //   console.log("width is", width)
    //   //   document.querySelector(".rangeslider__fill").style.width = ( width+((state.dailyTravel/state.maxTravel)*37.5) )+"px"
    //   //   let color = ((state.maxTravel - state.dailyTravel)/state.maxTravel) - 150
    //   //   document.querySelector(".rangeslider__fill").style.backgroundColor = `rgb(${color} ${color} ${color})`
    //   //   dailyTravel.current =state.dailyTravel
    //   // }
    // if(document.documentElement.clientWidth<700){
    //   playSound()
    // }
    showText(savings * 12);
    pauseSound();
  }, [state]);

  const showText = (savingsAnnually) => {
    console.log("Savings aresavings are ", savingsAnnually);
    let temp = "";
    if (savingsAnnually <= 25000) {
      temp = "You've saved enough to shop freely this Diwali!";
    } else if (savingsAnnually > 25000 && savingsAnnually <= 50000) {
      temp = "A new phone, from all the savings on petrol.";
    } else if (savingsAnnually > 50000 && savingsAnnually <= 80000) {
      temp = "Your petrol savings can fund a family trip to Thailand!";
    }
    console.log("here", temp);
    // setText(temp);
  };

  return (
    <div>
      <audio controls id="audio-outer4">
        <source id="audio-play4" src="/audio/Rebel.mp3" />
      </audio>
      <div className="container mt-4 mb-4">
        <h3>EV Savings Calculator</h3>
        <div className="row">
          <div className="col-12 col-md-7 ev_savings">
            <h6 className="pt-2 mb-4">Calculate Your EV Savings Today !</h6>
            <p>
              KMS Per Day <b>{state.dailyTravel} KMS</b>
            </p>
            <Slider
              className="savingSlider"
              key={`slider-${state.maxTravel / 2}`}
              min={state.minTravel}
              tooltip={false}
              max={state.maxTravel}
              step={1}
              labels={{
                [state.minTravel]: "" + numberFormat(state.minTravel),
                [state.maxTravel]: "" + numberFormat(state.maxTravel),
              }}
              value={state.dailyTravel}
              aria-label="Default"
              valueLabelDisplay="on"
              onChange={(v) => {
                setState({ ...state, dailyTravel: v });
              }}
              orientation="horizontal"
            />

            <div className="col-md-5 pt-5 ev_savings mobile">
              <table
                className="savingsEv ev-table"
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  borderRadius: "15px",
                }}
              >
                <tbody>
                  <tr>
                    <td className="ev-sub-headings">Petrol Bike/Scooter</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Monthly Petrol Cost*</td>
                    <td className="text-right-mobile ">
                      {numberFormatPrice(ice_cost)}
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="ev-sub-headings">Revolt Bike</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Monthly electricity cost*</td>
                    <td className="text-right-mobile ">
                      {numberFormatPrice(electric_cost)}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #d8d2d2" }}>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="ev-sub-headings">
                      Your savings on Revolt Bike
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Monthly Savings</td>
                    <td className="text-right-mobile ">
                      {numberFormatPrice(savings)}
                    </td>
                  </tr>
                  <tr className="ev-profit">
                    <td>Annual Savings</td>
                    <td className="text-right-mobile ">
                      {numberFormatPrice(savings * 12)}
                    </td>
                  </tr>
                  {/* <tr>
                  <td>Cost of Fuel/Charging</td>
                  <td>{numberFormatPrice(60 / 100)}/KM</td>
                  <td>
                    {numberFormatPrice(
                      state.electricityPrice / state.averageElectric,
                    )}
                    /KM
                  </td>
                </tr> */}
                  {/* <tr>
                  <td>Daily Expenditure</td>
                  <td>{numberFormatPrice(cost_ice * state.dailyTravel)}</td>
                  <td>{numberFormatPrice(cost_ev * state.dailyTravel)}</td>
                </tr>
                <tr>
                  <td>Monthly Expenditure</td>
                  <td>{numberFormatPrice(ice_cost)}</td>
                  <td>{numberFormatPrice(electric_cost)}</td>
                </tr>
                <tr>
                  <td>Annual Expenditure</td>
                  <td>{numberFormatPrice(ice_cost * 12)}</td>
                  <td>{numberFormatPrice(electric_cost * 12)}</td>
                </tr> */}
                </tbody>
              </table>
              {/*           
              <div className="savings-summary-container">
                {/* <div className="thematicBreak"></div> */}
              {/*     <div className="savings-summary" style={{ width: "100%" }}>
                  <div className="savings-bg">
                    <div className="savings-container">
                      <h5 className="savings">{numberFormatPrice(savings)}</h5>
                      <p style={{ textAlign: "right" }}>Monthly Savings</p>
                    </div>
                    <div className="savings-container">
                      <h5 className="savings">
                        {numberFormatPrice(savings * 12)}
                      </h5>
                      <p>Yearly Savings</p>
                    </div>
                    <div className="savings-container">
                      <h5 className="savings">
                        {numberFormatPrice(savings * 12 * 3)}
                      </h5>
                      <p>3 Years Savings</p>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* <Bar
                height="220"
                data={data}
                axes={axes}
                series={series}
                options={options}
              /> */}
            </div>

            {/* <div className="savings-summary-container desktop">
              {/* <div className="thematicBreak"></div> */}
            {/*}  <div className="savings-summary" style={{ width: "100%" }}>
                <div className="savings-bg">
                  <div className="savings-container">
                    <h5 className="savings">{numberFormatPrice(savings)}</h5>
                    <p style={{ textAlign: "right" }}>Monthly Savings*</p>
                  </div>
                  <div className="savings-container">
                    <h5 className="savings">
                      {numberFormatPrice(savings * 12)}
                    </h5>
                    <p>Yearly Savings*</p>
                  </div>
                  <div className="savings-container">
                    <h5 className="savings">
                      {numberFormatPrice(savings * 12 * 3)}
                    </h5>
                    <p>3 Years Savings*</p>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <table className="savingsEv" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th></th>
                  <th>ICE</th>
                  <th>RV400</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cost of Fuel/Charging</td>
                  <td>{numberFormatPrice(60 / 100)}/KM</td>
                  <td>
                    {numberFormatPrice(
                      state.electricityPrice / state.averageElectric,
                    )}
                    /KM
                  </td>
                </tr>
                <tr>
                  <td>Daily Expenditure</td>
                  <td>{numberFormatPrice(cost_ice * state.dailyTravel)}</td>
                  <td>{numberFormatPrice(cost_ev * state.dailyTravel)}</td>
                </tr>
                <tr>
                  <td>Monthly Expenditure</td>
                  <td>{numberFormatPrice(ice_cost)}</td>
                  <td>{numberFormatPrice(electric_cost)}</td>
                </tr>
                <tr>
                  <td>Annual Expenditure</td>
                  <td>{numberFormatPrice(ice_cost * 12)}</td>
                  <td>{numberFormatPrice(electric_cost * 12)}</td>
                </tr>
              </tbody>
            </table> */}
            <p
              className="mt-5"
              style={{ color: "#999", marginTop: "20px", fontSize: "13px" }}
            >
              <strong>Note-</strong> For calculations, the fuel price is
              considered to be ₹100 per liter.
            </p>

            <p style={{ color: "#999", marginTop: "20px", fontSize: "11px" }}>
              <strong>*Disclaimer: </strong>The savings estimates provided by
              the EV Saving Calculator are approximate and intended for general
              informational purposes only. Actual savings may vary based on
              individual riding behavior, driving conditions, maintenance
              practices, vehicle efficiency, and other factors. Please use this
              tool as a guide and consult with professionals for personalized
              advice. We do not guarantee the accuracy or completeness of the
              results and are not liable for any discrepancies or decisions made
              based on this information.
            </p>

            {/* <hr style={{width:"60%",marginLeft:"20%",position:"relative"}}></hr> */}
            {/* <hr style={{width:"60%",marginLeft:"20%"}}></hr> */}
          </div>

          {/* <hr style={{width:"60%",marginLeft:"20%"}}></hr> */}

          <div
            className="col-md-5 pt-4 pb-4 ev_savings desktop"
            style={{
              backgroundColor: "white",
              height: "max-content",
              borderRadius: "15px",
            }}
          >
            <table className="savingsEv ev-table" style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td className="ev-sub-headings">Petrol Bike/Scooter</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Monthly Petrol Cost*</td>
                  <td>{numberFormatPrice(ice_cost)}</td>
                </tr>

                <tr>
                  <td className="ev-sub-headings">Revolt Bike</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Monthly electricity cost*</td>
                  <td>{numberFormatPrice(electric_cost)}</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #f3f3f3" }}>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="ev-sub-headings">
                    Your savings on Revolt Bike
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>Monthly Savings</td>
                  <td>{numberFormatPrice(savings)}</td>
                </tr>
                <tr className="ev-profit">
                  <td>Annual Savings</td>
                  <td>{numberFormatPrice(savings * 12)}</td>
                </tr>
                {/* <tr>
                  <td className="congrats ev-sub-headings" colSpan={2}>
                    {text}
                  </td>
                </tr> */}
                {/* <tr>
                  <td>Cost of Fuel/Charging</td>
                  <td>{numberFormatPrice(60 / 100)}/KM</td>
                  <td>
                    {numberFormatPrice(
                      state.electricityPrice / state.averageElectric,
                    )}
                    /KM
                  </td>
                </tr> */}
                {/* <tr>
                  <td>Daily Expenditure</td>
                  <td>{numberFormatPrice(cost_ice * state.dailyTravel)}</td>
                  <td>{numberFormatPrice(cost_ev * state.dailyTravel)}</td>
                </tr>
                <tr>
                  <td>Monthly Expenditure</td>
                  <td>{numberFormatPrice(ice_cost)}</td>
                  <td>{numberFormatPrice(electric_cost)}</td>
                </tr>
                <tr>
                  <td>Annual Expenditure</td>
                  <td>{numberFormatPrice(ice_cost * 12)}</td>
                  <td>{numberFormatPrice(electric_cost * 12)}</td>
                </tr> */}
              </tbody>
            </table>
          </div>
          <div className="col-sm-12">
            {/* <div className="link-more mt-2 mb-2 text-center">
              <Link className="sl-btn btn-book" to={"/book"}>
                Book Now
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EvStatistics);
