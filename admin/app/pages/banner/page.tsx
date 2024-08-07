"use client";
import Loader from "@/app/components/loader";

import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { toast } from "react-toastify";

import { useGetBanner } from "@/app/network-request/queries";
import { useDeleteBanner } from "@/app/network-request/mutations";
import ConfirmDeleteModal from "@/app/components/modals/ConfirmDeleteModal";
import Image from "next/image";
import { BannerGetType, BannerStateType } from "@/app/network-request/types";
import { formatDateFun } from "@/app/components/utils/dateconverter";
import BannerForm from "@/app/components/form/BannerForm";
import AlertModal from "@/app/components/modals/AlertModal";
import Link from "next/link";

const Banner = () => {
  const [isBannerForm, setBanerForm] = useState<BannerStateType>({
    creat: false,
    updateId: "",
    data: {
      title: "",
      image: "",
      url: "",
    },
  });

  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

  const bannerHeading = ["Image", "Title", "Url", "Created", "Setting"];

  const { data, isLoading, error, isError, refetch } = useGetBanner();

  console.log(data, error);

  const handlingCreat = () => {
    console.log("click");
    setBanerForm((prev) => ({
      ...prev,
      creat: !prev.creat,
    }));
  };

  const [isModalOpen, setModalOpen] = useState({
    condition: false,
    id: "",
  });

  const { mutate } = useDeleteBanner();

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

  const updateHandler = (banner: BannerGetType) => {
    setBanerForm((prev) => ({
      ...prev,
      updateId: banner?._id,
      data: {
        title: banner.title,
        image: banner.image,
        url: banner.url,
      },
    }));
  };

  const handleConfirmDelete = () => {
    // Handle the delete action here
    const toastId = toast.loading("Checking Information, please wait...");
    console.log("Item deleted", isModalOpen.id);
    mutate(isModalOpen.id, {
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

  const closeHandler = () => {
    if (isBannerForm.creat) {
      setBanerForm((prev) => ({
        ...prev,
        creat: !prev.creat,
      }));
    } else {
      setBanerForm((prev) => ({
        ...prev,
        updateId: "",
        name: "",
      }));
    }
  };

  console.log(isBannerForm);

  const handleModalOpen = (url: string) => {
    setSelectedUrl(url);
  };

  const handleModalClose = () => {
    setSelectedUrl(null);
  };

  const isExternal = (url: string) => url.startsWith("http");

  return (
    <>
      {(isBannerForm.creat || isBannerForm.updateId) && (
        <BannerForm
          bannerData={isBannerForm}
          close={closeHandler}
          refetch={refetch}
        />
      )}

      {isLoading && <Loader />}
      {isModalOpen.condition && (
        <ConfirmDeleteModal
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />
      )}

      {selectedUrl && (
        <AlertModal url={selectedUrl} closeModal={handleModalClose} />
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
              Banner
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
            <div className="relative flex items-center self-end ">
              <button
                className={` px-2 py-1 
                       bg-[#7d5a25] hover:bg-[#bf8c3e] text-white
                  }    rounded shadow-xl md:px-4 md:py-2  sm:self-center`}
                onClick={handlingCreat}
              >
                <span className="hidden md:inline-block">Creat Banner</span>

                <IoIosSend className="w-6 h-6 md:hidden" />
              </button>
            </div>
          </div>
          <section
            className={`w-full overflow-auto   border-2 [&::-webkit-scrollbar]:hidden rounded-lg  shadow-md bg-white`}
          >
            <section className="grid gap-4 p-2 pb-2 min-w-[900px] font-medium border-gray-100 grid-cols-customeBanner md:font-semibold font-mavenPro bg-white">
              <p className="pl-2 text-gray-600 md:text-lg">SrNo.</p>

              {bannerHeading?.map((heading, index) => (
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

            <div className=" h-[380px] overflow-y-auto [&::-webkit-scrollbar]:hidden min-w-[900px] bg-gray-50">
              {isError ? (
                <p className="flex items-center justify-center w-full h-full font-medium text-center text-rose-800">
                  Check Internet connection or Contact to Admin
                </p>
              ) : isLoading ? (
                <p>Loading...</p>
              ) : data?.length !== 0 ? (
                data?.map((banner: BannerGetType, i: number) => (
                  <section
                    key={i}
                    className="grid items-center gap-6 py-2 pl-6 pr-4 border-t-2 border-gray-200 grid-cols-customeBanner group hover:bg-gray-50"
                  >
                    <span>{i + 1}</span>
                    <span>
                      {banner.image ? (
                        <Image
                          src={banner.image}
                          priority={true} // Optional: If you want to prioritize loading
                          width={1000}
                          height={1000}
                          className="w-[80px] h-[80px]"
                          alt={`banner-image-${banner.title}`}
                          quality={100}
                        />
                      ) : (
                        "No image"
                      )}
                    </span>
                    <span className="ml-2 text-sm font-semibold text-gray-600 md:text-base">
                      {banner?.title}
                    </span>
                    <span className="ml-2 text-sm font-semibold text-gray-600 md:text-base">
                      {banner?.url ? (
                        // <>
                        //    {isExternal(banner.url) ? (
                        <a
                          href={banner.url}
                          onClick={(e) => {
                            e.preventDefault();
                            handleModalOpen(banner.url);
                          }}
                          className="text-blue-500 underline"
                        >
                          {"Web Link"}
                        </a>
                      ) : (
                        //   {/* ) : (
                        //     <Link
                        //       href={banner.url}
                        //       className="text-blue-500 underline"
                        //     >
                        //       {"Web Link"}
                        //     </Link>
                        //   )} */}
                        // </>
                        "No url"
                      )}
                    </span>
                    <span className="ml-2 text-sm font-semibold text-gray-600 md:text-base">
                      {formatDateFun(banner?.createdAt)}
                    </span>

                    <div className="flex justify-center gap-4">
                      <button
                        className="px-3 text-sm py-2 text-white  rounded-md bg-[#7d5a25] hover:bg-[#bf8c3e]"
                        onClick={() => updateHandler(banner)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-2 text-sm text-white rounded-md bg-rose-600 hover:bg-rose-700"
                        onClick={() => deletHandler(banner?._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </section>
                ))
              ) : (
                <div className="flex items-center justify-center w-full h-full font-bold text-gray-600">
                  Add New Banner
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

export default Banner;