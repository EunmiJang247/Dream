import { Modal } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components';
import { Tabs,Collapse } from 'antd';
const { TabPane } = Tabs;
const { Panel } = Collapse;

function ApplyModal() {
    const [visible, setVisible] = useState(false);
    const onChange = (key) => {
        console.log(key);
      };
    const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
    `;

    const SelectApplier = () => {

    }
  return (
    <>
        <ApplyButton onClick={() => setVisible(true)}>지원자보기</ApplyButton>
        <Modal
        title="지원자 보기"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
        >
            <div style={{height:'80vh'}}>
                <Tabs defaultActiveKey="1" onChange={onChange}>
                    <TabPane tab="프론트앤드개발자" key="React">
                        <Collapse defaultActiveKey={['1']} onChange={onChange}>
                            <Panel header="Eunmi" key="1">
                                <p>{text}</p>
                                <ApplyAccepButton onClick={SelectApplier}>이 지원자 선택</ApplyAccepButton>
                            </Panel>
                            <Panel header="This is panel header 2" key="2">
                                <p>{text}</p>
                            </Panel>
                            <Panel header="This is panel header 3" key="3">
                                <p>{text}</p>
                            </Panel>
                            <Panel header="This is panel header 4" key="4">
                                <p>{text}</p>
                            </Panel>
                            <Panel header="This is panel header 5" key="5">
                                <p>{text}</p>
                            </Panel>
                            <Panel header="This is panel header 6" key="6">
                                <p>{text}</p>
                            </Panel>
                        </Collapse>

                    </TabPane>
                    <TabPane tab="백앤드개발자" key="NodeJs">
                    Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="AWS개발자" key="AWS">
                    Content of Tab Pane 3
                    </TabPane>
                </Tabs>
            </div>
        </Modal>
    </>
  )
}

export default ApplyModal;
const ApplyButton = styled.button`
    width: 65px;
    border: none;
    background-color: transparent;
    cursor: pointer;

    display: block;
    margin: 0 auto;
    border: 1px solid #ff5656;
    color: #dc3434;

    font-size: 10px;
`
const ApplyAccepButton = styled.button`

`