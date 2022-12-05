import React from "react";
import ContentLoader from "react-content-loader";


const Skeleton: React.FC = (props: any) => (
    <ContentLoader
        ClassName="pizza-block"
        speed={2}
        width={280}
        height={465}
        viewBox="0 0 280 465"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="125" cy="125" r="125" />
        <rect x="0" y="NaN" rx="0" ry="0" width="256" height="NaN" />
        <rect x="0" y="273" rx="15" ry="15" width="270" height="25" />
        <rect x="0" y="309" rx="15" ry="15" width="270" height="65" />
        <rect x="0" y="395" rx="15" ry="15" width="115" height="38" />
        <rect x="137" y="383" rx="15" ry="15" width="130" height="50" />
    </ContentLoader>
)

export default Skeleton
