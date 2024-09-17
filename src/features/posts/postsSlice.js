import { createAsyncThunk, createSlice, nanoid , createEntityAdapter,createSelector} from "@reduxjs/toolkit";
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

    const postsAdapter = createEntityAdapter({
        sortComparer: (a,b)=>b.date.localeCompare(a.date)
    });

    const initialState = postsAdapter.getInitialState({
        status:'idle',
        error:null,
        count:0,
    })

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = createAsyncThunk("posts/fetchPosts",async ()=>{
    const response = await axios.get(POSTS_URL);
    return response.data;
});

export const updatePost = createAsyncThunk('posts/updatePost',async (initialPost)=>{
    const {id} = initialPost;
    const response = await axios.put(`${POSTS_URL}/${id}`,initialPost);
    return response.data; 
});
export const createPost = createAsyncThunk('post/createPost',async (initialPost)=>{
    const response = await axios.post(POSTS_URL,initialPost);
    return response.data;
})




export const postsSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{
       
        addReaction(state,action){
            const {postId, reaction} = action.payload;
            const existingPost = state.entities[postId];
            if(existingPost){
                existingPost.reactions[reaction]++;
            }
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
            console.log('Loaded Post from extra reducer',loadedPosts)           
            postsAdapter.addMany(state,action.payload);            
        })
        .addCase(fetchPosts.rejected,(state,action)=>{
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(createPost.fulfilled,(state,action)=>{
            if(!action.payload?.id){
                console.log('create post not completed');
                console.log(action.payload);
            }
            action.payload.reactions = {
                thumbsUp:0,
                wow:0,
                heart:0,
                rocket:0,
                coffee:0
                
            };
            action.payload.userId = Number(action.payload.userId);
            action.payload.date = new Date().toISOString();

            postsAdapter.addOne(state,action.payload);
        })
        .addCase(updatePost.fulfilled,(state,action)=>{
            if(!action.payload?.id){
                console.log('update could not complete');
                console.log(action.payload);
                return ;
            }
            action.payload.date = new Date().toISOString();
            postsAdapter.upsertOne(state,action.payload);
        })
        
    }

})


export const getPostStatus = (state)=>state.posts.status;
export const getPosterror = (state)=>state.posts.error;
export const {selectAll : selectAllPosts, selectById:selectPostById,selectIds:selectPostsIds} = postsAdapter.getSelectors(state=>state.posts);
export const selectPostByUser = createSelector([selectAllPosts,(state,userId)=>userId],(posts,userId)=>(posts.filter((post)=>post.userId===userId)));
export const {addPost,addReaction} = postsSlice.actions;
export default postsSlice.reducer;