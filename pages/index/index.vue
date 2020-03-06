<template>
	<view class="content">
		<view class="text-area">
			<h2>三级联动</h2>
			<view><button type="primary" @tap="openLevel" class="btn">打开地址</button></view>
			<cover-image src="/static/sherpa-jiugongge/item.png"></cover-image>
			<text class="title">{{pickerText}}</text>

			<w-picker mode="linkage" :level="2" :value="['1','2']" @confirm="onConfirm" ref="linkage" :linkList="arr1"
			 themeColor="#f00"></w-picker>

		</view>
		<!-- <chouJiang :intime="30" :changeNum="changeNum" @get-lottery='getLottery'></chouJiang>
		<view class="change-tip">剩余抽奖次数:{{changeNum}}次</view> -->
		<picker-box @putRes="getCity"></picker-box>



		<button type='primary' style='font-size: 28rpx; line-height: 96rpx; margin: 200rpx 46rpx;' @click='createPoster'>生成海报</button>

		<view :style='{width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", animation: isShow ? "show" : "dismis Mask 0.3s forwards ease", position: "fixed", top: 0, left: isCreate ? 0 : "750rpx"}'>
			<!-- catchtap='catchtap' catchtouchmove='blockTouches' -->

			<canvas canvas-id='poster' style='width: 622rpx; height: 882rpx; position: fixed; left: 750rpx;'></canvas>
			<image style='width: 622rpx; height: 882rpx; margin-bottom: 96rpx;' :src='poster'></image>
			<button class='maskButton' hover-class='maskButton-hover' v-show='isCreate' @click='btnCreate'>保存到本地相册</button>
		</view>
		<Modal></Modal>
		<navigator url="/pages/result/result">跳转</navigator>
		<button open-type="getUserInfo" @getuserinfo="authForInfo" withCredentials="true"> 授权</button>
	</view>

