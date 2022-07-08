import React, { useState, useEffect } from "react"
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Link } from "react-router-dom"
import { API } from "../../store/api/config"
import Swal from "sweetalert2"
import makeAnimated from "react-select/animated"
import ReactSelect from "react-select"
import NumberFormat from "react-number-format"

import "./styles.css"
import { createStockEntry } from "../../store/actions"
import { Col, CardBody, Row, Input } from "reactstrap"

let renderCount = 0

const animatedComponents = makeAnimated()

const purposes = [
  { value: "Sales Return", label: "Sales Return" },
  { value: "Purchase Return", label: "Purchase Return" },
  { value: "Damage", label: "Damage" },
]

const trueOrFalse = [
  {
    value: true,
    label: "True",
  },
  {
    value: false,
    label: "False",
  },
]

const StockEntry = props => {
  let history = useHistory()
  let us = {}
  let editing = false
  if (props.location.user) {
    us = props.location.user
    editing = props.location.editing
  }

  const [id, setId] = useState("")
  const [imgData, setImgData] = useState("/uploads/user/default.png")
  const [isClearable, setIsClearable] = useState(true)

  const toggleClearable = () => {
    setIsClearable(!isClearable)
  }

  const {
    register,
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      items: [{}],
    },
  })

  const watchItemsField = watch(["items"])

  console.log("watchItemsField", watchItemsField)

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  })

  useEffect(async () => {
    if (us.id) {
      await API.get(`/api/v1/user-items/${us.id}`)
        .then(response => {
          setTimeout(() => {
            const user = response.data.userItems
            setId(user[0].id)
            setValue("userName", user[0].userName)
            const array = JSON.parse(user[0].items)
            setValue("items", array)
            setValue("gender", user[0].gender)
            if (user[0].user_image) {
              setImgData(user[0].user_image)
            }
          }, 500)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [])

  const dispatch = useDispatch()

  const convertItemsObjectToJsonString = data => JSON.stringify(data)

  const onSubmit = data => {
    const items = data.items.map(item => {
      return {
        series: item.itemSeries.value,
        name: item.itemSeries.label,
        price: item.price,
        quantity: item.quantity,
      }
    })
    const request = {
      purpose: data.purpose.value,
      items: convertItemsObjectToJsonString(items),
      currency: data.currency.value,
      isOpening: data.isOpening.value,
      vendor_id: data.vendor_id.value,
      remarks: data.remarks,
      postingDate: new Date(),
    }
    if (!editing) {
      if (dispatch(createStockEntry(request))) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "ئەم داواکارییە بە سەرکەوتووی زیادکرا",
          showConfirmButton: false,
          timer: 1500,
        })
        history.push("/stockEntries")
      }
    } else {
      // if (dispatch(updateUseritems(id, payload))) {
      //   Swal.fire({
      //     position: "center",
      //     icon: "success",
      //     title: "ئەم داواکارییە بە سەرکەوتووی نوێکراوە",
      //     showConfirmButton: false,
      //     timer: 1500,
      //   })
      //   history.push("/user-items")
      // }
    }
  }

  renderCount++

  return (
    <React.Fragment>
      <div className="page-content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 style={{ color: "black" }}>Stock Entry</h1>
          <CardBody>
            <Row>
              <Link
                to={{
                  pathname: "stockEntries",
                }}
                className="btn btn-primary"
              >
                visit stock
              </Link>
            </Row>
            <Row>
              <Col xs="12" md="6">
                <label htmlFor="dropdown" style={{ color: "black" }}>
                  Is Opening
                </label>
                <Controller
                  as={ReactSelect}
                  options={trueOrFalse}
                  name="isOpening"
                  isClearable
                  control={control}
                />
              </Col>
              <Col xs="12" md="6">
                <label style={{ color: "black" }}>Purpose</label>
                <Controller
                  as={ReactSelect}
                  options={purposes}
                  name="purpose"
                  isClearable
                  control={control}
                />
              </Col>
              <Col xs="12" md="6">
                <label style={{ color: "black" }}>Vendor</label>
                <Controller
                  as={ReactSelect}
                  options={[
                    {
                      value: 1,
                      label: "mohammed vendor",
                    },
                    { value: 2, label: "ahmad vendor" },
                    { value: 3, label: "sirwan" },
                  ]}
                  name="vendor_id"
                  isClearable
                  control={control}
                />
              </Col>
              <Col xs="12" md="6">
                <label style={{ color: "black" }}>Currency</label>
                <Controller
                  as={ReactSelect}
                  options={[
                    {
                      value: "IQD",
                      label: "IQD",
                    },
                    { value: "USD", label: "USD" },
                  ]}
                  name="currency"
                  isClearable
                  control={control}
                />
              </Col>
              <Col md="6" sm="12">
                <label for="remarks" style={{ color: "black" }}>
                  Remarks
                </label>
                <Input
                  type="textarea"
                  name="remarks"
                  innerRef={register()}
                  control={control}
                  defaultValue=""
                />
              </Col>
              <div className="" style={{ width: "100%" }}>
                <ul>
                  <label htmlFor="" style={{ color: "black" }}>
                    Select Items
                  </label>
                  <Row>
                    {fields.map((item, index) => {
                      return (
                        <li key={item.id}>
                          {/* <Col xs="12" md="6">
                        <label style={{ color: "black" }}>item name</label>
                        <Controller
                          render={({ field }) => <input {...field} />}
                          name={`items.${index}.itemName`}
                          control={control}
                          defaultValue={item.itemName}
                        />
                      </Col> */}
                          <Col>
                            <label style={{ color: "black" }}>Items</label>
                            <Controller
                              as={ReactSelect}
                              options={[
                                { label: "Item One", value: "item-1" },
                                { label: "Item Two", value: "item-2" },
                              ]}
                              name={`items.${index}.itemSeries`}
                              isClearable
                              control={control}
                            />
                          </Col>
                          <Col>
                            <label style={{ color: "black" }}>Price</label>
                            <Controller
                              as={NumberFormat}
                              thousandSeparator
                              name={`items.${index}.price`}
                              className="input"
                              control={control}
                            />
                          </Col>
                          <Col>
                            <label style={{ color: "black" }}>quantity</label>
                            <Controller
                              as={NumberFormat}
                              thousandSeparator
                              name={`items.${index}.quantity`}
                              className="input"
                              control={control}
                            />
                          </Col>
                          <Col xs="12" md="6">
                            <button type="button" onClick={() => remove(index)}>
                              Delete
                            </button>
                          </Col>
                        </li>
                      )
                    })}
                  </Row>
                </ul>
              </div>
              <section>
                <button
                  type="button"
                  onClick={() => {
                    append({ name: "Item 1" })
                  }}
                >
                  Add New Item
                </button>
                <button
                  type="button"
                  onClick={() =>
                    reset({
                      userName: "mohammed",
                      items: [{ name: "Item 1" }],
                      user_image: "",
                    })
                  }
                >
                  reset
                </button>
              </section>
              <input type="submit" />
            </Row>
          </CardBody>
        </form>
        <hr />
      </div>
    </React.Fragment>
  )
}

export default StockEntry
