import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { API } from "../../store/api/config"
import Swal from "sweetalert2"
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  Label,
  Input,
  Container,
  NavItem,
} from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"

//Import Util
import Validator from "../util/validation"

// Styled Component
import { FormFeedback } from "../../assets/style/Forms"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import actions
import { updateUser, createUser } from "../../store/actions"

const initialState = {
  id: "",
  intNumber: "",
  name: "",
  user_name: "",
  territory: "",
  warehouse: "",
  incomeAccount: "",
  discountOn: "",
  price: "",
  currency: "",
  changeAccount: "",
  expenseAccount: "",
  check_disable: "1",
}

const territories = [
  {
    territory_name: "t1",
  },
  {
    territory_name: "t2",
  },
]

const prices = [
  {
    price_name: "p1",
  },
  {
    price_name: "p2",
  },
]

const warehouses = [
  {
    warehouse_name: "w1",
  },
  {
    warehouse_name: "w2",
  },
]

const changeAccounts = [
  {
    changeAccount_name: "ch1",
  },
  {
    changeAccount_name: "ch2",
  },
]

const incomeAccounts = [
  {
    incomeAccount_name: "in1",
  },
  {
    incomeAccount_name: "in2",
  },
]

const expenseAccounts = [
  {
    expenseAccount_name: "ex1",
  },
  {
    expenseAccount_name: "ex2",
  },
]

const discountOns = [
  {
    discountOn_name: "on",
  },
  {
    discountOn_name: "off",
  },
]

