import * as React from "react"
import { useForm } from "react-hook-form"

const ReactForm = props => {
  const { register, handleSubmit, setValue } = useForm()

  const onSubmit = data => {
    console.log(data)
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

export default ReactForm
