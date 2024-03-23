import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={3}
    width={800}
    height={160}
    viewBox="0 0 800 160"
    backgroundColor="#E7D5FF"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="100" y="0" rx="3" ry="3" width="600" height="30" /> 
    <rect x="100" y="50" rx="3" ry="3" width="100" height="20" /> 
    <rect x="0" y="90" rx="3" ry="3" width="410" height="15" /> 
    <rect x="0" y="110" rx="3" ry="3" width="300" height="15" /> 
    {/* <rect x="0" y="140" rx="3" ry="3" width="178" height="15" />  */}
    <circle cx="40" cy="40" r="40" />
  </ContentLoader>
)

export default MyLoader