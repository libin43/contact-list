import React from 'react'
import { FaUser, FaPhone } from 'react-icons/fa';

interface ListProps{
    props: [{
        id: string
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
    }]
    onClick:(data: object)=> void
}   

export const List: React.FC<ListProps> = ({props, onClick}) => {

    const onListClick=(item: object)=>{
        console.log(item,'clicked item');
        onClick(item)
    }
    
  return (
    <>
    {
        props.map((data, index)=>(
            <li key={index} onClick={()=>onListClick(data)} className="bg-slate-800 text-white list-none rounded-md mx-5 my-5 cursor-pointer">
            <div className="item-container h-24 grid grid-cols-3 gap-4 items-center px-2 py-2">
                <div className="img-container hidden xl:block">
                    <img src="" alt="img" />
                </div>
                <div className="name-container flex items-center">
                    <div className="icon-container mr-3 ">
                <FaUser/>
                    </div>
                    <div className="xl:text-2xl xl:pl-0 ">{data.first_name}<span className="ml-2">{data.last_name}</span></div>
                </div>
                <div className="phone-container flex items-center">
                <div className="icon-container pl-16 pr-5 ">
                <FaPhone/>
                    </div>
                    <div className="">{data.phone||'Null'}</div>
                </div>
            </div>
        </li>
        ))
    }
    </>

  )
}
