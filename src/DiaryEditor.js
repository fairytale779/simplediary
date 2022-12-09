import { useRef, useState } from "react"


const DiaryEditor = ( {onCreate} ) => {

    // dom 접근
    const authorInput = useRef() 
    const contentInput = useRef()


    const [state, setState] = useState({
        author:"",
        content:"",
        emotion: 1,
    })

    // const [author, setAuthor] = useState("");
    // const [content, setContent] = useState("")

    const handleChangeState = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = () => {
        if(state.author.length < 1) {
            alert("작성자는 최소 1글자 이상 입력해야 합니다.")
            //focus
            authorInput.current.focus()
            return ;
        }

        if(state.content.length < 5) {
            alert("내용은 최소 5글자 이상 입력해야 합니다.")
            //focus
            contentInput.current.focus()
            return ;
        }

        onCreate(state.author, state.content, state.emotion);
        alert("저장 완료! 🫶🏻");
        setState({
          author: "",
          content: "",
          emotion: 1
    })
}


    return (
        <div className="DiaryEditor">
            <h2>오늘의 일기</h2>
            <div>
                <input 
                    ref={authorInput}
                    name="author"
                    value={state.author}
                    onChange={handleChangeState}
                    // onChange={(e) => {
                    //     // setAuthor(e.target.value)
                    //     setState({
                    //         ...state, //순서중요
                    //         author: e.target.value,
                    //         // content: state.content,
                    //     })
                    // }}
                />
            </div>
            <div>
                <textarea 
                    ref={contentInput}
                    name="content"
                    value={state.content}
                    onChange={handleChangeState}
                    // onChange={(e) => {
                    //      // setContent(e.target.value)
                    //     setState({
                    //         // author: state.author,
                    //         ...state,
                    //         content: e.target.value,
                    //   })
                    // }}
                 />
            </div>
            <div>
            <span>오늘의 감정점수 : </span>
                <select 
                    name="emotion"
                    value={state.emotion}
                    onChange={handleChangeState}
                >

                    <option value={1}>💜</option>
                    <option value={2}>💜💜</option>
                    <option value={3}>💜💜💜</option>
                    <option value={4}>💜💜💜💜</option>
                    <option value={5}>💜💜💜💜💜</option>
                </select>
            </div>
            <div>
                <button onClick={handleSubmit}>일기 저장하기</button>
            </div>
        </div>
    )

}

export default DiaryEditor