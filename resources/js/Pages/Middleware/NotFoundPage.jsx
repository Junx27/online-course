import React from "react";

function NotFoundPage() {
    const handleGoBack = () => {
        window.history.back(); // Menggunakan history untuk kembali
    };

    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <button onClick={handleGoBack}>Go Back</button>
        </div>
    );
}

export default NotFoundPage;
