import React, { useState, useEffect } from "react"
import MetaTags from "react-meta-tags"
import { useDispatch, useSelector } from "react-redux"
import ReactPaginate from "react-paginate"

import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Spinner,
  Container,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import actions
import { getAllStockEntry } from "../../store/actions"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"

const UserAddress = () => {
  const dispatch = useDispatch()
  const stockEntry = useSelector(state => state.stockEntry)

  const { isLoading, loaded, error, listStockEntries } = stockEntry
  console.log("listStockEntries", listStockEntries)
  useEffect(() => {
    dispatch(getAllStockEntry())
  }, [])

  const [pageNumber, setPageNumber] = useState(0)

  const usersPerPage = 4
  const pagesVisited = pageNumber * usersPerPage

  const pageCount = Math.ceil(listStockEntries.length / usersPerPage)

  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  const deleteHandler = user => {
    Swal.fire({
      title: "ئایا دڵنیایت",
      text: "ناتوانیت ئەمە بگێڕیتەوە!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بەڵێ بسڕەوە!",
      confirmButtonColor: "#3085d6",
      cancelButtonText: "هەڵوەشاندنەوە",
      cancelButtonColor: "#d33",
    }).then(result => {
      if (result.isConfirmed) {
        if (dispatch(deleteUserAddress(user.id))) {
          // deleteAlert()
          console.log("delete user id", user.id)
          Swal.fire("سڕایەوە!", "داواکارییەکەت سڕایەوە.", "success")
        }
      }
    })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Stock Entry</title>
        </MetaTags>
        <div className="container-fluid">
          <Row>
            <Col lg={12}>
              <Row>
                <Link
                  to={{
                    pathname: "stock-entry",
                  }}
                  className="btn btn-primary"
                >
                  New
                </Link>
              </Row>
              <Card>
                <CardBody>
                  <div className="table-responsive">
                    <Table className="table mb-0">
                      {isLoading ? (
                        <div class="d-flex justify-content-center">
                          <Button variant="primary" disabled>
                            <Spinner
                              as="span"
                              animation="grow"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                            چاوەڕوانبە...
                          </Button>
                        </div>
                      ) : (
                        <>
                          <thead>
                            <tr>
                              <th>Series</th>
                              <th>purpose</th>
                              <th>Remarks</th>
                              <th>stock level</th>
                              <th>items</th>
                            </tr>
                          </thead>
                          <tbody>
                            {listStockEntries
                              .slice(pagesVisited, pagesVisited + usersPerPage)
                              .map(stock => (
                                <tr key={stock.series}>
                                  <td>{stock.series}</td>
                                  <td>{stock.purpose}</td>
                                  <td>{stock.remarks}</td>
                                  <td>{stock.stockLevel}</td>
                                  <td>
                                    {JSON.parse(stock.items).map(item => (
                                      <div key={item.series}>
                                        <span>{item.name}</span>,
                                      </div>
                                    ))}
                                  </td>
                                  <td>
                                    <Link
                                      to={{
                                        pathname: "react-hook",
                                        stock: stock,
                                        editing: true,
                                      }}
                                      className="btn btn-primary"
                                    >
                                      Edit
                                    </Link>
                                  </td>
                                  <td>
                                    <Button
                                      color="danger"
                                      onClick={() => deleteHandler(stock)}
                                    >
                                      delete
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </>
                      )}
                    </Table>
                  </div>
                </CardBody>
                {!isLoading && (
                  <ReactPaginate
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                  />
                )}
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}

export default UserAddress
