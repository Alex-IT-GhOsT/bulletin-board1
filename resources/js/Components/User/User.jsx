import React, { useState } from "react";
import PrimaryButton from "../PrimaryButton";
import { Link, useForm } from "@inertiajs/react";



const User = ({user}) => {

    const [show, setShow] = useState(false);

    console.log(user.messages.length)
   
    const {data, setData ,processing,patch} = useForm({
        'user_id' : '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('admin.update'),{user_id: data.user_id});
    }


    return (
            <div className="grid grid-cols-6 mb-4 last:mb-0 ">
                <div className="">{user.id}</div>
                <div>{user.name}</div>
                <div>{user.role }</div>
                <div>
                    <Link href={route(('show.message'),{user_id: user.id})}>
                        <PrimaryButton disabled={user.role === 'admin'} onClick={() => setShow(!show)}>Show ({user.messages.length})</PrimaryButton>
                    </Link></div>
                <div className={user.isBan == 0 ? 'text-green-500' : 'text-red-500'}>{user.isBan == 0 ? 'не забанен' : 'забанен'}</div>
                <div>
                    <form onSubmit={submit}>
                        {user.role !== 'admin' ?
                        <PrimaryButton disabled={processing} onClick={() => setData('user_id',user.id)} 
                        className="bg-red-400 hover:bg-red-600">{user.isBan == 0 ? 'забанить' : 'разбанить'}</PrimaryButton>
                        :
                        <PrimaryButton disabled
                        className="bg-red-400 hover:bg-red-600">забанить</PrimaryButton>
                        }
                    </form>
                </div>
            </div>
               
    )

}

export default User;