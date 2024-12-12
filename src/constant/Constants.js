

const BASE_URL ="https://gitets.mltcorporate.com/api/" ; // This will load from your .env file

const API_ENDPOINTS = {

  LOGIN: `${BASE_URL}user-login`,
 
  BOOKING_HISTORY: `${BASE_URL}/ride-history`,
  CANCLE_BOOKING: `${BASE_URL}/cancel-booking`,
  GOOGLE_MAPS_API_KEY:"AIzaSyCI7CwlYJ6Qt5pQGW--inSsJmdEManW-K0"

};

export default API_ENDPOINTS;

export  const CHANGE_AVAILABILITY= "change-availability";