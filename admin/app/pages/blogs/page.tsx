"use client";
import Loader from "@/app/components/loader";
import ConfirmDeleteModal from "@/app/components/modals/ConfirmDeleteModal";
import { useDeletBlog } from "@/app/network-request/mutations";
import { useGetBlogs } from "@/app/network-request/queries";
import { BlogTypes } from "@/app/network-request/types";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { toast } from "react-toastify";

const Blogs = () => {
  const { data, isLoading, refetch } = useGetBlogs();
  const deletBlog = useDeletBlog();
  const router = useRouter();

  const [isModalOpen, setModalOpen] = useState({
    condition: false,
    id: "",
  });
  const handleCreate = () => {
    router.push("/pages/blogs/upload");
  };

  const updatHandler = (id: string) => {
    router.push(`/pages/blogs/${id}`);
  };

  const handleCloseModal = () => {
    setModalOpen({
      condition: false,
      id: "",
    });
  };
  const handleConfirmDelete = () => {
    const toastId = toast.loading("Checking Information, please wait...");
    deletBlog.mutate(isModalOpen.id, {
      onSuccess: (response) => {
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
  const deletHandler = (id: string) => {
    setModalOpen((prev) => ({
      ...prev,
      condition: !prev.condition,
      id: id,
    }));
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
      <div className=" md:p-8 p-6 flex justify-between w-auto ma-w-lg">
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
        <div className="relative flex items-center self-end ">
          <button
            className={` px-2 py-1 
                       bg-[#7d5a25] hover:bg-[#bf8c3e] text-white
                  }    rounded shadow-xl md:px-4 md:py-2  sm:self-center`}
            onClick={handleCreate}
          >
            <span className="hidden md:inline-block">Creat Blog</span>

            <IoIosSend className="w-6 h-6 md:hidden" />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto mt-1 border-t border-[#dddbdb]">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                sr.No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {!data || !Array.isArray(data) ? (
              <div className="flex items-center justifu-center">
                Data Not Found
              </div>
            ) : (
              data?.map((listing: BlogTypes, index: number) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4  text-sm text-gray-500">
                    <div>{index + 1}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{listing.createdAt}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <Image
                          height={1000}
                          width={1000}
                          quality={100}
                          priority
                          className="h-10 w-10 rounded-full"
                          src={listing?.image}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {listing?.title}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="grid justify-center gap-4">
                      <button
                        className="px-3 text-sm py-2 text-white  rounded-md bg-[#7d5a25] hover:bg-[#bf8c3e]"
                        onClick={() => updatHandler(listing?._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-2 text-sm text-white rounded-md bg-rose-600 hover:bg-rose-700"
                        onClick={() => deletHandler(listing?._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Blogs;
