import { Input, Radio, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import PeopleList from './PeopleList';

function Peopleneed({setDreameeInfo}) {

    const [isChecked, setIsChecked] = useState(false)
    const [checkedItems, setCheckedItems] = useState(new Set())
    
    const [test, setTest] = useState([])
    const [result, setResult] = useState(
    [ ]
    ) //기존 데이터 

    const [details, setDetails] = useState({
        position: '',
        skill: '',
        years: ''
    })

    const skillData = [
        {id: 1, name: "React"},
        {id: 2, name: "Node"},
        {id: 3, name: "php"},
        {id: 4, name: "fourth"},
        {id: 5, name: "fifth"},
        {id: 6, name: "sixth"},
        {id: 7, name: "seventh"},
        {id: 8, name: "eighth"},
    ];

    const position = [
        {id: 1, name: "프론트앤드개발자"},
        {id: 2, name: "백앤드개발자"},
    ] 

    const years = [
        {id: 1, name: "취준생"},
        {id: 2, name: "1년미만"},
        {id: 3, name: "2년미만"},
        {id: 4, name: "3년미만"},
        {id: 5, name: "5년미만"},
        {id: 6, name: "5년이상"},
    ] 

    // const checkHandler = ({target}) => {
    //     setIsChecked(!isChecked);
    //     checkedItemHandler(target.value, target.checked)
    // }

    const checkHandler = (event) => {
        setIsChecked(!isChecked);
        checkedItemHandler(event.target.value, event.target.checked)
    }
    const checkedItemHandler = (Id,isChecked) => {
        if(isChecked){
            checkedItems.add(Id);
            console.log(checkedItems)
            setCheckedItems(checkedItems);
        }else if(!isChecked && checkedItems.has(Id)){
            checkedItems.delete(Id);
            setCheckedItems(checkedItems);
        }
        console.log('체크능',checkedItems)
        setDetails((prev) => {
            return {...prev, skill :checkedItems}
        })
        // setResult(details)
        return checkedItems;
    };
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setDetails((prev) => {
            return {...prev, [name]:value}
        })
    }

    //제출버튼
    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log('details',details)
        setResult([...result, details])
        setDreameeInfo(result)
    }
      
  return (
    <>
    <form>
        <div style={{border: '1px solid red', padding:'20px'}}>
            <span style={{marginLeft:'10px', fontWeight: 'bold'}}>구인</span>
            <div >
            {position.map((row,idx)=>
                <>
                    <input type="radio" name="position" value={row.name}
                    onChange={handleChange}
                    />
                    <span>{row.name}</span>
                </>
            )}
            </div>
            <span style={{marginLeft:'10px', fontWeight: 'bold'}}>기술스택</span>
                {skillData.map((row,idx)=>
                    <>
                        <input type="checkbox" name="skill" value={row.name} 
                        onChange={checkHandler} 
                        />
                        <span style={{paddingLeft:'5px'}}>{row.name}</span>
                    </>
                )}
            <br />
            <span style={{marginLeft:'10px', fontWeight: 'bold'}}>연차</span>
                {years.map((row,idx)=>
                    <>
                        <input type="radio" name="years" value={row.name} 
                        onChange={handleChange}
                        />
                        <span>{row.name}</span>
                    </>
                )}            
            <br />
            <input type="submit" value="추가하기" onClick={onSubmitHandler}/>
        </div>
    </form>
    <PeopleList result={result} />
    </>
  )
}

export default Peopleneed