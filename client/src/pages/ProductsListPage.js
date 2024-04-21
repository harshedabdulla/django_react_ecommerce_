// ProductsListPage.js
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsList } from '../actions/productActions'
import Message from '../components/Message'
import { Spinner, Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useHistory } from 'react-router-dom'
import { CREATE_PRODUCT_RESET } from '../constants'
import Categories from '../components/Categories'
import SearchBarForProducts from '../components/SearchBarForProducts'
import bakery from '../assets/bakery.png'
import dairy from '../assets/dairy.png'
import fruits from '../assets/fruits.png'
import meat from '../assets/meat.png'
import clean from '../assets/clean.png'
import Glide from '@glidejs/glide'
import carrots from '../assets/featured/carrots.jpeg'
import cereals from '../assets/featured/cereals.jpeg'
import coffee from '../assets/featured/coffee.jpeg'
import grapes from '../assets/featured/grapes.jpeg'
import mango from '../assets/featured/mango.jpeg'
import fr from '../assets/fr.png'

const ProductsListPage = () => {
  let history = useHistory()
  let searchTerm = history.location.search
  const dispatch = useDispatch()
  const [selectedCategory, setSelectedCategory] = useState('All categories')

  // products list reducer
  const productsListReducer = useSelector((state) => state.productsListReducer)
  const { loading, error, products } = productsListReducer
  useEffect(() => {
    const slider = new Glide('.glide-01', {
      type: 'carousel',
      focusAt: 'center',
      perView: 4,
      autoplay: 3000,
      animationDuration: 700,
      gap: 8,
      classNames: {
        nav: {
          active: '[&>*]:bg-wuiSlate-700',
        },
      },
      breakpoints: {
        1024: {
          perView: 2,
        },
        640: {
          perView: 1,
        },
      },
    }).mount()

    return () => {
      slider.destroy()
    }
  }, [])
  useEffect(() => {
    dispatch(getProductsList())
    dispatch({
      type: CREATE_PRODUCT_RESET,
    })
  }, [dispatch])

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        {/* Categories */}
        <div className="flex-shrink-0">
          <Categories
            categories={[
              'Groceries',
              'Fruits and vegetables',
              'Dairy products',
              'Meat',
              'Bakery',
              'Cleaning supplies',
            ]}
            handleCategoryClick={handleCategoryClick}
          />
        </div>

        {/* Search Bar */}
        <div className="flex-grow ml-8">
          <SearchBarForProducts />
        </div>

        {/* Contact Info */}
        <div className="flex items-center ml-4">
          <div className="mr-2">
            <i className="fas fa-phone-alt"></i>
          </div>
          <div>
            <p className="text-md font-medium">+91 00000 64352</p>
            <p className="text-sm">Support 24/7</p>
          </div>
        </div>

        {/* Image */}
      </div>
      <div className="ml-60">
        <img
          src="https://i0.wp.com/www.globaltrademag.com/wp-content/uploads/2020/04/shutterstock_121120492.jpg?w=1422&ssl=1"
          alt="Your Image"
          className="w-100 h-80 mt-4"
        />
      </div>
      <div className="glide-01 relative w-full my-8">
        {/*    <!-- Slides --> */}
        <div className="overflow-hidden" data-glide-el="track">
          <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0">
            <li>
              <img src={fruits} className="m-auto w-36 pb-4" />
              <h4 className="text-center text-md">Fruits and Vegetables</h4>
            </li>
            <li>
              <img src={dairy} className="m-auto w-36 pb-4" />
              <h4 className="text-center">Dairy Products</h4>
            </li>
            <li>
              <img src={meat} className="m-auto w-36 pb-4" />
              <h4 className="text-center text-md">Meat</h4>
            </li>
            <li>
              <img src={bakery} className="m-auto w-36 pb-4" />
              <h4 className="text-center text-md">Bakery</h4>
            </li>
            <li>
              <img src={clean} className="m-auto w-36 pb-4" />
              <h4 className="text-center text-md">Cleaning Supplies</h4>
            </li>
          </ul>
        </div>
        {/*    <!-- Controls --> */}
        <div
          className="absolute left-0 top-1/2 flex h-0 w-full items-center justify-between px-4 "
          data-glide-el="controls"
        >
          <button
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-white/20 text-slate-700 transition duration-300 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
            data-glide-dir="<"
            aria-label="prev slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <title>prev slide</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
          </button>
          <button
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-white/20 text-slate-700 transition duration-300 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
            data-glide-dir=">"
            aria-label="next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <title>next slide</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Featured Products Section*/}
      <div className="items-center">
        <div>
          <h1 className="text-3xl font-bold text-center">Featured Products</h1>
          <hr className="w-16 mx-auto border-2 border-blue-500 mt-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          <div>
            <img src={grapes} alt="grapes" className="w-48 h-48 m-auto" />
            <h4 className="text-center mt-4">Grapes</h4>
            <h4 className="text-center font-bold"> ₹99</h4>
          </div>
          <div>
            <img src={carrots} alt="carrots" className="w-48 h-48 m-auto" />
            <h4 className="text-center mt-4">Carrots</h4>
            <h4 className="text-center font-bold"> ₹49</h4>
          </div>
          <div>
            <img src={mango} alt="mango" className="w-48 h-48 m-auto" />
            <h4 className="text-center mt-4">Mango</h4>
            <h4 className="text-center font-bold"> ₹79</h4>
          </div>
          <div>
            <img src={coffee} alt="coffee" className="w-48 h-48 m-auto" />
            <h4 className="text-center mt-4">Coffee</h4>
            <h4 className="text-center font-bold"> ₹199</h4>
          </div>
          <div>
            <img src={cereals} alt="cereals" className="w-48 h-48 m-auto" />
            <h4 className="text-center mt-4">Cereals</h4>
            <h4 className="text-center font-bold"> ₹99</h4>
          </div>
        </div>
      </div>
      {/* Fruits Section */}
      <div className="items-center">
        <div className="flex justify-center">
          <h1 className="text-4xl text-yellow-400 font-bold mt-4 px-4">
            FRUITS
          </h1>
          <img src={fr} alt="fruits" className="w-20 h-16 mb-12" />
        </div>
      </div>

      {error && <Message variant="danger">{error}</Message>}
      {loading && (
        <span style={{ display: 'flex' }}>
          <h5>Getting Products</h5>
          <span className="ml-2">
            <Spinner animation="border" />
          </span>
        </span>
      )}
      <div>
        <Row>
          {products
            .filter((item) =>
              selectedCategory === 'All categories'
                ? true
                : item.category === selectedCategory
            )
            .map((product, idx) => (
              <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <div className="mx-2">
                  <Product product={product} />
                </div>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  )
}

export default ProductsListPage
