import { useState } from "react";
import Card from "./Card";
import { useEffect } from "react";
import Lightbox from "./Lightbox";
import funnel from "../images/filter.png";
import { db } from "../fbconfig"
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const Catalogue = () => {
    const [toggle, setToggle] = useState()
    const [recipes, setRecipes] = useState([])
    const [show, setShow] = useState(false)
    const [selected, setSelected] = useState()
    const [search, setSearch] = useState()
    const [checked, setChecked] = useState()
    const recipeCollectionRef = collection(db, "recipe");

    const getRecipes = async () => {
        const data = await getDocs(recipeCollectionRef);
        setRecipes(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }

    useEffect(() => {
        getRecipes()
    }, [])

    const handleToggle = (id) => {
        if(toggle === id){
            return setToggle(null)
        }
        setToggle(id)
    }

    const handleClick = (element) => {
        setShow(true)
        setSelected(element)
    }

    const handleCheck = (val, e) => {
        setChecked(val);
        console.log(e.target.value)
    }

    const deleteRecipe = async (id) => {
        await deleteDoc(doc(db, "recipe", id));
    }

    const handleDelete = (id) => {
        deleteRecipe(id)
        setShow(false)
        getRecipes()
    }

    const filtered = recipes.filter( item => {
        return checked?.toLowerCase() === "" ? item : item.category?.includes(checked)
    }).map(recipe => {
        return <Card 
                    key={recipe.id} 
                    handleclick={()=>handleClick(recipe)} 
                    name={recipe.name} 
                    author= {recipe.author} 
                    imgSrc= {recipe.imageURL} 
                    id= {recipe.id}
                    stars= {recipe.stars}
                    />
    })

    const searched = recipes.filter(item => {
            return search?.toLowerCase() === "" ? item : item.name?.toLowerCase().includes(search)
    }).map(recipe => {
        return <Card 
                    key={recipe.id} 
                    handleclick={()=>handleClick(recipe)} 
                    name={recipe.name} 
                    author= {recipe.author} 
                    imgSrc= {recipe.imageURL} 
                    id= {recipe.id}
                    stars= {recipe.stars}
                    />
    })
    
    const cards = recipes.map(recipe => {
        return <Card 
                    key={recipe.id} 
                    handleclick={()=>handleClick(recipe)} 
                    name={recipe.name} 
                    author= {recipe.author} 
                    imgSrc= {recipe.imageURL} 
                    id= {recipe.id}
                    stars= {recipe.stars}
                    />
    })

    const uniqueIds = [];

    return ( 
        <div className="container">
            <aside>
                <div className="categories">
                    <button id="1" onClick={() => handleToggle(1)}><b>categories</b><img src={funnel} alt="fltr" /></button>
                    <ul className={toggle === 1 ? "" : 'show'}>
                        <li key={"first"}>All <input type="checkbox" checked ={checked ? false : true} onChange={()=>setChecked(null)} /> </li>
                        {
                            recipes.filter( item => {
                                const isDupulicate = uniqueIds.includes(item.category);

                                if (!isDupulicate){
                                    uniqueIds.push(item.category);
                                    return true
                                }

                                return false;
                            }).map( (item, index) => {
                                return <li key={index}>{item.category} 
                                <input 
                                    id={`cb${index+1}`} 
                                    type="checkbox" 
                                    value={item.category} 
                                    checked = {item.category === checked} 
                                    onChange={(e) => handleCheck(item.category, e)} 
                                    /></li>
                            })
                        }
                    </ul>
                </div>
            </aside>
            <div className="catalogue">
            <header>
                <input type="text" name="search" onChange={(e) => setSearch(e.target.value)} placeholder="Search" />
            </header>
            <div className="recipes">
                { search? searched : (checked ? filtered : cards) }
            </div>
            </div>
            <Lightbox 
                setShow={setShow} 
                show={show} 
                post={selected}
                handledelete={handleDelete} 
            />
        </div>
    );
}
 
export default Catalogue;