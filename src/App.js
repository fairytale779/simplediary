import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
// import OptimizeTest from './OptimizeTest'
// import Lifecycle from './lifecycle'

// const dummyList = [
//   {
//     id: 1,
//     author: "홍동화",
//     content: "너무 추워요",
//     emotion : 5,
//     created_date: new Date().getTime(),
//   },  
//   {
//     id: 2,
//     author: "전예린",
//     content: "그따구로 할거면 접어 xx",
//     emotion : 2,
//     created_date: new Date().getTime(),
//   },  
//   {
//     id: 3,
//     author: "김일태",
//     content: "페어가 연락이 안와요.",
//     emotion : 1,
//     created_date: new Date().getTime(),
//   },  
//   {
//     id: 4,
//     author: "이희진",
//     content: "축구는 시끄러울 때만 조금씩 봅니다.",
//     emotion : 3,
//     created_date: new Date().getTime(),
//   },  
//   {
//     id: 5,
//     author: "이유정",
//     content: "줌 모각코 스터디 좋아여",
//     emotion : 5,
//     created_date: new Date().getTime(),
//   },
// ]

// https://jsonplaceholder.typicode.com/comments


function App() {
  const [data, setData] = useState([])

  const dataId = useRef(0)

  // api 호출
  const getData = async () => { 
    const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res) => res.json());

    const initData = res.slice(0,20).map((it)=>{ 
      return  {
        author : it.email,
        content : it.body,
        emotion : Math.floor(Math.random()*5) + 1, // Math.random()*5 : 0~4까지의 수를 랜덤으로 하나 생성(소수점포함) -> floor : 정수반환 -> +1 : 1~5
        created_date : new Date().getTime(),
        id : dataId.current++ 
      }
    })
  
    setData(initData)
  }

  useEffect (()=>{
    getData() 
  },[])

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime()
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);

  }

  const onRemove = (targetId) => { 
    const newDiaryList = data.filter((it) => it.id !== targetId)
    setData(newDiaryList)
  }

  // 리액트 특성상 데이터는 위에서 아래로 , 이벤트는 아래에서 위로 올라감.
  // 그래서 수정완료 이벤트를 다이어리아이템에서 앱컴포넌트까지 전달하기 위해서는 
  // 데이터를 가지고 있는 앱컴포넌트에 수정할 수 있는 기능을 할수 있는 함수를 만들어서,
  // 다이어리아이템까지 전달해주어야 한다.
  const onEdit = (targetId,newContent) => {
    setData(
      // 원본 데이터 배열에서 , 모든 요소를 순회하며 새로운 배열을 만들어서 셋데이터로
      // 수정 대상이라면 컨텐츠를 뉴ㅋㄴ텐츠로 교체, 아니라면 현재 원본 값을 지킴.
      data.map((it)=>it.id === targetId ? {...it, content:newContent} : it)
    )
  }

  // 계속 변하지 않는 값이므로 메모이제이션 사용
  // 유즈메모를 사용하게되면 함수가 아니라 값이다 그러므로 getDiaryAnalysis() 가 아니고 getDiaryAnalysis
  const getDiaryAnalysis = useMemo(
    () => {
      const goodCount = data.filter((it) => it.emotion >= 3).length
      const badCount = data.length - goodCount
      const goodRatio = (goodCount / data.length) * 100;
      return {goodCount, badCount, goodRatio} 
  }, [data.length]) // data.length가 변화할 때만 콜백함수가 바뀜. 그러니까 바뀌지 않으면 계속 같은 값 리턴한다.)

    const {goodCount, badCount, goodRatio} = getDiaryAnalysis

  return (
    <div className="App">
      {/* <OptimizeTest/> */}
      {/* <Lifecycle /> */}
      <DiaryEditor onCreate={onCreate}/>
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data}/>
    </div>
  );
}

export default App;
