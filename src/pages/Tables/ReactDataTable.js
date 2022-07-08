import React, { useState, useEffect, useCallback, useMemo } from "react"
import DataTable from "react-data-table-component"
import Swal from "sweetalert2"
import ArrowDownward from "@material-ui/icons/ArrowDownward"
import Avatar from "@mui/material/Avatar"
import * as yup from "yup"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer, toast } from "react-toastify"
import { injectStyle } from "react-toastify/dist/inject-style"
import { yupResolver } from "@hookform/resolvers/yup"
import { v4 as uuidv4 } from "uuid"
import SuccessToast from "./SuccessToast"

import { useForm } from "react-hook-form"

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Form,
  FormGroup,
  Input,
  FormFeedback,
  Badge,
} from "reactstrap"
import { Trash, Edit } from "react-feather"
import "./styles.css"

const sortIcon = <ArrowDownward />

if (typeof window !== "undefined") {
  injectStyle()
}

function ReactDataTable() {
  const [data, setData] = useState([
    {
      id: 1,
      title: "mohamed",
      url: "https://via.placeholder.com/600/771796",
      money: 255,
    },
    {
      id: 2,
      title: "mohamed",
      url: "https://via.placeholder.com/600/771796",
      money: 255,
    },
    {
      id: 3,
      title: "mohamed",
      url: "https://via.placeholder.com/600/771796",
      money: 255,
    },
    {
      id: 4,
      title: "mohamed",
      url: "https://via.placeholder.com/600/771796",
      money: 255,
    },
    {
      id: 5,
      title: "mohamed",
      url: "https://via.placeholder.com/600/771796",
      money: 255,
    },
    {
      id: 6,
      title: "mohamed",
      url: "https://via.placeholder.com/600/771796",
      money: 255,
    },
    {
      id: 7,
      title: "mohamed",
      url: "https://via.placeholder.com/600/771796",
      money: 255,
    },
    {
      id: 8,
      title: "mohamed",
      url: "https://via.placeholder.com/600/771796",
      money: 255,
    },
    {
      id: 9,
      title: "mohamed",
      url: "https://via.placeholder.com/600/771796",
      money: 255,
    },
  ])
  const [modal, setModal] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])
  const [toggleCleared, setToggleCleared] = useState(data)
  const [idData, setIdData] = useState()
  const [editing, setEditing] = useState(false)
  const handleRowSelected = useCallback(state => {
    setSelectedRows(state.selectedRows)
  }, [])

  const contextActions = useMemo(() => {
    const handleDelete = () => {
      Swal.fire({
        title: "Are you sure you want to delete",
        text: "You can no return back!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes delete it!",
        confirmButtonColor: "#3085d6",
        cancelButtonText: "cancel",
        cancelButtonColor: "#d33",
      }).then(result => {
        if (result.isConfirmed) {
          setToggleCleared(!toggleCleared)
          let _data = [...data]
          selectedRows.forEach(rd => {
            _data = _data.filter(t => t.id !== rd.id)
          })
          setData(_data)
          Swal.fire("deleted!", "Yes it is deleted.", "success")
        }
      })
    }

    return (
      <Button
        key="delete"
        onClick={handleDelete}
        style={{ backgroundColor: "red" }}
        icon
      >
        Delete
      </Button>
    )
  }, [data, selectedRows, toggleCleared])

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       fetch("https://jsonplaceholder.typicode.com/photos")
  //         .then(response => response.json())
  //         .then(json => {
  //           setData(json.slice(0, 8))
  //         })
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   getData()
  // }, [])
  let i = 0
  let sum = 0

  const loginSchema = yup.object().shape({
    title: yup.string().required(),
  })

  const { register, handleSubmit, setValue, errors } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      title: "default",
    },
  })

  const columns = [
    {
      name: "Title",
      selector: row => row.title,
    },
    {
      name: "Image",
      sortable: true,
      minWidth: "250px",
      cell: row => (
        <div className="d-flex align-items-center">
          <Avatar alt="image" src={row.url} />
        </div>
      ),
    },
    {
      name: "Money",
      sortable: true,
      cell: row => row.money,
    },
    {
      name: "Delete",
      minWidth: "10%",
      cell: row => (
        <React.Fragment>
          <Button
            aria-label="delete"
            color="danger"
            className="btn-circle"
            outline
            onClick={() => {
              setData(data => data.filter(d => d.id !== row.id))
            }}
          >
            <Trash />
          </Button>
          <Button
            aria-label="delete"
            color="success"
            className="btn-circle"
            outline
            onClick={() => {
              setTimeout(() => {
                setIdData(row.id)
                setValue("title", row.title)
              }, 100)
              setEditing(!editing)
              setModal(!modal)
            }}
          >
            <Edit />
          </Button>
        </React.Fragment>
      ),
    },
  ]

  function toggle() {
    setModal(!modal)
  }

  const notifySuccess = () =>
    toast.success(<SuccessToast />, { hideProgressBar: true })

  const addNewItem = item => {
    if (!editing) {
      console.log(uuidv4())
      try {
        setData([
          ...data,
          {
            id: uuidv4(),
            title: item.title,
            url: "https://via.placeholder.com/600/92c9525",
            money: 255,
          },
        ])
        setModal(!modal)
        notifySuccess()
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log("id", idData)
      console.log(item)
      let elements = [...data]
      let currentElementIndex = elements.findIndex(x => x.id === idData)
      if (currentElementIndex === -1) return
      elements[currentElementIndex] = {
        id: idData,
        title: item.title,
        url: "https://via.placeholder.com/600/92c9525",
        money: 255,
      }
      setData(elements)
      setModal(!modal)
      notifySuccess()
    }
  }

  data.forEach(el => {
    sum = sum + el.money
  })

  return (
    <React.Fragment>
      <div className="page-content">
        <DataTable
          title="React Data Table"
          columns={columns}
          data={data}
          sortIcon={sortIcon}
          pagination
          selectableRows
          contextActions={contextActions}
          onSelectedRowsChange={handleRowSelected}
          clearSelectedRows={toggleCleared}
        />
        <div>
          <div>
            <div
              style={{
                textAlign: "center",
                fontSize: "20px",
              }}
            >
              <Badge color="primary">Total money is {sum}</Badge>
            </div>
            <Button color="danger" onClick={toggle} className="mr-4">
              Add new row
            </Button>
          </div>
          <div>
            <Modal
              backdropTransition={{
                timeout: 1300,
              }}
              modalTransition={{
                timeout: 700,
              }}
              isOpen={modal}
              toggle={toggle}
            >
              <ModalHeader toggle={toggle}>Modal title</ModalHeader>
              <Form onSubmit={handleSubmit(addNewItem)}>
                <ModalBody>
                  <FormGroup>
                    <Label for="title" hidden>
                      Title
                    </Label>
                    <Input
                      innerRef={register({ required: true })}
                      name="title"
                      id="title"
                      invalid={errors.title && true}
                      placeholder="Title"
                      type="text"
                    />
                    {errors && errors.title && (
                      <FormFeedback>{errors.title.message}</FormFeedback>
                    )}
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" type="submit">
                    Submit
                  </Button>
                  <Button onClick={toggle}>Cancel</Button>
                </ModalFooter>
              </Form>
            </Modal>
          </div>
        </div>
        <ToastContainer />
      </div>
    </React.Fragment>
  )
}

export default ReactDataTable
