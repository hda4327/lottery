<!-- 父可传参数-->
 <!-- 1. intime：抽奖速度，默认50 -->
 <!-- 2.luckyProList: 定义抽奖物及提示
	数据格式示例：
	 prob为概率
	 name为物品名
	 tip为中奖提示后缀
	1  2  3
	8     4
	7  6  5 
	 1:{prob:0.5,name: '50000人冥币', tip:'50000人冥币'},
	 2:{prob:0.08,name: '一个大耳刮子', tip:'一个大耳刮子'},
	 3:{prob:0.08,name: '一阵掌声', tip:'一阵掌声'},
	 4:{prob:0.08,name: '一个巴掌', tip:'一个巴掌'},
	 5:{prob:0.07,name: '一个红buff', tip:'一个红buff'},
	 6:{prob:0.07,name: '掌嘴', tip:'掌嘴'},
	 7:{prob:0.07,name: 'b脸抽肿', tip:'b脸抽肿'},
	 8:{prob:0.05,name: '机会不中用啊', tip:'机会不中用啊'}}
	 
 -->
 <!-- 3. 中奖前缀 -->
<template>
	<view>
		<!--index.wxml-->
		<view class="container">
			<!-- 停止位置:<input :value='luckPosition' style="width:100%;text-align:center" @input='input' type='number'></input> -->
			<view class='frame_view'>
				<view class='frame_row'>
					<view class='frame_item frame_item0' :style='{"opacity":color[0]}' :src="images[0]">
						<view class="title">
							{{luckyProList[1].name}}
						</view>
						<view class="img">
							<image src="https://crm.szqhtr.com/image/icon_personal_QRcode@2x.png" mode=""></image>
						</view>
					</view>
					<view class='frame_item frame_item1' :style='{"opacity":color[1]}' :src="images[0]">
						<view class="title">
							{{luckyProList[2].name}}
						</view>
						<view class="img">
							<image src="https://crm.szqhtr.com/image/icon_personal_QRcode@2x.png" mode=""></image>
						</view>
					</view>
					<view class='frame_item frame_item2' :style='{"opacity":color[2]}' :src="images[0]">
						<view class="title">
							{{luckyProList[3].name}}
						</view>
						<view class="img">
							<image src="https://crm.szqhtr.com/image/icon_personal_QRcode@2x.png" mode=""></image>
						</view>
					</view>
				</view>

				<view class='frame_row'>
					<view class='frame_item frame_item7' :style='{"opacity":color[7]}' :src="images[0]">
						<view class="title">
							{{luckyProList[8].name}}
						</view>
						<view class="img">
							<image src="https://crm.szqhtr.com/image/icon_personal_QRcode@2x.png" mode=""></image>
						</view>
					</view>
					<image class='frame_item' :src='btnconfirm' @click="clickLucks()"></image>
					<view class='frame_item frame_item3' :style='{"opacity":color[3]}' :src="images[0]">
						<view class="title">
							{{luckyProList[4].name}}
						</view>
						<view class="img">
							<image src="https://crm.szqhtr.com/image/icon_personal_QRcode@2x.png" mode=""></image>
						</view>
					</view>
				</view>

				<view class='frame_row'>
					<view class='frame_item frame_item6' :style='{"opacity":color[6]}' :src="images[0]">
						<view class="title">
							{{luckyProList[7].name}}
						</view>
						<view class="img">
							<image src="https://crm.szqhtr.com/image/icon_personal_QRcode@2x.png" mode=""></image>
						</view>
					</view>
					<view class='frame_item frame_item5' :style='{"opacity":color[5]}' :src="images[0]">
						<view class="title">
							{{luckyProList[6].name}}
						</view>
						<view class="img">
							<image src="https://crm.szqhtr.com/image/icon_personal_QRcode@2x.png" mode=""></image>
						</view>
					</view>
					<view class='frame_item frame_item4' :style='{"opacity":color[4]}' :src="images[0]">
						<view class="title">
							{{luckyProList[5].name}}
						</view>
						<view class="img">
							<image src="https://crm.szqhtr.com/image/icon_personal_QRcode@2x.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	//计数器
	var interval = null;
	//值越大旋转时间越长  即旋转速度
	// var intime = 50;
	export default {
		data() {
			return {
				color: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
				images: ['../../static/sherpa-jiugongge/item.png', '../../static/sherpa-jiugongge/item1.png',
					'../../static/sherpa-jiugongge/item.png', '../../static/sherpa-jiugongge/item1.png',
					'../../static/sherpa-jiugongge/item.png', '../../static/sherpa-jiugongge/item1.png',
					'../../static/sherpa-jiugongge/item.png', '../../static/sherpa-jiugongge/item1.png',
					'../../static/sherpa-jiugongge/item.png'
				],
				btnconfirm: '../../static/sherpa-jiugongge/dianjichoujiang.png',
				clickLuck: 'clickLuck',
				luckPosition: null,
				initChangeNum: this.changeNum 
			}
		},
		props:{
			intime:{
				default: 50,
				type: Number
			},
			luckyProList: {
				default:()=>{
					return {
					 1:{prob:0.5,name: '50000人冥币', tip:'50000人冥币'},
					 2:{prob:0.08,name: '一个大耳刮子', tip:'一个大耳刮子'},
					 3:{prob:0.08,name: '一阵掌声', tip:'一阵掌声'},
					 4:{prob:0.08,name: '一个巴掌', tip:'一个巴掌'},
					 5:{prob:0.07,name: '一个红buff', tip:'一个红buff'},
					 6:{prob:0.07,name: '掌嘴', tip:'掌嘴'},
				     7:{prob:0.07,name: 'b脸抽肿', tip:'b脸抽肿'},
					 8:{prob:0.05,name: '机会不中用啊', tip:'机会不中用啊'},
						}
					 },
				type: Object
			},
			tipPrefix :{
				default: '给你',
				type: String
			},
			changeNum:{
				default: 3,
				type: Number
			}
			
		},
		methods: {
			input: function(e) {
				var data = Number(e.detail.value);
				this.luckPosition = data;
			},
			//按luckyProList分配的概率生成对应的一个随机luckPosition值（中奖位置索引）
			computeLucyList(){
				let tmpList = []
				let total = 0
				
				for(let i in this.luckyProList){
					total += this.luckyProList[i].prob
					tmpList.unshift(total);
				}
				tmpList.push(-1)
				let ranNum = Math.random() // 0-1的随机数
				console.log(tmpList);
				console.log(ranNum)
				
				tmpList.every((num,i)=>{
					if(ranNum>num){
						this.luckPosition = 8-i
						return false
					}else{
						return true
					}
					
					
				})
			},
			//点击抽奖按钮
			clickLucks() {
				this.computeLucyList()

				if (this.clickLuck == 'clickLuck') {
					var e = this;
					//判断中奖位置格式
					// if (e.luckPosition == null || isNaN(e.luckPosition) || e.luckPosition > 7) {
					// 	uni.showModal({
					// 		title: '提示',
					// 		content: '请填写正确数值',
					// 		showCancel: false,
					// 		success: res => {},
					// 		fail: () => {},
					// 		complete: () => {}
					// 	});
					// 	return;
					// }
					// 判断抽奖次数是否为0
					if (e.initChangeNum<=0) {
						uni.showModal({
							title: '提示',
							content: '您已抽过奖品了',
							showCancel: false,
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
						return;
					}else{
						e.initChangeNum --
						this.$emit('get-lottery', {changeNum: e.initChangeNum, position: e.luckPosition})
						
					}

					//设置按钮不可点击
					e.btnconfirm = '../../static/sherpa-jiugongge/dianjichoujiangd.png';
					e.clickLuck = '';

					//清空计时器
					clearInterval(interval);
					var index = 0;
					//循环设置每一项的透明度
					interval = setInterval(()=> {
						if (index > 7) {
							index = 0;
							// e.color[7] = 0.5
							e.$set(e.color, 7, 0.5);
						} else if (index != 0) {
							// e.color[index - 1] = 0.5
							e.$set(e.color, index-1, 0.5);
						}
						e.$set(e.color, index, 1);
						index++;
					}, e.intime);
					//模拟网络请求时间  设为两秒
					var stoptime = 2000;
					setTimeout(function() {
						e.stop(e.luckPosition);
					}, stoptime)
				}
			},
			stop(which) {
				var e = this;
				//清空计数器
				clearInterval(interval);
				//初始化当前位置
				var current = -1;
				var color = e.color;
				for (var i = 0; i < color.length; i++) {
					if (color[i] == 1) {
						current = i;
					}
				}
				//下标从1开始
				var index = current + 1;
				e.stopLuck(which, index, this.intime, 10);
			},
			stopLuck(which, index, time, splittime) {
				var e = this;
				//值越大出现中奖结果后减速时间越长
				setTimeout(()=> {
					//重置前一个位置
					if (index > 7) {
						index = 0;
						// e.color[7] = 0.5
						e.$set(e.color, 7, 0.5)
					} else if (index != 0) {
						// e.color[index - 1] = 0.5
						e.$set(e.color, index - 1, 0.5)
					}
					//当前位置为选中状态
					e.color[index] = 1;
					//如果旋转时间过短或者当前位置不等于中奖位置则递归执行
					//直到旋转至中奖位置
					if (time < 400 || index != which) {
						//越来越慢
						splittime++;
						time += splittime;
						//当前位置+1
						index++;
						e.stopLuck(which, index, time, splittime);
					} else {
						//1秒后显示弹窗
						setTimeout(()=> {
							// if (which == 0) {
								//中奖
								uni.showModal({
									content: this.tipPrefix + e.luckyProList[which+1].tip,
									showCancel: false,
									confirmColor: "#F8C219",
									success: res => {
										if (res.confirm) {
											//设置按钮可以点击
											e.btnconfirm = '../../static/sherpa-jiugongge/dianjichoujiang.png';
											e.clickLuck = 'clickLuck';
											e.loadAnimation();
										}
									},
									fail: () => {},
									complete: () => {}
								});
							// } 
							// else {
							// 	//未中奖
							// 	uni.showModal({
							// 		content: '很遗憾未中奖',
							// 		showCancel: false,
							// 		confirmColor: "#F8C219",
							// 		success: res => {
							// 			if (res.confirm) {
							// 				//设置按钮可以点击
							// 				e.btnconfirm = '../../static/sherpa-jiugongge/dianjichoujiang.png';
							// 				e.clickLuck = 'clickLuck';
											
							// 				e.loadAnimation();
							// 			}
							// 		},
							// 		fail: () => {},
							// 		complete: () => {}
							// 	});
							// }
						}, 1000);
					}
				}, time);
			},
			loadAnimation() {
				var e = this;
				var index = 0;
				if (interval == null) {
					interval = setInterval(()=> {
						if (index > 7) {
							index = 0;
							// e.color[7] = 0.5
							e.$set(e.color, 7, 0.5)
						} else if (index != 0) {
							// e.color[index - 1] = 0.5
							e.$set(e.color, index - 1, 0.5)
						}
						e.color[index] = 1;
						e.$set(e.color, index, 1)
						index++;
					}, 1000);
				}
			}
		},
		onLoad() {
			uni.hideLoading()
			this.loadAnimation();
		}
	}
</script>

<style>
	/**index.wxss**/
	.container {
		/* position: fixed; */
		width: 100%;
		height: 100%;
	}

	.frame_view {
		/* position: absolute;
		top: 50%;
		margin-top: -315upx;
		left: 50%;
		margin-left: -315upx; */
		width: 590upx;
		height: 590upx;
		padding: 20upx;
		background: #792db3;
		z-index: 3;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		border-radius: 30upx;
	}

	.frame_row {
		width: 580upx;
		height: 180upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.frame_item {
		width: 180upx;
		height: 180upx;
		z-index: 9;
	}

	.frame_item0 {
		background: url("../../static/sherpa-jiugongge/item.png")no-repeat center;
		background-size: 100% 100%;
	}

	.frame_item1 {
		background: url("../../static/sherpa-jiugongge/item1.png")no-repeat center;
		background-size: 100% 100%;
	}

	.frame_item2 {
		background: url("../../static/sherpa-jiugongge/item.png")no-repeat center;
		background-size: 100% 100%;
	}

	.frame_item3 {
		background: url("../../static/sherpa-jiugongge/item1.png")no-repeat center;
		background-size: 100% 100%;
	}

	.frame_item4 {
		background: url("../../static/sherpa-jiugongge/item.png")no-repeat center;
		background-size: 100% 100%;
	}

	.frame_item5 {
		background: url("../../static/sherpa-jiugongge/item1.png")no-repeat center;
		background-size: 100% 100%;
	}

	.frame_item6 {
		background: url("../../static/sherpa-jiugongge/item.png")no-repeat center;
		background-size: 100% 100%;
	}

	.frame_item7 {
		background: url("../../static/sherpa-jiugongge/item1.png")no-repeat center;
		background-size: 100% 100%;
	}

	.frame_item>view {
		display: block;
		width: 100%;
		font-size: 30upx;
		color: #fff;
		z-index: 99;
		text-align: center;
	}

	.frame_item>view.img {
		width: 42upx;
		height: 42upx;
		line-height: 30upx;
		margin: 0 auto;
		margin-top: 20upx;
	}

	.frame_item>view.title {
		line-height: 30upx;
		padding-top: 40upx;
	}
</style>
