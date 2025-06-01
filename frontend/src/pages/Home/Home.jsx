import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Banner from '../../components/Banner/Banner'
import SpecialOffer from '../../components/SpecialOffer/SpecialOffer'
import AboutHome from '../../components/AboutHome/AboutHome'
import OurMenuHome from '../../components/OurMenuHome/OurMenuHome'
import Footer from '../../components/Footer/Footer'
import Chatbot from '../../components/Chatbot/Chatbot'

const Home = () => {
    return (
        <>
            <Navbar />
            <Banner />
            <SpecialOffer />
            <Chatbot />
            <AboutHome />
            <OurMenuHome />
            <Footer />
        </>
    )
}

export default Home