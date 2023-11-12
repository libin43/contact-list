import API from "./index";

interface GetContactsAPIParams{
    page: number;
    limit: number;
}

interface GetFilterContactsAPIParams{
    searchQuery: string;
    page: number;
    limit: number;
}

interface UpdateContactAPIParams{
    body: {
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
      };
      id: string;
}

const getContactsAPI = ({page, limit}: GetContactsAPIParams) => API.get(`/contacts?_page=${page}&_limit=${limit}`)
const getFilterContactsAPI = ({searchQuery, page, limit}: GetFilterContactsAPIParams) => API.get(`/contacts?q=${searchQuery}&_page=${page}&_limit=${limit}`)
const updateContactAPI = ({body, id}: UpdateContactAPIParams) => API.put(`/contacts/${id}`, body)

export {
    getContactsAPI,
    getFilterContactsAPI,
    updateContactAPI,
}