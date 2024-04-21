import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { register } from '../actions/userActions'
import Message from '../components/Message'

function RegisterPage({ history, variant }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  // reducer
  const userRegisterReducer = useSelector((state) => state.userRegisterReducer)
  const { error, userInfo } = userRegisterReducer

  useEffect(() => {
    if (userInfo) {
      history.push('/') // homepage
    }
  }, [history, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match!')
    } else {
      dispatch(register(username, email, password))
    }
  }

  return (
    <div>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1 className="font-bold text-center text-2xl">Sign Up</h1>
          <h1 className="text-center text-xl">Register</h1>
          <h1 className="text-center text-gray-600">
            Please enter your details to register
          </h1>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Your Fullname*</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your user name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address*</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Create Password*</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="passwordConfirm">
              <Form.Label>Confirm Password*</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type="submit"
              className="align-center bg-blue-600 text-white"
            >
              REGISTER YOUR ACCOUNT
            </Button>
          </Form>

          <Row className="py-3">
            <Col>
              Already have an account?
              <Link to={`/login`}> Login</Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default RegisterPage
