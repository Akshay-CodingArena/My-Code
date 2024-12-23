import React, { useEffect, useRef, useState } from "react";
import {
  LoadScript,
  GoogleMap,
  StandaloneSearchBox,
  Marker,
} from "@react-google-maps/api";
import LoadingBox from "../components/LoadingBox";
import { axios as Axios } from "../utilities/axios";
import { USER_ADDRESS_MAP_CONFIRM } from "../constants/userConstants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//import MyComponents from '../components/maptest';

const libs = ["places"];
const defaultLocation = { lat: 28.5269235, lng: 77.2782783 };

export default function MapScreen(props) {
  const navigate = useNavigate();
  const [googleApiKey, setGoogleApiKey] = useState("");
  const [center, setCenter] = useState(defaultLocation);
  const [location, setLocation] = useState(center);

  const mapRef = useRef(null);
  const placeRef = useRef(null);
  const markerRef = useRef(null);
  const [activeMarker, setActiveMarker] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      // const { data } = await Axios('/api/auth/v1/google');
      // setGoogleApiKey(data);
      // setGoogleApiKey("AIzaSyCiWPpuF2-NcQovADeRnYwLvptBNFT_SxQ");
      setGoogleApiKey("AIzaSyCiWPpuF2-NcQovADeRnYwLvptBNFT_SxQ");
      getUserCurrentLocation();
    };
    fetch();
  }, []);

  const onLoad = (map) => {
    mapRef.current = map;
  };

  const onMarkerLoad = (marker) => {
    markerRef.current = marker;
  };
  const onLoadPlaces = (place) => {
    placeRef.current = place;
  };
  const onIdle = () => {
    setLocation({
      lat: mapRef.current.center.lat(),
      lng: mapRef.current.center.lng(),
    });
  };
  const onPlacesChanged = () => {
    const place = placeRef.current.getPlaces()[0].geometry.location;
    setCenter({ lat: place.lat(), lng: place.lng() });
    setLocation({ lat: place.lat(), lng: place.lng() });
  };
  const dispatch = useDispatch();
  const onConfirm = () => {
    const places = placeRef.current.getPlaces();
    if (places && places.length === 1) {
      // dispatch select action
      dispatch({
        type: USER_ADDRESS_MAP_CONFIRM,
        payload: {
          lat: location.lat,
          lng: location.lng,
          address: places[0].formatted_address,
          name: places[0].name,
          vicinity: places[0].city,
          googleAddressId: places[0].id,
        },
      });
      alert("location selected successfully.");
      // navigate('/shipping');
    } else {
      alert("Please enter your address");
    }
  };

  const getUserCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation os not supported by this browser");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };

  const markers = [
    {
      id: 1,
      name: "Chicago, Illinois",
      position: { lat: 28.6387759, lng: 77.1203312 },
    },
    {
      id: 2,
      name: "Denver, Colorado",
      position: { lat: 28.5269146, lng: 77.2782732 },
    },
    {
      id: 3,
      name: "Los Angeles, California",
      position: { lat: 28.5269146, lng: 77.2782732 },
    },
    {
      id: 4,
      name: "New York, New York",
      position: { lat: 24.5437577, lng: 73.71530829999999 },
    },
  ];

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return googleApiKey ? (
    <div className="full-container">
      <></>
    </div>
  ) : (
    <LoadingBox></LoadingBox>
  );
}
