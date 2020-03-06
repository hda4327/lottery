<template>
	<view class="modal-cover" v-show="isShow">
		<view class="modal-content">
			<view class="img">
				<slot name="img"></slot>
			</view>
			<view class="tip">
				<slot name="tip">恭喜中枪，you die</slot>
			</view>
			<view class="down-arrow"></view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false,
			}
		},
		
	}
</script>

<style scoped>
.modal-cover{
	background: rgba(1,1,1,0.7);
	z-index: 9;
	position: absolute;
	right: 0;
	top: 0;
	left: 0;
	bottom: 0;
}
.modal-content{
	position: absolute;
	top: 50%;
	left: 50%;
	width: 260px;
	height: 320px;
	transform: translate(-50%, -50%);
	background: white;
	display: flex;
	flex-direction: column;
	padding: 30px;
	
}
.modal-content .img{
	width: 100%;
	height: 110px;
	background: #0C8F49;
	display: flex;
	justify-content: center;
	align-items: center;
}
.modal-content .tip{
	text-align: center;
	width: 100%;
	color: #007AFF;
	line-height: 40px;
}
.modal-content .down-arrow{
	height: 80px;
	width: 100%;
}

</style>