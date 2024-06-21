import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import { FaUpload, FaSearch } from "react-icons/fa";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import logo from "./utilies/images/Inspired_Logo.png";

const schools = [
  {
    name: "Fulham School",
    url: "https://airep.fulham.school/fileupdate/files",
  },
  {
    name: "Tauranga School",
    url: "https://airep.fulham.school/fileupdate/files",
  },
  {
    name: "Vietnam School",
    url: "https://airep.fulham.school/fileupdate/files",
  },
  {
    name: "Jakarta School",
    url: "https://airep.fulham.school/fileupdate/files",
  },
  {
    name: "Bahrain School",
    url: "https://airep.fulham.school/fileupdate/files",
  },
];

export function TransactionsTable() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const fileInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([
    // {
    //   imgSrc: "https://randomuser.me/api/portraits/men/30.jpg",
    //   name: "John Doe",
    //   date: "05/06/2020",
    //   time: "10:00",
    // },
    // {
    //   imgSrc: "https://randomuser.me/api/portraits/men/76.jpg",
    //   name: "John Frillo",
    //   date: "05/06/2020",
    //   time: "12:15",
    // },
    // {
    //   imgSrc: "https://randomuser.me/api/portraits/men/38.jpg",
    //   name: "Brett Castillo",
    //   date: "05/06/2020",
    //   time: "08:35",
    // },
  ]);

  //upload
  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "http://localhost:5000/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("File uploaded successfully:", response.data);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  //Dropdown
  const toggleDropdown = (event) => {
    event.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelection = (school) => {
    setSelectedSchool(school);
    fetch(school.url)
      .then((response) => response.json())
      .then((data) => console.log("Data:", data))
      .catch((error) => console.error("Error:", error));
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    if (selectedSchool) {
      console.log(`Selected school: ${selectedSchool.name}`);
    }
  }, [selectedSchool]);

  //Get Query
  useEffect(() => {
    fetch("https://airep.fulham.school/fileupdate/files")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Sorting logic
        const sortedData = data.data.sort((a, b) => {
          const getNumber = (filename) => {
            const match = filename.match(/Q(\d+)/);
            return match ? parseInt(match[1], 10) : Infinity;
          };

          const numA = getNumber(a.filename);
          const numB = getNumber(b.filename);
          return numA - numB;
        });

        console.log("Sorted data:", sortedData);
        setUsers(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  //SearchQuery
  const handleSearch = () => {
    if (searchQuery) {
      axios
        .get(
          `https://airep.fulham.school/fileupdate/search?search=${searchQuery}`
        )
        .then((response) => {
          const sortedData = response.data.data.sort((a, b) => {
            const getNumber = (filename) => {
              const match = filename.match(/Q(\d+)/);
              return match ? parseInt(match[1], 10) : Infinity;
            };

            const numA = getNumber(a.filename);
            const numB = getNumber(b.filename);
            return numA - numB;
          });

          setUsers(sortedData);
        })
        .catch((error) =>
          console.error("Error fetching search results:", error)
        );
    } else {
      // Fetch all files if the search query is empty
      axios
        .get("https://airep.fulham.school/fileupdate/files")
        .then((response) => {
          const sortedData = response.data.data.sort((a, b) => {
            const getNumber = (filename) => {
              const match = filename.match(/Q(\d+)/);
              return match ? parseInt(match[1], 10) : Infinity;
            };

            const numA = getNumber(a.filename);
            const numB = getNumber(b.filename);
            return numA - numB;
          });

          setUsers(sortedData);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  };

  //Delete
  const handelDelete = (id) => {
    axios
      .delete("http://localhost:3001/deleteUser/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  //update
  const handelUpdate = (id) => {
    axios
      .put("http://localhost:3001/UpdateUser/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const fetchData = (value) => {
    axios
      .get(`https://airep.fulham.school/fileupdate/search?search=${value}`)
      .then((response) => {
        const sortedData = response.data.data.sort((a, b) => {
          const getNumber = (filename) => {
            const match = filename.match(/Q(\d+)/);
            return match ? parseInt(match[1], 10) : Infinity;
          };

          const numA = getNumber(a.filename);
          const numB = getNumber(b.filename);
          return numA - numB;
        });

        setUsers(sortedData);
      })
      .catch((error) => console.error("Error fetching search results:", error));
  };

  const handleChange = (value) => {
    setSearchQuery(value);
    if (value) {
      fetchData(value);
    } else {
      // Fetch all files if the search query is empty
      axios
        .get("https://airep.fulham.school/fileupdate/files")
        .then((response) => {
          const sortedData = response.data.data.sort((a, b) => {
            const getNumber = (filename) => {
              const match = filename.match(/Q(\d+)/);
              return match ? parseInt(match[1], 10) : Infinity;
            };

            const numA = getNumber(a.filename);
            const numB = getNumber(b.filename);
            return numA - numB;
          });

          setUsers(sortedData);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  };

  return (
    <div>
      <Card className="h-full w-full">
        <div className="  flex  items-center bg-customLightGray p-2 bg-white-100">
          <div className="flex justify-start ">
            <a href="">
              <img
                src={logo}
                alt="Inspired Logo"
                width="170"
                height="80"
                className="d-inline-block align-top ms-0"
              />
            </a>
          </div>
          <div className="relative flex  text-center justify-center items-center mx-4 my-2 w-full ">
            <div className="flex items-center">
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="bg-customBlue hover:bg-cutomhover p-3 w-27 h-8 flex items-center font-mono text-white justify-center text-md rounded-l-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white"
              >
                Select School
                {isDropdownOpen ? (
                  <AiOutlineCaretUp className="ml-2 h-5 w-3" />
                ) : (
                  <AiOutlineCaretDown className="ml-2 h-5 w-3" />
                )}
              </button>
              {isDropdownOpen && (
                <div className="bg-customBlue text-white absolute top-12 flex flex-col items-start rounded-lg p-2 w-full md:w-48 z-50">
                  {schools.map((school, index) => (
                    <div
                      key={index}
                      className="w-full "
                      onClick={() => handleSelection(school)}
                    >
                      <h3 className="px-2 py-1 hover:bg-blue-500 rounded text-start">
                        {school.name}
                      </h3>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex h-18 w-full md:w-80 bg-gray-200 justify-end rounded-r-lg overflow-hidden">
                <div class="flex items-center pl-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>

                <input
                  className="flex justify-end border-none bg-transparent w-100 text-gray-900 outline-none focus:ring-0"
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => handleChange(e.target.value)}
                />

                {/* <button
                  className="px-1 bg-blue-800 font-mono text-white"
                  onClick={handleSearch}
                >
                  Search
                </button> */}
              </div>
            </div>
          </div>
          <div className=" flex justify-end ml-auto my-2">
            <input
              type="file"
              ref={fileInputRef}
              id="upload"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              className="btn border font-mono bg-customBlue rounded-pill d-flex justify-content-center align-items-center p-2 w-full md:w-40 text-white hover:bg-cutomhover"
              onClick={handleClick}
            >
              <FaUpload style={{ marginRight: "6px" }} />
              Upload
            </button>
          </div>
        </div>

        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none min-h-20 w-full  m-0 z-10"
        >
          <CardBody className="px-0 overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead className="justify-evenly px-35 font-mono">
                <tr className="bg-[#141e55]  ">
                  <th className="text-center py-2">
                    <span className="text-gray-100 font-semibold min-w-10">
                      Serial No
                    </span>
                  </th>
                  <th className="px-16 py-2 text-start min-w-[200px]">
                    <span className="text-gray-100 font-semibold">
                      File Name
                    </span>
                  </th>
                  <th className="px-0  py-2 text-center min-w-10">
                    <span className="text-gray-100 font-semibold">File ID</span>
                  </th>

                  <th className="px-16 py-2 text-center min-w-10">
                    <span className="text-gray-100 font-semibold">
                      Creation Time
                    </span>
                  </th>

                  <th className="px-16 py-2 text-center min-w-10">
                    <span className="text-gray-100 font-semibold ">
                      Modification time
                    </span>
                  </th>

                  <th className="px-16 mr-6 py-2 text-center min-w-10">
                    <span className="text-gray-100 font-semibold">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-200">
                {users.map((user, index) => {
                  return (
                    <tr
                      key={index}
                      className="bg-white border-b-2 border-gray-200"
                    >
                      <td className="px-5 py-4 text-center justify-center items-center">
                        {index + 1}
                      </td>
                      <td className="px-15 py-2  items-center">
                        {user.filename}
                      </td>
                      <td>
                        <span className="px-6 text-center ml-2 font-semibold">
                          {/* {user.file_id} */}
                          {index + 1}
                        </span>
                      </td>

                      <td className="px-16 py-2">
                        <span>{user.creation_time}</span>
                      </td>
                      <td className="px-16 py-2">
                        <span>{user.modification_time}</span>
                      </td>

                      <td className="px-16 py-2">
                        <span className="flex">
                          <button
                            className="btn d-flex justify-content-center hover:text-green-500 align-items-center"
                            onClick={(e) => handelUpdate(user._id)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn d-flex justify-content-center hover:text-red-500 align-items-center"
                            onClick={(e) => handelDelete(user._id)}
                          >
                            <FaTrash />
                          </button>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        </CardHeader>
      </Card>
    </div>
  );
}
