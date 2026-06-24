'use client'

import Image from "next/image"

const ExploreBtn = () => {
  return (
    <button type="button" id="explore-btn" className="mt-7 mx-auto" onClick={() => console.log("clicked")}>
    <a href="#events">Explore Button</a>
    <Image src={"icons/arrow-down.svg"} width={24} height={24} alt="arrow down" />
    </button>
  )
}

export default ExploreBtn
