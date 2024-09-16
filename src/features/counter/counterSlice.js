import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count:0,
}

export const CounterSlice = createSlice({
    name:"counter",
    initialState,
    reducers:{
        incrementByOne(state){
            state.count +=1;
        },
        decrementByOne(state){
            state.count -=1;
        },
        addValue(state,action){
            state.count += action.payload;
        },
        decrementValue(state,action){
            state.count -= action.payload;
        }
    }

})

export const selectCount = (state)=>state.counter.count;
export const {incrementByOne,decrementByOne,addValue,decrementValue} = CounterSlice.actions;
export default CounterSlice.reducer;