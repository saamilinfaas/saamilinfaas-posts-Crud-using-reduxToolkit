import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

/* const initialState = [
    {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        "date": sub(new Date(),{minutes:5}).toISOString()
    },
    {
        "userId": 1,
        "id": 2,
        "title": "qui est esse",
        "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
        "date": sub(new Date(),{minutes:10}).toISOString()
    },
    {
        "userId": 1,
        "id": 3,
        "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
        "date": sub(new Date(),{minutes:15}).toISOString()
    },
] */

    const initialState = {
        posts:[],
        status:"idle",
        error: null
    }

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = createAsyncThunk("posts/fetchPosts",async ()=>{
    const response = await axios.get(POSTS_URL);
    return response.data;
});





export const postsSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{
        addPost(state,action){
            const {title,body,userId} =action.payload;
            const date = new Date().toISOString();
            const id = nanoid();

            const post = {
                userId,
                id,
                title,
                body,
                date,
                reactions:{
                    thumbsUp:0,
                    wow:0,
                    heart:0,
                    rocket:0,
                    coffee:0
                }
            } 
            state.posts.push(post);
            
        },
        addReaction(state,action){
            const {post,name} = action.payload;
            state.posts.filter(spost=>spost.id == post.id)[0].reactions[name]++;
        },
    },
    extraReducers(builder){
        builder
        .addCase(fetchPosts.pending,(state,action)=>{
            state.status = 'loading'
        })
        .addCase(fetchPosts.fulfilled,(state,action)=>{
            state.status = 'succeeded';
            let min = 1;
            const loadedPosts =  action.payload.map(post=>{
                post.date = sub(new Date(),{minutes:min++}).toISOString();
                post.reactions = {
                    thumbsUp:0,
                    wow:0,
                    heart:0,
                    rocket:0,
                    coffee:0
                    
                };
                return post;
            }); 
            console.log(loadedPosts)           
            state.posts = state.posts.concat(loadedPosts);            
        })
        .addCase(fetchPosts.rejected,(state,action)=>{
            state.status = 'failed';
            state.error = action.error.message;
        })
        
    }

})

export const selectAllPosts = (state)=> state.posts.posts;
export const getPostStatus = (state)=>state.posts.status;
export const getPosterror = (state)=>state.posts.error;
export const {addPost,addReaction} = postsSlice.actions;
export default postsSlice.reducer;