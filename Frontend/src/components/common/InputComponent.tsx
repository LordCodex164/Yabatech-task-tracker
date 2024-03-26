import React, { FC, ReactNode, useState, forwardRef, Ref } from 'react';


interface InputProps {
  error?: any;
  label?: string;
  icon?: React.FC;
  type?: React.HTMLInputTypeAttribute;
  inputType?: string;
  clickable?: boolean;
  position?: string;
  image?: string | ReactNode;
  name?: string;
  value?: any;
  defaultDate?: string;
  minDate?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleOnFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  ref?: Ref<HTMLInputElement>;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  imageClassName?: string;
  imageStyle?: React.CSSProperties;
  onClearError?: () => void; 
  maxValue?: number;
  restrictPreviousDates?: boolean;
  restrictFutureDates?: boolean;
  pattern?: string;
  readonly?:boolean;
}


const InputComponent: FC<InputProps> = ({
  error,
  label,
  icon,
  type,
  inputType,
  name,
  value,
  defaultDate,
  minDate,
  handleChange,
  handleOnInput,
  handleOnBlur,
  handleOnFocus,
  className,
  placeholder,
  disabled,
  imageClassName,
  onClearError, 
 maxValue,
 restrictPreviousDates,
 restrictFutureDates,
 pattern,
 readonly,
 ref,
  ...props
}) => {
  const [dateValue, setDateValue] = useState(defaultDate || new Date().toISOString().substring(0, 10));
  const [passwordShown, setPasswordShown] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const togglePasswordVisibility = () => setPasswordShown(!passwordShown);
 

  const getInputClassName = (error: string | undefined, className: string | undefined, value: string | undefined) => {
    const baseClasses =
      'border lg:max-h-[48px] lg:min-h-[48px] lg:placeholder:text-[16px] lg:h-[39.77px] lg:rounded lg:p-2 lg:mt-[5px] lg:focus:outline-none lg:focus:ring-0 lg:appearance-none lg:leading-normal';
    const colorClasses = error ? 'border-red-500 bg-white' : 'border-gray-300 bg-white';
    const widthClasses = className && className.includes('w-') ? '' : 'lg:w-[215px]';
    const filledClass =isFilled ? 'lg:ring-1 lg:ring-[#138EFF]' : '';
    const errorOutlineClass = error ? 'ring-1 ring-red-500' : '';
    return `${baseClasses} ${colorClasses} ${widthClasses} ${filledClass} ${errorOutlineClass} ${className}`;
  };
  
  const handleMaxValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "number" && maxValue && e.target.valueAsNumber > maxValue) {
      e.target.valueAsNumber = maxValue;
     
    }

    // Prevent commas in the input field
    if (type === 'text' && e.target.value.includes(',')) {
      e.target.value = e.target.value.replace(/,/g, '');
    }

    if (handleChange) handleChange(e);
    setIsFilled(!!e.target.value);
  };
 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'text') {
      const inputValue = e.target.value;
      const alphabeticValue = inputValue.replace(/[0-9]/g, ''); 
      e.target.value = alphabeticValue; 
    }
  
    if (handleChange) handleChange(e);
    setIsFilled(!!e.target.value);
  };
  
    
      const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (handleOnFocus) handleOnFocus(e);
      };
    
      const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (handleOnBlur) handleOnBlur(e);
      };
    
      const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (handleOnInput) handleOnInput(e);
      };

      React.useEffect(() => {
        if (type === 'date' && (typeof value === "string")) {
          setDateValue(value);
        }
      }, [type, value]);

  return (
    <div className="relative">
      {type === 'password' && (
        <>
          <input
            id="input"
            max={maxValue}
            type={passwordShown ? 'text' : 'password'}
            placeholder={placeholder}
            name={name}
            className={getInputClassName(error, className, label)}
            value={value}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onInput={handleInput}
          />
          <div className={` top-0 flex right-0  mt-5 custom-toggle ${className}`}>
            <img
              src={passwordShown ? "" : ""}
              alt={passwordShown ? 'Hide password' : 'View password'}
              className={imageClassName}
              onClick={togglePasswordVisibility}
            />
          </div>
        </>
      )}

      {type === 'date' && (
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          className={getInputClassName(error, className, label)}
          value={dateValue}
          max={restrictFutureDates ? new Date().toISOString().substring(0, 10) : maxValue}
          min={restrictPreviousDates ? new Date().toISOString().substring(0, 10) : minDate}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onInput={handleInput}
        />
      )}
      {type === 'checkbox' && (
        <input
          id="input"
          type={type}
          placeholder={placeholder}
          name={name}
          // className={getInputClassName(error, className, label)}
          value={value}
          onChange={handleMaxValueChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onInput={handleInput}
        />
      )}
      {type !== 'password' && type !== 'date' &&  type !== 'checkbox' && (
        <input
          id="input"
          type={type}
          placeholder={placeholder}
          name={name}
          className={getInputClassName(error, className, label)}
          value={value}
          onChange={handleMaxValueChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onInput={handleInput}
        />
      )}
      {error && <p className="text-[red] text-sm absolute">{error}</p>}
    </div>
  );
};

export { InputComponent };

