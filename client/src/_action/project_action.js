import axios from 'axios'
import { NEXT_PAGE, REGISTER_PROJECT, RESET } from './types'

export function registerProject(answer) {
  return {
    type: REGISTER_PROJECT,
    payload: { answer }
  }
}

export function next() {
  return {
    type: NEXT_PAGE
  }
}

export function reset() {
  return {
    type: RESET
  }
}
