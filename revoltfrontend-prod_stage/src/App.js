import React, {
  Suspense,
  createElement,
  lazy,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import ImportScript from "./components/loadCustomJS";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import AOS from "aos";
import Loader from "./components/Loader";
import axios from "axios";
import Markdown from "markdown-to-jsx";
// import "aos/dist/aos.css";

// import { useIdleTimer } from "react-idle-timer";

import { URL_API } from "./constants/cartConstants";
import { axios as Axios } from "./utilities/axios";
import {
  listStateCityHub,
  listStateCityHub_SC,
  listStateCityHub_upgrade,
} from "./actions/productActions";
// import ImportScript from "./components/loadCustomJS";
// const CncCategortyRequests = lazy(() => import('../containers/inventory/cncCategoryRequests'));

import { signout } from "./actions/userActions";
import ThankYouCash from "./screens/ThankYouCash";
// const SpinWheel = lazy(() => import("./screens/SpinWheel"));
const ApplicantDetails = lazy(() => import("./screens/ApplicantDetails"));
const EvStatistics = lazy(() => import("./components/ev_ice_comparision"));
const PersistentSystemsBooking = lazy(
  () => import("./screens/PersistentSystemsBooking")
);
const CashProductScreen = lazy(() => import("./screens/CashProductScreen"));
const BookingHistory = lazy(() => import("./screens/BookingHistory"));
const AddJob = lazy(() => import("./screens/AddJob"));
const JobDetails = lazy(() => import("./screens/JobDetails"));
const Career = lazy(() => import("./screens/Career"));
const AdminRoute = lazy(() => import("./components/AdminRoute"));
const FinanceRoute = lazy(() => import("./components/FinanceRoute"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));
const HomeScreen = lazy(() => import("./screens/HomeScreen"));
const OrderHistoryScreen = lazy(() => import("./screens/OrderHistoryScreen"));
const OrderScreen = lazy(() => import("./screens/OrderScreen"));
const PaymentMethodScreen = lazy(() => import("./screens/PaymentMethodScreen"));
const PlaceOrderScreen = lazy(() => import("./screens/PlaceOrderScreen"));
const ProductListScreen = lazy(() => import("./screens/ProductListScreen"));
const ProductScreen = lazy(() => import("./screens/ProductScreen"));
const RegisterScreen = lazy(() => import("./screens/RegisterScreen"));
const BookingScreen = lazy(() => import("./screens/BookingScreen"));
const CashBooking = lazy(() => import("./screens/CashBooking"));
const NewProductScreen = lazy(() => import("./screens/NewProductScreen"));
const NewPlaceOrderScreen = lazy(() => import("./screens/NewPlaceOrderScreen"));
const Faq = lazy(() => import("./components/Faq"));
const ShippingAddressScreen = lazy(
  () => import("./screens/ShippingAddressScreen")
);
const SigninScreen = lazy(() => import("./screens/SigninScreen"));
const ProductEditScreen = lazy(() => import("./screens/ProductEditScreen"));
const OrderListScreen = lazy(() => import("./screens/admin/OrderListScreen"));
const UpgradeOrderListScreen = lazy(
  () => import("./screens/admin/UpgradeOrderListScreen")
);
const UserListScreen = lazy(() => import("./screens/UserListScreen"));
const UserEditScreen = lazy(() => import("./screens/UserEditScreen"));
const SellerRoute = lazy(() => import("./components/SellerRoute"));
const ThankyouScreen = lazy(() => import("./screens/ThankyouScreen"));
const RevoltBrz = lazy(() => import("./screens/RevoltBrz"));
const BrgComfortScreen = lazy(() => import("./screens/BrgComfortScreen"));
const MapScreen = lazy(() => import("./screens/MapScreen"));
const DashboardScreen = lazy(() => import("./screens/DashboardScreen"));
const SupportScreen = lazy(() => import("./screens/SupportScreen"));
const Footer = lazy(() => import("./components/Footer"));
const Header = lazy(() => import("./components/Header"));
const ProductsScreen = lazy(() => import("./screens/ProductsScreen"));
const SearchbookScreen = lazy(() => import("./screens/SearchbookScreen"));
const TestRideScreen = lazy(() => import("./screens/TestRideScreen"));
const NotifyMeScreen = lazy(() => import("./screens/NotifyScreen"));
const ThankyouScreenTestride = lazy(
  () => import("./screens/ThankyouScreenTestride")
);
const ContactUs = lazy(() => import("./screens/ContactUsScreen_old"));
const OffersScreen = lazy(() => import("./screens/OffersScreen"));
const Mainproduct = lazy(() => import("./screens/Mainproduct"));
const UspChargingScreen = lazy(() => import("./screens/UspChargingScreen"));
const AboutusScreen = lazy(() => import("./screens/AboutusScreen"));
const Rv1 = lazy(() => import("./screens/Rv1"));
const Rv1Plus = lazy(() => import("./screens/Rv1Plus"));
const ThankyouScreenNotify = lazy(
  () => import("./screens/ThankyouScreenNotify")
);
const ThankyouCancelationScreen = lazy(
  () => import("./screens/ThankyouCancelationScreen")
);

const ThankyouContactusScreen = lazy(
  () => import("./screens/ThankyouContactusScreen")
);
const OrderDetailScreen = lazy(
  () => import("./screens/admin/OrderDetailScreen")
);
const TestrideListScreen = lazy(
  () => import("./screens/admin/TestrideListScreen")
);
const AdminBanner = lazy(() => import("./components/AdminBanner"));
// const DashRFPL = lazy(() => import("./components/DashRFPL"));

const CustomerFeedback = lazy(
  () => import("./components/CustomerFeedback/Feedback")
);

const TestrideDetailScreen = lazy(
  () => import("./screens/admin/TestrideDetailScreen")
);
const NotifyListScreen = lazy(() => import("./screens/admin/NotifyListScreen"));
const NotifyDetailScreen = lazy(
  () => import("./screens/admin/NotifyDetailScreen")
);
const ContactUsListScreen = lazy(
  () => import("./screens/admin/ContactUsListScreen")
);
const ContactUsDetailScreen = lazy(
  () => import("./screens/admin/ContactUsDetailScreen")
);
const TermsScreen = lazy(() => import("./screens/TermsScreen"));
const EulaScreen = lazy(() => import("./screens/EulaScreen"));
const AppPrivacyPolicyScreen = lazy(
  () => import("./screens/AppPrivacyPolicyScreen")
);
const DisclaimerScreen = lazy(() => import("./screens/DisclaimerScreen"));
const PrivacyScreen = lazy(() => import("./screens/PrivacyScreen"));
const CancelBookingScreen = lazy(
  () => import("./screens/admin/CancelBookingScreen")
);
const UserDashboardScreen = lazy(
  () => import("./screens/user/UserDashboardScreen")
);

const UserBookingScreen = lazy(
  () => import("./screens/user/UserBookingScreen")
);
const UpgradeUserBookingScreen = lazy(
  () => import("./screens/user/UpgradeUserBookingScreen")
);
const UserNotifyScreen = lazy(() => import("./screens/user/UserNotifyScreen"));
const UserTestrideScreen = lazy(
  () => import("./screens/user/UserTestrideScreen")
);
const UserContactusScreen = lazy(
  () => import("./screens/user/UserContactusScreen")
);
const UserProfileEditScreen = lazy(
  () => import("./screens/user/UserProfileEditScreen")
);
const ComfortScreen = lazy(() => import("./screens/ComfortScreen"));
const AestheticScreen = lazy(() => import("./screens/AestheticScreen"));
const BrzAestheticScreen = lazy(() => import("./screens/BrzAestheticScreen"));
const SafetyScreen = lazy(() => import("./screens/SafetyScreen"));
const Intelligence = lazy(() => import("./screens/Intelligence"));
const MediaScreen = lazy(() => import("./screens/MediaScreen"));
const CallCenterRoute = lazy(() => import("./components/CallCenterRoute"));
const RevoltMap = lazy(() => import("./components/revoltmap"));
const CallCenterScreen = lazy(
  () => import("./screens/callcenter/CallCenterScreen")
);
const DealerOrderDetailScreen = lazy(
  () => import("./screens/dealer/DealerOrderDetailScreen")
);
const EditBookingScreen = lazy(() => import("./screens/EditBookingScreen"));
const BookingcloseScreen = lazy(() => import("./screens/BookingcloseScreen"));
const Thankyou = lazy(() => import("./screens/Thankyou"));
const BecomeDealerScreen = lazy(() => import("./screens/BecomeDealerScreen"));
const SpinWheelListScreen = lazy(() => import("./screens/admin/spinWheelList"));
const FeedbackSurveyScreen = lazy(
  () => import("./screens/admin/FeedbackSurveyList")
);
// const EventRegistration = lazy(() => import("./screens/EventRegistration"));
// const EventLive = lazy(() => import("./screens/EventLive"));
const ThankyouScreenDealer = lazy(
  () => import("./screens/ThankyouScreenDealer")
);
const BecomeDealerListScreen = lazy(
  () => import("./screens/admin/BecomeDealerListScreen")
);
const BecomeDealerDetailScreen = lazy(
  () => import("./screens/admin/BecomeDealerDetailScreen")
);
const BookingDetail = lazy(() => import("./screens/BookingDetail"));
const PageNotFound = lazy(() => import("./screens/PageNotFound"));
const VerifyScreen = lazy(() => import("./screens/Upgrade/VerifyScreen"));
const UpgradeScreen = lazy(() => import("./screens/Upgrade/UpgradeScreen"));
const EmiCalculator = lazy(() => import("./screens/EmiCalculatorScreen"));
const UpgradeProductScreen = lazy(
  () => import("./screens/Upgrade/UpgradeProductScreen")
);
const UpgradePlaceOrderScreen = lazy(
  () => import("./screens/Upgrade/UpgradePlaceOrderScreen")
);
const UpgradePaymentScreen = lazy(
  () => import("./screens/Upgrade/UpgradePaymentScreen")
);
const UpgradeOrderScreen = lazy(
  () => import("./screens/Upgrade/UpgradeOrderScreen")
);
const UpgradeThankyouScreen = lazy(
  () => import("./screens/Upgrade/UpgradeThankyouScreen")
);
const UpgradeOrderDetailScreen = lazy(
  () => import("./screens/admin/UpgradeOrderDetailScreen")
);
const UpgradeBookingDetail = lazy(
  () => import("./screens/Upgrade/UpgradeBookingDetail")
);
const UpgradeCallCenterScreen = lazy(
  () => import("./screens/callcenter/UpgradeCallCenterScreen")
);
const UpgradeCancelBookingScreen = lazy(
  () => import("./screens/admin/UpgradeCancelBookingScreen")
);
const NewScreen = lazy(() => import("./screens/NewScreen"));
const MerchDetail = lazy(() => import("./screens/MerchDetail"));
const CashOrderScreen = lazy(() => import("./screens/CashOrderScreen"));
const VendorBooking = lazy(() => import("./screens/VendorBookingScreen"));
const VendorBookingAction = lazy(() => import("./screens/VendorBookingAction"));
const AlexaScreen = lazy(() => import("./screens/AlexaScreen"));
const SupportFreshdesk = lazy(() => import("./screens/SupportFreshdesk"));

const ContestWinner = lazy(() => import("./screens/ContestWinner"));
const CareerPortal = lazy(() => import("./screens/Career"));

require("dotenv").config();

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const CustomLink = (props) => {
  return (
    <a href={props.children[0]} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  );
};

function App() {
  //////////////////////NEW CODE////////////
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "rev",
      timestamp: new Date().toLocaleString(),
      parts: [
        { text: "Welcome to Revolt Motors ! How may I assist you today? \n" },
      ],
    },
  ]);
  const [loadingChatBot, setLoadingChatBot] = useState(false);
  const location = useLocation();
  const messagesRef = useRef(null);
  const btnRef = useRef(null);
  const chatBotModalRef = useRef(null);
  ///////////////////////////////////////////

  console.log("..");

  const [blocker, setBlocker] = useState(false);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [load, setLoad] = useState(false);

  // useEffect(() => {
  //   if(userInfo){
  //   const timer = setTimeout(() => {

  //     dispatch(signout());
  //     window.location.href('/signin');
  //   }, 10 * 60 * 1000);
  //   return () => clearTimeout(timer);
  // }
  // }, [userInfo]);
  const onPrompt = () => {
    // Fire a Modal Prompt
  };

  const onIdle = () => {
    // Close Modal Prompt
    if (userInfo) {
      dispatch(signout());
      window.location.href("/signin");
    }
    // Do some idle action like log out your user
  };

  const onActive = (event) => {
    // Close Modal Prompt
    // Do some active action
  };

  const onAction = (event) => {
    // Do something when a user triggers a watched event
  };

  // const idleTimer = useIdleTimer({ onIdle, onActive });
  /////
  // const {
  //   start,
  //   reset,
  //   activate,
  //   pause,
  //   resume,
  //   isIdle,
  //   isPrompted,
  //   isLeader,
  //   getTabId,
  //   getRemainingTime,
  //   getElapsedTime,
  //   getLastIdleTime,
  //   getLastActiveTime,
  //   getTotalIdleTime,
  //   getTotalActiveTime,
  // } = useIdleTimer({
  //   onPrompt,
  //   onIdle,
  //   onActive,
  //   onAction,
  //   timeout: 1000 * 60 * 10,
  //   promptTimeout: 0,
  //   events: [
  //     "mousemove",
  //     "keydown",
  //     "wheel",
  //     "DOMMouseScroll",
  //     "mousewheel",
  //     "mousedown",
  //     "touchstart",
  //     "touchmove",
  //     "MSPointerDown",
  //     "MSPointerMove",
  //     "visibilitychange",
  //   ],
  //   immediateEvents: [],
  //   debounce: 0,
  //   throttle: 0,
  //   eventsThrottle: 200,
  //   element: document,
  //   startOnMount: true,
  //   startManually: false,
  //   stopOnIdle: false,
  //   crossTab: false,
  //   name: "idle-timer",
  //   syncTimers: 0,
  //   leaderElection: false,
  // });

  ////

  // const cart = useSelector((state) => state.cart);
  // const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  // const { cartItems } = cart;
  // const userSignin = useSelector((state) => state.userSignin);
  // const { userInfo } = userSignin;
  const dispatch = useDispatch();
  // const signoutHandler = () => {
  //   dispatch(signout());
  // };

  // const productCategoryList = useSelector((state) => state.productCategoryList);

  // const {
  //   loading: loadingCategories,
  //   error: errorCategories,
  //   categories,
  // } = productCategoryList;

  useEffect(() => {
    //  dispatch(listProductCategories());
    if (navigator.webdriver) {
      setBlocker(true);
    }
    if (["/book", "/"].indexOf(window.location.pathname) < 0) {
      dispatch(listStateCityHub());
      dispatch(listStateCityHub_upgrade());
      dispatch(listStateCityHub_SC());
    }

    // ------------------------------- Experiment -----------------------------------
    var id; // timeout id
    window.addEventListener("load", () => {
      const script1 = document.createElement("script");
      script1.src = "/js/jquery-3.6.0.min.js";
      document.head.appendChild(script1);

      // -------------------------------- Used Css ----------------------------------

      const link8 = document.createElement("link");
      link8.href = "/css/responsive-style.css";
      link8.rel = "stylesheet";
      document.head.appendChild(link8);

      // const link9 = document.createElement("link");
      // link9.href = "/css/bootstrap4.min.css";
      // link9.rel = "stylesheet";
      // document.head.appendChild(link9);

      // const link7 = document.createElement("link");
      // link7.href = "/css/bootstrap5.min.css";
      // link7.rel = "stylesheet";
      // document.head.appendChild(link7);

      const link6 = document.createElement("link");
      link6.href = "/css/threesixty-v3.css";
      link6.rel = "stylesheet";
      document.head.append(link6);
      // ------------------------------ Used Css End --------------------------------
      setTimeout(() => {
        //---------------------------- Unused css ---------------------------------
        const link11 = document.createElement("link");
        link11.href = "/css/responsive-staging-v32.css";
        link11.rel = "stylesheet";
        document.head.append(link11);

        const link10 = document.createElement("link");
        link10.href = "/css/owl.theme.default.min.css";
        link10.rel = "stylesheet";
        document.head.append(link10);

        // const link9 = document.createElement("link");
        // link9.href = "/css/style-staging-v62.css";
        // link9.rel = "stylesheet";
        // document.head.append(link9);

        const link8 = document.createElement("link");
        link8.href = "/css/rv-responsive-V17.css";
        link8.rel = "stylesheet";
        document.head.append(link8);

        const link7 = document.createElement("link");
        link7.href =
          "https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.css";
        link7.rel = "stylesheet";
        document.head.append(link7);

        const link4 = document.createElement("link");
        link4.href = "/css/owl.carousel.min.css";
        link4.rel = "stylesheet";
        document.head.append(link4);

        // const link3 = document.createElement("link");
        // link3.href =
        //   "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.css";
        // link3.rel = "stylesheet";
        // document.head.append(link3);

        const link2 = document.createElement("link");
        link2.href = "/css/rv-innerpage.css";
        link2.rel = "stylesheet";
        document.head.append(link2);
        // const link1 = document.createElement("link");
        // link1.href =
        //   "https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.css";
        // link1.rel = "stylesheet";
        // document.head.append(link1);
        //----------------------------Unused css finish -------------------------------

        // Load your custom script
        const script2 = document.createElement("script");
        script2.src = "/js/614303.js";
        script2.setAttribute("chat", "true");
        document.head.appendChild(script2);

        // Load GTM script
        const gtmScript = document.createElement("script");
        gtmScript.innerHTML = `
            function gtag(){dataLayer.push(arguments);}
            window.dataLayer=window.dataLayer||[];
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MHBT7XT');
          `;
        document.head.appendChild(gtmScript);

        // Add noscript fallback for GTM
        const gtmNoScript = document.createElement("noscript");
        gtmNoScript.innerHTML =
          '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MHBT7XT" height="0" width="0" style="display:none;visibility:hidden"></iframe>';
        document.body.appendChild(gtmNoScript);

        // Add JSON-LD for structured data
        const ldJsonScript = document.createElement("script");
        ldJsonScript.type = "application/ld+json";
        ldJsonScript.innerHTML = `
            {
              "@context": "https://schema.org",
              "@type": "Corporation",
              "name": "Revolt Motors",
              "alternateName": "Revolt Motors",
              "url": "https://www.revoltmotors.com/",
              "logo": "https://www.revoltmotors.com/images/revolt-motors-logo.svg",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "9873050505",
                "contactType": "sales",
                "areaServed": "IN"
              },
              "sameAs": [
                "https://www.facebook.com/revoltmotorsin/",
                "https://twitter.com/RevoltMotorsIN",
                "https://www.instagram.com/revoltmotorsin/",
                "https://www.youtube.com/channel/UC2tW9kRUr1mGhS8oA_IQEnQ",
                "https://www.linkedin.com/company/revolt-intellicorp/"
              ]
            }
          `;
        document.head.appendChild(ldJsonScript);
      }, 6500); // Delay for 15 seconds

      id = setTimeout(() => {
        setLoad(true);
      }, 1000);
    });

    return () => {
      clearTimeout(id);
    };
    // Experiment End ---------------------------------------------------------
  }, []);

  //console.log(categories);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  });

  const getCustomerInfo = async (c_id) => {
    const { data } = await Axios.get(`${URL_API}/api/v1/customer/info/${c_id}`);
    localStorage.setItem("userInfo", JSON.stringify(data.data[0]));
    setLoading(false);
  };

  const [loading, setLoading] = useState(true);

  const handleBeforeUnload = (event) => {
    localStorage.removeItem("verifyOtp");
    localStorage.removeItem("chatId");
    localStorage.removeItem("mobile");
  };

  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      setMessages([
        ...messages,
        {
          role: "rev",
          timestamp: new Date().toLocaleString(),
          parts: [{ text: "Please enter your mobile number to continue\n" }],
        },
      ]);
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: "smooth", // Enable smooth scrolling
      });
    }
  }, [messages]);

  useLayoutEffect(() => {
    // if (process?.env?.REACT_APP_URL_API == "https://dmsi.revoltmotors.com") {
    //   document.addEventListener("contextmenu", (event) =>
    //     event.preventDefault()
    //   );
    //   document.addEventListener("keydown", (event) => {
    //     if (
    //       event.key === "F12" ||
    //       (event.ctrlKey &&
    //         event.shiftKey &&
    //         (event.key === "I" ||
    //           event.key === "J" ||
    //           event.key === "C" ||
    //           event.key === "K"))
    //     ) {
    //       event.preventDefault();
    //     }
    //   });
    // }

    let dateString = localStorage.getItem("updated_date");

    if (!dateString) {
      localStorage.clear();
    } else {
      // let current_date = new Date()
      // let updated_date = new Date(dateString)
      // // let updated_date = new Date('05/02/24')
      // let diffTime = current_date-updated_date
      // console.log(diffTime)
      // const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      // if(diffDays > 1){
      //   localStorage.clear()
      // }
      //  console.log("Dayyyyyyyyyy",diffDays)
    }
  }, []);

  useEffect(() => {
    let params = new URLSearchParams(document.location.search);
    if (params.get("mobileAppView") || localStorage.getItem("mobileAppView")) {
      let customerId = params.get("c_id");
      if (customerId) {
        if (
          !(
            localStorage.getItem("userInfo") &&
            JSON.parse(localStorage.getItem("userInfo")).id ==
              params.get("c_id")
          )
        ) {
          getCustomerInfo(customerId);
        } else {
          setLoading(false);
        }
      } else {
        if (params.get("mobileAppView")) {
          localStorage.removeItem("userInfo");
        }
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  useLayoutEffect(() => {
    if (window.location.pathname.split("/")[1] === "upgradebookingdetail") {
      window.location.pathname = "/upgrade-booking-detail";
    }
  }, []);

  if (blocker && window.location.pathname !== "/") {
    window.location.href = window.location.origin;
  }

  const chatNow = async () => {
    setInput("");
    setLoadingChatBot(true);

    setMessages([
      ...messages,
      {
        role: "user",
        timestamp: new Date().toLocaleString(),
        parts: [{ text: input }],
      },
    ]);
    let temp = [
      ...messages,
      {
        role: "user",
        timestamp: new Date().toLocaleString(),
        parts: [{ text: input }],
      },
    ];

    try {
      let response = await axios.request({
        baseURL: "https://apix.revoltmotors.com",
        headers: { "Content-Type": "application/json" },
        url: "/api/v1/chatbot/chat",
        method: "POST",
        data: {
          message: input,
          chatId: localStorage.getItem("chatId"),
        },
      });

      setMessages([
        ...temp,
        {
          role: "rev",
          timestamp: new Date().toLocaleString(),
          parts: [{ text: response.data.response }],
        },
      ]);
    } catch (err) {
    } finally {
      setLoadingChatBot(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();

    if (!input) return;

    ////////////////////IN CASE OF VERIFY OTP CHAT DIRECTLY////////
    if (
      localStorage.getItem("verifyOtp") === "true" ||
      (localStorage.getItem("userInfo") && localStorage.getItem("chatId"))
    ) {
      chatNow();
    }

    if (
      !localStorage.getItem("chatId") &&
      input.length === 10 &&
      /[6-9]{1,1}[0-9]{9,9}/.test(input)
    ) {
      setInput("");
      setMessages([
        ...messages,
        {
          role: "user",
          timestamp: new Date().toLocaleString(),
          parts: [{ text: input }],
        },
      ]);
      getChatId({
        mobile: input,
        isLoggedinUser: false,
      });
    } else if (localStorage.getItem("verifyOtp") === "false") {
      if (input.length === 6 && /[0-9]{6,6}/.test(input)) {
        getChatId({
          isLoggedinUser: false,
          chatId: localStorage.getItem("chatId"),
          otp: input,
          mobile: localStorage.getItem("mobile"),
        });
      } else {
        setInput("");
        setMessages([
          ...messages,
          {
            role: "user",
            timestamp: new Date().toLocaleString(),
            parts: [{ text: input }],
          },
          {
            role: "rev",
            timestamp: new Date().toLocaleString(),
            parts: [
              {
                text: "Invalid OTP format. The OTP must be exactly 6 digits long\n",
              },
            ],
          },
        ]);
      }
    } else if (!localStorage.getItem("chatId")) {
      setInput("");
      setMessages([
        ...messages,
        {
          role: "user",
          timestamp: new Date().toLocaleString(),
          parts: [{ text: input }],
        },
        {
          role: "rev",
          timestamp: new Date().toLocaleString(),
          parts: [{ text: "Please enter a valid mobile number\n" }],
        },
      ]);
    }
  };

  const getChatId = async (payload) => {
    try {
      let response = await axios.request({
        baseURL: "https://apix.revoltmotors.com",
        headers: { "Content-Type": "application/json" },
        url: "/api/v1/chatbot/addChatUser",
        method: "POST",
        data: payload,
      });
      if (response.data.success) {
        /////////////In case of direct login set directly/////////
        if (payload.isLoggedinUser) {
          localStorage.setItem("chatId", response.data.chatId);
        }
        //////////////In case of Not LoggedIn/////////

        if (payload.isLoggedinUser === false) {
          if (
            payload.hasOwnProperty("mobile") &&
            !payload.hasOwnProperty("otp")
          ) {
            localStorage.setItem("mobile", payload.mobile);
            localStorage.setItem("verifyOtp", false);
            localStorage.setItem("chatId", response.data.chatId);

            setMessages([
              ...messages,
              {
                role: "user",
                timestamp: new Date().toLocaleString(),
                isMobileEditable: true,
                parts: [{ text: input }],
              },
              {
                role: "rev",
                timestamp: new Date().toLocaleString(),
                parts: [
                  {
                    text: `A 6-digit OTP will be sent to ${"XXXXXX" + input.slice(6, 11)}\n`,
                  },
                ],
              },
            ]);
          } else {
            localStorage.setItem("verifyOtp", true);
            setInput("");
            setMessages([
              ...messages,
              {
                role: "user",
                timestamp: new Date().toLocaleString(),
                parts: [{ text: input }],
              },
              {
                role: "rev",
                timestamp: new Date().toLocaleString(),
                parts: [
                  {
                    text: "Hello there! Welcome to Revolt Motors. What can I do for you today? Are you looking for information on our bikes, interested in a test ride, or ready to book your very own Revolt?\n",
                  },
                ],
              },
            ]);
          }
        }
      } else {
        if (
          payload.isLoggedinUser === false &&
          payload.hasOwnProperty("otp") &&
          payload.hasOwnProperty("chatId")
        ) {
          setInput("");
          setMessages([
            ...messages,
            {
              role: "user",
              timestamp: new Date().toLocaleString(),
              parts: [{ text: input }],
            },
            {
              role: "rev",
              timestamp: new Date().toLocaleString(),
              parts: [{ text: `Invalid OTP\n` }],
            },
          ]);
        }
      }
    } catch (err) {
      alert("---- ERROR OCCURRED----");
    }
  };

  const isMobileEditableFunc = () => {
    localStorage.removeItem("mobile");
    localStorage.removeItem("verifyOtp");
    localStorage.removeItem("chatId");

    setMessages([
      ...messages,
      {
        role: "rev",
        timestamp: new Date().toLocaleString(),
        parts: [{ text: "No problem, please re-enter your mobile number\n" }],
      },
    ]);
  };

  const openModal = () => {
    if (chatBotModalRef.current) {
      chatBotModalRef.current.classList.add("show");
      chatBotModalRef.current.style.display = "block";
      document.body.classList.add("modal-open");
      chatBotModalRef.current.setAttribute("aria-hidden", "false");
    }
  };

  const closeModal = () => {
    if (chatBotModalRef.current) {
      chatBotModalRef.current.classList.remove("show");
      chatBotModalRef.current.style.display = "none";
      document.body.classList.remove("modal-open");
      chatBotModalRef.current.setAttribute("aria-hidden", "true");
    }
  };

  const restartChat = () => {
    localStorage.removeItem("verifyOtp");
    localStorage.removeItem("chatId");
    localStorage.removeItem("mobile");

    if (localStorage.getItem("userInfo")) {
      setMessages([
        {
          role: "rev",
          timestamp: new Date().toLocaleString(),
          parts: [
            {
              text: "Welcome to Revolt Motors ! How may I assist you today? \n",
            },
          ],
        },
      ]);
    } else {
      setMessages([
        {
          role: "rev",
          timestamp: new Date().toLocaleString(),
          parts: [
            {
              text: "Welcome to Revolt Motors ! How may I assist you today? \n",
            },
          ],
        },
        {
          role: "rev",
          timestamp: new Date().toLocaleString(),
          parts: [{ text: "Please enter your mobile number to continue\n" }],
        },
      ]);
    }
  };

  return (
    <>
      {loading ? null : (
        <>
          {load ? <ImportScript /> : null}
          <Suspense fallback={<Loader />}>
            <ScrollToTop />
            <main>
              <div className="main-sec">
                {<Header />}
                {/* <Chat /> */}
                <main
                // style={{background: "#f1f3f6",minHeight: '300px'}}
                >
                  <React.Fragment>
                    <Routes>
                      {/* <Route path="/dealer/:id" element={<SellerScreen />}></Route>
            <Route path="/cart" element={<CartScreen />}></Route>
            <Route path="/cart/:id" element={<CartScreen />}></Route>*/}
                      <Route path="*" element={<PageNotFound />} />
                      <Route path="/new" element={<NewScreen />} />
                      <Route path="/merch" element={<MerchDetail />} />
                      <Route
                        path="/product/:id"
                        element={<ProductScreen />}
                        exact
                      ></Route>
                      <Route
                        path="/product-pricing/:id"
                        element={<CashProductScreen />}
                        exact
                      ></Route>
                      <Route
                        path="/cash-booking-thank-you"
                        element={<ThankYouCash />}
                        exact
                      ></Route>
                      <Route
                        path="/product/:id/edit"
                        element={ProductEditScreen}
                        exact
                      ></Route>
                      <Route path="/terms" element={<TermsScreen />}></Route>
                      <Route path="/press" element={<MediaScreen />}></Route>
                      <Route
                        path="/myrevolt-eula"
                        element={<EulaScreen />}
                      ></Route>
                      <Route
                        path="/myrevolt-app-privacy-policy"
                        element={<AppPrivacyPolicyScreen />}
                      ></Route>

                      <Route
                        path="/ai-enabled"
                        element={<Intelligence />}
                      ></Route>
                      <Route
                        exact
                        path="/banner-dashboard"
                        element={<AdminBanner />}
                      ></Route>
                      {/* <Route
                        exact
                        path="/DashRFPL"
                        element={<DashRFPL />}
                      ></Route> */}
                      {/* <Route
                        exact
                        path="/EventRegistration"
                        element={<EventRegistration />}
                      ></Route> */}
                      {/* <Route
                        exact
                        path="/EventRegistration"
                        element={<EventRegistration />}
                      ></Route>
                      <Route
                        exact
                        path="/LaunchEvent"
                        element={<EventLive />}
                      ></Route> */}
                      <Route
                        exact
                        path="/feedback-hub"
                        element={<CustomerFeedback />}
                      ></Route>

                      <Route
                        path="/disclaimer-details"
                        element={<DisclaimerScreen />}
                      ></Route>
                      <Route path="/savings" element={<EvStatistics />}></Route>
                      <Route
                        path="/privacy-policy"
                        element={<PrivacyScreen />}
                      ></Route>
                      <Route
                        path="/about-us"
                        element={<AboutusScreen />}
                      ></Route>
                      <Route
                        path="/cash-booking"
                        element={<CashBooking />}
                      ></Route>
                      <Route
                        path="/NewProductScreen/:id"
                        element={<NewProductScreen />}
                      ></Route>
                      <Route
                        path="/NewPlaceOrderScreen"
                        element={<NewPlaceOrderScreen />}
                      ></Route>
                      <Route path="/thank-you" element={<Thankyou />}></Route>
                      <Route
                        path="/booking-detail/:id"
                        element={<BookingDetail />}
                      ></Route>
                      <Route
                        path="/booking-updates/:id"
                        element={<BookingHistory />}
                      ></Route>
                      <Route
                        path="/bookingdetail/:id"
                        element={
                          <Navigate
                            to={`/booking-detail/${
                              window.location.pathname.split("/")[2]
                            }`}
                            replace
                          />
                        }
                      />
                      <Route
                        path="/upgrade-booking-detail/:id"
                        element={<UpgradeBookingDetail />}
                      ></Route>
                      <Route
                        path="/upgradebookingdetail/:id"
                        element={
                          <Navigate
                            to={`/upgrade-booking-detail/${
                              window.location.pathname.split("/")[2]
                            }`}
                            replace
                          />
                        }
                      />
                      <Route
                        path="/charging"
                        element={<UspChargingScreen />}
                      ></Route>
                      <Route
                        path="/comfort"
                        element={<ComfortScreen />}
                      ></Route>
                      <Route
                        path="/aesthetic"
                        element={<AestheticScreen />}
                      ></Route>
                      <Route
                        path="/aestheticBRZ"
                        element={<BrzAestheticScreen />}
                      ></Route>

                      <Route path="/safety" element={<SafetyScreen />}></Route>
                      {/* -------------------------alexa work------------------- */}
                      <Route
                        path="/revolt-alexa"
                        element={<AlexaScreen />}
                      ></Route>
                      {/* ------------------------------------------------- */}
                      <Route
                        path="/contact-us"
                        element={<ContactUs blocker={blocker} />}
                      ></Route>
                      <Route path="/rv400" element={<Mainproduct />}></Route>
                      <Route path="/rv400-brz" element={<RevoltBrz />}></Route>
                      <Route
                        path="/rv400BRZ"
                        element={<Navigate to="/rv400-brz" />}
                      ></Route>
                      <Route
                        path="/comfortBRZ"
                        element={<BrgComfortScreen />}
                      ></Route>
                      <Route path="/signin" element={<SigninScreen />}></Route>
                      {/* ------------------CAREER PORTAL----------- */}

                      <Route path="/add-job" element={<AddJob />}></Route>

                      <Route
                        path="/applicant-details"
                        element={<ApplicantDetails />}
                      ></Route>
                      <Route
                        path="/career-with-us/job/:id"
                        element={<JobDetails />}
                      ></Route>

                      <Route
                        path="/career-with-us"
                        element={<Career />}
                      ></Route>
                      {/* ---------------CAREER PORTAL--------------- */}

                      <Route
                        path="/book"
                        element={<BookingScreen blocker={blocker} />}
                      ></Route>
                      <Route
                        path="/book/persistent-systems"
                        element={<PersistentSystemsBooking blocker={blocker} />}
                      ></Route>

                      {/* <Route path="/book" element={<BookingcloseScreen />}></Route> */}
                      <Route
                        path="/products"
                        element={<ProductsScreen />}
                      ></Route>
                      <Route path="/rv1" element={<Rv1 />}></Route>
                      <Route path="/rv1Plus" element={<Rv1Plus />}></Route>
                      <Route
                        path="/register"
                        element={<RegisterScreen />}
                      ></Route>

                      <Route
                        path="/shipping"
                        element={<ShippingAddressScreen />}
                      ></Route>
                      <Route
                        path="/payment"
                        element={<PaymentMethodScreen />}
                      ></Route>
                      <Route
                        path="/placeorder"
                        element={<PlaceOrderScreen />}
                      ></Route>
                      <Route
                        path="/placeorder/:id"
                        element={<PlaceOrderScreen />}
                      ></Route>
                      <Route
                        path="/order/:id"
                        element={<OrderScreen />}
                      ></Route>
                      <Route
                        path="/cashorder/:id"
                        element={<CashOrderScreen />}
                      ></Route>

                      {/* <Route path="/thankyou/:id" element={<ThankyouScreen />}></Route> */}
                      <Route
                        path="/thankyoubooking/:id"
                        element={<ThankyouScreen />}
                      ></Route>
                      <Route
                        path="/editbooking/:id"
                        element={<EditBookingScreen />}
                      ></Route>
                      <Route
                        path="/thankyoucancel/:id"
                        element={<ThankyouCancelationScreen />}
                      ></Route>
                      <Route
                        path="/thankyouride/:id"
                        element={<ThankyouScreenTestride />}
                      ></Route>
                      <Route
                        path="/thankyounotify/:id"
                        element={<ThankyouScreenNotify />}
                      ></Route>
                      <Route
                        path="/thankyoucontact/:id"
                        element={<ThankyouContactusScreen />}
                      ></Route>
                      <Route
                        path="/cancel-my-revolt/"
                        element={<SearchbookScreen />}
                      ></Route>
                      <Route
                        path="/cancel-my-revolt/:id"
                        element={<SearchbookScreen />}
                      ></Route>
                      <Route
                        path="/emi-calculator/"
                        element={<EmiCalculator />}
                      ></Route>
                      {/* Upgrade */}
                      {/* <Route path="/verify/" element={<VerifyScreen />}></Route>
                      <Route path="/verify/:id" element={<VerifyScreen />}></Route> */}

                      <Route
                        path="/upgradeproduct/"
                        element={<UpgradeProductScreen />}
                      ></Route>
                      <Route
                        path="/upgradeplaceorder/"
                        element={<UpgradePlaceOrderScreen />}
                      ></Route>
                      <Route
                        path="/upgradepayment"
                        element={<UpgradePaymentScreen />}
                      ></Route>
                      <Route
                        path="/upgradeorder/:id"
                        element={<UpgradeOrderScreen />}
                      ></Route>
                      <Route
                        path="/upgradethankyou/:id"
                        element={<UpgradeThankyouScreen />}
                      ></Route>

                      <Route
                        path="/cancel-upgrade/"
                        element={<UpgradeCancelBookingScreen />}
                      ></Route>
                      <Route
                        path="/cancel-upgrade/:id"
                        element={<UpgradeCancelBookingScreen />}
                      ></Route>

                      {/*  */}

                      <Route
                        path="/test-ride"
                        element={<TestRideScreen blocker={blocker} />}
                      ></Route>
                      <Route
                        path="/notify-me"
                        element={<NotifyMeScreen blocker={blocker} />}
                      ></Route>
                      <Route
                        path="/notifyme"
                        element={<Navigate to={`/notify-me`} replace />}
                      />
                      <Route
                        path="/become-dealer"
                        element={<BecomeDealerScreen blocker={blocker} />}
                      ></Route>
                      <Route
                        path="/offer"
                        element={<OffersScreen blocker={blocker} />}
                      ></Route>
                      <Route
                        path="/becomedealer"
                        element={<Navigate to={`/become-dealer`} replace />}
                      />
                      <Route path="/locate-dealer" element={<RevoltMap />} />
                      <Route
                        path="/thankyoudealer/:id"
                        element={<ThankyouScreenDealer />}
                      ></Route>

                      <Route
                        path="/orderhistory"
                        element={<OrderHistoryScreen />}
                      ></Route>
                      <Route path="/revoltmap" element={<RevoltMap />}></Route>

                      <Route
                        path="/userdashboard"
                        element={<UserDashboardScreen />}
                      ></Route>
                      <Route
                        path="/usercontactus"
                        element={<UserContactusScreen />}
                      ></Route>
                      <Route
                        path="/userbooking"
                        element={<UserBookingScreen />}
                      ></Route>
                      <Route path="/Faq" element={<Faq />}></Route>
                      <Route
                        path="/upgradebooking"
                        element={<UpgradeUserBookingScreen />}
                      ></Route>

                      <Route
                        path="/usernotify"
                        element={<UserNotifyScreen />}
                      ></Route>
                      <Route
                        path="/usertestride"
                        element={<UserTestrideScreen />}
                      ></Route>
                      <Route
                        path="/rmXMj4G36AWyyjYtrv400brzemp"
                        element={<VendorBooking />}
                      ></Route>
                      <Route
                        path="/vendor-booking-action"
                        element={<VendorBookingAction />}
                      ></Route>

                      {/*<Route path="/search/name" element={<SearchScreen />} exact></Route>
            <Route
              path="/search/name/:name"
              element={<SearchScreen />}
              exact
            ></Route>
            <Route
              path="/search/category/:category"
              element={<SearchScreen />}
              exact
            ></Route>
            <Route
              path="/search/category/:category/name/:name"
              element={<SearchScreen />}
              exact
            ></Route>
            <Route
              path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
              element={<SearchScreen />}
              exact
            ></Route>*/}
                      <Route
                        path="/redeem-rewards"
                        element={
                          <PrivateRoute>
                            <ContestWinner />
                          </PrivateRoute>
                        }
                      />

                      <Route
                        path="/profile"
                        element={
                          <PrivateRoute>
                            <UserProfileEditScreen />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/map"
                        element={
                          <PrivateRoute>
                            <MapScreen />
                          </PrivateRoute>
                        }
                      />
                      {/* Admin */}
                      <Route
                        path="/productlist"
                        element={
                          <AdminRoute>
                            <ProductListScreen />
                          </AdminRoute>
                        }
                      />

                      <Route
                        path="/productlist/pageNumber/:pageNumber"
                        element={
                          <AdminRoute>
                            <ProductListScreen />
                          </AdminRoute>
                        }
                      />
                      <Route
                        path="/orderlist"
                        element={
                          <AdminRoute>
                            <OrderListScreen />
                          </AdminRoute>
                        }
                      />
                      <Route
                        path="/upgradeorderlist"
                        element={
                          <AdminRoute>
                            <UpgradeOrderListScreen />
                          </AdminRoute>
                        }
                      />
                      <Route
                        path="/orderdetail/:id"
                        element={
                          <AdminRoute>
                            <OrderDetailScreen />
                          </AdminRoute>
                        }
                      />
                      <Route
                        path="/orderdetail/dealer/:id"
                        element={
                          <SellerRoute>
                            <DealerOrderDetailScreen />
                          </SellerRoute>
                        }
                      />
                      <Route
                        path="/upgradeorderdetail/:id"
                        element={
                          <AdminRoute>
                            <UpgradeOrderDetailScreen />
                          </AdminRoute>
                        }
                      />
                      <Route
                        path="/upgradeorderdetail/dealer/:id"
                        element={
                          <SellerRoute>
                            <UpgradeOrderDetailScreen />
                          </SellerRoute>
                        }
                      />
                      <Route
                        path="/testridelist"
                        element={
                          <AdminRoute>
                            <TestrideListScreen />
                          </AdminRoute>
                        }
                      />
                      <Route
                        path="/testridedetail/:id"
                        element={
                          <AdminRoute>
                            <TestrideDetailScreen />
                          </AdminRoute>
                        }
                      />
                      <Route
                        path="/notifylist"
                        element={
                          <AdminRoute>
                            <NotifyListScreen />
                          </AdminRoute>
                        }
                      />
                      <Route
                        path="/becomedealerlist"
                        element={
                          <AdminRoute>
                            <BecomeDealerListScreen />
                          </AdminRoute>
                        }
                      />
                      <Route
                        path="/spin-wheel-list"
                        element={
                          <AdminRoute>
                            <SpinWheelListScreen />
                          </AdminRoute>
                        }
                      />
                      <Route
                        path="/feedback-dash"
                        element={
                          <AdminRoute>
                            <FeedbackSurveyScreen />
                          </AdminRoute>
                        }
                      />

                      <Route
                        path="/becomedealerdetail/:id"
                        element={
                          <AdminRoute>
                            <BecomeDealerDetailScreen />
                          </AdminRoute>
                        }
                      />
                      <Route
                        path="/notifydetail/:id"
                        element={
                          <AdminRoute>
                            <NotifyDetailScreen />
                          </AdminRoute>
                        }
                      />
                      <Route
                        path="/requestlist"
                        element={
                          <AdminRoute>
                            <ContactUsListScreen />
                          </AdminRoute>
                        }
                      />
                      <Route
                        path="/contactusdetail/:id"
                        element={
                          <AdminRoute>
                            <ContactUsDetailScreen />
                          </AdminRoute>
                        }
                      />
                      <Route
                        path="/userlist"
                        element={
                          <AdminRoute>
                            <UserListScreen />
                          </AdminRoute>
                        }
                      />
                      <Route
                        path="/user/:id/edit"
                        element={
                          <AdminRoute>
                            <UserEditScreen />
                          </AdminRoute>
                        }
                      />
                      <Route
                        path="/dashboard"
                        element={
                          <AdminRoute>
                            <DashboardScreen />
                          </AdminRoute>
                        }
                      />
                      <Route
                        path="/cancelbooking/:id"
                        element={
                          <AdminRoute>
                            <CancelBookingScreen />
                          </AdminRoute>
                        }
                      />
                      <Route
                        path="/support"
                        element={
                          <AdminRoute>
                            <SupportScreen />
                          </AdminRoute>
                        }
                      />

                      <Route
                        path="/support/freshdesk"
                        element={<SupportFreshdesk />}
                      />
                      {/* Admin end */}

                      {/* Finance */}
                      {/* <Route
              path="/productlist"
              element={
                <FinanceRoute>
                  <ProductListScreen />
                </FinanceRoute>
              }
            />

            <Route
              path="/productlist/pageNumber/:pageNumber"
              element={
                <FinanceRoute>
                  <ProductListScreen />
                </FinanceRoute>
              }
            />
            <Route
              path="/orderlist"
              element={
                <FinanceRoute>
                  <OrderListScreen />
                </FinanceRoute>
              }
            />
            <Route
              path="/orderdetail/:id"
              element={
                <FinanceRoute>
                  <OrderDetailScreen />
                </FinanceRoute>
              }
            />
            <Route
              path="/orderdetail/dealer/:id"
              element={
                <SellerRoute>
                  <DealerOrderDetailScreen />
                </SellerRoute>
              }
            />
             <Route
              path="/testridelist"
              element={
                <FinanceRoute>
                  <TestrideListScreen />
                </FinanceRoute>
              }
            />
             <Route
              path="/testridedetail/:id"
              element={
                <FinanceRoute>
                  <TestrideDetailScreen />
                </FinanceRoute>
              }
            />
            <Route
              path="/notifylist"
              element={
                <FinanceRoute>
                  <NotifyListScreen />
                </FinanceRoute>
              }
            />
             <Route
              path="/notifydetail/:id"
              element={
                <FinanceRoute>
                  <NotifyDetailScreen />
                </FinanceRoute>
              }
            />
              <Route
              path="/requestlist"
              element={
                <FinanceRoute>
                  <ContactUsListScreen />
                </FinanceRoute>
              }
            />
             <Route
              path="/contactusdetail/:id"
              element={
                <FinanceRoute>
                  <ContactUsDetailScreen />
                </FinanceRoute>
              }
            />
            <Route
              path="/userlist"
              element={
                <FinanceRoute>
                  <UserListScreen />
                </FinanceRoute>
              }
            />
            <Route
              path="/user/:id/edit"
              element={
                <FinanceRoute>
                  <UserEditScreen />
                </FinanceRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <FinanceRoute>
                  <DashboardScreen />
                </FinanceRoute>
              }
            />
             <Route
              path="/cancelbooking/:id"
              element={
                <FinanceRoute>
                  <CancelBookingScreen />
                </FinanceRoute>
              }
            />
            <Route
              path="/support"
              element={
                <FinanceRoute>
                  <SupportScreen />
                </FinanceRoute>
              }
            /> */}
                      {/* Finance end */}

                      <Route
                        path="/productlist/dealer"
                        element={
                          <SellerRoute>
                            <ProductListScreen />
                          </SellerRoute>
                        }
                      />
                      <Route
                        path="/orderlist/dealer"
                        element={
                          <SellerRoute>
                            <OrderListScreen />
                          </SellerRoute>
                        }
                      />
                      <Route
                        path="/upgradeorderlist/dealer"
                        element={
                          <SellerRoute>
                            <UpgradeOrderListScreen />
                          </SellerRoute>
                        }
                      />
                      <Route
                        path="/testridelist/dealer"
                        element={
                          <SellerRoute>
                            <TestrideListScreen />
                          </SellerRoute>
                        }
                      />
                      {/* ------------------CAREER PORTAL----------- */}

                      <Route
                        path="/career-with-us/job/:id"
                        element={<JobDetails />}
                      ></Route>

                      <Route
                        path="/career-with-us"
                        element={<Career />}
                      ></Route>
                      {/* ---------------CAREER PORTAL--------------- */}
                      <Route
                        path="/testridedetail/dealer/:id"
                        element={
                          <SellerRoute>
                            <TestrideDetailScreen />
                          </SellerRoute>
                        }
                      />

                      {/*   <Route path="/STW2024" element={<SpinWheel />} /> */}

                      <Route
                        path="/ccsupport"
                        element={
                          <CallCenterRoute>
                            <CallCenterScreen />
                          </CallCenterRoute>
                        }
                      />
                      <Route
                        path="/upgradeccsupport"
                        element={
                          <CallCenterRoute>
                            <UpgradeCallCenterScreen />
                          </CallCenterRoute>
                        }
                      />
                      <Route path="/" element={<HomeScreen />} exact></Route>
                    </Routes>
                  </React.Fragment>
                </main>

                <div className="chatbot-section">
                  <div
                    class="modal show"
                    id="exampleModalChat"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
                    aria-hidden="true"
                    ref={chatBotModalRef}
                  >
                    <div
                      class="modal-dialog modal-dialog-centered"
                      role="document"
                    >
                      <div class="modal-content">
                        <div class="modal-header">
                          <div class="modal-title" id="exampleModalLongTitle">
                            <div>
                              <figure>
                                <img
                                  src="/images/revolt-motors-logo-w.svg"
                                  alt="logo"
                                />
                                <span>Revolt Motors</span>
                              </figure>
                            </div>
                          </div>
                          <button
                            onClick={closeModal}
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">
                              <svg
                                viewBox="0 0 24 24"
                                role="img"
                                tabindex="-1"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M20 20L4 4m16 0L4 20"></path>
                              </svg>
                            </span>
                          </button>
                        </div>
                        <div class="modal-body" ref={messagesRef}>
                          {messages.map((value) => {
                            if (value.role === "rev") {
                              return (
                                <div className="revResponse">
                                  <img src="/images/logo-name.svg" />
                                  <span>
                                    <Markdown
                                      options={{
                                        overrides: {
                                          a: {
                                            component: CustomLink,
                                          },
                                        },
                                      }}
                                    >
                                      {value.parts[0].text}
                                    </Markdown>
                                  </span>
                                  <sub>{value.timestamp}</sub>
                                </div>
                              );
                            } else {
                              return (
                                <div className="userResponse">
                                  <span style={{ marginLeft: "0px" }}>
                                    {value.parts[0].text}
                                  </span>

                                  <div className="userResponseDate">
                                    {value.isMobileEditable ? (
                                      <div className="d-flex justify-content-end mt-1">
                                        <small
                                          style={{
                                            fontSize: "10px",
                                            marginRight: "2px",
                                            cursor: "pointer",
                                          }}
                                          onClick={isMobileEditableFunc}
                                          className="text-success"
                                        >
                                          Edit
                                        </small>
                                        <img
                                          src={
                                            "https://img.icons8.com/win8/512/40C057/edit.png"
                                          }
                                          style={{
                                            height: "13px",
                                            width: "13px",
                                            cursor: "pointer",
                                          }}
                                          onClick={isMobileEditableFunc}
                                        />
                                      </div>
                                    ) : null}
                                    <sub>{value.timestamp}</sub>
                                  </div>
                                </div>
                              );
                            }
                          })}
                          {loadingChatBot ? (
                            <div>
                              <span class="jumping-dots">
                                <span class="dot-1"></span>
                                <span class="dot-2"></span>
                                <span class="dot-3"></span>
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div class="modal-footer">
                          <div className="input-section">
                            <form onSubmit={handleSend}>
                              <div className="row d-flex justify-content-center align-items-center">
                                <div className="col-10">
                                  <input
                                    value={input}
                                    onChange={(e) => {
                                      setInput(e.target.value);
                                    }}
                                    type="text"
                                    class="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    autocomplete="off"
                                    placeholder="Type message"
                                  />
                                </div>

                                <div className="col-2">
                                  <img
                                    onClick={handleSend}
                                    src="/images/send.svg"
                                    alt="send-logo"
                                    className="send-logo"
                                  />
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {location.pathname.includes("/STW2024") ||
                  location.pathname.includes("/stw2024") ||
                  location.pathname.includes("/book") ||
                  location.pathname.includes("/product/") ||
                  location.pathname.includes("/placeorder") ||
                  location.pathname.includes("/order/") ? (
                    ""
                  ) : (
                    <img
                      type="button"
                      className="chat-bot-icon"
                      src="/images/chat.png"
                      alt="chatbot-logo"
                      onClick={(e) => {
                        btnRef.current.click();
                      }}
                    />
                  )}
                </div>
                <Footer />
              </div>
            </main>
          </Suspense>

          <button
            ref={btnRef}
            // data-toggle="modal"
            // data-target="#exampleModalChat"
            onClick={() => {
              openModal();
              ///////////FOR Already Login User/////////////
              if (
                localStorage.getItem("userInfo") &&
                !localStorage.getItem("chatId")
              ) {
                let mobile = JSON.parse(
                  localStorage.getItem("userInfo")
                ).mobile;
                getChatId({
                  mobile: mobile,
                  isLoggedinUser: true,
                });
              }
            }}
            type="button"
            style={{ display: "none" }}
          ></button>
        </>
      )}
    </>
  );
}

export default App;
