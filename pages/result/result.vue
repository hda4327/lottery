<template>
	<view class="result-main">
		<Advertisement :bg="advertisementBg" :hasBorder='false' @toAdUrl="toResAd"></Advertisement>
		<view class="canvas-content">
			<DrawToCanvas ref="drawTo" @showBtn="isShowBtn=true"></DrawToCanvas>
		</view>
		<view class="btn-content" v-show="isShowBtn">
			<TwoBtn @copyBtn="copyImg" @againBtn="navToIndex"> </TwoBtn>
			<view class="btn">
				<ConfirmBtn>
					<button class="nav-btn"  @click="navToLottery">
						{{btnText2}}
					</button>
				</ConfirmBtn>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import DrawToCanvas from '../../components/drawToCanvas/DrawToCanvas.vue'
	import Advertisement from '@/components/advertisement.vue'
	import ConfirmBtn from '@/components/confirm-btn.vue'
	import TwoBtn from './childCom/two-btn.vue'
	export default {
		data(){
			return {
				btnText2: '点击抽取牙医专属奖品',
				isShowBtn: false,
				advertisementBg: '../static/img/result-ad.png'
			}
		},
		onLoad() {
			
		},
		
		methods: {
		
			copyImg(){
				
				this.$refs.drawTo.btnCreate()
			},
			navToIndex(){
				uni.reLaunch({
					url:'/pages/index/index'
				})
			},
			navToLottery(){
				uni.navigateTo({
				    url: '/pages/lottery/lottery'
				});
			},
			
			onShareAppMessage() {
				return {
					title: `口腔机构人员薪资测一测`,
					path: 'pages/index/index',
				}
			},
			toResAd(){
				uni.navigateToMiniProgram({
					  appId: 'wx9188524557398958',
					  path: 'pages/home/dashboard/index',
					  success(res) {
						// 打开成功
						// console.log('res', res)
					  },
					  fail(err){
						  // console.log('err', err)
					  }
				})
			}
			
		},
		components:{
			DrawToCanvas,
			ConfirmBtn,
			TwoBtn,
			Advertisement
		}
		
	}
</script>

<style scoped>
.result-main{
	padding-bottom: 60rpx;
}
.canvas-content{
	
}
.btn{
	margin-top: 40rpx;
}
.nav-btn{
	background:none;
	background-image: url(../../static/img/res-btn2.png);
	background-size:cover;
	font-weight: 600;
	margin-left: -12rpx;
	line-height: 121rpx;
	width: 372rpx;
	height: 121rpx;
	color: rgba(255, 255, 255, 1);
	text-align: center;
	font-size: 30rpx;
}
</style>
