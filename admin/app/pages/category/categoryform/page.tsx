"use client";
import {
  useCreateCategory,
  useUpdateCategory,
} from "@/app/network-request/mutations";
import { CategoryObjectTypes } from "@/app/network-request/types";

import { useState } from "react";
import { TiArrowBackOutline } from "react-icons/ti";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryForm = ({
  isCategoryForm,
  closeHandler,
  refetch,
}: CategoryObjectTypes) => {
  {
    const [categoryDataForm, setCategoryDataForm] = useState({
      categoryName: isCategoryForm?.name ? isCategoryForm.name : "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCategoryDataForm((prev) => ({
        ...prev,
        [e?.target?.name]:
          e?.target?.type === "checkbox"
            ? e?.target?.checked
            : e?.target?.value,
      }));
    };

    const creatCategory = useCreateCategory();
    const updateCategory = useUpdateCategory();

    const submiteHandler = async (e: React.FormEvent) => {
      e.preventDefault();

      console.log(categoryDataForm);

      const toastId = toast.loading("Checking Information, please wait...");

      isCategoryForm.creat
        ? creatCategory.mutate(
            {
              name: categoryDataForm.categoryName,
            },
            {
              onSuccess: (response) => {
                console.log(response);
                refetch();
                closeHandler();
                clearState();
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
          )
        : updateCategory.mutate(
            {
              id: isCategoryForm.updateId ?? "",

              category: { name: categoryDataForm.categoryName },
            },
            {
              onSuccess: (response) => {
                console.log(response);
                refetch();
                closeHandler();
                clearState();
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

    const clearState = () => {
      setCategoryDataForm((prev) => ({
        ...prev,
        categoryName: "",
      }));
    };

    return (
      <div
        className="fixed inset-0 z-10 flex items-center justify-center px-4 sm:px-0 bg-black/40"
        onClick={closeHandler}
      >
        <ToastContainer />
        <div
          className="bg-white rounded-md w-[400px]"
          onClick={(e) => e.stopPropagation()}
        >
          <form className="" onSubmit={submiteHandler}>
            {/* left section */}
            <div className="p-6 px-8 rounded font-montserrat">
              <div className="flex pb-2">
                <h2 className=" md:text-4xl text-[28px] font-bold text-gray-700 font-mavenPro">
                  Category Form
                </h2>
                <button onClick={closeHandler}>
                  <TiArrowBackOutline className="w-10 h-10 ml-4 hover:text-orange-600 text-sky-600" />
                </button>
              </div>
              <div className="items-center flex flex-col h-full gap-4 py-4 sm:flex ">
                <div className="w-full font-mavenPro">
                  <input
                    value={categoryDataForm?.categoryName}
                    type="text"
                    onChange={handleChange}
                    name="categoryName"
                    className={
                      " font-medium outline-none w-full  border h-10 border-gray-400 rounded-md pl-4 focus-within:border-blue-400  "
                    }
                    placeholder={"Category Name"}
                    required
                  />
                </div>
              </div>

              <div className="flex ">
                <button
                  className="px-4 py-2 text-white bg-[#1f3c88] rounded hover:bg-[#2950b1]"
                  type="submit"
                >
                  {/* Save Changes */}
                  {isCategoryForm.creat ? "Submit" : "Update"}
                </button>
                <button
                  className="px-4 py-2 ml-8 text-white bg-red-500 rounded hover:bg-red-400"
                  onClick={closeHandler}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default CategoryForm;
