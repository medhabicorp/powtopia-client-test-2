import React, { useEffect, useState } from "react";
import UseAuth from "../../../hooks/UseAuth";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const UserProfile = () => {
  const [userCountry, setUserCountry] = useState();
  const { user } = UseAuth();
  console.log(user);

  useEffect(() => {
    const currentDate = new Date();
    const timeZoneOffset = currentDate.getTimezoneOffset();
    const offsetInHours = -timeZoneOffset / 60;
    const countryByTimeZone = {
      5.5: "India",
      "-5": "United States (Eastern)",
      "-4": "United States (Atlantic)",
      0: "United Kingdom",
      1: "Germany",
      6: "Bangladesh",
      9: "Japan",
      8: "China",
      3: "Saudi Arabia",
      2: "South Africa",
      "-8": "United States (Pacific)",
      "-7": "United States (Mountain)",
      "-6": "United States (Central)",
      10: "Australia (Eastern)",
    };
    setUserCountry(countryByTimeZone[offsetInHours] || "Unknown Country");
  }, []);

  return (
    <div className="py-10 flex flex-col items-center">
      <h1 className="text-center text-3xl font-semibold mb-6">
        Welcome, {user?.displayName}
      </h1>
      <div className="max-w-md rounded-lg bg-white shadow-md border border-gray-200 p-6 text-center">
        <img
          src={user?.photoURL}
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary"
          alt="Profile"
        />
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gray-700">
            <p className="font-semibold">Name:</p>
            <p>{user?.displayName}</p>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <MdEmail className="text-blue-500 text-lg" />
            <p>{user?.email}</p>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <MdPhone className="text-green-500 text-lg" />
            <p>Not Available</p>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <MdLocationOn className="text-red-500 text-lg" />
            <p>{userCountry}</p>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <p className="font-semibold">Last Login:</p>
            <p>{user?.metadata.lastSignInTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
