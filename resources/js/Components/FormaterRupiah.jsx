import React from "react";

function FormaterRupiah({ number }) {
    const formatRupiah = (value) => {
        const formatter = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 2,
        });
        return formatter.format(value);
    };
    return <div>{formatRupiah(number)}</div>;
}

export default FormaterRupiah;
