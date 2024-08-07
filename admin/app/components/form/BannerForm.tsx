"use client";
import React, { useState } from "react";
import { TiArrowBackOutline } from "react-icons/ti";

import { toast } from "react-toastify";
import uploadImage from "../utils/uploadeImage";
import {
  useCreatBanner,
  useUpdateBanner,
} from "@/app/network-request/mutations";

import {
  BannerFormStateType,
  BannerObjectType,
} from "@/app/network-request/types";

const BannerForm = ({ bannerData, close, refetch }: BannerObjectType) => {
  const [bannerFormData, setbannerFormData] = useState<BannerFormStateType>({
    title: bannerData?.data?.title || "",
    url: bannerData?.data?.url ? bannerData?.data?.url : "",
    imageSrc:
      bannerData?.data?.image?.slice(
        67,
        bannerData?.data?.image?.indexOf("%")
      ) || "",
    image: bannerData?.data?.image || "",
  });

  const [progressStatus, setProgressStatus] = useState<number | null>(null);

  const creatBanner = useCreatBanner();
  const updateBanner = useUpdateBanner();

  //for text Data
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setbannerFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  //for Image Data
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];

      const imageUrl = await uploadImage(
        selectedFile.name,
        selectedFile,
        setProgressStatus
      );

      setbannerFormData((prev) => ({
        ...prev,
        image: imageUrl,
        imageSrc: selectedFile.name,
      }));
    }
  };

  console.log(!bannerData.creat ? "PUT Operation" : "POST Operation");
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Checking Information, please wait...");

    const payload = {
      title: bannerFormData.title,
      url: bannerFormData.url,
      image: bannerFormData.image,
    };
    bannerData.creat
      ? creatBanner.mutate(payload, {
          onSuccess: (response) => {
            console.log(response);
            refetch();

            clearhandler();
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
        })
      : updateBanner.mutate(
          {
            id: bannerData.updateId ?? "",
            banner: payload,
          },
          {
            onSuccess: (response) => {
              console.log(response);
              refetch();

              clearhandler();
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
  };

  const clearhandler = () => {
    setbannerFormData({
      title: "",
      url: "",
      imageSrc: "",
      image: "",
    });
    close();
  };

  const refusetoClosehandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 "
      onClick={close}
    >
      <div
        className="flex items-center w-[360px] px-4 md:px-0 md:w-[600px] justify-center bg-white rounded-md"
        onClick={refusetoClosehandler}
      >
        <form className="w-full" onSubmit={submitHandler}>
          <div className="p-6 rounded font-montserrat">
            <div className="flex pb-2">
              <h2 className="md:text-4xl text-[28px] font-bold text-gray-600">
                Banner Form
              </h2>
              <div onClick={clearhandler}>
                <TiArrowBackOutline className="w-10 h-10 ml-4 text-emerald-600 hover:text-emerald-500" />
              </div>
            </div>
            <div className=" w-full overflow-y-auto pr-4 md:pr-0 [&::-webkit-scrollbar]:hidden">
              <div className="grid items-center grid-cols-1 gap-4 py-4 md:grid-cols-2">
                <input
                  value={bannerFormData.title}
                  type="text"
                  onChange={handleChange}
                  name="title"
                  className="w-full h-10 pl-4 font-medium border border-transparent rounded-md outline-none bg-green-50 focus:border-blue-200 "
                  placeholder="Banner Title"
                  required
                />

                <div className="relative w-full h-full">
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className={`px-4 py-2 pl-20 relative ${
                      progressStatus ? "pb-2" : ""
                    } w-full text-base bg-green-50 focus:border-blue-200 border-transparent border rounded-md text-gray-400 cursor-pointer flex items-center justify-between`}
                  >
                    {bannerFormData?.imageSrc
                      ? bannerFormData?.imageSrc?.slice(0, 20) + "..."
                      : "Choose a file"}
                    <span className="text-gray-400 text-[15px] absolute top-0 h-full flex items-center left-0 rounded-tl-md rounded-bl-md px-3 font-medium bg-blue-100">
                      Browse
                    </span>
                  </label>
                  {progressStatus !== null && progressStatus !== 0 && (
                    <>
                      <div className="absolute inset-0 z-10 flex items-end">
                        <div
                          className="h-1 bg-blue-400 rounded-md mx-[1px] mb-[1px]"
                          style={{ width: `${progressStatus}%` }}
                          // style={{ width: `${100}%` }}
                        ></div>
                      </div>
                    </>
                  )}
                </div>

                <input
                  value={bannerFormData.url}
                  type="url"
                  onChange={handleChange}
                  name="url"
                  className="w-full h-10 pl-4 font-medium border border-transparent rounded-md outline-none bg-green-50 focus:border-blue-200 "
                  placeholder="Banner Web Link"
                  required
                />

                {/* <div className="flex items-center w-full gap-2">
                  <label htmlFor="" className="mb-1 font-medium text-gray-500">
                    Active Product
                  </label>
                  <input
                    checked={bannerFormData.status}
                    name="status"
                    onChange={handleChange}
                    className="  rounded-[7px] outline-none border border-transparent bg-green-50 focus:border-blue-200"
                    type="checkbox"
                  />
                </div> */}
              </div>

              <div className="flex">
                <button
                  className="px-4 py-2 text-white rounded-md bg-[#7d5a25] hover:bg-[#bf8c3e]"
                  type="submit"
                  // disabled={isError}
                >
                  {!bannerData.creat ? "Update" : "Submit"}
                </button>
                <button
                  className="px-4 py-2 ml-8 text-white rounded-md bg-rose-600 hover:bg-rose-700"
                  type="button"
                  onClick={close}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BannerForm;
