import React from 'react'
import { CFooter } from '@coreui/react-pro'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          
        </a>
       
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a
          href="http://64.227.163.17/WebIndex"
          target="_blank"
          rel="noopener noreferrer"
        >
          Banjo's
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
