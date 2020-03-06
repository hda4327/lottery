<template>
	<picker mode="selector" :range="pickList" :range-key="pickKey" @change="handlerChange">
		<view class="picker-item">
			{{pickTitle}}
			<view class="pull-down"></view>
		</view>
	</picker>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:{
			pickList:{
				default:()=>{
					return [{name:'0'}]
				},
				type: Array,
				// 验证数组里每个值都是object类型
				validator:function (value) {
					return value.length>0 && value.every((val)=>{return typeof val =='object'})
				}
			},
			pickTitle:{
				default: '期望工作城市?',
				type: String
			}
			
		},
		computed:{
			pickKey(){
				if(this.pickList){
					
					return Object.keys(this.pickList[0])[0]
				}
				return null
			}
		},
		methods:{
			handlerChange(res){
				console.log(res)
				this.$emit('putRes', res.detail)
			}
		}
		}
		
</script>

<style>
.picker-item{
	width: 200px;
	height: 40px;
	background: #007AFF;
	border-radius: 15px;
	text-align: center;
	line-height: 40px;
	color: #fff;
}
.pull-down{
	
	
}
</style>
