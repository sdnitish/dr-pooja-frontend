import React from 'react'
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaPinterestP,
} from "react-icons/fa";

const SocialIcon = () => {
    return (
        <>
            <FaFacebookF className="cursor-pointer hover:opacity-80" />
            <FaTwitter className="cursor-pointer hover:opacity-80" />
            <FaYoutube className="cursor-pointer hover:opacity-80" />
            <FaPinterestP className="cursor-pointer hover:opacity-80" />
        </>
    )
}

export default SocialIcon