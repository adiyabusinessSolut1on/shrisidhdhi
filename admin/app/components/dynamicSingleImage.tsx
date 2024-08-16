import React, { useEffect, useState } from "react";
import EditICONSVG from "./SVG/editICON";
import DeleteICONSVG from "./SVG/deleteICON";
import Image from "next/image";
import AddImage from "./SVG/addImageicon";
import uploadImage from "./utils/uploadeImage";

interface DynamicImageGridProps {
  getValue: (value: any) => void;
  initialValue?: any;
}

const DynamicSingleImage = ({ getValue, initialValue }: DynamicImageGridProps) => {
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState<number>(0);

  const handleImageChange = async (event: any) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const imageUrl = await uploadImage(
        selectedFile.name,
        selectedFile,
        (percent: number | null) => {
          setProgress(percent ?? 0);
        }
      );

      setImage(imageUrl);
      getValue(imageUrl);
    }
  };

  const removeImage = () => {
    if (window.confirm("Are you sure to delete this file?")) {
      setImage("");
      getValue("");
    }
  };

  const handleImageURL = React.useCallback((url: string | File) => {
    if (typeof File !== "undefined" && url instanceof File) {
      return URL.createObjectURL(url);
    } else {
      return url as string;
    }
  }, []);

  useEffect(() => {
    if (initialValue) {
      setImage(initialValue);
    }
  }, [initialValue]);

  return (
    <React.Fragment>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 col-span-1 md:col-span-2">
        <div className="flex flex-col">
          <div className="relative bg-gray-100 rounded overflow-hidden grid place-content-center">
            <input
              type="file"
              id="image-picker"
              className="hidden"
              onChange={handleImageChange}
            />
            {image ? (
              <div className="relative">
                <Image
                  height={200}
                  width={200}
                  priority
                  src={handleImageURL(image) || ""}
                  alt=""
                  className="w-full object-cover min-h-[90px]"
                />
                <div className="absolute top-1 right-1 opacity-1 flex flex-col gap-1 transition-opacity duration-100 ease-in-out group-hover:opacity-100">
                  <label
                    htmlFor="image-picker"
                    className="flex items-center justify-center bg-gray-400 p-1 rounded cursor-pointer"
                  >
                    <EditICONSVG height={18} width={18} fill={"#f8f8f8"} />
                  </label>
                  <span
                    className="flex items-center justify-center p-1 bg-gray-400 rounded cursor-pointer"
                    onClick={removeImage}
                  >
                    <DeleteICONSVG height={16} width={16} fill={"#ce2e2e"} />
                  </span>
                </div>

                {progress > 0 && progress < 100 && (
                  <div
                    className="absolute top-0 left-0 h-full bg-blue-500 rounded"
                    style={{ width: `${progress}%` }}
                  ></div>
                )}
              </div>
            ) : (
              <label
                className="flex flex-col items-center justify-center min-h-[90px] cursor-pointer"
                htmlFor="image-picker"
              >
                <AddImage height={24} width={24} fill={"#222"} />
                <p className="text-gray-800 text-sm">Pick Image</p>
              </label>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DynamicSingleImage;
