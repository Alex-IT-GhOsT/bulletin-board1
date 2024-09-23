import React, { useState } from "react";
import Subcategory from "./SubCategory";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCar,faLaptop, faShoppingBag,faBusinessTime } from '@fortawesome/free-solid-svg-icons';


const Category = ({category,isActive,handleClick}) => {

   const [categoriesId, setCategoriesId] = useState({
    'categoryId' : '',
   });

   const categoriesIcon = [faHome, faCar,faLaptop, faShoppingBag,faBusinessTime]
   const isCategoryActive = isActive === category.id;

    return (
        <div className="cursor-pointer flex flex-col align-baseline" onClick={() => {handleClick(category.id); 
            setCategoriesId(prevState => ({
            ...prevState,
            categoryId: category.id
        })
        );}}>
            
            <div className={`${isCategoryActive ? "bg-gray-200 text-gray-500 font-bold " : 'hover:bg-gray-200 hover:text-gray-500 hover:font-bold'}`}>          
                <FontAwesomeIcon icon={categoriesIcon[category.id - 1]} className="mr-2 " />
                    {category.name}
            </div> 
            

        
        {isCategoryActive  && category.subcategories.map(subcategory => 
            <Subcategory key={subcategory.id} subcategory={subcategory} categoriesId={categoriesId}   />
        )}

        </div>
    )
}

export default Category;

