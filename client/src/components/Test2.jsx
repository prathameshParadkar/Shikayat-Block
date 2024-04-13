import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store';
import { decrement, increment } from '../reducers/counter';

function Test2() {
  const count = useSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
}

export default Test2;
