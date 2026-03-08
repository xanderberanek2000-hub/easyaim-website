/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Navbar } from "./components/layout/navbar"
import { Footer } from "./components/layout/footer"
import { Home } from "./pages/home"
import { Shop } from "./pages/shop"
import { Product } from "./pages/product"
import { Checkout } from "./pages/checkout"
import { Dashboard } from "./pages/dashboard"
import { Support } from "./pages/support"
import { Status } from "./pages/status"
import { Admin } from "./pages/admin"

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/checkout/:planId" element={<Checkout />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/support" element={<Support />} />
            <Route path="/status" element={<Status />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
