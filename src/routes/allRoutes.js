import StockEntry from "pages/Forms/StockEntry"
import React from "react"
import { Redirect } from "react-router-dom"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

// Stock
import Stock from "../pages/Dashboard/StockEntry"

// Forms
import FormUser from "../pages/Forms/FormUser"
import ReactForm from "../pages/Forms/ReactForm"
import Offline from "../pages/Forms/Offline"
import ReactDataTable from "../pages/Tables/ReactDataTable"

// Tasks
import Task3 from "../pages/tasks/task3"

const userRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/stockEntries", component: Stock },

  // Forms
  { path: "/form-user", component: FormUser },

  { path: "/react-form", component: ReactForm },

  { path: "/stock-entry", component: StockEntry },

  { path: "/offline", component: Offline },
  // Tables
  { path: "/react-data-table", component: ReactDataTable },

  // Task
  { path: "/task-3", component: Task3 },
  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/stock-entry" /> },
]

const authRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
]

export { userRoutes, authRoutes }
