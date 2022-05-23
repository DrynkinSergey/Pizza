import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
    <ContentLoader
        className='pizza-block'
        speed={2}
        width={280}
        height={465}
        viewBox="0 0 280 465"
        backgroundColor="#f3f3f3"
        foregroundColor="#cfcfcf"
        {...props}
    >
        <circle cx="133" cy="154" r="115" />
        <circle cx="117" cy="173" r="12" />
        <rect x="30" y="289" rx="0" ry="0" width="210" height="19" />
        <rect x="31" y="333" rx="0" ry="0" width="210" height="53" />
        <rect x="31" y="406" rx="0" ry="0" width="97" height="38" />
        <rect x="150" y="406" rx="9" ry="9" width="97" height="39" />
    </ContentLoader>
)

export default MyLoader

