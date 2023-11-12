import React, { useEffect, useState } from 'react'
import { Input } from './Input';
import { updateContactAPI } from '../api/user';
import { AxiosResponse } from 'axios';

interface ContactDetailProps {
    selectData: {
        id: string
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
    }
    onUpdateContact: (updatedContact: ContactDetailProps['selectData']) => void;
}
interface UpdateContactResponse {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    // Add other properties if necessary
}

export const ContactDetail: React.FC<ContactDetailProps> = ({ selectData, onUpdateContact }) => {
    const [edit, setEdit] = useState(false)

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');


    const updateContact = async (id: string) => {

        try {
            const body = {
                "first_name": firstName,
                "last_name": lastName,
                "email": email,
                "phone": phone,
            }
            const response: AxiosResponse<UpdateContactResponse> = await updateContactAPI({ body, id })
            onUpdateContact(response.data);
            setEdit(false)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (selectData && 'first_name' in selectData && 'last_name' in selectData && 'email' in selectData && 'phone' in selectData) {
            const { first_name, last_name, email, phone } = selectData;

            setFirstName((prevFirstName) => prevFirstName !== first_name ? first_name : prevFirstName);
            setLastName((prevLastName) => prevLastName !== last_name ? last_name : prevLastName);
            setEmail((prevEmail) => prevEmail !== email ? email : prevEmail);
            setPhone((prevPhone) => prevPhone !== phone ? phone : prevPhone);
            return () => {
            };
        }
    }, [selectData, edit]);


    if (selectData !== null) {
        return (
            <div className="contact-select-container text-2xl mx-5 my-5 border border-black px-3">
                <div className="img-container flex justify-center my-2">
                    <img src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                        className="rounded-full" alt="image full" />
                </div>
                <div className="action-container flex justify-end text-white my-2">
                    <button className={`${edit ? "hidden" : "mx-2 bg-gray-800 w-20 rounded-md"}`} onClick={() => setEdit(true)}>Edit</button>
                    <button className="mx-2 w-20 bg-gray-800 rounded-md" onClick={() => updateContact(selectData.id)}>Save</button>
                    {
                        edit ?
                            <button className="mx-2 w-20 bg-gray-800 rounded-md" onClick={() => setEdit(false)}>Cancel</button> : ''
                    }
                </div>
                <div className="info-container grid grid-cols-4 gap-y-5 my-2">
                    <div className="name">{edit ? "First Name" : "Name"}</div>
                    {
                        edit ?
                            <div className="input col-span-3">
                                <Input val={firstName} onChange={setFirstName} />

                            </div> :
                            <div className="name-val col-span-3">{selectData.first_name} {selectData.last_name}</div>

                    }
                    {
                        edit ?
                            <>
                                <div className="name">Last Name:</div>
                                <div className="input col-span-3">
                                    <Input val={lastName} onChange={setLastName} />

                                </div> </> : ''

                    }
                    <div className="email">Email:</div>
                    {
                        edit ?
                            <div className="input col-span-3">
                                <Input val={email} onChange={setEmail} />
                            </div> :
                            <div className="name-val col-span-3">{selectData.email}</div>

                    }
                    <div className="phone">Phone:</div>
                    {
                        edit ?
                            <div className="input col-span-3">
                                <Input val={phone} onChange={setPhone} />
                            </div> :
                            <div className="name-val col-span-3">{selectData.phone}</div>

                    }

                </div>
            </div>
        )
    }

}
