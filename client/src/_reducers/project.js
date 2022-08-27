//담아둘려고하는거 : 사용자가 선택한것.
import { NEXT_PAGE, REGISTER_PROJECT, RESET } from '../_action/types'

//질문담아두었음
let projectinitialState = {
  answer: [],
  page: 0,
  questions: [
    {
      question: '드림프로젝트 진행 목적은?',
      answer: [
        {
          text: '커리어와 능력향상을 위한 포트폴리오 제작',
          option: 1
        },
        {
          text: '불로소득을 위한 첫걸음, 창업',
          option: 2
        }
      ]
    },
    {
      question: '만들고자하는 서비스의 카테고리?',
      answer: [
        {
          text: '웹사이트',
          option: 1
        },
        {
          text: '애플리케이션',
          option: 2
        },
        {
          text: '웹/앱 둘다',
          option: 3
        }
      ]
    },
    {
      question: '회의주기는?',
      answer: [
        {
          text: '온라인,매주',
          option: 1
        },
        {
          text: '오프라인,매주',
          option: 2
        },
        {
          text: '온.오프라인혼합,매주',
          option: 3
        },
        {
          text: '온.오프라인혼합,격주',
          option: 4
        },
        {
          text: '협의 후 조율',
          option: 5
        }
      ]
    },
    {
      question: '멘토가 필요하신가요?',
      answer: [
        {
          text: '멘토링도 고려하고있다',
          option: 1
        },
        {
          text: '필요하지 않다',
          option: 2
        }
      ]
    }
  ],
  selectedanswer: []
}

export default function (state = projectinitialState, action) {
  switch (action.type) {
    case REGISTER_PROJECT:
      return {
        ...state,
        selectedanswer: state.selectedanswer.concat(action.payload)
      }

    case NEXT_PAGE:
      return {
        ...state,
        page: state.page + 1
      }

    case RESET:
      return {
        ...state,
        answer: [],
        page: 0
      }

    default:
      return state
  }
}
