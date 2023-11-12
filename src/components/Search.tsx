import React from 'react'

interface SearchProps {
  onSearch: (query: string) => void
}
export const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const onChange = (query: string) => {
    onSearch(query)
  }
  return (
    <div className='text-center'>
      <input
        className="w-[70%] h-10 px-2 border border-black rounded-md my-5 "
        type="search"
        placeholder="Search"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
