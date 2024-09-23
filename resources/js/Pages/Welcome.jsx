import { Link, Head } from '@inertiajs/react';
import Category from '@/Components/Category/Category';
import { useState } from 'react';


export default function Welcome({ auth, categories }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    const [isActive, setIsActive] = useState(null);

    const handleClick = (categoryId) => {
        setIsActive(prev => ((prev === categoryId ? null : categoryId)));
    }

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-black/50 dark:bg-black dark:text-white/50">
                <div className="flex justify-center min-h-screen mx-auto">
                    <div className="flex flex-col relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="">
                            <nav className="flex justify-end gap-2 ">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className=" rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Войти
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Зарегистрироваться
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6 flex-grow ">
                            <div className='flex flex-col'>
                                <h1 className='text-7xl text-center mb-10'>Доска Объявлений</h1>
                                {!auth.user && 
                                    <div className=" m-2 bg-white rounded">
                                        <div className="p-2 grid xl:grid grid-cols-5  gap-3 lg:grid grid-cols-5 gap-3 md:flex flex-col ">
                                            
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
                                }
                                {auth.user &&
                                
                                <div className=" m-2 bg-white rounded">
                                        <div className="p-2 grid xl:grid grid-cols-5  gap-3 lg:grid grid-cols-5 gap-3 md:flex flex-col ">
                                            
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
                                
                                }
                                
                            </div>
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70 flex-shrink">
                                Golubev Aleksandr &copy; 2024
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
