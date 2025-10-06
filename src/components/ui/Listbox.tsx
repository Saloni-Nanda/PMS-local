import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
interface CustomListboxProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
}

export const CustomListbox: React.FC<CustomListboxProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder
}) => {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-2">{label}</label>
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <ListboxButton className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-600 font-normal hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
            {value || placeholder}
            <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
          </ListboxButton>
          <ListboxOptions className="absolute py-2 mt-1 w-full bg-white border border-[#076DB3] rounded-md shadow-lg z-10">
            {options.map((option) => (
              <ListboxOption
                key={option}
                value={option}
                className="px-3 py-2 cursor-pointer text-sm flex justify-between items-center text-gray-600 font-normal data-[focus]:bg-gray-200 data-[focus]:text-gray-600 data-[selected]:font-semibold"
              >
                {option}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
};