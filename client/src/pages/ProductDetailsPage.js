import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteProduct,
  getProductDetails,
  addToCart,
} from '../actions/productActions'
import Message from '../components/Message'
import axios from 'axios'
import useRazorpay from 'react-razorpay'
import {
  Spinner,
  Row,
  Col,
  Container,
  Card,
  Button,
  Modal,
} from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import StarRating from '../components/StarRating' // Assuming you have a StarRating component

function ProductDetailsPage({ match }) {
  const [Razorpay] = useRazorpay()
  const dispatch = useDispatch()
  const history = useHistory()
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [userInfo, setUserInfo] = useState(null) // State to hold user info
  const [rating, setRating] = useState(0) 
  // Modal state and functions
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // Product details reducer
  const { loading, error, product } = useSelector(
    (state) => state.productDetailsReducer
  )

  // Product delete reducer
  const { success: productDeletionSuccess } = useSelector(
    (state) => state.deleteProductReducer
  )

  useEffect(() => {
    dispatch(getProductDetails(match.params.id))
  }, [dispatch, match.params.id])
  
  useEffect(async () => {
    if (productDeletionSuccess) {

      alert('Product successfully deleted.')
      history.push('/')
    }
  }, [productDeletionSuccess, history])

  useEffect(async () => {
    // Retrieve user info from localStorage when the component mounts
    const storedUserInfo = localStorage.getItem('userInfo')
    if (storedUserInfo) {
      getOwnRatings(JSON.parse(storedUserInfo), match.params.id)
      setUserInfo(JSON.parse(storedUserInfo))
      
    }
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(storedUserInfo).token}`,
      },
    }
    const response = await axios.get(`/api/product-myrating/${match.params.id}/`, config);
    console.log(response.data["rating"])
    setRating(response.data["rating"])
  }, [])

  const getOwnRatings = async (userInfo, id) =>{
    if (userInfo && product.id){
      
      
    }
  }

  const confirmDelete = () => {
    dispatch(deleteProduct(match.params.id))
    handleClose()
  }

  const handleRatingSubmit = async (rating) => {
    if (userInfo) {
      // Dispatch action to add product rating here
      console.log(`Submitting rating ${rating}`)
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const response = await axios.post(`/api/product-rate/${product.id}/`,{"rating":rating}, config);
      console.log(response)
    } else {
      // Handle user not logged in
      console.log('User not logged in')
    }
  }

  const paynow = async () => {
    try {
      if (!userInfo) {
        console.error('User not authenticated')
        // You can redirect the user to the login page or show a message here
        return
      }

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const response = await axios.post('/orders/order-create/', {}, config)
      const data = response.data

      const options = {
        key: data.razorpay_merchant_key,
        amount: '10000',
        currency: 'INR',
        name: 'ecommerce application',
        order_id: data.razorpay_order_id,
        callback_url: 'http://localhost:3000/',
      }

      const rzp1 = new Razorpay(options)
      rzp1.open()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleAddToCart = () => {
    if (!userInfo) {
      // Redirect to login page or show a message
      history.push('/login')
    } else {
      dispatch(addToCart(product.id))
      setShowSuccessMessage(true)
    }
  }

  return (
    <div>
      {/* Modal Start*/}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i
              style={{ color: '#e6e600' }}
              className="fas fa-exclamation-triangle"
            ></i>{' '}
            Delete Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this product <em>"{product.name}"</em>
          ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={confirmDelete}>
            Confirm Delete
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal End */}

      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="my-8">
          <Container>
            <Row>
              <Col md={6}>
                <Card.Img
                  variant="top"
                  src={product.image}
                  className="h-64 w-full object-contain"
                />
                {/* Product edit and delete conditions */}
                {userInfo && userInfo.admin && (
                  <div style={{ display: 'flex' }}>
                    <Button
                      variant="danger"
                      className="btn-sm button-focus-css"
                      style={{ width: '100%' }}
                      onClick={handleShow}
                    >
                      Delete Product
                    </Button>
                    <Button
                      variant="primary"
                      className="btn-sm button-focus-css ml-2"
                      onClick={() =>
                        history.push(`/product-update/${product.id}/`)
                      }
                      style={{ width: '100%' }}
                    >
                      Edit Product
                    </Button>
                  </div>
                )}
              </Col>
              <Col sm>
                <div className="font-bold text-2xl">{product.name}</div>
                <span className="text-red-600 text-2xl font-bold mt-4">
                  ₹ {product.price}
                </span>
                <div className="text-gray-600 text-sm">
                  <p>{product.description}</p>
                  <StarRating valuek={rating} onSubmit={handleRatingSubmit} />
                </div>
                {/* Add to cart button */}

                <Button
                  onClick={handleAddToCart}
                  className=" bg-blue-500 w-fit text-white py-2 border-black border-2"
                >
                  <span>ADD TO CART</span>
                </Button>
                {showSuccessMessage && (

                  <div
                    className="bg-green-400 w-fit my-4 py-2 text-center"
                    role="alert"
                  >
                    Product added to cart successfully!
                  </div>
                )}
                <Link to="/shop/cart/">
                  <Button className=" bg-blue-500 ml-2 w-fit text-white py-2 border-black border-2">
                    <span>CART</span>
                  </Button>
                </Link>
                <hr className="my-4" />
                {product.stock ? (
                  <div className="my-8">
                    <h4 className="text-xl font-bold">
                      Availability :{' '}
                      <span className="font-medium text-xl">In Stock</span>
                    </h4>
                    <h4 className="text-xl font-bold">
                      Shipping :{' '}
                      <span className="font-medium text-xl">
                        Free orders above ₹499
                      </span>
                    </h4>
                  </div>
                ) : (
                  <Message variant="danger">Out Of Stock!</Message>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  )
}

export default ProductDetailsPage
