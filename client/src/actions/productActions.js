import {
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  CHANGE_DELIVERY_STATUS_REQUEST,
  CHANGE_DELIVERY_STATUS_SUCCESS,
  CHANGE_DELIVERY_STATUS_FAIL,
  ADD_TO_CART,
  CART_ITEMS_REQUEST,
  CART_ITEMS_SUCCESS,
  CART_ITEMS_FAIL,
} from '../constants/index'

import axios from 'axios'
import { userDetails } from './userActions'

// products list
export const getProductsList = () => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCTS_LIST_REQUEST,
    })

    // call api
    const { data } = await axios.get('/api/products/')

    dispatch({
      type: PRODUCTS_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCTS_LIST_FAIL,
      payload: error.message,
    })
  }
}

// product details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    })

    // call api
    const { data } = await axios.get(`/api/product/${id}/`)

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.message,
    })
  }
}

// create product
export const createProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST })

    const {
      userLoginReducer: { userInfo },
    } = getState()

    if (!userInfo || !userInfo.token) {
      throw new Error('User is not logged in')
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // API call
    const { data } = await axios.post('/api/product-create/', product, config)

    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}


// delete product
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST,
    })

    // login reducer
    const {
      userLoginReducer: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // api call
    const { data } = await axios.delete(`/api/product-delete/${id}/`, config)

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}

// update product
export const updateProduct = (id, product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_PRODUCT_REQUEST,
    })

    // login reducer
    const {
      userLoginReducer: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // api call
    const { data } = await axios.put(
      `/api/product-update/${id}/`,
      product,
      config
    )

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}

// change ordered product delivery status
export const changeDeliveryStatus =
  (id, product) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CHANGE_DELIVERY_STATUS_REQUEST,
      })

      // login reducer
      const {
        userLoginReducer: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      // api call
      const { data } = await axios.put(
        `/account/change-order-status/${id}/`,
        product,
        config
      )

      dispatch({
        type: CHANGE_DELIVERY_STATUS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CHANGE_DELIVERY_STATUS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      })
    }
  }

// products list by category
export const getProductsByCategory = (category) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCTS_LIST_REQUEST,
    })

    // call API with category parameter
    const { data } = await axios.get(`/api/product-category/${category}`)

    dispatch({
      type: PRODUCTS_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCTS_LIST_FAIL,
      payload: error.message,
    })
  }
}

export const getProductsBySearchTerm = (searchTerm) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCTS_LIST_REQUEST,
    })

    // Make API request to fetch products based on the search term
    const { data } = await axios.get(`/api/product-search?name=${searchTerm}`)

    dispatch({
      type: PRODUCTS_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCTS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const addToCart = (id) => async (dispatch, getState) => {
  const {
    userLoginReducer: { userInfo },
  } = getState()

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${userInfo.token}`,
    },
  }
  console.log(config)
  try {
    const response = await axios.get(`/cart/cart-add/${id}/`, config)

    dispatch({
      type: ADD_TO_CART,
      payload: response.data,
    })
  } catch (error) {
    console.error('Error adding to cart:', error)
  }
}

export const getCartItems = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_ITEMS_REQUEST,
    })

    const {
      userLoginReducer: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      params: {
        userId: userId, // Pass the userId as a query parameter
      },
    }

    const { data } = await axios.get('/cart/cart', config)
    console.log(data)
    dispatch({
      type: CART_ITEMS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    console.error('Error fetching cart items:', error)
    dispatch({
      type: CART_ITEMS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