</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	import PickerBox from "@/components/picker/PickerBox.vue";
	import chouJiang from '@/components/sherpa-jiugongge/sherpa-jiugongge.vue'
	import Modal from '@/components/modal/Modal'
	import {
		getCodeForOauth
	} from '../../common/authFun.js'
	import {
		authForMsg
	} from '../../common/authFun.js'

	export default {
		data() {
			return {
				title: 'Hello',
				pickerText: '',
				arr1: [{
					label: "杭州",
					code: "10",
					value: '1',
					children: [{
							label: "萧山区",
							code: "10",
							value: '1',
						},
						{
							label: "西湖区",
							code: "10",
							value: '2',
						}
					],
				}],
				changeNum: 3,
				test: '',
				poster: '',
				isCreate: false,
				isShow: false
			}
		},
		components: {
			wPicker,
			chouJiang,
			PickerBox,
			Modal
		},
		onLoad() {

		},
		onReady() {
			// getCodeForOauth('oauth').then(res=>{
			// 	console.log(res);
			// 	uni.setStorageSync('code', res.code)
			// }) 
			// console.log(getCodeForOauth('oauth'))
			// authForMsg('scope.userInfo').then(res=>{
			// 	console.log(res);
			// })

		},
		computed: {
			ratepx() {
				return 750.0 / uni.getSystemInfoSync().windowWidth;
			}
		},
		methods: {
			authForInfo(e) {
				console.log(e.detail.userInfo)
			},

			getCity(res) {
				console.log('获取信息：', res)
			},

			openLevel() {
				uni.showToast({
					title: 'sb',
					mask: false,
					duration: 1500
				});
				this.$refs.linkage.show();
			},
			onConfirm(e) {
				console.log(e.checkArr)
				// e 确认后选中的数据
				this.pickerText = e.checkArr
			},
			getLottery(res) {
				this.changeNum = res.changeNum,
					console.log('中奖位置为', res.position)
			},
			/// 获取canvas转化后的rpx
			rate: function(rpx) {
				return rpx / this.ratepx
			},

			/// 创建海报
			createPoster: function() {
				// auth.writePhotosAlbum(() => {
				//app.showLoading('正在生成...')
				/// 绘制的内容
				const writing = {
					//测试用cdn防跨域
					bigImage: '../../static/img/res-bg.png',
					avatar: '../../static/img/res-bg.png',
					code: 'http://cdn.ygt.linyakq.com/public/uploads/img_res/banner_main/20200226/20343916194.jpeg',
					content: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
					name: '测试测试测试测试测试测试测试测试测试测试',
					appName: "程序名2"
				};
				/// 绘制
				this.draw('poster', 622, 882, writing).then(res => {
					setTimeout(() => {
						// app.hideLoading();
						this.isCreate = true
						this.isShow = true
					}, 300)
				}, err => {
					setTimeout(() => {
						// app.hideLoading();
						// app.showToast('生成海报失败');
						console.log(err)
						console.log('生成海报失败')
					}, 300)
				})
				// });
			},

			/// 隐藏
			catchtap: function(callback) {
				this.isShow = false
				setTimeout(() => {
					this.isCreate = false
					if (callback && typeof callback == "function") {
						callback();
					}
				}, 400)
			},

			/// 绘制文本
			drawText: function(options) {
				/// 获取总行数
				var allRow = Math.ceil(options.ctx.measureText(options.str).width / options.maxWidth);
				/// 限制行数
				var count = allRow >= options.maxLine ? options.maxLine : allRow,
					/// 当前字符串的截断点
					endPos = 0;
				/// 设置文字颜色
				options.ctx.setFillStyle(options.style ? options.style : '#353535');
				/// 设置字体大小
				options.ctx.setFontSize(options.fontSize ? options.fontSize : this.rate(20));
				/// 循环截断
				for (var j = 0; j < count; j++) {
					/// 当前剩余的字符串
					var nowStr = options.str.slice(endPos),
						/// 每一行当前宽度
						rowWid = 0,
						/// 每一行顶部距离
						y = options.y + (count == 1 ? 0 : j * options.height);
					/// 如果当前的字符串宽度大于最大宽度，然后开始截取
					if (options.ctx.measureText(nowStr).width > options.maxWidth) {
						for (var m = 0; m < nowStr.length; m++) {
							/// 计算当前字符串总宽度
							rowWid += options.ctx.measureText(nowStr[m]).width;
							if (rowWid > options.maxWidth) {
								/// 如果是最后一行
								if (j === options.maxLine - 1) {
									options.ctx.fillText(nowStr.slice(0, m - 1) + '...', options.x, y);
								} else {
									options.ctx.fillText(nowStr.slice(0, m), options.x, y);
								}
								/// 保留下次截断点
								endPos += m;
								break;
							}
						}
					} else { /// 如果当前的字符串宽度小于最大宽度就直接输出
						options.ctx.fillText(nowStr.slice(0), options.x, y);
					}
				}
			},

			/// 绘制海报 1、canvas对象 2、canvas宽 3、canvas高 4、绘制的内容
			draw: function(canvas, cavW, cavH, writing) {

				return new Promise((resolve, reject) => {

					if (!writing || !canvas) {
						reject();
						return;
					}

					/// 创建context
					var ctx = uni.createCanvasContext(canvas, this);
					ctx.clearRect(0, 0, this.rate(cavW), this.rate(cavH));

					/// 绘制底色
					ctx.setFillStyle('white');
					ctx.fillRect(0, 0, this.rate(cavW), this.rate(cavH));
					/// 绘制背景图
					ctx.drawImage(writing.bigImage, 0, 0, this.rate(622), this.rate(628));

					/// 直径
					const diameter = this.rate(54);
					/// 圆参数 
					const arc = {
						radii: diameter / 2,
						x: this.rate(40),
						y: this.rate(800)
					};

					/// 绘制文案内容   
					this.drawText({
						ctx: ctx,
						str: writing.content,
						maxLine: 3,
						maxWidth: this.rate(366),
						x: this.rate(40),
						y: this.rate(690),
						height: this.rate(36),
						fontSize: this.rate(26)
					})

					ctx.save();

					/// 绘制头像
					ctx.beginPath();
					ctx.arc(arc.x + arc.radii, arc.y + arc.radii, arc.radii, 0, Math.PI * 2, false)
					ctx.clip();
					ctx.drawImage(writing.bigImage, arc.x, arc.y, diameter, diameter);
					ctx.restore();

					/// 绘制店名   
					this.drawText({
						ctx: ctx,
						str: writing.name,
						maxLine: 1,
						maxWidth: this.rate(300),
						x: this.rate(112), //112
						y: this.rate(836), //836
						height: this.rate(36)
					})

					/// 绘制小程序码
					ctx.drawImage(writing.bigImage, this.rate(458), this.rate(670), this.rate(122), this.rate(122));
					/// 绘制小程序名称 
					ctx.fillText(writing.appName, this.rate(488), this.rate(836))

					/// 绘制  
					ctx.draw(false, () => {
						uni.canvasToTempFilePath({
							canvasId: 'poster',
							fileType: 'png',
							success: res => {
								// this.setData({
								// 	poster: res.tempFilePath
								// })
								this.poster = res.tempFilePath
								resolve();
							},
							fail: err => {
								reject(err);
							}
						}, this)
					});

				})
			},

			/// 保存图片
			btnCreate: function(obj) {
				// app.showLoading('正在保存...')
				uni.saveImageToPhotosAlbum({
					filePath: this.poster,
					success: res => {
						// app.hideLoading();
						this.catchtap(() => {
							uni.showToast({
								title: '保存成功'
							})
						});
					},
					fail: err => {
						// app.hideLoading();
						this.catchtap(() => {
							uni.showToast({
								title: '保存失败',
								icon: 'none'
							})
						});
					}
				});
			}

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.btn {
		width: 150px;
		font-size: 15px;
	}

	.change-tip {
		position: fixed;
		left: 50%;
		bottom: 20px;
		transform: translate(-50%, 0);
	}

	.canvasContent {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		top: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		flex-direction: column;
		padding-top: 50upx;

	}

	.canvasName {
		width: 80%;
		height: calc(100vh - 300upx);
	}

	.canvasText {
		margin: 30upx 0 20upx;
		color: #FFFFFF;
	}

	.errorImage {
		width: 80upx;
		height: 80upx;
	}

	.maskButton {
		color: white;
		font-size: 34rpx;
		line-height: 96rpx;
		width: 100%;
		height: 96rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #13c46f;
		border-radius: 0;
		border: none;
	}

	.maskButton::after {
		border: none
	}

	.maskButton-hover {
		background-color: #0c8f49;
	}

	@keyframes showMask {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	@keyframes dismissMask {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}
</style>
