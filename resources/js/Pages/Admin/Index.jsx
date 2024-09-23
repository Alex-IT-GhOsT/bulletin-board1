import Admin from '@/Layouts/Admin';
import { Head } from '@inertiajs/react';
import User from '@/Components/User/User';


export default function Index({ auth, users }) {

    return (
        <Admin
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin</h2>}
        >
            <Head title="Admin Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg ">
                        <div className="p-6 text-gray-900  ">
                            <div className='grid lg:grid-cols-6 text-xl'>
                                <div>Id</div>
                                <div>Имя</div>
                                <div>Статус</div>
                                <div>Сообщения</div>
                                <div>Бан</div>
                            </div>
                            {users.map((user) => 
                                    <User key={user.id} user={user}/>)
                            } 
                            
                        </div>
                    </div>
                </div>
            </div>
        </Admin>
    );
}
