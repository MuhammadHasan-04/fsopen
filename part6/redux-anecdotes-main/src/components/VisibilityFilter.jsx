import {filterChange} from '../reducers/filterreducer'

import {useDispatch} from 'react-redux'


const VisibiltyFilter =()=>{

    const dispatch = useDispatch()
    
    return(
        <>
        all
        <input type='radio' name='filter' onChange={dispatch(filterChange('ALL'))}/>
        important
        <input type='radio' name='filer' onChange={dispatch(filterChange('IMPORTANT'))}/>
        not imp
        <input type='radio' name='filter' onChange={dispatch(filterChange('NONIMPORTANT'))} /> 
        </>
    )
}

export  default VisibiltyFilter