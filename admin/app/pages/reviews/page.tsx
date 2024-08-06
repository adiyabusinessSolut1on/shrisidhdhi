"use client";

import Loader from "@/app/components/loader";
import ConfirmDeleteModal from "@/app/components/modals/ConfirmDeleteModal";
import StarRating from "@/app/components/StarRating";
import { formatDateFun } from "@/app/components/utils/dateconverter";
import {
  useDeleteReview,
  useVerifyReview,
} from "@/app/network-request/mutations";
import { useGetReview } from "@/app/network-request/queries";
import { ReviewsGetTypes } from "@/app/network-request/types";
import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { toast } from "react-toastify";

const Reviews = () => {
  const ReviewHeading = [
    "Name",
    "Email",
    "Message",
    "Created",
    "Star",
    "Verify",
    "Setting",
  ];

  const { data, isLoading, error, isError, refetch } = useGetReview();

  console.log(data, error, isLoading, "for review");

  const [isModalOpen, setModalOpen] = useState({
    condition: false,
    id: "",
  });

  const deletMutation = useDeleteReview();
  const verifyMutation = useVerifyReview();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //calculation of page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  //   console.log(data, data?.length, isLoading, isError, "awarnace");

  //   const currentAwarenessCategory =
  //     !isLoading && data?.data?.length > 0
  //       ? data?.data?.slice(indexOfFirstItem, indexOfLastItem)
  //       : [];

  //   const handleClick = (pageNumber: number) => {
  //     setCurrentPage(pageNumber);
  //   };

  const handleCloseModal = () => {
    setModalOpen({
      condition: false,
      id: "",
    });
  };

  const deletHandler = (id: string) => {
    setModalOpen((prev) => ({
      ...prev,
      condition: !prev.condition,
      id: id,
    }));
  };
  const verifyHandler = (review: ReviewsGetTypes) => {
    const toastId = toast.loading("Checking Information, please wait...");
    verifyMutation.mutate(
      {
        id: review._id,
      },
      {
        onSuccess: (response) => {
          refetch();
          toast.update(toastId, {
            render: response?.message || "Success!",
            type: "success",
            isLoading: false,
            autoClose: 4000,
          });
        },
        onError: (error) => {
          console.log(error);
          toast.update(toastId, {
            render: "An error occurred!",
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
        },
      }
    );

    console.log(review);
  };

  const handleConfirmDelete = () => {
    // Handle the delete action here
    const toastId = toast.loading("Checking Information, please wait...");
    console.log("Item deleted", isModalOpen.id);

    deletMutation.mutate(isModalOpen.id, {
      onSuccess: (response) => {
        console.log(response);
        setModalOpen({
          condition: false,
          id: "",
        });
        refetch();
        toast.update(toastId, {
          render: response?.message || "Success!",
          type: "success",
          isLoading: false,
          autoClose: 4000,
        });
      },
      onError: (error) => {
        console.log(error);
        toast.update(toastId, {
          render: "An error occurred!",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      },
    });
  };

  return (
    <>
      {isLoading && <Loader />}
      {isModalOpen.condition && (
        <ConfirmDeleteModal
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />
      )}
      <section
        className={`  md:pl-0 p-4 h-full w-full rounded-md   mx-auto [&::-webkit-scrollbar]:hidden `}
      >
        <section
          className={` md:p-8 p-6 h-full  text-gray-600  border-gray-200 
              rounded-md   max-w-full w-full `}
        >
          <div className="flex items-center mb-2 md:mb-6">
            <h1 className=" text-[28px] font-bold md:text-4xl font-mavenPro ">
              Reviews
            </h1>
          </div>
          <div className="flex justify-between mb-4">
            <div className="flex items-center gap-4 ">
              <div className={`flex items-center   `}>
                <input
                  type="search"
                  placeholder={` Search
                    `}
                  className={` p-2 text-sm md:text-base  sm:px-4 py-1 border-[2px] border-transparent 
                     bg-slate-50 focus:border-gray-100
                  shadow-inner rounded-[0.26rem] outline-none `}
                  // value={searchQuery}
                  // onChange={(e) => setSearchQuery(e.target.value)}
                  // onFocus={() => setCurrentPage(1)}
                />
              </div>
            </div>
          </div>
          <section
            className={`w-full overflow-auto   border-2 [&::-webkit-scrollbar]:hidden rounded-lg  shadow-md bg-white`}
          >
            <section className="grid gap-4 p-2 pb-2 min-w-[1050px] font-medium border-gray-100 grid-cols-customeReview md:font-semibold font-mavenPro bg-white">
              <p className="pl-2 text-gray-600 md:text-lg">SrNo.</p>

              {ReviewHeading?.map((heading, index) => (
                <p
                  key={index}
                  className={`  text-gray-600 md:text-lg ${
                    index !== 0 ? "justify-self-center" : "ml-6"
                  }`}
                >
                  {heading.charAt(0).toUpperCase() + heading.slice(1)}
                </p>
              ))}
            </section>

            <div className=" h-[380px] overflow-y-auto [&::-webkit-scrollbar]:hidden min-w-[1050px] bg-gray-50">
              {isError ? (
                <p className="flex items-center justify-center w-full h-full font-medium text-center text-rose-800">
                  Check Internet connection or Contact to Admin
                </p>
              ) : isLoading ? (
                <p>Loading...</p>
              ) : data?.length !== 0 ? (
                data?.map((review: ReviewsGetTypes, i: number) => (
                  <section
                    key={i}
                    className="grid items-center gap-6 py-2 pl-6 pr-4 border-t-2 border-gray-200 grid-cols-customeReview group hover:bg-gray-50"
                  >
                    <span>{i + 1}</span>
                    {/* <img src={review?.image} className="h-20 w-20 rounded-full" alt="ICON"/> */}
                    <span className="ml-2 text-sm font-semibold text-gray-600 md:text-base">
                      {review?.name}
                    </span>
                    <span className=" text-sm font-semibold text-gray-600 md:text-[15px]">
                      {review.email}
                    </span>
                    <span className="ml-2 text-sm font-semibold text-gray-600 md:text-base">
                      {review.message}
                    </span>
                    <span className=" text-sm font-semibold text-gray-600 md:text-base">
                      {formatDateFun(review.createdAt)}
                    </span>
                    <span className="ml-2 text-sm font-semibold text-gray-600 md:text-base">
                      <StarRating rating={review.star} />
                    </span>
                    <span className=" flex justify-center text-sm font-semibold text-gray-600 md:text-[15px]">
                      {review.isVerify ? "verified" : "Non-verified"}
                    </span>

                    <div className="grid justify-center gap-2">
                      <button
                        className={`px-3 text-sm py-2 text-white  rounded-md bg-[#7d5a25] hover:bg-[#bf8c3e] disabled:bg-gray-600 ${
                          review.isVerify === true && "cursor-not-allowed"
                        }`}
                        onClick={() => verifyHandler(review)}
                        disabled={review.isVerify === true}
                      >
                        {review.isVerify !== true ? "Verify" : "Verified"}
                      </button>
                      <button
                        className="px-3 py-2 text-sm text-white rounded-md bg-rose-600 hover:bg-rose-700"
                        onClick={() => deletHandler(review?._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </section>
                ))
              ) : (
                <div className="flex items-center justify-center w-full h-full font-bold text-gray-600">
                  Add New Category
                </div>
              )}
            </div>
          </section>
          {/* <Pagination<awarenessCategory>
                currentPage={currentPage}
                apiData={data?.data}
                itemsPerPage={itemsPerPage}
                handleClick={handleClick}
              /> */}
        </section>
      </section>
    </>
  );
};

export default Reviews;
