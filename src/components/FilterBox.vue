<template>
<div 
:class = "filter +` filter-item`"
:style="`background-image:url(${imageUrl})`"
@click="filterFire()"
>
<slot></slot>
<!-- {{ filter }} -->
</div> 
</template>
<script>
export default{
  name: 'FilterBox',
  props:{
    imageUrl: String,
    filter: String,
  },
  data(){
    return{}
  },
  methods:{
    filterFire(){
      this.emitter.emit('filterFire',this.filter);

    },
  },
}
</script>
<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color : white;
  background-size: cover;
  background-position : center;
}
</style>