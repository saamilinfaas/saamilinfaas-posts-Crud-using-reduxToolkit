import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/* const initialState = [
   { "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
        }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
    }
},
{
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv",
    "address": {
        "street": "Victor Plains",
        "suite": "Suite 879",
        "city": "Wisokyburgh",
        "zipcode": "90566-7771",
        "geo": {
            "lat": "-43.9509",
            "lng": "-34.4618"
        }
    },
    "phone": "010-692-6593 x09125",
    "website": "anastasia.net",
    "company": {
        "name": "Deckow-Crist",
        "catchPhrase": "Proactive didactic contingency",
        "bs": "synergize scalable supply-chains"
    }
},
{
    "id": 3,
    "name": "Clementine Bauch",
    "username": "Samantha",
    "email": "Nathan@yesenia.net",
    "address": {
        "street": "Douglas Extension",
        "suite": "Suite 847",
        "city": "McKenziehaven",
        "zipcode": "59590-4157",
        "geo": {
            "lat": "-68.6102",
            "lng": "-47.0653"
        }
    },
    "phone": "1-463-123-4447",
    "website": "ramiro.info",
    "company": {
        "name": "Romaguera-Jacobson",
        "catchPhrase": "Face to face bifurcated interface",
        "bs": "e-enable strategic applications"
    }
},
] */


const initialState = {
    users:[],
    status:"idle",
    error:''
}
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = createAsyncThunk("users/fetchUsers",async ()=>{
    const response = await axios.get(USERS_URL);
    return response.data;
})

export const usersSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
        
    },
    extraReducers(builder){
        builder
            .addCase(fetchUsers.pending,(state,action)=>{
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled,(state,action)=>{
                state.status = 'succeeded';
                const loadedUsers = action.payload;
                state.users = state.users.concat(loadedUsers);
            })
            .addCase(fetchUsers.rejected,(state,action)=>{
                state.error = action.error.message;
            })
    }

});

export const selectAllUsers = (state)=>state.users.users;
export const getUsersStatus = (state)=>state.users.status;
export const getUsersError = (state)=>state.users.error;
export default usersSlice.reducer;