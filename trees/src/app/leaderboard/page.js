'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import farmerCartoon2 from "../../../public/images/farmerCartoon2.png";
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CrownIcon = ({ color }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} className="w-6 h-6">
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
    </svg>
);

const Leaderboard = () => {
    const [users, setUsers] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [limit, setLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const fetchLeaderboard = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('token'); // Assuming you store the JWT token in localStorage
            const headers = {
                'Content-Type': 'application/json',
            };
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
            const response = await fetch('/api/leaderboard', {
                method: 'GET',
                headers: headers,
            });
            if (!response.ok) {
                throw new Error('Failed to fetch leaderboard');
            }
            const data = await response.json();
            setUsers(data.users);
            setTotalPages(Math.ceil(data.users.length / limit));

            if (data.loggedInUserId) {
                const userIndex = data.users.findIndex(user => user._id === data.loggedInUserId);
                if (userIndex !== -1) {
                    setLoggedInUser(data.users[userIndex]);
                }
            }

            setLoading(false);
        } catch (err) {
            console.error('Error fetching leaderboard:', err);
            setError('Failed to fetch leaderboard. Please try again later.');
            setLoading(false);
        }
    };

    const handleLimitChange = (newLimit) => {
        setLimit(newLimit);
        setCurrentPage(1);
        setTotalPages(Math.ceil(users.length / newLimit));
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-white">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
        </div>
    );
    if (error) return <div className="text-red-500 text-center bg-white p-8">{error}</div>;

    const displayedUsers = users.slice((currentPage - 1) * limit, currentPage * limit);

    return (
      <>
        <Navbar></Navbar>
        <div className="flex flex-col md:flex-row h-screen mt-8 bg-white">
          {/* Left side - Motivation and Information */}
          <div className="w-full md:w-1/3 p-8 flex flex-col justify-center items-center bg-gradient-to-br from-green-50 to-blue-50 shadow-lg">
            <h1 className="text-4xl font-bold text-green-800 mb-4 text-center">
              Eco-Champions Dashboard
            </h1>
            <p className="text-lg text-green-700 mb-6 text-center max-w-md">
              Every action counts! Join our community of eco-warriors and make a
              lasting impact on our planet.
            </p>
            <Image
              src={farmerCartoon2}
              className="w-64 h-auto mb-6"
              alt="Farmer Cartoon"
            />
            {loggedInUser && (
              <div className="bg-white rounded-lg p-6 shadow-md border border-green-200 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-green-800 mb-4">
                  Your Eco-Impact
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm uppercase tracking-wide text-green-600">
                      Rank
                    </p>
                    <p className="font-bold text-3xl text-green-700">
                      {loggedInUser.rank}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm uppercase tracking-wide text-green-600">
                      Points
                    </p>
                    <p className="font-bold text-3xl text-green-700">
                      {loggedInUser.points}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm uppercase tracking-wide text-green-600">
                      Events
                    </p>
                    <p className="font-bold text-3xl text-green-700">
                      {loggedInUser.registeredEvents}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right side - Leaderboard */}
          <div className="w-full md:w-2/3 p-8 overflow-auto">
            <h2 className="text-3xl font-bold text-green-800 mb-6">
              Eco-Champions Leaderboard
            </h2>
            <div className="mb-6 flex justify-between items-center">
              <div>
                <label
                  htmlFor="limit"
                  className="text-green-700 mr-2 font-medium"
                >
                  Display:
                </label>
                <select
                  id="limit"
                  value={limit}
                  onChange={(e) => handleLimitChange(Number(e.target.value))}
                  className="bg-white border border-green-300 text-green-900 text-sm rounded-full focus:ring-green-500 focus:border-green-500 p-2.5"
                >
                  {[10, 20, 50, 100].map((value) => (
                    <option key={value} value={value}>
                      Top {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md border border-green-200 overflow-hidden">
              <table className="w-full text-sm text-left text-green-700">
                <thead className="text-xs text-green-700 uppercase bg-green-50">
                  <tr>
                    <th scope="col" className="px-6 py-4 rounded-tl-lg">
                      Rank
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Points
                    </th>
                    <th scope="col" className="px-6 py-4 rounded-tr-lg">
                      Events
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {displayedUsers.map((user) => (
                    <tr
                      key={user._id}
                      className={`border-b transition duration-300 ease-in-out ${
                        user._id === loggedInUser?._id
                          ? "bg-green-100 hover:bg-green-200"
                          : "hover:bg-green-50"
                      }`}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-green-900 whitespace-nowrap flex items-center"
                      >
                        {user.rank <= 3 && (
                          <CrownIcon
                            color={
                              user.rank === 1
                                ? "#FFD700"
                                : user.rank === 2
                                ? "#C0C0C0"
                                : "#CD7F32"
                            }
                          />
                        )}
                        <span
                          className={`ml-2 ${
                            user.rank <= 3 ? "font-bold" : ""
                          }`}
                        >
                          {user.rank}
                        </span>
                      </th>
                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4 font-semibold">{user.points}</td>
                      <td className="px-6 py-4">{user.registeredEvents}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 bg-green-600 text-white rounded-lg ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-green-700"
                }`}
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
              <span className="text-green-900">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 bg-green-600 text-white rounded-lg ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-green-700"
                }`}
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <Footer />
      </>
    );
};

export default Leaderboard;
