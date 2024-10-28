import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../../App";
import { FailedMessage, SuccessMessage } from "../../Components/ToastMessage";

function AddNew() {
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();
  const [Response, setResponse] = useState({
    status: null,
    message: "",
  });
  const [Checkbox, setCheckbox] = useState(false);

  const [Img, setImg] = useState("");
  const [Data, setData] = useState({
    primary_family_id: "",
    secondary_family_id: null,
    member_id: "",
    assigned_member_id: "",
    member_name: "",
    member_tamil_name: "",
    gender: "",
    date_of_birth: "",
    email: "",
    occupation: "",
    community: "",
    nationality: "",
    member_photo: "",
    permanent_address: {
      address: "",
      city: "",
      district: "",
      state: "",
      zip_code: "",
    },
    present_address: {
      address: "",
      city: "",
      district: "",
      state: "",
      zip_code: "",
    },
    baptized_date: "",
    communion_date: "",
    marriage_date: "",
    // joined_date: new Date().toString(),
    joined_date:"",
    left_date: "",
    status: "Active",
  });
  // add/new
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${URL}/family/add/new`,
        { ...Data },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      setResponse({
        status: "Success",
        message: "Family Added Successfully.",
      });
      setTimeout(() => {
        navigate(`/admin/family/list`);
      }, 5000);
    } catch (error) {
      console.error(error);
      if (error.response.status === 401) {
        setResponse({
          status: "Failed",
          message: "Un Authorized! Please Login Again.",
        });
        setTimeout(() => {
          window.localStorage.clear();
          navigate("/");
        }, 5000);
      }
      if (error.response.status === 500) {
        setResponse({
          status: "Failed",
          message: "Server Unavailable!",
        });
        setTimeout(() => {
          setResponse({
            status: null,
            message: "",
          });
        }, 5000);
      }
    }
  };
  useEffect(() => {
    if (Data.member_photo) {
      const fileReader = new FileReader();
      fileReader.addEventListener("load", (ev) => {
        setImg(ev.target.result);
      });
      fileReader.readAsDataURL(Data.member_photo);
    }
  }, [Data]);
  useEffect(() => {
    if (Checkbox) {
      setData({ ...Data, present_address: { ...Data.permanent_address } });
    }
  }, [Checkbox]);
  return (
    <React.Fragment>
      <section className="w-full bg-slate-50 rounded-ss">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="w-full bg-white rounded-md flex flex-col p-5">
            <h1 className="text-lavender--600 font-semibold text-xl">
              New Family
            </h1>
          </div>
          <div className="w-full bg-white rounded-ss flex flex-col p-5 mb-20 space-y-10">
            <h1 className="text-lavender--600 font-semibold text-xl">
              Personal Information
            </h1>
            <div className="w-full grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="w-full">
                <label
                  htmlFor="assigned_member_id"
                  className="block font-semibold text-gray-800 dark:text-white mb-3"
                >
                  Assigned Member Id
                </label>
                <input
                  type="text"
                  name="assigned_member_id"
                  id="assigned_member_id"
                  className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-lavender--600 focus:border-lavender--600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
                  placeholder=""
                  required
                  onChange={(e) =>
                    setData({ ...Data, assigned_member_id: e.target.value })
                  }
                  value={Data.assigned_member_id}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="mobile_number"
                  className="block font-semibold text-gray-800 dark:text-white mb-3"
                >
                  Mobile Number
                </label>
                <input
                  type="number"
                  name="mobile_number"
                  id="mobile_number"
                  className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-lavender--600 focus:border-lavender--600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
                  placeholder=""
                  required
                  onChange={(e) =>
                    setData({
                      ...Data,
                      mobile_number: e.target.value,
                    })
                  }
                  value={Data.mobile_number}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="member_name"
                  className="block font-semibold text-gray-800 dark:text-white mb-3"
                >
                  Family Head Name
                </label>
                <input
                  type="text"
                  name="member_name"
                  id="member_name"
                  className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-lavender--600 focus:border-lavender--600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
                  placeholder=""
                  required
                  onChange={(e) =>
                    setData({ ...Data, member_name: e.target.value })
                  }
                  value={Data.member_name}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="member_tamil_name"
                  className="block font-semibold text-gray-800 dark:text-white mb-3"
                >
                  Family Head Tamil Name
                </label>
                <input
                  type="text"
                  name="member_tamil_name"
                  id="member_tamil_name"
                  className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-lavender--600 focus:border-lavender--600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
                  placeholder=""
                  required
                  onChange={(e) =>
                    setData({
                      ...Data,
                      member_tamil_name: e.target.value,
                    })
                  }
                  value={Data.member_tamil_name}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="gender"
                  className="block font-semibold text-gray-800 dark:text-white mb-3"
                >
                  Gender
                </label>
                <select
                  onChange={(e) =>
                    setData({
                      ...Data,
                      gender: e.target.value,
                    })
                  }
                  defaultValue={Data.gender}
                  id="gender"
                  name="gender"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-lavender--600 focus:border-lavender--600 block w-full px-2.5 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lavender--600 dark:focus:border-lavender--600"
                >
                  <option value="">Select</option>
                  {["Male", "Female", "Others"].map((gen, index) => (
                    <option value={gen} key={index}>
                      {gen}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full">
                <label
                  htmlFor="date_of_birth"
                  className="block font-semibold text-gray-800 dark:text-white mb-3"
                >
                  Date of Birth
                </label>
                <input
                  onChange={(e) =>
                    setData({ ...Data, date_of_birth: e.target.value })
                  }
                  value={Data.date_of_birth}
                  type="date"
                  name="date_of_birth"
                  id="date_of_birth"
                  className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-lavender--600 focus:border-lavender--600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
                  placeholder=""
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="joining_date"
                  className="block font-semibold text-gray-800 dark:text-white mb-3"
                >
                 Joining Date
                </label>
                <input
                  onChange={(e) =>
                    setData({ ...Data, joined_date: e.target.value })
                  }
                  value={Data.joined_date}
                  type="date"
                  name="joining_date"
                  id="joining_date"
                  className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-lavender--600 focus:border-lavender--600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
                  placeholder=""
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="email"
                  className="block font-semibold text-gray-800 dark:text-white mb-3"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-lavender--600 focus:border-lavender--600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
                  placeholder=""
                  required
                  onChange={(e) => setData({ ...Data, email: e.target.value })}
                  value={Data.email}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="occupation"
                  className="block font-semibold text-gray-800 dark:text-white mb-3"
                >
                  Occupation
                </label>
                <input
                  type="text"
                  name="occupation"
                  id="occupation"
                  className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-lavender--600 focus:border-lavender--600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
                  placeholder=""
                  required
                  onChange={(e) =>
                    setData({ ...Data, occupation: e.target.value })
                  }
                  value={Data.occupation}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="community"
                  className="block font-semibold text-gray-800 dark:text-white mb-3"
                >
                  Community
                </label>
                <input
                  type="text"
                  name="community"
                  id="community"
                  className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-lavender--600 focus:border-lavender--600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
                  placeholder=""
                  required
                  onChange={(e) =>
                    setData({ ...Data, community: e.target.value })
                  }
                  value={Data.community}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="nationality"
                  className="block font-semibold text-gray-800 dark:text-white mb-3"
                >
                  Nationality
                </label>
                <input
                  type="nationality"
                  name="nationality"
                  id="nationality"
                  className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-lavender--600 focus:border-lavender--600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
                  placeholder=""
                  required
                  onChange={(e) =>
                    setData({ ...Data, nationality: e.target.value })
                  }
                  value={Data.nationality}
                />
              </div>
              {Img === "" ? (
                <div className="w-full">
                  <label
                    htmlFor="member_photo"
                    className="block font-semibold text-gray-800 dark:text-white mb-3"
                  >
                    Family Head Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setData({
                        ...Data,
                        member_photo: e.target.files[0],
                      });
                    }}
                    name="member_photo"
                    id="member_photo"
                    className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-lavender--600 focus:border-lavender--600 block w-full py-0.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
                    placeholder=""
                    required={Data.member_photo === ""}
                  />
                </div>
              ) : (
                <div className="relative w-40 h-40 rounded-md overflow-hidden">
                  <img
                    src={Img}
                    alt="profile picture"
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute top-1 right-3 rounded-full bg-red-500 text-white">
                    <i
                      className="fa-solid fa-xmark rounded-full hover:cursor-pointer px-0.5 border border-red-600 text-red-600 absolute right-0 top-2"
                      onClick={() => {
                        setImg("");
                        setData((prev) => {
                          return { ...prev, member_photo: "" };
                        });
                      }}
                    ></i>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="w-full bg-white rounded-ss flex flex-col p-5 mb-20 space-y-10">
            <div className="flex justify-between gap-10">
              <div className="w-full space-y-10">
                <h1 className="text-lavender--600 font-semibold text-xl">
                  Permanent Address
                </h1>
                <div className="w-full grid gap-4 sm:grid-cols-1 sm:gap-6">
                  <div className="w-full">
                    <label
                      htmlFor="address"
                      className="block font-semibold text-gray-800 dark:text-white mb-3"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-lavender--600 focus:border-lavender--600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
                      placeholder="House No/Name"
                      required
                      onChange={(e) =>
                        setData({
                          ...Data,
                          permanent_address: {
                            ...Data.permanent_address,
                            address: e.target.value,
                          },
                        })
                      }
                      value={Data.permanent_address.address}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="city"
                      className="block font-semibold text-gray-800 dark:text-white mb-3"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-lavender--600 focus:border-lavender--600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
                      placeholder="city"
                      required
                      onChange={(e) =>
                        setData({
                          ...Data,
                          permanent_address: {
                            ...Data.permanent_address,
                            city: e.target.value,
                          },
                        })
                      }
                      value={Data.permanent_address.city}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="district"
                      className="block font-semibold text-gray-800 dark:text-white mb-3"
                    >
                      District
                    </label>
                    <input
                      type="text"
                      name="district"
                      id="district"
                      className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-lavender--600 focus:border-lavender--600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
                      placeholder="district"
                      required
                      onChange={(e) =>
                        setData({
                          ...Data,
                          permanent_address: {
                            ...Data.permanent_address,
                            district: e.target.value,
                          },
                        })
                      }
                      value={Data.permanent_address.district}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="state"
                      className="block font-semibold text-gray-800 dark:text-white mb-3"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      id="state"
                      className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-lavender--600 focus:border-lavender--600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
                      placeholder="state"
                      required
                      onChange={(e) =>
                        setData({
                          ...Data,
                          permanent_address: {
                            ...Data.permanent_address,
                            state: e.target.value,
                          },
                        })
                      }
                      value={Data.permanent_address.state}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="country"
                      className="block font-semibold text-gray-800 dark:text-white mb-3"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      id="country"
                      className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-lavender--600 focus:border-lavender--600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
                      placeholder="country"
                      required
                      onChange={(e) =>
                        setData({
                          ...Data,
                          permanent_address: {
                            ...Data.permanent_address,
                            country: e.target.value,
                          },
                        })
                      }
                      value={Data.permanent_address.country}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="zip_code"
                      className="block font-semibold text-gray-800 dark:text-white mb-3"
                    >
                      Zip Code
                    </label>
                    <input
                      type="text"
                      name="zip_code"
                      id="zip_code"
                      className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-lavender--600 focus:border-lavender--600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
                      placeholder="Zip Code"
                      required
                      onChange={(e) =>
                        setData({
                          ...Data,
                          permanent_address: {
                            ...Data.permanent_address,
                            zip_code: e.target.value,
                          },
                        })
                      }
                      value={Data.permanent_address.zip_code}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full space-y-10">
                <div className="flex justify-between">
                  <h1 className="text-lavender--600 font-semibold text-xl">
                    Present Address
                  </h1>
                  <div className="flex items-center mb-4">
                    <input
                      id="default-checkbox"
                      onClick={() => setCheckbox((prev) => !prev)}
                      type="checkbox"
                      value={Checkbox}
                      className="w-4 h-4 text-lavender--600 bg-gray-100 border-gray-300 rounded focus:ring-lavender--500 dark:focus:ring-lavender--600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="default-checkbox"
                      className="ms-2 text-xs font-medium text-gray-900 dark:text-gray-300"
                    >
                      Same as Permanent Address
                    </label>
                  </div>
                </div>
                <div className="w-full grid gap-4 sm:grid-cols-1 sm:gap-6">
                  <div className="w-full">
                    <label
                      htmlFor="address"
                      className="block font-semibold text-gray-800 dark:text-white mb-3"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      className="bg-gray-50 disabled:bg-slate-100 disabled:cursor-not-allowed border border-gray-300 text-gray-800 rounded-lg focus:ring-lavender--600 focus:border-lavender--600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
                      placeholder="House No/Name"
                      required
                      disabled={Checkbox}
                      onChange={(e) =>
                        setData({
                          ...Data,
                          present_address: {
                            ...Data.present_address,
                            address: e.target.value,
                          },
                        })
                      }
                      value={
                        Checkbox
                          ? Data.permanent_address.address
                          : Data.present_address.address
                      }
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="city"
                      className="block font-semibold text-gray-800 dark:text-white mb-3"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      className="bg-gray-50 disabled:bg-slate-100 disabled:cursor-not-allowed border border-gray-300 text-gray-800 rounded-lg focus:ring-lavender--600 focus:border-lavender--600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
                      placeholder="city"
                      required
                      disabled={Checkbox}
                      onChange={(e) =>
                        setData({
                          ...Data,
                          present_address: {
                            ...Data.present_address,
                            city: e.target.value,
                          },
                        })
                      }
                      value={
                        Checkbox
                          ? Data.permanent_address.city
                          : Data.present_address.city
                      }
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="district"
                      className="block font-semibold text-gray-800 dark:text-white mb-3"
                    >
                      District
                    </label>
                    <input
                      type="text"
                      name="district"
                      id="district"
                      className="bg-gray-50 disabled:bg-slate-100 disabled:cursor-not-allowed border border-gray-300 text-gray-800 rounded-lg focus:ring-lavender--600 focus:border-lavender--600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
                      placeholder="district"
                      required
                      disabled={Checkbox}
                      onChange={(e) =>
                        setData({
                          ...Data,
                          present_address: {
                            ...Data.present_address,
                            district: e.target.value,
                          },
                        })
                      }
                      value={
                        Checkbox
                          ? Data.permanent_address.district
                          : Data.present_address.district
                      }
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="state"
                      className="block font-semibold text-gray-800 dark:text-white mb-3"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      id="state"
                      className="bg-gray-50 disabled:bg-slate-100 disabled:cursor-not-allowed border border-gray-300 text-gray-800 rounded-lg focus:ring-lavender--600 focus:border-lavender--600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
                      placeholder="state"
                      required
                      disabled={Checkbox}
                      onChange={(e) =>
                        setData({
                          ...Data,
                          present_address: {
                            ...Data.present_address,
                            state: e.target.value,
                          },
                        })
                      }
                      value={
                        Checkbox
                          ? Data.permanent_address.state
                          : Data.present_address.state
                      }
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="country"
                      className="block font-semibold text-gray-800 dark:text-white mb-3"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      id="country"
                      className="bg-gray-50 disabled:bg-slate-100 disabled:cursor-not-allowed border border-gray-300 text-gray-800 rounded-lg focus:ring-lavender--600 focus:border-lavender--600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
                      placeholder="country"
                      required
                      disabled={Checkbox}
                      onChange={(e) =>
                        setData({
                          ...Data,
                          present_address: {
                            ...Data.present_address,
                            country: e.target.value,
                          },
                        })
                      }
                      value={
                        Checkbox
                          ? Data.permanent_address.country
                          : Data.present_address.country
                      }
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="zip_code"
                      className="block font-semibold text-gray-800 dark:text-white mb-3"
                    >
                      Zip Code
                    </label>
                    <input
                      type="text"
                      name="zip_code"
                      id="zip_code"
                      className="bg-gray-50 disabled:bg-slate-100 disabled:cursor-not-allowed border border-gray-300 text-gray-800 rounded-lg focus:ring-lavender--600 focus:border-lavender--600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
                      placeholder="Zip Code"
                      required
                      disabled={Checkbox}
                      onChange={(e) =>
                        setData({
                          ...Data,
                          present_address: {
                            ...Data.present_address,
                            zip_code: e.target.value,
                          },
                        })
                      }
                      value={
                        Checkbox
                          ? Data.permanent_address.zip_code
                          : Data.present_address.zip_code
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-white rounded-ss flex flex-col p-5 mb-20 space-y-10">
            <h1 className="text-lavender--600 font-semibold text-xl">
              Spiritual Information
            </h1>
            <div className="space-y-36 pb-10">
              <div className="w-full grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="w-full">
                  <label
                    htmlFor="baptized_date"
                    className="block font-semibold text-gray-800 dark:text-white mb-3"
                  >
                    Baptized Date
                  </label>
                  <input
                    onChange={(e) =>
                      setData({ ...Data, baptized_date: e.target.value })
                    }
                    value={Data.baptized_date}
                    type="date"
                    name="baptized_date"
                    id="baptized_date"
                    className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-lavender--600 focus:border-lavender--600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
                    placeholder=""
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="communion_date"
                    className="block font-semibold text-gray-800 dark:text-white mb-3"
                  >
                    Communion Date
                  </label>
                  <input
                    onChange={(e) =>
                      setData({ ...Data, communion_date: e.target.value })
                    }
                    value={Data.communion_date}
                    type="date"
                    name="communion_date"
                    id="communion_date"
                    className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-lavender--600 focus:border-lavender--600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
                    placeholder=""
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="marriage_date"
                    className="block font-semibold text-gray-800 dark:text-white mb-3"
                  >
                    Marriage Date
                  </label>
                  <input
                    onChange={(e) =>
                      setData({ ...Data, marriage_date: e.target.value })
                    }
                    value={Data.marriage_date}
                    type="date"
                    name="marriage_date"
                    id="marriage_date"
                    className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-lavender--600 focus:border-lavender--600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-end space-x-8">
            <Link
              to={`/admin/family/list`}
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-base font-semibold text-center text-red-600 rounded-lg focus:ring-2 hover:text-red-700 focus:ring-red-200"
            >
              Discard
            </Link>
            <button
              type="submit"
              className="inline-flex disabled:bg-opacity-80 items-center px-20 py-2.5 mt-4 sm:mt-6 text-base font-semibold text-center text-white bg-lavender--600 rounded-lg focus:ring-4 hover:bg-lavender--600  focus:ring-lavender-light-400"
            >
              Save
            </button>
          </div>
        </form>
      </section>
      {Response.status !== null ? (
        Response.status === "Success" ? (
          <SuccessMessage Message={Response.message} />
        ) : Response.status === "Failed" ? (
          <FailedMessage Message={Response.message} />
        ) : null
      ) : null}
    </React.Fragment>
  );
}

export default AddNew;
