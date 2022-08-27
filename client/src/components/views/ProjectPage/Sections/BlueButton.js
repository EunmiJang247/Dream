import React from 'react'
import styled from 'styled-components'

export function BlueButton({ text, clickEvent }) {
  return <MyButton onClick={clickEvent}>{text}</MyButton>
}

const MyButton = styled.a`
  position: relative;

  width: 50%;
  margin: 0 auto;

  display: block;
  margin-bottom: 30px;
  padding: 1.8em;

  cursor: pointer;
  vertical-align: middle;
  text-decoration: none;
  transform-style: preserve-3d;
  line-height: 1.6;
  font-weight: bold;
  color: #382b22;
  background: #fefefe;
  border: 2px solid #8599b1;
  border-radius: 0.75em;
  user-select: none; //드레그 안되도록 하는것.
  transition: 0.15s ease-out;
  &::before {
    background: #c4d8f9;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: inherit; //부모꺼 가져옴
    box-shadow: 0 0 0 2px #8599b1, 0 0.625em 0 0 #e2efff;
    transform: translate3d(0, 0.75em, -1em);
    transition: transform 0.15es ease-out, box-shadow 0.15s ease-out;
  }
  &:hover {
    transform: translateY(0.25em);
  }
`
