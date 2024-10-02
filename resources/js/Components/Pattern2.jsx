import React from "react";

function Pattern2({ children }) {
    return (
        <div className="relative pattern w-full h-32">
            <div className="inset-0 absolute z-30">{children}</div>
            <div className="inset-0 absolute bg-gradient-to-r from-white from-10% via-transparent via-30% to-transparent to-90% w-full h-full"></div>
            <div className="inset-0 absolute bg-gradient-to-l from-white from-10% via-transparent via-30% to-transparent to-90% w-full h-full"></div>
            <div className="inset-0 absolute bg-gradient-to-t from-white from-10% via-transparent via-30% to-transparent to-90% w-full h-full"></div>
            <div className="inset-0 absolute bg-gradient-to-b from-white from-10% via-transparent via-30% to-transparent to-90% w-full h-full"></div>
        </div>
    );
}

export default Pattern2;
