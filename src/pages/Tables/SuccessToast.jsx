import React from "react"

const SuccessToast = () => {
  return (
    <React.Fragment>
      <div className="toastify-header">
        <div className="title-wrapper">
          <h6 className="toast-title">Success!</h6>
        </div>
        <small className="text-muted">11 Min Ago</small>
      </div>
      <div className="toastify-body">
        <span role="img" aria-label="toast-text">
          👋 You add successfully pie.
        </span>
      </div>
    </React.Fragment>
  )
}

export default SuccessToast
