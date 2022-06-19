import { useState } from "react";

export const pointToTier = (point) => {
    let res = 0;
    res = parseInt(Math.abs(point) / 100) - 9;
    if(res >= 100)
        res = 99;
    else if (res < 0)
        res = 0;
    return res;
}

export const TierCircle = ({point, size}) => {

    let tier = '중산층';

    if(point >= 1000)
        tier = '부자';
    else if(point <= -1000)
        tier = '그지';

    return (
        <div style={{ display:'flex', justifyContent: 'center', alignItems: 'center', width: size =='big' ? "20px" : '15px', height: size =='big' ? "20px" : '15px', borderRadius:'50%', color:'white', background: tier == '중산층' ? '#9E9E9E' : (tier == '부자' ? '#E74C3C' : '#3498DB'), paddingBottom:'1px', marginRight:'4px'}}>
            {pointToTier(point)}
        </div>
    )
};