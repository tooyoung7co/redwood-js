import { createSlice } from '@reduxjs/toolkit';

export const TOKEN_TIME_OUT = 600*1000;

export const tokenSlice = createSlice({
    // 간단하게 redux 액션 생성자와 전체 슬라이스에 대한 reducer를 선언하여 사용하기 위함.
    name: 'authToken',
    initialState: {
        authenticated: false, // 현재 로그인 여부를 간단히 확인하기 위함.
        accessToken: null, // Access Token 저장.
        expireTime: null // Access Token 의 만료 시간.
    },
    reducers: {
        // Access Token 정보를 저장하기 위한 SET_TOKEN
        SET_TOKEN: (state, action) => {
            state.authenticated = true;
            state.accessToken = action.payload;
            state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;
        },
        // 값을 모두 초기화함으로써 Access Token에 대한 정보도 삭제하기 위한 DELETE_TOKEN
        DELETE_TOKEN: (state) => {
            state.authenticated = false;
            state.accessToken = null;
            state.expireTime = null;
        },
    }
})

export const { SET_TOKEN, DELETE_TOKEN } = tokenSlice.actions;

export default tokenSlice.reducer;