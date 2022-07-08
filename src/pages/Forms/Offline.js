import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import Swal from "sweetalert2"
// import "./styles.css"
import { createMessage, network } from "../../store/actions"
import { io } from "socket.io-client"

let renderCount = 0

const Offline = props => {
  let history = useHistory()
  const text = useSelector(state => state.message.message)
  const networkShow = useSelector(state => state.message.network)
  console.log(networkShow)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      message: "",
    },
  })

  useEffect(() => {
    const socket = io.connect("http://localhost:5000", { reconnected: true })
    socket.on("connection", () => {
      console.log("connected to server")
      dispatch(network())
    })

    socket.on("hello", data => {
      console.log(data)
    })

    socket.on("disconnect", data => {
      dispatch(network())
      console.log("disconected server")
    })
  }, [])

  console.log(window.navigator.onLine)

  const dispatch = useDispatch()

  let messages = ""
  const onSubmit = data => {
    console.log(data)
    if (!networkShow) {
      // messages.push(data.message)
      messages = data.message
      localStorage.setItem("messages", messages)
      Swal.fire({
        position: "center",
        icon: "success",
        title: "ئەم داواکارییە بە سەرکەوتووی زیادکرا",
        showConfirmButton: false,
        timer: 1500,
      })
      return
    }
    if (dispatch(createMessage(data))) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "ئەم داواکارییە بە سەرکەوتووی زیادکرا",
        showConfirmButton: false,
        timer: 1500,
      })
      // history.push("/user-address")
    }
  }

  const toggleNetwork = () => {
    const temp = localStorage.getItem("messages")
    if (temp) {
      console.log("send the data")
      dispatch(createMessage({ message: temp }))
    }
    dispatch(network())
    if (!networkShow) {
      localStorage.removeItem("messages")
      console.log("remove message")
    }
  }

  renderCount++

  return (
    <React.Fragment>
      <div className="page-content">
        <div style={{ textAlign: "center" }}>
          <button onClick={toggleNetwork} className="btn btn-primary mb-5">
            network
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 style={{ color: "black" }}>
            {networkShow && <div>Network is available</div>}
          </h1>
          <h1 style={{ color: "black" }}>
            {!networkShow && <div>Network is not available</div>}
          </h1>
          <label htmlFor="message" style={{ color: "black" }}>
            {
              <div className="">
                {text.map(user => (
                  <div className="">{user.message}</div>
                ))}
              </div>
            }
          </label>
          <input
            {...register("message", { required: true, maxLength: 30 })}
            id="message"
          />
          {/* <p>{text}</p> */}
          <p style={{ color: "red", fontSize: "14px" }}>
            {errors.message && errors.message.type === "required" && (
              <span>user name is required</span>
            )}
            {errors.message && errors.message.type === "maxLength" && (
              <span>Max length is 30</span>
            )}
          </p>
          <input type="submit" />
        </form>
        <hr />
      </div>
    </React.Fragment>
  )
}

export default Offline
