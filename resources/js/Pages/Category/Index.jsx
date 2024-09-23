
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import Category from "@/Components/Category/Category";

const Index = ({auth,categories}) => {

    const [isActive, setIsActive] = useState(null);

    const handleClick = (categoryId) => {
        setIsActive(prev => ((prev === categoryId ? null : categoryId)));
    }

    
    return (
        <Authenticated user={auth.user} >
            <Head title="Category" />
            <div className=" m-2 flex bg-white rounded w-1/4">
                <div className="p-2">
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
        </Authenticated>
    )

}

export default Index;