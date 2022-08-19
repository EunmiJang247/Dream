import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function SubMenus() {
    const user = useSelector(state => state.user)


  return (
    <Inner>
        <section>
            <MyMenus>
                {user && 
                <>
                <MyMenu>
                    <Link style={{color: '#333'}} to={{
                        pathname: `/mypage/mypostproject/${user.userData._id}`
                    }}>내가올린 드림프로젝트</Link>
                </MyMenu>
                <MyMenu>
                    <Link style={{color: '#333'}} to={{
                        pathname: `/mypage/myapplyproject/${user.userData._id}`
                    }}>
                    내가 지원한 드림프로젝트
                    </Link>
                </MyMenu>
                <MyMenu>
                    <Link style={{color: '#333'}} to={{
                        pathname: `/mypage/mydreamee/${user.userData._id}`
                    }}>
                    내 드림이소개
                    </Link>
                </MyMenu>
                <MyMenu>
                    <Link style={{color: '#333'}} to={{
                        pathname: `/mypage/myaccount/${user.userData._id}`
                    }}>
                    내 계정
                    </Link>
                </MyMenu>
                </>
                }
            </MyMenus>
        </section>

    </Inner>
  )
}

export default SubMenus;
const Inner = styled.div`
  margin: auto;
  max-width: 968px;
  width: 100%;
  background: white;
`
const MyMenus = styled.div`
    border-bottom: 1px solid #f1f1f1;
    padding: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const MyMenu = styled.div`
    width: auto;
    color: #000;
    padding: 16px 0 13px;
    margin: 0 auto;
    min-width: 29px;
    text-align: center;
    cursor: pointer;
    transition: all .4s;
    &:hover{
        color: red;
    }
`