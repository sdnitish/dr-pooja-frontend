import React from 'react'
import {
  FaFacebookF,
  FaYoutube,
  FaPinterestP,
  FaInstagram
} from "react-icons/fa";
import { FaXTwitter , FaWhatsapp } from "react-icons/fa6";

const SocialIcon = ({ siteInfo }) => {
    return (
        <>
            <a href={siteInfo?.facebook} target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="cursor-pointer hover:opacity-80" />
            </a>
            <a href={siteInfo?.instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram className="cursor-pointer hover:opacity-80" />
            </a>
            <a href={siteInfo?.twitter} target="_blank" rel="noopener noreferrer">
                <FaXTwitter className="cursor-pointer hover:opacity-80" />
            </a>
            <a href={siteInfo?.youtube} target="_blank" rel="noopener noreferrer">
                <FaYoutube className="cursor-pointer hover:opacity-80" />
            </a>
            <a href={`https://api.whatsapp.com/send?phone=${siteInfo?.whatsapp}&text=Enquiry`} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="cursor-pointer hover:opacity-80" />
            </a>
            {/* <a href={siteInfo?.pinterest} target="_blank" rel="noopener noreferrer">
                <FaPinterestP className="cursor-pointer hover:opacity-80" />
            </a> */}
        </>
    )
}

export default SocialIcon