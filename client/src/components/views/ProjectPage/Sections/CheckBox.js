import React, { useState } from 'react'
import { Checkbox, Collapse } from 'antd'
const { Panel } = Collapse

function CheckBox(props) {
  const [Checked, setChecked] = useState([])

  const handleToggle = (value) => {
    //누른 것의 index를 구하고
    const currentIndex = Checked.indexOf(value)
    //currentIndex에 없는 값이면은 -1 나오고 있는 값이면 배열의 index가 나온다.

    //전체 Checked된 State에서 현재 누른 CheckBox가 이미 있다면 넣어주고
    const newChecked = [...Checked]
    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      //이미 있으면 빼주고
      newChecked.splice(currentIndex, 1)
    }
    setChecked(newChecked)
    props.handleFilters(newChecked)
  }

  const renderCheckBoxLists = () =>
    props.list &&
    props.list.map((value, index) => (
      <React.Fragment key={index}>
        <Checkbox
          onChange={() => handleToggle(value._id)}
          checked={Checked.indexOf(value._id) === -1 ? false : true}
        />
        <span>{value.name}</span>
      </React.Fragment>
    ))

  return (
    <div>
      <Collapse defaultActiveKey={['0']} onChange>
        <Panel header="Continents" key="1">
          {renderCheckBoxLists()}
        </Panel>
      </Collapse>
    </div>
  )
}

export default CheckBox
