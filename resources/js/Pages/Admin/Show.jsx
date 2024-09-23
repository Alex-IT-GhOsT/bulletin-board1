import Admin from '@/Layouts/Admin';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';


export default function Show({ auth, message }) {

    const { data, setData, patch, delete: destroy, processing } = useForm({
        'user_id': message.user_id || '',
        'category_id': message.category_id || '',
        'sub_category_id': message.sub_category_id || '',
        'text': message.text || ''
    });
    
    const [isEdit, setIsEdit] = useState(false);
    const [currentMessage, setCurrentMessage] = useState('');

    const submitDelete = (e) => {
        e.preventDefault();
        destroy(route('admin.delete'));
    }

    const submitEdit = (e) => {
        e.preventDefault();
    }

    const handleEditClick = (user, id) => {
            setCurrentMessage(id)
            setData({
                'user_id': user.user_id,
                'category_id': user.category_id,
                'sub_category_id': user.sub_category_id,
                'text': user.text
            });
            setIsEdit(true); 
    }
 
    const handleSaveClick = (data,id) => {
        setData({
            'user_id': data.user_id,
            'category_id': data.category_id,
            'sub_category_id': data.sub_category_id,
            'text': data.text
        });
        setIsEdit(false);

        patch(route('admin.message.update'),{data});
    } 

    return (
        <Admin
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin</h2>}
        >
            <Head title="Admin Dashboard"/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-5">
                        <div className="text-gray-900 grid grid-cols-6 mb-6">
                            <div className='text-xl'>Имя</div>
                            <div className='text-xl'>Категории</div>
                            <div className='text-xl'>Подкатегории</div>
                            <div className='text-xl'>Сообщения</div>
                            <div className='text-xl col-span-2 flex justify-center'>Функции</div>
                        </div>
                        {message.map((user) => 
                        <div key={user.id} className='grid grid-cols-6 mb-2 last:mb-0'>
                            <div>{user.user.name}</div>
                            <div>{user.category.name}</div>
                            <div>{user.subcategory.name}</div>
                            {currentMessage === user.id && isEdit ?
                                <textarea
                                    type='text' 
                                    value={data.text}
                                    onChange={(e) => setData('text', e.target.value) }
                                />
                                :
                                <div>{currentMessage === user.id && data.text !== '' ? data.text : user.text}</div>
                            }
                            <div className='flex justify-center'>
                                <form onSubmit={submitEdit}>
                                    <button
                                    type='submit'
                                    disabled={processing}
                                    onClick={() => currentMessage === user.id && isEdit ? handleSaveClick(data,user.id) : handleEditClick(user,user.id)}
                                    className={currentMessage === user.id && isEdit ? 'p-2 rounded bg-green-500 text-white' : 'p-2 rounded bg-yellow-500 text-white' }>
                                        {currentMessage === user.id && isEdit ? 'Сохранить' : 'Редактировать'}
                                    </button>
                                </form>
                            </div>
                            <div className='flex justify-center'>
                                <form onSubmit={submitDelete}> 
                                    <button
                                    type='submit'
                                    disabled={processing}
                                    onClick={() => setData({'user_id': user.user_id,'category_id':user.category_id, 'sub_category_id': user.sub_category_id})}
                                    className='p-2 rounded bg-red-500 text-white'>Удалить</button>
                                </form>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </Admin>
    );
}
