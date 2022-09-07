import React from "react";
import ContentLoader from "react-content-loader";

const Sceleton = () => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={270}
        height={500}
        viewBox="0 0 270 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="125" cy="125" r="125" />
        <rect x="0" y="302" rx="10" ry="10" width="270" height="20" />
        <rect x="0" y="359" rx="10" ry="10" width="270" height="60" />
        <rect x="0" y="444" rx="5" ry="5" width="100" height="24" />
        <rect x="170" y="444" rx="5" ry="5" width="100" height="24" />
    </ContentLoader>
)

export default Sceleton;

