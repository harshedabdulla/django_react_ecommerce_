import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import { useHistory } from 'react-router-dom'
import SearchBarForProducts from './SearchBarForProducts'

function NavBar() {
  let history = useHistory()
  const dispatch = useDispatch()

  // login reducer
  const userLoginReducer = useSelector((state) => state.userLoginReducer)
  const { userInfo } = userLoginReducer

  // logout
  const logoutHandler = () => {
    dispatch(logout())
    history.push('/login')
    window.location.reload()
  }

  return (
    <header className="flex flex-col">
      {/* Information Strip */}
      <div className="bg-gray-300 flex justify-between py-2 text-black">
        <p className="m-0 px-2 flex items-center">
          <i className="fas fa-envelope mr-2"></i>
          <span>hello@ecommerce.app | Free shipping for orders above ₹499</span>
        </p>
        <p className="m-0 px-2 flex items-center">
          <i className="fab fa-facebook mr-3"></i>
          <i className="fab fa-twitter mr-3"></i>
          <i className="fab fa-linkedin mr-3"></i>
          <i className="fab fa-pinterest mr-3"></i>
          {/* Login/Logout */}
          {userInfo ? (
            <div>
              <NavDropdown
                className="navbar-nav text-capitalize"
                title={userInfo.username}
                id="username"
              >
                <LinkContainer to="/account">
                  <NavDropdown.Item>Account Settings</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/all-addresses/">
                  <NavDropdown.Item>Address Settings</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/stripe-card-details/">
                  <NavDropdown.Item>Card Settings</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/all-orders/">
                  <NavDropdown.Item>All Orders</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          ) : (
            <LinkContainer to="/login">
              <Nav.Link>
                <i className="fas fa-user"></i> Login
              </Nav.Link>
            </LinkContainer>
          )}
        </p>
      </div>

      {/* Navbar */}
      <Navbar bg="white" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <div className="mb-2 text-blue-500 text-4xl font-bold">
                ecommerce
                <br /> application
              </div>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto px-16 mb-8 font-bold">
              {/* Navigation Links */}
              <LinkContainer to="/">
                <Nav.Link className="hover:text-blue-600">HOME</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/">
                <Nav.Link className="hover:text-blue-600">SHOP</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/">
                <Nav.Link className="hover:text-blue-600">PAGES</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/">
                <Nav.Link className="hover:text-blue-600">CONTACT</Nav.Link>
              </LinkContainer>

              {/* New Product (Admins Only) */}
              {userInfo && userInfo.admin && (
                <LinkContainer to="/new-product/">
                  <Nav.Link>Add Product</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default NavBar