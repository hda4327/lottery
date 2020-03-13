<template>
    <view class="main">
		<view class="top-tip">
			<view class="left"></view>
			<view class="center">
				有谁在抢
			</view>
			<view class="right"></view>
		</view>
		<view class="record-list">
			<view class="record-item" v-for="(item, index) in recordList" :key="index" v-if="index<3">
				<span class="name">{{item.work_user.nickname}}</span>
				<span class="text">刚刚抽到了</span>
				<span class="lottery">{{item.name}}</span>
			</view>
			<!-- <view class="record-item">
				<span class="name">我们</span>
				<span class="text">刚刚抽到了</span>
				<span class="lottery">1000元设</span>
			</view>
			<view class="record-item">
				<span class="name">我们</span>
				<span class="text">刚刚抽到了</span>
				<span class="lottery">1000元设计代金券</span>
			</view> -->
			
		</view>

		
		
    </view>
</template>

<script>
    export default {
        name: "record",
        data(){
			return {
				
			}
        },
		props:{
			recordList:{
				default(){
					return []
				},
				type: Array
			}
		},
        components:{

        }
    }
</script>

<style scoped>
.main{
	/* width:472rpx;
	height:192rpx; */
	background:rgba(242,85,88,1);
	opacity:0.5;
	border-radius:20rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 24rpx 64rpx 0 64rpx;
	margin-top: 30rpx;
	/* text-align: center; */
}
.top-tip{
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 471rpx;
}
.top-tip .left, .top-tip .right{
	width:165rpx;
	height:1rpx;
	background:rgba(255,255,255,1);
}
.top-tip .center{
	color:rgba(255,255,255,1);
	font-size:24rpx;
	
}
.record-list{
	font-size: 24rpx;
	/* width: 471rpx; */
	/* margin-top: 24rpx; */
}
.record-item{
	
	display:flex;
	align-items: center;
	justify-content: space-evenly;
	border-bottom: rgba(255,255,255,1) dashed 1rpx;
	height: 60rpx;
}
.record-item:last-child{
	border-bottom: none
}
.record-item .name{
	color:rgba(255, 255, 255, 1);
}

.record-item .text{
	color:rgba(255, 199, 199, 1);
	margin-left: 15rpx;
	
}

.record-item .lottery{
	color:rgba(255, 239, 20, 1);
	margin-left: 15rpx;
}


</style>
