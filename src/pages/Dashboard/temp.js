import React, { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import ReactDOM from "react-dom"

import "./styles.css"

const testValues = [{ name: "new" }, { name: "loaded" }, { name: "values" }]

function App() {
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      address: [{ name: "default Address Name" }],
      userName: "mohamed",
    },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "address",
  })

  const [userData, setUserData] = useState([
    {
      id: "1",
      name: "mohamed",
    },
    {
      id: "2",
      name: "ahmed",
    },
  ])

  console.log("fields", fields)

  const loadValues = () => reset({ address: testValues })

  const onSubmit = data => {
    console.log("data", data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>users</h1>
      <div>
        <h2>Enter User Name</h2>
        <input {...register("userName")} placeholder="User name" />
      </div>
      <ul>
        <h3 style={{ color: "white" }}>Enter Address</h3>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <input
                name={`address[${index}].name`}
                defaultValue={item.name}
                ref={register({ required: true })}
              />
              <button onClick={() => remove(index)}>Delete</button>
            </li>
          )
        })}
      </ul>
      <section>
        <button
          type="button"
          onClick={() => {
            append({ name: "append" })
          }}
        >
          append
        </button>
        <button type="button" onClick={loadValues}>
          load
        </button>
      </section>
      <input type="submit" />
    </form>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
