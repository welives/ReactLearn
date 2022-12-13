import { takeEvery, put } from 'redux-saga/effects'
import { GET_LIST } from './actionTypes'
import Actions from './actions'

/**
 * redux-saga 异步请求演示
 */
function* getList() {
  const data = yield fetch(
    'https://mock.mengxuegu.com/mock/6385a5229433403d6c068a17/example/react_learn'
  ).then(async (res) => {
    const { status, result } = await res.json()
    return status === 'success' ? result.data : []
  })
  yield put(Actions.getList(data))
}

export default function* saga() {
  yield takeEvery(GET_LIST, getList)
}
