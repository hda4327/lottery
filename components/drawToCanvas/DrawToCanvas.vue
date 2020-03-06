<template>
	<view class="main">
		<!-- <button type='primary' style='font-size: 28rpx; line-height: 96rpx; margin: 200rpx 46rpx;' @click='createPoster'>生成海报</button> -->
		<view :style='{ animation: isShow ? "show" : "dismis Mask 0.3s forwards ease", top: 0, left: isCreate ? 0 : "750rpx"}'
		 @click="catchtap" class="cover">

			<canvas canvas-id='poster' class="canvas-main"></canvas>
			<image style='' :src='poster' class="poster"></image>
			<button class='maskButton' hover-class='maskButton-hover' v-show='isCreate' @click='btnCreate'>保存到本地相册</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: "DrawToCanvas",
		data() {
			return {
				poster: '',
				isCreate: false,
				isShow: false,
				bgWidth: 670,
				bgHeight: 1084,
			}
		},
		components: {

		},
		onReady() {
			this.createPoster();
		},
		computed: {
			ratepx() {
				return 750.0 / uni.getSystemInfoSync().windowWidth;
			}
		},
		methods: {
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
					contentBg: '../../static/img/res-line.png',
					avatar: '../../static/img/res-bg.png',
					code: '../../static/img/res-bg.png',
					t1: '你最匹配的年薪是',
					t2: '已超过了98%的口腔从业者',
					t3: '长按测一测您的匹配薪资',
					content: '穿过风和雨，坐着热气球在浪漫的土耳其高空享受着夕阳晚霞，美好的时光在不知不觉中流逝。2020年薪百万的你环游世界，享受人生。',

					appName: "程序名2"
				};
				/// 绘制
				this.draw('poster', this.bgWidth, this.bgHeight, writing).then(res => {
					setTimeout(() => {
						// app.hideLoading();
						this.isCreate = true
						this.isShow = true
					}, 300)
				}, err => {
					setTimeout(() => {
						// app.hideLoading();
						// app.showToast('生成海报失败');
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
				options.ctx.setFillStyle(options.style ? options.style : '#fff');
				/// 设置字体大小
				options.ctx.setFontSize(options.fontSize ? options.fontSize : this.rate(24));
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
					ctx.drawImage(writing.bigImage, 0, 0, this.rate(cavW), this.rate(1084));

					//内容背景
					ctx.drawImage(writing.contentBg, this.rate(40), this.rate(180), this.rate(590), this.rate(321));

					

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
						maxWidth: this.rate(500),
						x: this.rate(95),
						y: this.rate(558),
						height: this.rate(50),
						fontSize: this.rate(24)
					})

					ctx.save();

					ctx.setFillStyle('#fff');
					ctx.setFontSize(this.rate(28));
					ctx.fillText(writing.t3, this.rate(182), this.rate(895))

					ctx.save();


					ctx.setFillStyle('#0071BC');
					ctx.setFontSize(this.rate(48));
					ctx.font = '700'
					ctx.fillText(writing.t1, this.rate(145), this.rate(259))
					// this.boldText(ctx, {text:writing.t1,x:this.rate(145),y:this.rate(259)})
					ctx.save();
					
					// /// 绘制头像
					// ctx.beginPath();
					// ctx.arc(arc.x + arc.radii, arc.y + arc.radii, arc.radii, 0, Math.PI * 2, false)
					// ctx.clip();
					// ctx.drawImage(writing.bigImage, arc.x, arc.y, diameter, diameter);
					// ctx.restore();



					/// 绘制店名   
					// this.drawText({
					// 	ctx: ctx,
					// 	str: writing.name,
					// 	maxLine: 1,
					// 	maxWidth: this.rate(300),
					// 	x: this.rate(112), //112
					// 	y: this.rate(836), //836
					// 	height: this.rate(36)
					// })

					/// 绘制小程序码
					ctx.drawImage(writing.bigImage, this.rate(458), this.rate(670), this.rate(122), this.rate(122));

					/// 绘制小程序名称 
					ctx.fillText(writing.appName, this.rate(488), this.rate(836))
					
					/// 绘制  
					ctx.draw(false, (res) => {
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
								console.log(err)
								reject();
							}
						}, this)
					});

				})
			},
			boldText(ctx, obj) {
				ctx.fillText(obj.text, obj.x, obj.y - 0.5);
				ctx.fillText(obj.text, obj.x - 0.5, obj.y);
			},
			/// 保存图片
			btnCreate: function(obj) {
				// app.showLoading('正在保存...')
				wx.saveImageToPhotosAlbum({
					filePath: this.poster,
					success: res => {
						// app.hideLoading();
						// this.catchtap(() => {
						// 	wx.showToast({
						// 		title: '保存成功'
						// 	})
						// });
						uni.showToast({
							title: '保存成功'
						})
					},
					fail: err => {
						// app.hideLoading();
						// this.catchtap(() => {
						// 	wx.showToast({
						// 		title: '保存失败',
						// 		icon: 'none'
						// 	})
						// });
						uni.showToast({
							title: '保存失败',
							icon: 'none'
						})
					}
				}, this);
			},
			//绘制圆角矩形
			roundRect(ctx, x, y, w, h, r, c = '#fff') {

				if (w < 2 * r) {
					r = w / 2;
				}
				if (h < 2 * r) {
					r = h / 2;
				}

				ctx.beginPath();
				ctx.fillStyle = c;

				ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);
				ctx.moveTo(x + r, y);
				ctx.lineTo(x + w - r, y);
				ctx.lineTo(x + w, y + r);

				ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2);
				ctx.lineTo(x + w, y + h - r);
				ctx.lineTo(x + w - r, y + h);

				ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5);
				ctx.lineTo(x + r, y + h);
				ctx.lineTo(x, y + h - r);

				ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI);
				ctx.lineTo(x, y + r);
				ctx.lineTo(x + r, y);

				ctx.fill();
				ctx.closePath();


			},
		}
	}
</script>

<style scoped>
	.cover {
		width: 100%;
		height: 100%;
		z-index: 999;
		display: flex;
		align-items: center;
		/* justify-content: center; */
		flex-direction: column;
		position: fixed;
		padding: 40rpx;
	}

	.canvas-main {
		width: 100%;
		height: 1084rpx;
		position: fixed;
		left: 750rpx;
	}

	.poster {
		width: 100%;
		height: 1084rpx;
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
