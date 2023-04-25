import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../fbconfig"
import { collection, getDocs, addDoc } from "firebase/firestore";

const Create = () => {
    const [recipes, setRecipes] = useState([])
    const [formData, setFormData] = useState(
        {
            name:"",
            imageURL:"",
            steps:"",
            category:"",
            author:"",
        })

    const history = useHistory()
    const recipeCollectionRef = collection(db, "recipe");


    const getRecipes = async () => {
        const data = await getDocs(recipeCollectionRef);
        setRecipes(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }

    useEffect(() => {
        getRecipes();
    }, [])

    const categories = recipes?.map(item => {return item.category})

        const handleChange = (e) => {
            const {name, value} = e.target;
            setFormData(prevFormData =>{
                return {
                    ...prevFormData,
                    [name]: value
                }
            })
        }

        const createRecipe = async () => {
            let tmp = formData.steps.split("\n");
            await addDoc(recipeCollectionRef, {...formData, steps:tmp})
        }

        const handleSubmit = (e) => {
            e.preventDefault()
            if(categories.includes(formData.category)){
                alert('This category already exists')
            }
            createRecipe()
            .then(res => {
                console.log(res)
                history.push('/')
            })
            .catch(err => console.log(err))
            
            
        }

    return (
        <div className="formCard">
        <h1>Create Your Recipe</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} /> 
            <label htmlFor="imageURL">Image Src</label>
            <input type="text" name="imageURL" value={formData.imageURL} onChange={handleChange}/>
            <label htmlFor="steps">Steps</label>
            <textarea 
                name="steps" 
                id="message" 
                value={formData.steps} 
                cols="30" rows="4"  
                placeholder="boil water.
                            slice the carrots.
                            ..." 
                onChange={handleChange}></textarea>
            <label htmlFor="category">Category</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} />
            <label htmlFor="author">Author Name</label>
            <input type="text" name="author" value={formData.author} onChange={handleChange} />
            <button onClick={handleSubmit}>Submit</button>
        </form>
        </div>
    );
}
 
export default Create;