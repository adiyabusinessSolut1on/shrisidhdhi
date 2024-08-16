"use client";
import React, { useState } from "react";

import { FaCaretDown } from "react-icons/fa";
import { TiArrowBackOutline } from "react-icons/ti";

import { toast } from "react-toastify";

import { useGetCategories } from "@/app/network-request/queries";
import DynamicImageGrid from "@/app/components/dynamicimagegrid";
import Link from "next/link";
import {
  useCreatBlog,
  useCreatProduct,
  useUpdateProduct,
} from "@/app/network-request/mutations";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import DynamicSingleImage from "@/app/components/dynamicSingleImage";
import ChipInput from "@/app/components/chip-input";
import { BlogPostType } from "@/app/network-request/types";

export interface ProductDraft {
  name: string;
  value: boolean;
}

interface ProductType {
  name: string;
  isDraft: ProductDraft;
  category: string;
  discription: string;
  price: 0;

  image: string[];
}
const IRichTextEditor = dynamic(() => import("@mantine/rte"), {
  ssr: false,
  loading: () => null,
});

const slugCreat = (productName: string) => {
  return productName.toLowerCase().replace(/\s+/g, "-");
};

interface blogDatatype {
  title: string;
  slug: string;
  image: string;
  category: string;
  tags: string[];
  content: string;
}
const BlogUpload = () => {
  const { data, isError } = useGetCategories();

  const [blogData, setBlogaData] = useState<blogDatatype>({
    title: "" as string,
    slug: "" as string,
    image: "" as string,
    category: "" as string,
    tags: [] as string[],
    content: "" as string,
  });

  const BlogCreate = useCreatBlog();

  const [isOpen, setOpen] = useState({
    category: false,
    isDraft: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setBlogaData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const selectOption = (field: string, value: string | ProductDraft) => {
    console.log(value);
    setBlogaData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setOpen((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: BlogPostType = {
      title: blogData?.title,
      category: blogData?.category,
      image: blogData?.image,
      slug: slugCreat(blogData?.title),
      tags: blogData?.tags,
      content: blogData?.content,
    };

    const toastId = toast.loading("Checking Information, please wait...");

    BlogCreate.mutate(payload, {
      onSuccess: (response) => {
        console.log(response);
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
    });
  };

  const clearhandler = () => {
    setBlogaData({
      title: "",
      slug: "",
      image: "",
      category: "",
      tags: [],
      content: "",
    });
  };

  const imagehandler = (value: string) => {
    setBlogaData((prev: blogDatatype) => ({
      ...prev,
      image: value,
    }));
  };
  const handleAddChip = React.useCallback(
    (value: string[]) => {
      setBlogaData({ ...blogData, tags: value });
    },
    [blogData]
  );

  return (
    <div className="w-full md:px-4 md:ml-4 md:pl-0">
      <form
        className="w-full h-[calc(100vh-6rem)] overflow-hidden   rounded-md"
      >
        <div className="px-8 p-6 rounded font-montserrat">
          <div className="flex pb-2">
            <h2 className="md:text-4xl text-[28px] font-bold text-gray-600">
              Upload Blog
            </h2>

            <Link href={"/pages/blogs"}>
              <TiArrowBackOutline className="w-10 h-10 ml-4 text-emerald-600 hover:text-emerald-500" />
            </Link>
          </div>
          <div className="h-[calc(100vh-12rem)] w-full overflow-y-auto  [&::-webkit-scrollbar]:hidden">
            <div className="grid items-center grid-cols-1   gap-4 py-4 md:grid-cols-2">
              <input
                value={blogData?.title}
                type="text"
                onChange={handleChange}
                name="title"
                className="w-full h-10 pl-4 font-medium bg-green-100 border border-transparent rounded-md outline-none focus:border-blue-200 "
                placeholder="Enter Title"
                required
              />

              {/* Category Dropdown */}
              <div className="relative">
                <div
                  className="flex justify-between p-2 pl-4 font-medium text-gray-400 bg-green-100 border-transparent rounded-md cursor-pointer focus:border-blue-200"
                  onClick={() =>
                    setOpen({ ...isOpen, category: !isOpen.category })
                  }
                >
                  {blogData?.category !== ""
                    ? blogData?.category
                    : "Select Category"}
                  <FaCaretDown className="m-1" />
                </div>
                <ul
                  className={`mt-2 p-2 rounded-md w-64 text-[#DEE1E2] overflow-y-scroll bg-gray-800 shadow-lg absolute z-10 ${
                    isOpen.category ? "max-h-32" : "hidden"
                  } custom-scrollbar`}
                >
                  {data?.map((category, i) => (
                    <li
                      key={i}
                      className={`p-2 mb-2 text-sm text-[#DEE1E2]  rounded-md cursor-pointer hover:bg-blue-200/60 ${
                        blogData?.category === category?.name
                          ? "bg-rose-600"
                          : ""
                      }`}
                      onClick={() => selectOption("category", category?.name)}
                    >
                      <span>{category.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <ChipInput
                label={`Tag`}
                onChange={handleAddChip}
                placeholder="Add Tags..."
              />
              <DynamicSingleImage
                getValue={imagehandler}
                initialValue={blogData?.image}
              />
              <div className=" flex flex-col w-screen">
                <label className="text-gray-600">Content: </label>
                <IRichTextEditor
                  id="rte"
                  sticky={false}
                  value={blogData.content}
                  onChange={(value, delta, sources) =>
                    setBlogaData({
                      ...blogData,
                      content: value,
                    })
                  }
                  controls={[
                    ["bold", "italic", "underline"],
                    ["link", "image", "video", "blockquote", "code"],
                    ["unorderedList", "h1", "h2", "h3"],
                    ["alignLeft", "alignCenter", "alignRight"],
                  ]}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                className="px-4 py-2 text-white rounded-md bg-[#7d5a25] hover:bg-[#bf8c3e]"
                type="button"
                onClick={submitHandler}
              >
                Submit
              </button>
              <button
                className="px-4 py-2 ml-8 text-white rounded-md bg-rose-600 hover:bg-rose-700"
                type="button"
                onClick={clearhandler}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>

  );
};

export default BlogUpload;
