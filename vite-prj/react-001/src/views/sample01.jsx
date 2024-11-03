
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementByAmount, incrementStore, decrementStore } from "../stores/storeCounter";

const Sample01 = ({countValue, changeUp, changeDown}) => {

    const storeCount = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();


    const increment = () => {
        changeUp();
    }

    const decrement = () => {
        changeDown();
    }


    return (
        <>
            <h1>Sample01</h1>
            <hr />
            <div>
                <button onClick={increment}>UP</button> &nbsp; 
                COUNT :: {countValue} &nbsp;
                <button onClick={decrement}>Down</button>
            </div>
            <div>
                <button onClick={() => dispatch(incrementStore())}>Store Increment</button>
                STORE COUNT :: {storeCount} &nbsp; 
                <button onClick={() => dispatch(decrementStore())}>Store Decrement</button>
            </div>

        </>
    );
}

export default Sample01;