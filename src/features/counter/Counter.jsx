import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addValue, decrementByOne, decrementValue, incrementByOne, selectCount } from './counterSlice';
import './counter.css';



const Counter = () => {
    const [amount,setAmount] = useState(0);
    const dispatch = useDispatch();
    const count = useSelector(selectCount);

    const addAmount = (num)=>{
        const amount = Number(num) || 0;
        dispatch(addValue(amount));
        setAmount(0);
    }

    const decrementAmount = (num)=>{
        const amount = Number(num) || 0;
        dispatch(decrementValue(amount));
        setAmount(0);
    }
  return (
    <div>
        <h3>{count}</h3>
        <button onClick={()=>dispatch(incrementByOne())}>+</button>
        <button onClick={()=>dispatch(decrementByOne())}>-</button>
        <div>
            <label htmlFor="amount"></label>
            <button onClick={()=>addAmount(amount)}>Increment by</button>
            <input type="number" name="amount" id="amount" onChange={(e)=>setAmount(e.target.value)} value={amount}/>
            <button onClick={()=>decrementAmount(amount)}>Decrement by</button>
        </div>
    </div>
  )
}

export default Counter