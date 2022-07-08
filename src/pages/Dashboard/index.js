import React, { useState, useEffect } from "react"
import MetaTags from "react-meta-tags"
import { useDispatch, useSelector } from "react-redux"
import ReactPaginate from "react-paginate"

import { Table, Row, Col, Card, CardBody, Button, Spinner } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import actions
import { listUsers, deleteUser } from "../../store/actions"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"

const BasicTable = () => {
  const dispatch = useDispatch()
  const usersList = useSelector(state => state.usersList)

  const { isLoading, loaded, error, users } = usersList

  useEffect(() => {
    dispatch(listUsers())
  }, [])

  const [pageNumber, setPageNumber] = useState(0)

  const usersPerPage = 4
  const pagesVisited = pageNumber * usersPerPage

  const pageCount = Math.ceil(users.length / usersPerPage)

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
        if (dispatch(deleteUser(user.id))) {
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
          <title>Pos System</title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs
            maintitle=""
            title="Tables"
            breadcrumbItem="Basic Tables"
          />
          <Row>
            <Col lg={12}>
              <Row>
                <Link
                  to={{
                    pathname: "form-user",
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
                              <th>Profile name</th>
                              <th>Disable</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users
                              .slice(pagesVisited, pagesVisited + usersPerPage)
                              .map(user => (
                                <tr key={user.id}>
                                  <td>{user.id}</td>
                                  <td>{user.name}</td>
                                  <td>
                                    {user.check_disable > 0 && (
                                      <i
                                        class="fa fa-check"
                                        aria-hidden="true"
                                      ></i>
                                    )}
                                  </td>
                                  <td>
                                    <Link
                                      to={{
                                        pathname: "form-user",
                                        user: user,
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
                                      onClick={() => deleteHandler(user)}
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

export default BasicTable
