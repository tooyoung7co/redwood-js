import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from '../store/Auth';

export default configureStore({
    // 선언한 reducer를 사용하기 위함.
    reducer: {
        authToken: tokenReducer,
    },
});
