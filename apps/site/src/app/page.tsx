'use client'

import Contribute from '@/components/landing/Contribute'
import Features from '@/components/landing/Features'
import Footer from '@/components/landing/Footer'
import Header from '@/components/landing/Header'
import Hero from '@/components/landing/Hero'
import Install from '@/components/landing/Install'
import Showcase from '@/components/landing/Showcase'
import Starfield from '@/components/landing/Starfield'

import './landing.css'

export default function HomePage() {
    return (
        <div className="lw">
            <Starfield />
            <Header />
            <main>
                <Hero />
                <Showcase />
                <Features />
                <Install />
                <Contribute />
            </main>
            <Footer />
        </div>
    )
}
