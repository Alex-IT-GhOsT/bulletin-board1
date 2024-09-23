import { Link } from "@inertiajs/react";
import React from "react";

const Subcategory = ({subcategory, categoriesId, }) => {
   
    return (
        <div className="hover:bg-gray-200 " >
            <Link className="p-2"
             href={route('message.index',{category:categoriesId, subcategoryId: subcategory.id})}
             onClick={(e) => {e.stopPropagation()}}
             >{subcategory.name}</Link>
            
        </div>
    )
} 

export default Subcategory;