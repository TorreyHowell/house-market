import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase.config'
import Spinner from './Spinner'
import NumberFormat from 'react-number-format'

function Slider() {
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, 'listings')
      const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5))
      const querySnap = await getDocs(q)

      let listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      console.log(listings)
      setListings(listings)
    }

    fetchListings()

    setLoading(false)
  }, [])

  if (loading) return <Spinner />
  return (
    <>
      <p className="exploreHeading">Recent Listings</p>
      <Swiper
        className="swiper-container"
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {listings?.map((listing) => (
          <SwiperSlide
            key={listing.id}
            onClick={() => {
              navigate(`/category/${listing.data.type}/${listing.id}`)
            }}
          >
            <div
              style={{
                background: `url(${listing.data.imgUrls[0]}) center no-repeat`,
                backgroundSize: 'cover',
              }}
              className="swiperSlideDiv"
            >
              <p className="swiperSlideText">{listing.data.name}</p>
              <p className="swiperSlidePrice">
                <NumberFormat
                  displayType="text"
                  thousandSeparator={true}
                  prefix="$"
                  value={
                    listing.data.discountedPrice ?? listing.data.regularPrice
                  }
                />{' '}
                {listing.data.type === 'rent' && '/Month'}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
export default Slider
