import React from "react";

function Button({ children }) {
    return (
        <div className="transition-all duration-300 font-bold bg-blue-50 hover:scale-[101%] hover:shadow-lg hover:shadow-blue-500/50 p-3 px-5 hover:border-b-4 hover:border-blue-800 cursor-pointer">
            {children}
        </div>
    );
}

export default Button;
