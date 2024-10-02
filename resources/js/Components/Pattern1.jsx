import React from "react";

function Pattern1({ children }) {
    return (
        <div className="relative pattern-1 w-full h-96">
            <div className="inset-0 absolute z-30">{children}</div>
            <div className="inset-0 absolute bg-gradient-to-r from-white from-10% via-transparent via-30% to-transparent to-90% w-full h-full"></div>
            <div className="inset-0 absolute bg-gradient-to-l from-white from-10% via-transparent via-30% to-transparent to-90% w-full h-full"></div>
            <div className="inset-0 absolute bg-gradient-to-t from-white from-10% via-transparent via-30% to-transparent to-90% w-full h-full"></div>
            <div className="inset-0 absolute bg-gradient-to-b from-white from-10% via-transparent via-30% to-transparent to-90% w-full h-full"></div>
        </div>
    );
}

export default Pattern1;
