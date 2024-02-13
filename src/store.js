import {createStore} from 'vuex'
import axios from 'axios';

const store = createStore({
  state(){
    return{
      name :'kim',
      age : 20,
      likes : 20,
      likeState:false,
      more:{},
      moreCount:0,
    }
  },
  mutations :{
    changeName(state){
      state.name = 'park';
    },
    plusAge(state,data){
      state.age += data;
    },
    clickLike(state){
      if(state.likeState === false){
        state.likes ++;
        state.likeState = true;
      }else{
        state.likes --;
        state.likeState = false;
      }
    },
    setMore(state,data){
      console.log(state);
      state.more = data;
      state.moreCount++;
    },
  },
  actions:{ //ajax하는곳
    getData(context){
      axios.get(`https://codingapple1.github.io/vue/more${context.state.moreCount}.json`)
      .then((result)=>{
        //액션후에 state 변경은 mutations 이용하기
        context.commit('setMore',result.data);
      });
    },
  },
})

export default store;