
async function fetchCategories() {
 
    try{
        // const response = await fetch("http://localhost:3000/api/v1/products/categories");
        const response = await fetch("https://api.mystickart.online/api/v1/products/categories");
        if(!response.ok){
            throw new Error("unable to fetch categories");
        }
        return await response.json();
    }catch(e){
        console.log(e);
    }

}

export default fetchCategories