const FormValidations = props => {
  let history = useHistory()
  let us = {}
  let editing = false
  if (props.location.user) {
    us = props.location.user
    editing = props.location.editing
  }
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    ...initialState,
  })

  const dispatch = useDispatch()

  useEffect(async () => {
    if (us.id) {
      await API.get(`/api/v1/user/${us.id}`)
        .then(response => {
          console.log(response)
          const user = response.data.user
          setFormData({
            id: user[0].id,
            name: user[0].name,
            user_name: user[0].user_name,
            territory: user[0].Territory,
            warehouse: user[0].Warehouse,
            incomeAccount: user[0].IncomeAccount,
            discountOn: user[0].DiscountOn,
            currency: user[0].currency,
            price: user[0].price,
            changeAccount: user[0].changeAccount,
            expenseAccount: user[0].expenseAccount,
            // check_disable: user[0].check_disable,
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [])

  console.log(formData)

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({
      ...errors,
      [e.target.name]: null,
    })
  }

  // https://codesandbox.io/s/react-hook-form-usefieldarray-forked-3m8hx?file=/src/index.js

  const handleSubmit = e => {
    e.preventDefault()
    let newErrors = {}
    console.log(formData)
    newErrors = Validator.findErrorsFormUser(formData)
    // console.log(newErrors)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      if (!editing) {
        if (dispatch(createUser(formData))) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "ئەم داواکارییە بە سەرکەوتووی زیادکرا",
            showConfirmButton: false,
            timer: 1500,
          })
          resetForm()
          history.push("/dashboard")
        }
      } else {
        console.log("updated form", formData)
        if (dispatch(updateUser(formData.id, formData))) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "ئەم داواکارییە بە سەرکەوتووی نوێکراوە",
            showConfirmButton: false,
            timer: 1500,
          })
          console.log("updated estate is done")
          history.push("/dashboard")
        }
      }
    }
  }

  const resetForm = () => {
    setFormData({ ...initialState })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="pos" breadcrumbItem="pos system" />
          <Row>
            <Col xl="12">
              <Card>
                <CardBody>
                  <AvForm
                    className="needs-validation"
                    id="form"
                    onSubmit={handleSubmit}
                  >
                    <Row>
                      <Row>
                        <Col md="3" sm="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="validationCustom02">
                              accept int number
                            </Label>
                            <AvField
                              name="intNumber"
                              type="text"
                              errorMessage="Enter Enter Inter Number"
                              className="form-control"
                              onChange={handleChange}
                              id="validationCustom02"
                              value={formData.intNumber}
                              invalid={!!errors.intNumber}
                            />
                            <FormFeedback invalid>
                              {errors.intNumber}
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col md="3" sm="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="validationCustom02">
                              profile name
                            </Label>
                            <AvField
                              name="name"
                              type="text"
                              errorMessage="Enter Profile name"
                              className="form-control"
                              onChange={handleChange}
                              // validate={{ required: { value: true } }}
                              id="validationCustom02"
                              value={formData.name}
                              invalid={!!errors.name}
                            />
                            <FormFeedback invalid>{errors.name}</FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col md="3" sm="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="validationCustom02">
                              territory
                            </Label>
                            <Input
                              type="select"
                              name="territory"
                              onChange={handleChange}
                              value={formData.territory}
                              invalid={!!errors.territory}
                            >
                              <option value="">هەڵبژێرە</option>
                              {territories.map((territory, index) => (
                                <option
                                  key={index}
                                  value={territory.territory_name}
                                >
                                  {territory.territory_name}
                                </option>
                              ))}
                            </Input>
                            <FormFeedback invalid>
                              {errors.territory}
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col md="3" sm="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="validationCustom02">
                              price list
                            </Label>
                            <Input
                              type="select"
                              name="price"
                              onChange={handleChange}
                              value={formData.price}
                              invalid={!!errors.price}
                            >
                              <option value="">هەڵبژێرە</option>
                              {prices.map((price, index) => (
                                <option key={index} value={price.price_name}>
                                  {price.price_name}
                                </option>
                              ))}
                            </Input>
                            <FormFeedback invalid>{errors.price}</FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col md="3" sm="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="validationCustom02">currency</Label>
                            <AvField
                              name="currency"
                              type="text"
                              errorMessage="Enter Last name"
                              className="form-control"
                              // validate={{ required: { value: true } }}
                              onChange={handleChange}
                              id="validationCustom02"
                              value={formData.currency}
                              invalid={!!errors.currency}
                            />
                            <FormFeedback invalid>
                              {errors.currency}
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="3" sm="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="validationCustom02">
                              Warehouse
                            </Label>
                            <Input
                              type="select"
                              name="warehouse"
                              onChange={handleChange}
                              value={formData.warehouse}
                              invalid={!!errors.warehouse}
                            >
                              <option value="">هەڵبژێرە</option>
                              {warehouses.map((warehouse, index) => (
                                <option
                                  key={index}
                                  value={warehouse.warehouse_name}
                                >
                                  {warehouse.warehouse_name}
                                </option>
                              ))}
                            </Input>
                            <FormFeedback invalid>
                              {errors.warehouse}
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col md="3" sm="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="validationCustom02">
                              change Account
                            </Label>
                            <Input
                              type="select"
                              name="changeAccount"
                              onChange={handleChange}
                              value={formData.changeAccount}
                              invalid={!!errors.changeAccount}
                            >
                              <option value="">هەڵبژێرە</option>
                              {changeAccounts.map((changeAccount, index) => (
                                <option
                                  key={index}
                                  value={changeAccount.changeAccount_name}
                                >
                                  {changeAccount.changeAccount_name}
                                </option>
                              ))}
                            </Input>
                            <FormFeedback invalid>
                              {errors.changeAccount}
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col md="3" sm="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="validationCustom02">
                              Income Account
                            </Label>
                            <Input
                              type="select"
                              name="incomeAccount"
                              onChange={handleChange}
                              value={formData.incomeAccount}
                              invalid={!!errors.incomeAccount}
                            >
                              <option value="">هەڵبژێرە</option>
                              {incomeAccounts.map((incomeAccount, index) => (
                                <option
                                  key={index}
                                  value={incomeAccount.incomeAccount_name}
                                >
                                  {incomeAccount.incomeAccount_name}
                                </option>
                              ))}
                            </Input>
                            <FormFeedback invalid>
                              {errors.incomeAccount}
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col md="3" sm="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="validationCustom02">
                              Expense Account
                            </Label>
                            <Input
                              type="select"
                              name="expenseAccount"
                              onChange={handleChange}
                              value={formData.expenseAccount}
                              invalid={!!errors.expenseAccount}
                            >
                              <option value="">هەڵبژێرە</option>
                              {expenseAccounts.map((expenseAccount, index) => (
                                <option
                                  key={index}
                                  value={expenseAccount.expenseAccount_name}
                                >
                                  {expenseAccount.expenseAccount_name}
                                </option>
                              ))}
                            </Input>
                            <FormFeedback invalid>
                              {errors.expenseAccount}
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="3" sm="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="validationCustom02">
                              Discount On
                            </Label>
                            <Input
                              type="select"
                              name="discountOn"
                              onChange={handleChange}
                              value={formData.discountOn}
                              invalid={!!errors.discountOn}
                            >
                              <option value="">هەڵبژێرە</option>
                              {discountOns.map((discountOn, index) => (
                                <option
                                  key={index}
                                  value={discountOn.discountOn_name}
                                >
                                  {discountOn.discountOn_name}
                                </option>
                              ))}
                            </Input>
                            <FormFeedback invalid>
                              {errors.discountOn}
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col md="3" sm="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="validationCustom02">disable</Label>
                            <Input
                              type="checkbox"
                              name="check_disable"
                              onChange={handleChange}
                              value={formData.check_disable}
                              invalid={!!errors.check_disable}
                            />
                            <FormFeedback invalid>
                              {errors.check_disable}
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Row>
                    <Row>
                      <Col lg="2" md="3" sm="4" xs="4">
                        <Button color="success" type="submit">
                          save
                        </Button>
                      </Col>
                      <Col lg="2" md="3" sm="4" xs="4">
                        <Button color="danger" onClick={() => resetForm()}>
                          سڕینەوە
                        </Button>
                      </Col>
                    </Row>
                  </AvForm>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default FormValidations
