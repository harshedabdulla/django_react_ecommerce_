import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders, logout } from '../actions/userActions'
import { useHistory } from 'react-router-dom'
import { Table, Spinner } from 'react-bootstrap'
import { dateCheck } from '../components/GetDate'
import SearchBarForOrdersPage from '../components/SearchBarForOrdersPage'
import Message from '../components/Message'

function OrdersListPage() {
    let history = useHistory()
    const dispatch = useDispatch()
    const placeholderValue = "Search orders by Order ID or by Ordered Item"

    const todays_date = dateCheck(new Date().toISOString().slice(0, 10))

    const [currentDateInfo] = useState(todays_date)
    const [cloneSearchTerm, setCloneSearchTerm] = useState("")

    // login reducer
    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    // get all orders reducer
    const getAllOrdersReducer = useSelector(state => state.getAllOrdersReducer)
    const { orders, loading: loadingOrders } = getAllOrdersReducer

    // check token validation reducer
    const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer)
    const { error: tokenError } = checkTokenValidationReducer

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        } else {
            dispatch(getAllOrders())
        }
    }, [userInfo, dispatch, history])

    if (userInfo && tokenError === "Request failed with status code 401") {
        alert("Session expired, please login again.")
        dispatch(logout())
        history.push("/login")
        window.location.reload()
    }

    const handleSearchTerm = (term) => {
        setCloneSearchTerm(term)
    };

    // Sort orders by date in descending order
    const sortedOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date))

    return (
        <div>
            {loadingOrders && <span style={{ display: "flex" }}>
                <h5>Getting Orders</h5>
                <span className="ml-2">
                    <Spinner animation="border" />
                </span>
            </span>}
            {userInfo.admin && <SearchBarForOrdersPage handleSearchTerm={handleSearchTerm} placeholderValue={placeholderValue} />}
            {orders.length > 0 ?
                <Table className="mt-2" striped bordered>
                    <thead>
                        <tr className="p-3 bg-blue-400 text-white text-center">
                            <th>Serial No</th>
                            <th>Ordered Items</th> {/* Changed header to plural */}
                            <th>Date</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedOrders.filter((item) => (
                            item.products.length > 0 &&  // Only include orders with products
                            (item.id.toString().includes(cloneSearchTerm) ||
                             item.products.some(product => product.toLowerCase().includes(cloneSearchTerm))) // Check all products
                        )).map((order, idx) => (
                            <tr key={order.id} className="text-center">
                                <td>{idx + 1}</td> {/* Serial No */}
                                
                                {/* Display all products, separated by commas */}
                                <td>{order.products.join(', ')}</td> 

                                <td>{dateCheck(order.date)}</td>
                                <td>{order.cost/100} INR</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                : <Message variant="info">No orders yet.</Message>}
        </div>
    )
}

export default OrdersListPage
