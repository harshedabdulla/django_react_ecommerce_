import React, { useEffect } from 'react'
import Glide from '@glidejs/glide'
import grapes from '../assets/featured/grapes.jpeg'
import orange from '../assets/hot/orange.jpeg'
import mango from '../assets/featured/mango.jpeg'

export default function CarouselIndicatorsInside() {
  useEffect(() => {
    const slider = new Glide('.glide-02', {
      type: 'carousel',
      focusAt: 'center',
      perView: 3,
      autoplay: 3500,
      animationDuration: 700,
      gap: 32,
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

  return (
    <>
      {/*<!-- Component: Carousel with indicators inside --> */}
      <div className="glide-02 relative w-full my-4">
        {/*    <!-- Slides --> */}
        <div className="overflow-hidden" data-glide-el="track">
          <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0">
            <li>
              <img
                src="https://fruitonix.com/wp-content/uploads/2023/09/image-14-583x470.png?ezimgfmt=rs%3Adevice%2Frscb2-1"
                className="m-auto w-full h-60 "
              />
              <h4 className="text-center">Pear</h4>
              <h4 className="text-center text-sm font-bold"> ₹ 79.00</h4>
            </li>
            <li>
              <img src={grapes} className="m-auto w-full h-60" />
              <h4 className="text-center">Grapes</h4>
              <h4 className="text-center text-sm font-bold"> ₹ 79.99</h4>
            </li>
            <li>
              <img src={orange} className="m-auto  w-full h-60" />
              <h4 className="text-center">Oranges</h4>
              <h4 className="text-center text-sm font-bold"> ₹ 120.00</h4>
            </li>
            <li>
              <img src={mango} className="m-auto w-full h-60" />
              <h4 className="text-center">Mangoes</h4>
              <h4 className="text-center text-sm font-bold"> ₹ 99.99</h4>
            </li>
          </ul>
        </div>
        {/*    <!-- Indicators --> */}
        <div
          className="absolute bottom-0 flex w-full items-center justify-center gap-2 mt-8"
          data-glide-el="controls[nav]"
        >
          <button
            className="group p-4"
            data-glide-dir="=0"
            aria-label="goto slide 1"
          >
            <span className="block h-2 w-2 rounded-full bg-white/20 ring-1 ring-slate-700 transition-colors duration-300 focus:outline-none"></span>
          </button>
          <button
            className="group p-4"
            data-glide-dir="=1"
            aria-label="goto slide 2"
          >
            <span className="block h-2 w-2 rounded-full bg-white/20 ring-1 ring-slate-700 transition-colors duration-300 focus:outline-none"></span>
          </button>
          <button
            className="group p-4"
            data-glide-dir="=2"
            aria-label="goto slide 3"
          >
            <span className="block h-2 w-2 rounded-full bg-white/20 ring-1 ring-slate-700 transition-colors duration-300 focus:outline-none"></span>
          </button>
          <button
            className="group p-4"
            data-glide-dir="=3"
            aria-label="goto slide 4"
          >
            <span className="block h-2 w-2 rounded-full bg-white/20 ring-1 ring-slate-700 transition-colors duration-300 focus:outline-none"></span>
          </button>
        </div>
      </div>
      {/*<!-- End Carousel with indicators inside --> */}
    </>
  )
}
