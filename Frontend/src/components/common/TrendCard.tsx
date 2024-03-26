import React from 'react';
import cx from 'classnames';


interface TrendStatsCardProps {
  title: string;
  titleIcon?: any;
  trendIcon?: any;
  amount: string | number;
  trendtitle: string;
  amountClassName?:any;
}

const iconStyle = {
  color: '#0D8DBF',

};


const TrendStatsCard: React.FC<TrendStatsCardProps> = ({
  title,
  titleIcon,
  trendIcon,
  amount,
  trendtitle,
  amountClassName
}) => {
  const bgClassName = (isUpTrend: boolean) => {
    return cx('  w-7  h-7 flex rounded-full justify-center items-center', {
      ["bg-green-200"]: isUpTrend,
      ["bg-red-100"]: !isUpTrend,
    });
  };
  return (
    <div className=" border-gray-300 bg-[#cbeef6] p-6 my-1 success">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="mr-2 text-[#0D8DBF]">{titleIcon}</span>
          <h3 className="text-[14px] md:text-[16px] lg:text-[14px] biglg:text-[16px] xl:text-[16px] text-[#000000] font-normal leading-5">{title}</h3>
        </div>

        <div className="flex items-center gap-[4px]">
          <h3 className=" text-[11px] md:text-[12px] lg:text-[11px] biglg:text-[12px] xl:text-[12px] font-normal leading-5" style={{ whiteSpace: 'nowrap' }}>{trendtitle}</h3>
          <span className="icon" style={iconStyle}>{trendIcon}</span>
        </div>
      </div>
      <div className="flex justify-between items-center mt-10"> 
        <div className={cx('flex text-black text-[18px] md:text-[22px] xl:text-[24px] font-semibold leading-6 rounded-full justify-center items-center')}>
          <p className={`${amountClassName}`}>{amount}</p> 
        </div>
      </div>
    </div>
  );
};

export { TrendStatsCard };
