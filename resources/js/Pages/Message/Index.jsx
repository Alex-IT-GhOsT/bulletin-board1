import Category from "@/Components/Category/Category";
import Message from "@/Components/Message/Message";
import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Textarea } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";
import React, {useState} from "react";
import {Link} from "@inertiajs/react";
import CategoryLayout from "@/Layouts/CategoryLayout";



const Index = ({auth, categoryId, subCategoryId, messages, categories}) => {

    const [isActive, setIsActive] = useState(null);

    const handleClick = (categoryId) => {
        setIsActive(prev => ((prev === categoryId ? null : categoryId)));
    }

    const filterMes = messages.filter(message => (
        message.category_id == categoryId && message.sub_category_id == subCategoryId
    ));

    const {data, setData, post, processing, reset} = useForm({
        'user_id':auth.user ? auth.user.id : '',
        'category_id': categoryId,
        'sub_category_id': subCategoryId,
        'text': '',
    })

    const submit = (e) => {
        e.preventDefault();
        post(route('message.store'),{onSuccess: () => reset()});
    }

    return (
        <>
        {auth.user 
        ?
        <Authenticated user={auth.user} categories={categories}>
            <Head title="Создать обьявление"/>
            <div className="flex">
            <div className=" m-2 flex bg-white rounded w-1/4 p-2 h-1/4">
                <div>
                    <h3 className="text-lg font-semibold">Категории</h3>
                        {categories.map(category => 
                        <Category 
                            key={category.id} 
                            category={category} 
                            isActive={isActive} 
                            handleClick={handleClick} 
                        />
                    )} 
                </div>
            </div>
                <div className="w-2/4">
                {auth.user.isBan === 1 ? (
                        <div className="max-w-2xl mx-auto">Вас заблокировал Админ</div>
                    ) : (
                        <>
                            {filterMes.length > 0 ? (
                                filterMes.map(message => (
                                    <Message key={message.id} message={message} />
                                ))
                            ) : (
                                <div className="max-w-2xl mx-auto">Пока обьявлений нет</div>
                            )}
                            <div className="max-w-2xl mx-auto">
                                <form onSubmit={submit}>
                                    <Textarea
                                        value={data.text}
                                        onChange={e => setData('text', e.target.value)}
                                        placeholder="Text"
                                        onFocus
                                        className="block w-full rounded"
                                        autoFocus
                                    />
                                    <PrimaryButton className="mt-4" disabled={processing}>
                                        Разместить
                                    </PrimaryButton>
                                </form>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Authenticated>
        :
        <CategoryLayout categories={categories} >
            <Head title="Просмотр обьявлений"/>
            <div className="flex">
            <div className=" m-2 flex bg-white rounded w-1/4 p-2">
                <div className="p-2 flex flex-col items-baseline">
                    <h3 className="text-lg font-semibold">Категории</h3>
                        {categories.map(category => 
                        <Category 
                            key={category.id} 
                            category={category} 
                            isActive={isActive} 
                            handleClick={handleClick} 
                        />
                    )} 
                </div>
            </div>
                <div className="w-2/4">
                    <div>
                        {filterMes.length > 0 ? filterMes.map(message => {
                         return <Message key={message.id} message={message} />
                        }) 
                        :
                        <div className="max-w-2xl mx-auto ">Пока обьявлений нет</div>
                        }
                    </div>
                    <div>
                        Чтобы оставлять обьявления необходимо
                        <Link className="hover:text-sky-500 underline pl-1" href={route('register')}>зарегистрироваться</Link> или 
                        <Link className="hover:text-sky-500 underline pl-1" href={route('login')}>войти</Link>
                    </div>
                </div>
            </div>
        </CategoryLayout>
        }
        </>
    )
}

export default Index;