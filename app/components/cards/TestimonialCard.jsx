import React from 'react'

export const TestimonialCard = ({ item }) => {
    return (
        <>
            <div>
                <img className='m-auto mb-4 w-[100px] h-[100px] rounded-[50%]' src={item.image} alt={item.name} />
                <span className='text-xl font-semibold mb-4 block'>{item.name}</span>
                <p className='md:w-2/2 m-auto text-base md:text-lg text-gray-600'>{item.pera}</p>
                <img className='m-auto mt-8 w-[50px] h-[50px]' src="/img/quote.png" alt="" />
            </div>
        </>
    )
}
