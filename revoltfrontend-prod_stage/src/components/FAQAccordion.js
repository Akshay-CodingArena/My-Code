import React, { useState } from "react";

import { Link } from "react-router-dom";
const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "How do I charge an electric scooter?",
      answer:
        "Ather has the largest Fast charging grid network in India for any 2 Wheeler OEM. There are 3 ways to charge an Ather EV Electric Scooter. The first is with the portable charger provided with your Ather scooter that can be plugged into any 5 amp socket at home, just like you charge your mobile phone. The second is through 2500+ fast-charging grids across the country that can give you 1.5 km range for every minute of charging. The third is at the select public spaces like apartment complexes, malls, university campuses and office buildings where Ather Neighbourhood charges are installed. To request for one to be installed in your building, contact us here.",
    },
    {
      question: "Can I use an electric scooter if I live in an apartment?",
      answer:
        "Yes. You just need a 5amp socket at your parking slot. Most apartments with a basic electric connection in the parking area are convenient for charging your Ather EV with the portable charger.",
    },
    {
      question:
        "Do I need a Drivers’ License, Helmet and Registration to use an electric scooter?",
      answer:
        "An Ather electric scooter is subject to the same Central & State road safety laws as any other scooter. Therefore, yes, a valid drivers’ license, registration & helmet are absolutely mandatory for riding an Ather Electric Scooter.",
    },
    {
      question: "How do I avail Government provided subsidies on EVs?",
      answer:
        "There are two types of subsidies. One is the FAME subsidy provided by the Ministry of Heavy Industries, and the second one is provided by few of the state governments. FAME subsidy is claimed by the manufacturers and customers only pay the reduced cost. For state subsidies where it exists, customers can submit the claims directly with the government and get the subsidy amount reimbursed directly to their bank accounts. It’s done online and is a very easy process. For more info, you can check with our product specialists at Ather Experience Center near you.",
    },
    {
      question: "Why do Electric Scooters have riding modes?",
      answer:
        "Ather 450 Electric scooters provide different riding modes to suit the riding needs of its customers. If you need more range, then you can choose Smart ECO or Eco Mode. If you need more acceleration and higher speed then you can switch to other models such as Ride, Sport, Zip or Warp. Warp and Zip modes offer highest acceleration and top speed.",
    },
    {
      question: "What is the cost of charging an electric scooter?",
      answer:
        "You can charge Ather Electric scooters at home using portable chargers provided with Ather electric scooters by connecting to a normal 5 amp socket that you generally use for mobile phones. The cost is standard electricity bill charges. Our fast charging network is also currently free to use in most places across India, except 5 states (Karnataka, Delhi, Maharashtra, Tamil Nadu and Telangana) where we charge ₹ 1 /Min.",
    },
    {
      question: "What is the cost of servicing an electric scooter?",
      answer:
        "Ather has one of the best and largest service networks in the country. The cost of servicing electric scooters is way lesser than petrol scooters as there are fewer moving parts and they don’t have consumables such as engine oil or filters.",
    },

    // {
    //     question: "Can’t find what you’re looking for? Visit our FAQs page",
    // },
  ];

  return (
    <div className="accordion_main">
      <div className="container">
        <div className="row">
          <div className="col-4 col-md-4 col-lg-4 text-left">
            <h3>
              {" "}
              Your questions, <br />
              answered
            </h3>
          </div>
          <div className="col-12 col-md-8 col-lg-8">
            <div className="accordion">
              {faqData.map((item, index) => (
                <div className="accordion-item" key={index}>
                  <div
                    className={`accordion-title ${activeIndex === index ? "active" : ""}`}
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className="accordion-text">{item.question}</span>
                    <span className="accordion-icon">
                      {activeIndex === index ? "-" : "+"}
                    </span>
                  </div>
                  <div
                    className={`accordion-content ${activeIndex === index ? "open" : ""}`}
                  >
                    <p>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <Link to="/Faq">View All FAQs</Link>
            </div>
          </div>
        </div>
        {/* <div ClassName="sticky-heading"> Can’t find what you’re looking for? <br /> Visit our FAQs page </div> */}
      </div>
    </div>
  );
};

export default FAQAccordion;
