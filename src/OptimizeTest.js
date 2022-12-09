import React, { useEffect, useState } from "react"

const CounterA = React.memo (({count}) => {

        useEffect(()=>{
            console.log(`CounterA Update - count: ${count}`)
        })

    return <div>{count}</div>
})

const CounterB = React.memo(({obj}) => {

     useEffect(()=>{
            console.log(`CounterB Update - count: ${obj.count}`)
        })
    
    return <div>{obj.count}</div>
})

const areEqual = (prevProps, nextProps)=> {

    if(prevProps.obj.count === nextProps.obj.count){
        return true
    }
    return false

    // return true // 이전 프롭스 현재 프롭스가 같다. -> 리렌더링을 일으키지 않게 됨
    // return false // 이전과 현재가 다르다 -> 리렌더링을 일으킨다
}

// areEqual에 따라 결정
const MemoizedCounterB = React.memo(CounterB, areEqual)

const OptimizeTest = () => {

    const [count, setCount] = useState(1)
    const [obj, setObj] = useState({
        count: 1
    })

    return (<div style={{padding: 50}}>
        <div>
            <h2>Counter A</h2>
            <CounterA count={count} />
            <button onClick={() => setCount(count)}>A button</button>
        </div>
        <div>
            <h2>Counter B</h2>
            <MemoizedCounterB obj={obj} />
            <button onClick={() => setObj({
                count: obj.count
            })}>B button</button>
        </div>
    </div>
    )

}



















// const Textview = React.memo(({text}) => {
//     useEffect(()=>{
//         console.log(`Updata :: Text : ${text}`)
//     })
//     return <div>{text}</div>
// })

// const CountView = React.memo(({count}) => {
//     useEffect(()=>{
//         console.log(`Updata :: Count : ${count}`)
//     })
//     return <div>{count}</div>
// })


// const OptimizeTest = () => {

    
//     const [count, setCount] = useState(1)
//     const [text, setText] = useState("")
    
//     return <div style={{padding: 50}}>
//         <div>
//             <h2>count</h2>
//             <CountView count={count}/>
//             <button onClick={()=>setCount(count+1)}>+</button>
//         </div>
//         <div>
//             <h2>text</h2>
//             <Textview text={text}/>
//             <input value={text} onChange={(e)=>setText(e.target.value)} />
//         </div>
//     </div>
// }

export default OptimizeTest