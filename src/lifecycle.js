import React, {useEffect, useState} from "react";

const UnmountTest = () => {

    useEffect (() => {
        console.log("mount!")

        return () => {
            // unmount 시점에 실행되게 됨
            console.log("Unmount!")
        }
    }, [])

    return <div>Unmount Testing Component</div>
}

const Lifecycle = () => {

    // const [count, setCount] = useState(0)
    // const [text, setText] = useState("")

    // useEffect(()=>{
    //     console.log("mount!")
    // }, [])

    // useEffect(()=>{
    //     console.log("Update!") // state를 변경시키는 순간 (dependency를 전달하지 않으면 됨)
    // })

    // useEffect(()=>{
    //     console.log(`count is update : ${count}`)
    //     if(count > 5) {
    //         alert("count가 5를 넘었습니다. 따라서 1로 초기화합니다.")
    //         setCount(1)
    //     }
    // }, [count]) // count state가 변화하는 순간 호출

    // useEffect(()=>{
    //     console.log(`text is update : ${text}`)
    // }, [text]) // count state가 변화하는 순간 호출

    const [isVisible, setIsVisible] = useState(false)
    const toggle = () => setIsVisible(!isVisible)

    

    return (
        <div style={{ padding: 20 }}>
            {/* <div>
                {count}
                <button onClick={()=>setCount(count+1)}>+</button>
            </div>
            <div>
                <input value={text} onChange={(e)=> setText(e.target.value)} />
            </div> */}
            <button onClick={toggle}>ON / OFF</button>
            {isVisible && <UnmountTest/>} {/* isVisible이 true 이면 UnmountTest이 렌더링 */}
        </div>
    )
}


export default Lifecycle   