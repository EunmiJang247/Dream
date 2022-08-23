import { Input, Radio, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import PeopleList from './PeopleList';

function Peopleneed({setDreameeInfo}) {

    const [isChecked, setIsChecked] = useState(false)
    const [checkedItems, setCheckedItems] = useState(new Set())
    
    const [result, setResult] = useState([]) //기존 데이터 
    const [skillOptionChange, setskillOptionChange] = useState("프론트앤드개발자")
    const [Number, setNumber] = useState(0)
    const [details, setDetails] = useState({
        position: '프론트앤드개발자',
        skill: '',
        years: '',
        Number: 0,
    })
    
    const skillDataFront = [
        {id: 1, name: "React"},
        {id: 2, name: "Node"},
        {id: 3, name: "php"},
        {id: 4, name: "fourth"},
        {id: 5, name: "fifth"},
        {id: 6, name: "sixth"},
        {id: 7, name: "seventh"},
        {id: 8, name: "etc"},
    ];
    const skillDataBack = [
        {id: 1, name: "Node"},
        {id: 2, name: "php"},
        {id: 3, name: "Java"},
        {id: 4, name: "C"},
        {id: 5, name: "C++"},
        {id: 6, name: "C#"},
        {id: 7, name: "Javascript"},
        {id: 8, name: "etc"},
    ];
    const skillDataDesign = [
        {id: 1, name: "Illustrate"},
        {id: 2, name: "Phogoshop"},
        {id: 3, name: "php"},
        {id: 4, name: "fourth"},
        {id: 5, name: "fifth"},
        {id: 6, name: "sixth"},
        {id: 7, name: "seventh"},
        {id: 8, name: "etc"},
    ];
    const skillDataPlan = [
        {id: 1, name: "Tool"},
        {id: 2, name: "Node"},
        {id: 3, name: "php"},
        {id: 4, name: "fourth"},
        {id: 5, name: "fifth"},
        {id: 6, name: "sixth"},
        {id: 7, name: "seventh"},
        {id: 8, name: "etc"},
    ];

    const position = [
        {id: 1, name: "프론트앤드개발자"},
        {id: 2, name: "백앤드개발자"},
        {id: 3, name: "디자이너"},
        {id: 4, name: "기획자"},
    ] 

    const years = [
        {id: 1, name: "열정이 있는 누구나"},
        {id: 2, name: "1년미만"},
        {id: 3, name: "2년미만"},
        {id: 4, name: "3년미만"},
        {id: 5, name: "5년미만"},
        {id: 6, name: "5년이상"},
    ] 

    const checkHandler = (event) => {
        setIsChecked(!isChecked);
        checkedItemHandler(event.target.value, event.target.checked)
    }
    const checkedItemHandler = (Id,isChecked) => {
        if(isChecked){
            // console.log(Id,isChecked)
            checkedItems.add(Id);
            setCheckedItems(checkedItems);
        }else if(!isChecked && checkedItems.has(Id)){
            // console.log(Id,isChecked)
            checkedItems.delete(Id);
            setCheckedItems(checkedItems);
        }
        setDetails((prev) => {
            return {...prev, skill :[...checkedItems]}
        })
        return checkedItems;
    };
    const erasePreviousSelection = () => {
        skillDataFront.map((front)=>{
            checkedItems.delete(front.name);
        })
        skillDataBack.map((front)=>{
            checkedItems.delete(front.name);
        })
        skillDataDesign.map((front)=>{
            checkedItems.delete(front.name);
        })
        skillDataPlan.map((front)=>{
            checkedItems.delete(front.name);
        })
    }
    const handleChange = (e) => {
        console.log()
        const name = e.target.name;
        const value = e.target.value;

        setDetails((prev) => {
            return {...prev, [name]:value}
        })
        if(e.target.value === "프론트앤드개발자"){
            setskillOptionChange("프론트앤드개발자")
            erasePreviousSelection()
        }else if(e.target.value === "백앤드개발자"){
            // console.log('백앤드')
            setskillOptionChange("백앤드개발자")
            erasePreviousSelection()
        }else if(e.target.value === "디자이너"){
            setskillOptionChange("디자이너")
            erasePreviousSelection()
        }else if(e.target.value === "기획자"){
            setskillOptionChange("기획자")
            erasePreviousSelection()
        }
    }

    //제출버튼
    const onSubmitHandler = (event) => {
        event.preventDefault();
        setResult([...result, details])
    }

    useEffect(()=>{
        setDreameeInfo(result)
    },[result])
      
  return (
    <>
    <form>
    <span style={{marginLeft:'10px', fontWeight: 'bold'}}>구인(필요인원 추가 후 추가하기 버튼을 눌러주세요)</span>
        <div style={{border: '1px solid #d9d9d9', padding:'20px'}}>
            
            <div >
            <span style={{marginLeft:'10px', fontWeight: 'bold'}}>모집포지션</span><br />
            {position.map((row,idx)=>
                <React.Fragment key={idx}>
                    <input type="radio" name="position" value={row.name}
                    onChange={handleChange} 
                    // checked={row.name==="프론트앤드개발자"}
                    />
                    <span>{row.name}</span>
                </React.Fragment>
            )}
            </div>
            <span style={{marginLeft:'10px', fontWeight: 'bold'}}>기술스택</span><br />

                {skillOptionChange === "프론트앤드개발자" && skillDataFront.map((row,idx)=>
                    <React.Fragment key={idx}>
                        <input type="checkbox" name="skill" value={row.name} 
                        onChange={checkHandler} 
                        />
                        <span style={{paddingLeft:'5px'}}>{row.name}</span>
                    </React.Fragment>
                )}
                {skillOptionChange === "백앤드개발자" && skillDataBack.map((row,idx)=>
                    <React.Fragment key={idx}>
                        <input type="checkbox" name="skill" value={row.name} 
                        onChange={checkHandler} 
                        />
                        <span style={{paddingLeft:'5px'}}>{row.name}</span>
                    </React.Fragment>
                )}
                {skillOptionChange === "디자이너" && skillDataDesign.map((row,idx)=>
                    <React.Fragment key={idx}>
                        <input type="checkbox" name="skill" value={row.name} 
                        onChange={checkHandler} 
                        />
                        <span style={{paddingLeft:'5px'}}>{row.name}</span>
                    </React.Fragment>
                )}
                {skillOptionChange === "기획자" && skillDataPlan.map((row,idx)=>
                    <React.Fragment key={idx}>
                        <input type="checkbox" name="skill" value={row.name} 
                        onChange={checkHandler} 
                        />
                        <span style={{paddingLeft:'5px'}}>{row.name}</span>
                    </React.Fragment>
                )}
            <br />
            <span style={{marginLeft:'10px', fontWeight: 'bold'}}>연차</span><br />
                {years.map((row,idx)=>
                    <React.Fragment key={idx}>
                        <input type="radio" name="years" value={row.name} 
                        onChange={handleChange} 
                        />
                        <span>{row.name}</span>
                    </React.Fragment>
                )}            
            <br />
            <span style={{marginLeft:'10px', fontWeight: 'bold'}}>명수</span><br />
                <Input style={{width:'100px'}} name="Number" onChange={handleChange}/>
            <SubmitButton type="submit" value="추가하기" onClick={onSubmitHandler}>추가하기</SubmitButton>
        </div>
    </form>
    <PeopleList result={result} />
    </>
  )
}

export default Peopleneed;
const SubmitButton = styled.button`
    margin: 15px auto 0;
    display: block;
    color: white;
    padding: 10px;
    border: none;
    background: rgb(232,52,78);
    font-size: 10px;
    font-weight: 700;
    cursor: pointer;
`