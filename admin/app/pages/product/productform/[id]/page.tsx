"use client";
import React, { useEffect, useState } from "react";

import { FaCaretDown } from "react-icons/fa";
import { TiArrowBackOutline } from "react-icons/ti";

import { toast } from "react-toastify";

import {
  useGetCategories,
  useGetSinglProduct,
} from "@/app/network-request/queries";
import { ProductPostType } from "@/app/network-request/types";

import Link from "next/link";
import { useUpdateProduct } from "@/app/network-request/mutations";
import { useRouter } from "next/navigation";
import DynamicImageGrid from "@/app/components/dynamicimagegrid";
import dynamic from "next/dynamic";
const IRichTextEditor = dynamic(() => import("@mantine/rte"), {
  ssr: false,
  loading: () => null,
});
export interface ProductDraft {
  name: string;
  value: boolean;
}

interface ProductType {
  name: string;
  isDraft: ProductDraft;
  category: string;
  discription: string;
  price: number;

  image: string[];
}

const slugCreat = (productName: string) => {
  return productName.toLowerCase().replace(/\s+/g, "-");
};

const UpdateProductForm = ({ params }: { params: { id: string } }) => {
  const { data, isError } = useGetCategories();

  const router = useRouter();

  console.log(params.id, "from dynimc update page");

  const [productData, setproductData] = useState<ProductType>({
    name: "",
    isDraft: {
      name: "",
      value: false,
    },
    category: "",
    discription: "",
    price: 0,
    image: [],
  });

  const productUpdate = useUpdateProduct();

  const [isOpen, setOpen] = useState({
    category: false,
    isDraft: false,
  });

  const {
    data: singlrProductData,

    isError: singleIsError,
  } = useGetSinglProduct({
    id: params.id,
  });

  const isUpdate = Object.keys(singlrProductData ?? []).length !== 0;

  useEffect(() => {
    if (isUpdate && !singleIsError) {
      console.log("i am updating");
      setproductData({
        name: singlrProductData?.name || "",
        category: singlrProductData?.category || "",

        discription: singlrProductData?.discription || "",
        isDraft: {
          name: "",
          value: singlrProductData?.isDraft || false,
        },
        price: singlrProductData?.price || 0,

        image: singlrProductData?.images || [],
      });
    }
  }, [
    isUpdate,
    isError,
    data,
    singleIsError,
    singlrProductData
  ]);

  const draftData = [
    {
      name: "Active",
      value: false,
    },
    {
      name: "Draft",
      value: true,
    },
  ];

  //for text Data
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setproductData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const selectOption = (field: string, value: string | ProductDraft) => {
    console.log(value);
    setproductData((prev) => ({
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

    const productPayload: ProductPostType = {
      name: productData.name,
      category: productData.category,
      images: productData.image,
      slug: slugCreat(productData.name),
      isDraft: productData.isDraft.value,
      price: productData.price,
      discription: productData.discription,
    };

    const toastId = toast.loading("Checking Information, please wait...");

    productUpdate.mutate(
      {
        id: params.id,
        product: productPayload,
      },

      {
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
      }
    );

    console.log(productData, productPayload);
  };

  const clearhandler = () => {
    setproductData({
      name: "",
      isDraft: {
        name: "",
        value: false,
      },
      category: "",
      discription: "",
      price: 0,

      image: [],
    });
    router.push("/pages/product");
  };

  const imagehandler = (value: string[]) => {
    console.log(value);
    setproductData((prev) => ({
      ...prev,
      image: [...value],
    }));
  };

  return (
    <div className="w-full md:px-4 md:ml-4 md:pl-0">
      <form
        className="w-full h-[calc(100vh-6rem)] overflow-hidden   rounded-md"
        onSubmit={submitHandler}
      >
        <div className="px-8 p-6 rounded font-montserrat">
          <div className="flex pb-2">
            <h2 className="md:text-4xl text-[28px] font-bold text-gray-600">
              Product Form
            </h2>

            <Link href={"/pages/product"}>
              <TiArrowBackOutline className="w-10 h-10 ml-4 text-emerald-600 hover:text-emerald-500" />
            </Link>
          </div>
          <div className="h-[calc(100vh-12rem)] w-full overflow-y-auto  [&::-webkit-scrollbar]:hidden">
            <div className="grid items-center grid-cols-1   gap-4 py-4 md:grid-cols-2">
              <input
                value={productData.name}
                type="text"
                onChange={handleChange}
                name="name"
                className="w-full h-10 pl-4 font-medium bg-green-100 border border-transparent rounded-md outline-none focus:border-blue-200 "
                placeholder="Product Name"
                required
              />
              <input
                value={productData.price || ""}
                type="number"
                onChange={handleChange}
                name="price"
                className="w-full h-10 pl-4 font-medium bg-green-100 border border-transparent rounded-md outline-none focus:border-blue-200 "
                placeholder="Product Price"
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
                  {productData.category !== ""
                    ? productData.category
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
                        productData.category === category.name
                          ? "bg-rose-600"
                          : ""
                      }`}
                      onClick={() => selectOption("category", category.name)}
                    >
                      <span>{category.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Draft Dropdown */}
              <div className="relative">
                <div
                  className="flex justify-between p-2 pl-4 font-medium text-gray-400 bg-green-100 border-transparent rounded-md cursor-pointer focus:border-blue-200"
                  onClick={() =>
                    setOpen({ ...isOpen, isDraft: !isOpen.isDraft })
                  }
                >
                  {productData.isDraft.name !== ""
                    ? productData.isDraft.name
                    : "Select Status"}
                  <FaCaretDown className="m-1" />
                </div>
                <ul
                  className={`mt-2 p-2 rounded-md w-32 text-[#DEE1E2] bg-gray-800 shadow-lg absolute z-10 ${
                    isOpen.isDraft ? "max-h-60" : "hidden"
                  } custom-scrollbar`}
                >
                  {draftData.map((draft, i) => (
                    <li
                      key={i}
                      className={`p-2 mb-2 text-sm text-[#DEE1E2]  rounded-md cursor-pointer hover:bg-blue-200/60 ${
                        productData.isDraft.name === draft.name
                          ? "bg-rose-600"
                          : ""
                      }`}
                      onClick={() => selectOption("isDraft", draft)}
                    >
                      <span>{draft.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <DynamicImageGrid
                getValue={imagehandler}
                initialValue={[...productData.image]}
              />
             <div className=" flex flex-col w-screen">
                <label className="text-gray-600">Content: </label>
              <IRichTextEditor
                id="rte"
                sticky={false}
                value={productData.discription}
                onChange={(value, delta, sources) =>
                  setproductData({
                    ...productData,
                    discription: value,
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
                type="submit"
              >
                Update
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
    // </div>
  );
};

export default UpdateProductForm;
