import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { decrement, increment, incrementByAmount, reset } from './action'
export default function Counter ()
{
  const count = useSelector( ( state ) => state.counter.count )
  const dispatch = useDispatch()
  const [ insert, setInsert ] = useState( 0 )
  const addValue = Number( insert ) || 0
  return (
    <section className='card bg-base-300'>
      <div className="card-body">

        <p className='card-title'>{ count }</p>
        <div className='card-actions '>
          <button
            className='btn btn-primary '
            onClick={ () => dispatch( increment() ) }>+</button>

          <button
            className='btn btn-primary '
            onClick={ () => dispatch( decrement() ) }>-</button>
          <button
            className='btn btn-primary '
            onClick={ () => dispatch( reset() ) }>reset</button>

          <button
            className='btn btn-primary '
            onClick={ () => dispatch( incrementByAmount( addValue ) ) }>Add</button>

        </div>
        <div className="card-actions">


          <input type="number"
            className='input input-primary'
            value={ insert }
            onChange={ ( e ) => { setInsert( e.target.value ) } }
          />
          <button
            className='btn btn-primary '
            onClick={ () => setInsert( 0 ) }>Reset Amount</button>
        </div>
      </div>
    </section>
  )
}
