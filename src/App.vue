<template>

<p>{{ age }} {{ likes }}</p>
  <p>{{ name }}</p>
  <h4>{{ $store.state.age }}</h4>
  <button @click="$store.commit('plusAge',10)">AddAge</button>
  <!-- <button @click="$store.mutations.plusAge">AddAge2</button> 이거 안되지롱 -->
  <div class="header">
    <ul class="header-button-left">
      <li v-if="step !== 0" @click="step = 0">Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step === 1" @click="step++">Next</li>
      <li v-if="step === 2" @click="publishPost()">발행</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <Container 
  :postDataList="postDataList" 
  :step="step" 
  :imageUrl="imageUrl" 
  @write = "this.postContent = $event"
  />
  <button v-if="step === 0" @click="morePost()">더보기</button>
  <!-- <p>{{ $store.state.more }}</p>
  <p>{{ $store.state.moreCount }}</p>
  <button v-if="step===0" @click="$store.dispatch('getData')">더보기 버튼</button> -->
  
  <div class="footer">
    <ul class="footer-button-plus">
      <input @change="imageUpload" type="file" id="file" class="inputfile" />
      <label v-if="step === 0" for="file" class="input-plus">+</label>
    </ul>
  </div>
</template>

<script>
import Container from './components/ContainerBox.vue';
import postedData from './assets/PostedData.js';
import axios from 'axios';
import {mapState} from 'vuex';

export default {
  name: 'App',
  components: {
    Container,
  },
  data() {
    return {
      count:0,
      postDataList: postedData,
      moreCount: 0,
      step: 0, //0 : 메인 1:필터화면 2:글쓰기
      imageUrl: "",
      postContent: "",
      selectedFilter: "",
    }
  },
  mounted(){
    this.emitter.on('filterFire',(a)=>{
      this.selectedFilter = a;
    });
  },
  computed:{
    name(){
      return this.$store.state.name
    },
    ...mapState(['name','age','likes']),
  },
  methods: {

    morePost() {
      axios.get(`https://codingapple1.github.io/vue/more${this.moreCount}.json`)
        .then((result) => {
          this.postDataList.push(result.data);
          this.moreCount += 1;
        }).catch((error) => { console.log(error.code) })
    },
    imageUpload(e) {
      let file = e.target.files[0];
      let url = URL.createObjectURL(file);
      this.imageUrl = url
      this.step = 1;
    },
    publishPost() {
      let today = this.formatCurrentDate();
      let newPost = {
        name: "hee",
        userImage: "https://picsum.photos/100?random=3",
        postImage: this.imageUrl,
        likes: 36,
        date: today,
        liked: false,
        content: this.postContent,
        filter: this.selectedFilter,
      };
      console.log("publishPost",newPost);
      this.postDataList.unshift(newPost);
      this.step = 0;
    },
    formatCurrentDate() {
      let currentDate = new Date();

      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      let currentMonth = monthNames[currentDate.getMonth()];
      let currentDay = currentDate.getDate();

      let result = currentMonth + " " + currentDay;
      return result;
    },
  },
}
</script>

<style>
body {
  margin: 0;
}

ul {
  padding: 5px;
  list-style-type: none;
}

.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}

.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}

.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}

.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}

.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}

.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}

.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}

.inputfile {
  display: none;
}

.input-plus {
  cursor: pointer;
}

#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}</style>
