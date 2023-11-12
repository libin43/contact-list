import React from 'react'

interface InputProps{
    val: string|null;
    onChange: (newVal: string) => void
}
export const Input: React.FC<InputProps>= ({val, onChange})=> {    

  return (
    <input type="text" className="bg-black text-white px-1 mx-2 my-1 xl:w-[80%] w-60" value={val || ''} onChange={(e)=>onChange(e.target.value)} />
  )
}
