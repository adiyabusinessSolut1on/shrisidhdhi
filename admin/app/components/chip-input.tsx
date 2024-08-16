import React from "react";

import useDeepCompareEffect from "../hooks/use-deep-effects";
import CloseICONSVG from "./SVG/closeICON";

interface ChipInputProps extends React.ComponentPropsWithRef<"input"> {
  value?: string[];
  label?: string;
  onChange: (e: any) => void;
}

const ChipInput = React.forwardRef(
  (
    { onChange, value, label, ...rest }: ChipInputProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const [chips, setChips] = React.useState<string[]>([]);

    const onAddIndusrtryChip = React.useCallback(
      (chip: any) => {
        const newChips = [...chips];
        if (chip.code === "Enter") {
          if (chip.target.value) {
            chip.target.value = chip.target.value;
            newChips.push(chip.target.value);
            setChips(newChips);
          }
          chip.target.value = "";
        }
      },
      [chips]
    );

    const handleRemoveIndustryChip = (index: any) => {
      const newChips = [...chips];
      newChips.splice(index, 1);
      setChips(newChips);
    };

    React.useMemo(() => {
      if (value) {
        setChips(value);
      }
    }, [value]);

    useDeepCompareEffect(() => {
      onChange(chips);
    }, [chips]);

    return (
      <div className="flex items-center flex-1 bg-gray-100 border border-gray-300 rounded-lg p-1 overflow-hidden ">
        <div className="flex flex-wrap w-full gap-1">
          <ul className="flex flex-wrap gap-1 w-full overflow-hidden list-none m-0 p-0">
            {chips.map((item, index) => (
              <li
                key={index}
                className="flex items-center text-gray-500 text-xs font-normal bg-yellow-100 rounded-md px-2 cursor-pointer"
              >
                {item}
                <i
                  className="grid place-content-center ml-1"
                  onClick={() => handleRemoveIndustryChip(index)}
                >
                  <CloseICONSVG height={16} width={16} fill="#0008" />
                </i>
              </li>
            ))}
            <div className="flex items-center flex-1">
              <input
                ref={ref}
                type="text"
                name="name"
                className="w-full h-10 pl-4 font-medium bg-green-100 border border-transparent rounded-md outline-none focus:border-blue-200"
                onKeyUp={onAddIndusrtryChip}
                {...rest}
              />
            </div>
          </ul>
        </div>
      </div>
    );
  }
);

ChipInput.displayName = "ChipInput";
export default ChipInput;
