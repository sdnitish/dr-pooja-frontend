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
            {
                siteInfo?.facebook && <a href={siteInfo?.facebook} target="_blank" className='w-8 h-8 rounded-full flex items-center justify-center bg-blue-800' rel="noopener noreferrer">
                    <FaFacebookF className="cursor-pointer hover:opacity-80 text-white" />
                </a>
            }
            {
                siteInfo?.instagram && <a href={siteInfo?.instagram} className='w-8 h-8 rounded-full flex items-center justify-center bg-pink-800' target="_blank" rel="noopener noreferrer">
                <FaInstagram className="cursor-pointer hover:opacity-80 text-white" />
            </a>
            }
            {
                siteInfo?.twitter && <a href={siteInfo?.twitter} className='w-8 h-8 rounded-full flex items-center justify-center bg-black' target="_blank" rel="noopener noreferrer">
                    <FaXTwitter className="cursor-pointer hover:opacity-80 text-white" />
                </a>
            }
            {
                siteInfo?.youtube && <a href={siteInfo?.youtube} className='w-8 h-8 rounded-full flex items-center justify-center bg-red-600' target="_blank" rel="noopener noreferrer">
                    <FaYoutube className="cursor-pointer hover:opacity-80 text-white" />
                </a>
            }
            {
                siteInfo?.whatsapp && <a href={`https://api.whatsapp.com/send?phone=${siteInfo?.whatsapp}&text=Enquiry`} className='w-8 h-8 rounded-full flex items-center justify-center bg-green-500' target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp className="cursor-pointer hover:opacity-80 text-white" />
                </a>
            }
        </>
    )
}

export default SocialIcon