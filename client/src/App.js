import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProductListPage from './pages/ProductsListPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import CheckoutPage from './pages/CheckoutPage'
import NavBar from './components/Navbar'
import PaymentStatus from './components/PaymentStatus'
import Login from './pages/LoginPage'
import Register from './pages/RegisterPage'
import CardUpdatePage from './pages/CardUpdatePage'
import CardDetailsPage from './pages/CardDetailsPage'
import AccountPage from './pages/AccountPage'
import AccountUpdatePage from './pages/AccountUpdatePage'
import DeleteUserAccountPage from './pages/DeleteUserAccountPage'
import AllAddressesOfUserPage from './pages/AllAddressesOfUserPage'
import AddressUpdatePage from './pages/AddressUpdatePage'
import OrdersListPage from './pages/OrdersListPage'
import ProductCreatePage from './pages/ProductCreatePage'
import ProductUpdatePage from './pages/ProductUpdatePage'
import NotFound from './pages/NotFoundPage'
import Footer from './components/Footer'
import ShopProducts from './pages/ShopProducts'
import GroceriesPage from './pages/GroceriesPage'
import FruitsPage from './pages/FruitsPage'
import BakeryPage from './pages/BakeryPage'
import CleanPage from './pages/CleanPage'
import MeatPage from './pages/MeatPage'
import DairyPage from './pages/DairyPage'
import CartItem from './pages/CartItem'
import SearchBarForProducts from './components/SearchBarForProducts'
import SearchResultPage from './components/SearchResultPage'
import CheckoutProductsPage from './pages/CheckoutProductsPage'
import ContactUs from './pages/ContactUs'
import PaymentSuccessPage from './pages/PaymentSuccessPage'

const App = () => {
  return (
    <div>
      <Router>
        <NavBar />
        <div className="container mt-4">
          <Switch>
            <Route path="/" component={ProductListPage} exact />
            <Route path="/new-product/" component={ProductCreatePage} exact />
            <Route path="/product/:id/" component={ProductDetailsPage} exact />
            <Route path="/shop/" component={ShopProducts} exact />
            <Route path="/shop/Groceries/" component={GroceriesPage} exact />
            <Route path="/search" component={SearchBarForProducts} exact />
            <Route path="/search-results" component={SearchResultPage} exact />
            <Route path="/checkout/" component={CheckoutPage} exact />
            <Route
              path="/shop/Fruits-and-vegetables"
              component={FruitsPage}
              exact
            />
            <Route path="/shop/Dairy-products" component={DairyPage} exact />
            <Route path="/shop/Bakery/" component={BakeryPage} exact />
            <Route path="/shop/Meat/" component={MeatPage} exact />
            <Route
              path="/shop/Cleaning-supplies/"
              component={CleanPage}
              exact
            />
            <Route path="/shop/cart/" component={CartItem} exact />

            <Route
              path="/product-update/:id/"
              component={ProductUpdatePage}
              exact
            />
            <Route
              path="/product/:id/checkout/"
              component={CheckoutPage}
              exact
            />
            <Route
              path="/product/checkout/"
              component={CheckoutProductsPage}
              exact
            />

            <Route path="/contactus/" component={ContactUs} exact />
            <Route path="/payment-status" component={PaymentStatus} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} exact />
            <Route path="/account" component={AccountPage} exact />
            <Route
              path="/account/update/"
              component={AccountUpdatePage}
              exact
            />
            <Route
              path="/account/delete/"
              component={DeleteUserAccountPage}
              exact
            />
            <Route
              path="/stripe-card-details"
              component={CardDetailsPage}
              exact
            />
            <Route
              path="/stripe-card-update"
              component={CardUpdatePage}
              exact
            />
            <Route
              path="/all-addresses/"
              component={AllAddressesOfUserPage}
              exact
            />
            <Route
              path="/all-addresses/:id/"
              component={AddressUpdatePage}
              exact
            />
            <Route
              path="/paymentsuccess/"
              component={PaymentSuccessPage}
              exact
            />
            <Route path="/all-orders/" component={OrdersListPage} exact />
            <Route path="" component={NotFound} exact />
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  )
}

export default App
