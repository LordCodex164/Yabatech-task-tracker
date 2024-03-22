import { RxCaretDown } from "react-icons/rx";

interface Option {
    label: string;
    value: string
}

interface DropDownProps{
    options: Option[];
    selected: boolean;
    setSelected: any;
    selectedValue: string;
    setSelectedValue: any;
}

const DropDownComponent = ({options, selectedValue, setSelectedValue, selected,setSelected}: DropDownProps) => {

    const handleSelect = () => {
        setSelected(!selected)
    }
  
    return (
        <>
         <div onClick={handleSelect} className='relative cursor-pointer flex flex-row border-[1px] w-[97px] min-h-[50px] border-[#1F2937] justify-center items-center text-[16px]'>
                   {selectedValue}
                   <RxCaretDown/>
                  {selected && (
                    <div className='absolute top-[50px] w-[100px] p-1 text-sm black-text-3 bg-white shadow-[1px_4px_12px_-1px_rgba(44,78,39,0.15)] rounded'>
                      <ul className="flex flex-col items-start gap-[10px]">
                        {options.map((item) => (
                        <li onClick={() => setSelectedValue(item.value)} className={`list list-none justify-start px-3 py-1 cursor-pointer w-full text-center flex ${item.label === selectedValue && "bg-green-100 text-[#139C33] whitespace-nowrap rounded"} inline-flex flex-row`} key={item.label}>
                          {item.value}
                        </li>
                       ))}
                      </ul>
                       
                    </div>
                  )}
        </div>
        </>
    )
}

export default DropDownComponent