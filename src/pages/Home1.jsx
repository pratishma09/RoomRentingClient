import { React, useState, useEffect } from "react";
import Footer from "../components/Footer";
import { BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Popup from "../components/Popup";
import axios from "axios";
import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();
  const [showPopUp, setShowPopUp] = useState(false);
  const [search, setSearch] = useState("");
  const [rooms, setRooms] = useState([]);
  const [visible, setVisible] = useState(6);

  const showMoreItems = () => {
    setVisible((preValue) => preValue + 3);
  };

  const debounce = (mainFunc, delay) => {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        mainFunc();
      }, delay);
    };
  };

  function fetchJobs() {
    axios
      .get(`http://localhost:8000/api/rooms?search=${search}`)
      .then((res) => {
        console.log(res.data.items);
        setRooms(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    const debouncedFetchJobs = debounce(fetchJobs, 500);
    debouncedFetchJobs();
  }, [search]);

  return (
    <div>
      <Navbar />

      <div className="relative w-full">
        <img src={require("../images/home.jpg")} className="w-full" />
        <div className="flex flex-col absolute top-20 px-[500px] ">
          <p className="font-semibold text-5xl pt-20 text-white">
            ROOMS EVERYWHERE
          </p>

          <div className="flex flex-row left-1/2 bg-white py-5 px-5 rounded-xl mt-20">
            <input
              type="search"
              id="search"
              name="search"
              className=" italic text-gray-500 text-sm px-20 outline-none"
              placeholder="search location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <BiSearch className="text-blue-400 text-lg font-semibold " />
            </button>
          </div>
        </div>
      </div>
      <div className="px-5">
        <p className="text-blue-400 italic text-md mt-5">
          Find the room that fits your lifestyle.
        </p>
        <p className="text-slate-500 italic text-sm">
          We have a solution for all your room queries.
        </p>
        <p className="font-semibold text-blue-400 mt-5">Popular</p>
        <div className="flex flex-row justify-between mt-3 text-center">
          <div className="bg-blue-400 w-[200px] h-100 py-20 rounded-xl">
            <button
              className=" text-white font-semibold "
              onClick={() => setSearch("Chabahil")}
            >
              Chabahil
            </button>
          </div>
          <div className="bg-blue-400 w-[200px] h-100 rounded-xl ml-2">
            <button
              className=" text-white font-semibold py-20"
              onClick={() => setSearch("Kalanki")}
            >
              Kalanki
            </button>
          </div>
          <div className="bg-blue-400 w-[200px] h-100 rounded-xl ml-2">
            <button
              className=" text-white font-semibold py-20"
              onClick={() => setSearch("kathmandu")}
            >
              kathmandu
            </button>
          </div>
          <div className="bg-blue-400 w-[200px] h-100 rounded-xl ml-2">
            <button
              className=" text-white font-semibold py-20"
              onClick={() => setSearch("Satdobato")}
            >
              Satdobato
            </button>
          </div>
          <div className="bg-blue-400 w-[200px] h-100 rounded-xl ml-2">
            <button
              className=" text-white font-semibold py-20"
              onClick={() => setSearch("Lazimpat")}
            >
              Lazimpat
            </button>
          </div>
        </div>

        <div className="flex flex-row m-auto w-[500px] h-[201px] shadow-2xl rounded-2xl mt-10">
          <div className="w-[500px] h-[201px] pl-5 m-auto py-10">
            <p className="font-semibold uppercase text-blue-600 pb-20">
              Post your property
            </p>
            <button className="text-white bg-gradient-to-b from-blue-300 to-blue-600 px-3 py-2 rounded-xl">
              <Link to="./RoomPost">FREE</Link>
            </button>
          </div>
          <div>
            <img
              src={require("../images/post.png")}
              className="w-[500px] h-[200px] pt-5"
            />
          </div>
        </div>
        <div>
          <p className="font-semibold text-blue-400 mt-10 mb-5">Newest</p>

          <div className="grid grid-cols-4">
            {rooms.slice(0, visible).map((room) => (
              <button className="card" onClick={setShowPopUp} key={room._id}>
                {room.images.length === 0 ? (
                  <img src={require("../images/login2.png")} />
                ) : (
                  <img src={require("../images/login2.png")} />
                )}
                <div className="flex flex-row justify-between">
                  <div>
                    <p className="text-blue-400 text-sm">{room.address}</p>
                    <p className="italic text-xs text-gray-700 mt-2 pl-2">
                      No. of rooms: {room.noOfRooms}
                    </p>
                  </div>
                  <div>
                    <p className="italic text-xs text-gray-700">
                      Rs. {room.price}
                    </p>

                    <button
                      className="pt-6 italic text-xs text-gray-400"
                      onClick={setShowPopUp}
                    >
                      View more {">"}
                    </button>
                    <Popup
                      isVisible={showPopUp}
                      onClose={() => setShowPopUp(false)}
                      room={room}
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>

          <button
            className="font-semibold text-blue-400 mt-10 text-center w-full hover:text-blue-500"
            onClick={showMoreItems}
          >
            View more {">"}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;