import { useEffect } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { db } from "../fbconfig"
import { doc, getDoc, updateDoc } from "firebase/firestore";


const Update = () => {
    const { id } = useParams()
    const [formData, setFormData] = useState()
    const history = useHistory()

    const getRecipe = async () => {
        const result = await getDoc(doc(db, "recipe", id));
        setFormData({...result.data()})
    }
    
    useEffect(() => {
        getRecipe()
    }, [])
    

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevFormData =>{
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    const updateRecipe = async (id) => {
        await updateDoc(doc(doc(db, "recipe", id)), {...formData})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateRecipe(id)
        .then(res => {
            console.log(res)
            history.push('/')
        })
        .catch(err => console.log(err)) 
        }

    return (
        <>
        {formData && 
        <div className="formCard">
        <h1>Update Your Recipe</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} /> 
            <label htmlFor="imageURL">Image Src</label>
            <input type="text" name="imageURL" value={formData.imageURL} onChange={handleChange}/>
            <label htmlFor="steps">Steps</label>
            <textarea name="steps" id="message" value={formData.steps} cols="30" rows="4" onChange={handleChange}></textarea>
            <label htmlFor="category">Category</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} />
            <label htmlFor="author">Author Name</label>
            <input type="text" name="author" value={formData.author} onChange={handleChange} />
            <button onClick={handleSubmit}>Submit</button>
        </form>
        </div>
        }
        </>
    );
}
 
export default Update;