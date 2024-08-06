import React, { useEffect } from "react";

import EditICONSVG from "./SVG/editICON";
import DeleteICONSVG from "./SVG/deleteICON";
import Image from "next/image";
import AddImage from "./SVG/addImageicon";

interface DynamicInputProps {
  title?: string;
  getValue: (value: any) => void;
  initialValue?: any;
}

const DynamicImageGrid=({ getValue, initialValue }: DynamicInputProps)=> {
  const [inputFields, setInputFields] = React.useState<any[]>([]);
  const handleFormChange = (index: number, event: any) => {
    let data = [...inputFields] as any;
    data[index] = event.target.files[0];
    setInputFields(data);
    getValue(data);
  };

  const addFields = () => {
    setInputFields([...inputFields, ""]);
    getValue([...inputFields, ""]);
  };

  const removeFields = (index: number) => {
    if (window.confirm("Are you sure to delete this file?")) {
      let data = [...inputFields];
      data.splice(index, 1);
      setInputFields(data);
      getValue(data);
    }
  };

  const handleImageURL = React.useCallback((url: string | File) => {
    if (typeof File !== "undefined")
      if (url instanceof File) {
        return URL.createObjectURL(url);
      } else {
        return url;
      }
  }, []);

  useEffect(() => {
    if (initialValue && initialValue?.length > 0) {
      setInputFields(initialValue);
    }
  }, [initialValue]);

  return (
    <React.Fragment>
      <div className="grid gap-2 grid-cols-2">
        {inputFields.map((data, index) => {
          const imagePickerId = `image-${index}`;
          return (
            <div key={index} className="flex flex-col">
              <div className="relative bg-gray-100 rounded overflow-hidden grid place-content-center">
                <input
                  type="file"
                  id={imagePickerId}
                  className="hidden"
                  onChange={(e) => handleFormChange(index, e)}
                />
                {data ? (
                  <React.Fragment>
                    <Image height={900} width={900} priority src={handleImageURL(data)||""} alt="" className="w-full object-cover min-h-[90px]" />
                    <div className="absolute top-1 right-1 opacity-0 flex flex-col gap-1 transition-opacity duration-100 ease-in-out group-hover:opacity-100">
                      <label htmlFor={imagePickerId} className="flex items-center justify-center p-1 bg-gray-100 rounded cursor-pointer">
                        <EditICONSVG height={18} width={18} fill={"#222"} />
                      </label>
                      <span
                        className="flex items-center justify-center p-1 bg-gray-100 rounded cursor-pointer"
                        onClick={() => removeFields(index)}>
                        <DeleteICONSVG height={16} width={16} fill={"#222"} />
                      </span>
                    </div>
                  </React.Fragment>
                ) : (
                  <label className="flex flex-col items-center justify-center min-h-[90px] cursor-pointer" htmlFor={imagePickerId}>
                    <AddImage height={24} width={24} fill={"#222"} />
                    <p className="text-gray-800 text-sm">Pick Image</p>
                  </label>
                )}
              </div>
            </div>
          );
        })}
        <div className="flex flex-col">
          <div
            className="flex flex-col items-center justify-center min-h-[90px] bg-gray-100 rounded cursor-pointer"
            onClick={addFields}>
            <label className="flex items-center justify-center">
              <AddImage height={24} width={24} fill={"#222"} />
              <p className="text-gray-800 text-sm">Add More</p>
            </label>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default DynamicImageGrid;
