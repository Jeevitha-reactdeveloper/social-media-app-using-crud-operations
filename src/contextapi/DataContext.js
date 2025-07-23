import { createContext,useState,useEffect } from "react";
import {format}  from "date-fns";
import api from'../api/posts';
import { useNavigate } from "react-router-dom";


const DataContext = createContext({})

export const DataProvider = ({children}) => {
    const[posts,setPosts]  = useState([])
  const[search,setSearch] = useState('')
  const[searchResults,setsearchResults]=useState([])
  const[postTitle,setpostTitle]=useState('')
  const[postBody,setpostBody]=useState('')
  const[editTitle,seteditTitle]=useState('')
  const[editBody,seteditbody] =useState('')
  const navigate = useNavigate()


  useEffect(() =>{
    const fetchPosts = async() =>{
      try{
        const response =await api.get('/posts');
        setPosts(response.data);
      }catch(err){
        if(err.response){
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        }else{
          console.log(`Error: ${err.message}`);
        }
     }
    }
    fetchPosts();

  },[])

  useEffect(() => {
  const filteredResults = posts.filter(post =>
    ((post.title).toLowerCase().includes(search.toLowerCase())) ||   
     ((post.body).toLowerCase().includes(search.toLowerCase()) ))
    setsearchResults(
    search ? filteredResults.reverse() : posts.slice().reverse())
  
}, [posts, search]);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length -1].id+1 : 1;
    const datetime = format(new Date(),'MMMM dd,yyyy pp');
    const newpost ={id,title:postTitle,datetime,body:postBody};
    try{
    const response= await api.post('/posts',newpost);
    const allPosts =[...posts,response.data]
    setPosts(allPosts)
    setpostBody('')
    setpostTitle('')
    navigate('/');
    }
    catch(err){
          console.log(`Error: ${err.message}`);
        }
     }

  const handledelete =async(id) =>{
    try{
     await api.delete(`/posts/${id}`)
     const postslists = posts.filter(post => post.id !== id);
   setPosts(postslists)
   navigate('/');
    }catch(err){
      console.log(`Error:${err.message}`);
    }
   
  }

  const handleEdit = async(id)=>{
    const datetime = format(new Date(),'MMMM dd,yyyy pp');
    const updatedPost ={id,title:editTitle,datetime,body:editBody}
    try{
      const response = await api.put(`/posts/${id}`,updatedPost)
      setPosts(posts.map(post => post.id ===id ? {...response.data} : post));
      navigate('/')
      seteditTitle('')
      seteditbody('')
    }catch(err){
      console.log(`Error:${err.message}`)
    }
    
  

  }
 return(
    <DataContext.Provider value ={{
search,setSearch,posts,handleSubmit,postTitle,setpostTitle,postBody,setpostBody,searchResults,handleEdit,editBody,seteditbody,editTitle,seteditTitle,handledelete
    }}>
    {children}
    </DataContext.Provider>
 )
}
export default DataContext