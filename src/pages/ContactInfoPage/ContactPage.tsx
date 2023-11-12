import React, { useState, useEffect, useRef } from 'react'
import { Navbar } from '../../components/Navbar'
import { Search } from '../../components/Search'
import { List } from '../../components/List'
import { ContactDetail } from '../../components/ContactDetail'
import { getContactsAPI, getFilterContactsAPI } from '../../api/user'
import { Pagination } from '../../components/Pagination'



export const ContactPage:React.FC = () => {
    console.count('Contact page called');
    
    const [data, setData] = useState<[] | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchData, setSearchData] = useState<[] | null>(null)
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [searchCurrentPage, setSearchCurrentPage] = useState(1)
    const [limit] = useState(10); // Adjust as needed
    // let currentPage = 1
    const [pageCount, setPageCount] = useState<number>(0)
    const [searchPageCount, setSearchPageCount] = useState<number|undefined>(undefined)

    const [selectData, setSelectData] = useState<object|null>(null)

    const rightContainerRef = useRef<HTMLDivElement | null>(null);

  // Callback function to update the selected contact
  const updateSelectedContact = (updatedContact: ContactDetailProps['selectData']) => {
    console.log('fn called');
    
    console.log(updatedContact,'update contact');
    
    setSelectData(updatedContact);
  };

    const allContactFetch =async (page: number, limit: number)=>{
        try{
            
            const response = await getContactsAPI({page, limit})
            const newData = response.data
            console.log('called api got resp');

            setData(newData)
            const total: number = response?.headers?.get('X-Total-Count');
            console.log(total);
            const count = Math.ceil((total)/(limit))
            setPageCount(count)
            
            
            console.log(response, 'data in contact page');
        } catch(error){
            console.log(error);
        }
    }

    const filterContactFetch =async (searchQuery: string, page: number, limit: number) => {
        try{
            
            const response = await getFilterContactsAPI({searchQuery, page, limit})
            const filterData = response.data
            
            setSearchData(filterData)
            const total: number = response?.headers?.get('X-Total-Count');
            const count = Math.ceil((total)/(limit))
            
            setSearchPageCount(count)
            
        } catch(error){
            console.log(error);
        }
    }

    const onPageChange=(page: number)=>{
        if(searchQuery!==''){
            setSearchCurrentPage(page)
        }
        else{
            console.log('fetch page',page);
            setCurrentPage(page)
        }
        // allContactFetch(page, limit)
    }


    const onSearch=(query: string)=>{
        console.log(query,'onsearch');
        setSearchQuery(query)
        
    }

    const onClick=(data: object)=>{
        console.log(data,'data in page');
        setSelectData(data)
    }
    
    // useEffect(()=>{
    //     allContactFetch(currentPage, limit)
    // },[currentPage, limit])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (
            rightContainerRef.current &&
            !rightContainerRef.current.contains(event.target as Node)
          ) {
            // Clicked outside the right container, close or hide it
            setSelectData(null);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

    useEffect(() => {
        console.log('call in use effect');
        
        if (searchQuery && searchQuery.trim() !== '') {
            console.log('search fetch');
            
          // Fetch filtered contacts when there is an active search query
          filterContactFetch(searchQuery, searchCurrentPage, limit);
        } else {
          // Fetch all contacts when there is no active search query
          console.log('all fetch');
          
          setSearchData(null)
          setSearchPageCount(0)
          allContactFetch(currentPage, limit);
        }
      }, [currentPage, limit, searchQuery, searchCurrentPage, selectData]);

      const renderData = searchData ?? data
      
    if(renderData){
        return (
            <>
            <div className="navbar-container">
                <Navbar/>
            </div>
            <div className='contact-page-container flex'>
                <div className={`left-container ${!selectData? 'w-[100%]': 'xl:w-[50%] md:w-[100%]'}`}>
                    <div className="list-container">
                        <Search onSearch={onSearch}/>
        
                        <List props={renderData} onClick={onClick}/>
                    </div>
                    <div className="pageination-container">
                        <Pagination pageCount={pageCount} searchPageCount={searchPageCount} onPageChange={onPageChange}/>
                    </div>
                </div>
                <div    ref={rightContainerRef} className={` right-container ${!selectData? 'xl:-right-80 xl:top-24  top-52': 'xl:w-[50%] xl:right-0   w-[100%] h-[100%]  top-24 bg-white duration-700 fixed'}`}>
                    <div className="detail-container">
                        <ContactDetail selectData={selectData} onUpdateContact={updateSelectedContact}/>
                    </div>
                </div>
            </div>
            </>
          )
    }

}
