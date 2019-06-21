import { call, put } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'

function* mainSaga(x, y) {
  yield call(console.log, 'hello')
  yield put({ type: 'ADD', payload: x + y })
}

it('puts an ADD action', () => {
  return (
    expectSaga(mainSaga, 40, 2)
      // assert that the saga will eventually yield `put`
      // with the expected action
      .put({ type: 'ADD', payload: 42 })

      // run it
      .run()
  )
})
