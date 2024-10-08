// ProductsListPage.js
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getProductsList } from '../actions/productActions'
import { CREATE_PRODUCT_RESET } from '../constants'
import { Link } from 'react-router-dom'
import bakery from '../assets/bakery.png'
import dairy from '../assets/dairy.png'
import fruits from '../assets/fruits.png'
import meat from '../assets/meat.png'
import clean from '../assets/clean.png'
import Glide from '@glidejs/glide'
import axios from 'axios'
import fr from '../assets/fr.png'

const ProductsListPage = () => {
  const dispatch = useDispatch()
  const [bestsellers, setBestsellers] = useState([])
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

    fetchTopProducts()

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



  const fetchTopProducts = async () => {
      const response = await axios.get('/api/products/top/');
      setBestsellers(response.data);
  };

  return (
    <div>
      <div className="flex justify-between items-center"></div>
      <div className="ml-60">
        <img
          src="https://i0.wp.com/www.globaltrademag.com/wp-content/uploads/2020/04/shutterstock_121120492.jpg?w=1422&ssl=1"
          alt="grocery"
          className="w-100 h-80 mt-4"
        />
      </div>
      <div className="glide-01 relative w-full my-8">
        {/*    <!-- Slides --> */}
        <div className="overflow-hidden" data-glide-el="track">
          <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0">
            <li>
              <img src={fruits} alt="fruits" className="m-auto w-36 pb-4" />
              <h4 className="text-center text-md">Fruits and Vegetables</h4>
            </li>
            <li>
              <img src={dairy} alt="dairy" className="m-auto w-36 pb-4" />
              <h4 className="text-center">Dairy Products</h4>
            </li>
            <li>
              <img src={meat} alt="meat" className="m-auto w-36 pb-4" />
              <h4 className="text-center text-md">Meat</h4>
            </li>
            <li>
              <img src={bakery} alt="bakery" className="m-auto w-36 pb-4" />
              <h4 className="text-center text-md">Bakery</h4>
            </li>
            <li>
              <img src={clean} alt="clean" className="m-auto w-36 pb-4" />
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
          <h1 className="text-3xl font-bold text-center">Bestsellers</h1>
          <hr className="w-16 mx-auto border-2 border-blue-500 mt-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
        {bestsellers.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className="border p-2 hover:shadow-lg rounded-sm" style={{textDecoration:'none'}}>
          <div className="">
          <img src={product.image} alt="grapes" className="w-48 h-48 m-auto" />
          <h4 className="text-center mt-4">{product.name}</h4>
          <h4 className="text-center font-bold"> ₹{product.price}</h4>
          </div>
        </Link>
        ))}
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
    </div>
  )
}

export default ProductsListPage
