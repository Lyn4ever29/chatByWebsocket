<template>
	<view class="content ">
		<view class="msgShow cu-form-group">
			<scroll-view scroll-y>
				<view class="msgShow" v-for="(item,index) in msg" :key="index">
					<!-- <image src="{{item.img}}"></image> -->
					<view>
						<image :src="item.img" class="imgShow" mode="aspectFit"></image>
					</view>
					<view class="msg_group">
						<view class="username">{{item.name}}</view>
						<view class="msg text-xl">{{item.msg}}</view>
					</view>
				</view>
			</scroll-view>


		</view>
		<view class="input_group cu-form-group">

			<input type="text" class="inputView title"  v-model="inputMsg">



			</input>

			<button class="cu-btn bg-purple round shadow mybtn" @click="sendMsg">发送</button>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				uid:"",
				inputMsg:"",
				msg: [
					// {
					// 	img: "../../static/tabImg/all_on.png",
					// 	name: "张三",
					// 	msg: "大家好啊"
					// },
					// {
					// 	img: "../../static/tabImg/all_on.png",
					// 	name: "李四",
					// 	msg: "你好啊，我叫李四，你呢？"
					// },
					// {
					// 	img: "../../static/tabImg/all_on.png",
					// 	name: "张三",
					// 	msg: "你猜猜我是谁/"
					// }


				]
			}
		},
		onLoad() {
			uni.connectSocket({
				url: 'ws://localhost:8080/msgSerivce',
				// data() {
				// 	return {
				// 		"uid": "张三"
				// 	};
				// }
				// header: {
				// 	'content-type': 'application/json'
				// },
				// protocols: ['protocol1'],
				// method: 'GET'
			});
			uni.setStorage({
				key:"username",
				data:'lisi'
			});
			let username = uni.getStorageSync('username');
			this.uid=username;
		},
		methods: {
			sendMsg() {
				let page =this;
				console.log(page.inputMsg)

				// 先将本地内容转换为ArrayBuffer，封装起来，然后进行远程传送
				
				let _data={uid:page.username,msg:page.inputMsg};
				let sendData = JSON.stringify(_data);


				uni.sendSocketMessage({
					// data: {
					// 	msg: "abcd",
					// 	uid: "zhangsan",
					// }
					data:sendData,
					success: (res) => {
						uni.showToast({
							icon:'none',
							title:'发送成功'
						})
						// 清空已输入内容
						page.inputMsg="";
					},fail: (res) => {
						uni.showToast({
							icon:'none',
							title:res
						})
					}
				});
				uni.onSocketMessage(function(res) {
					page.msg.push({name:page.uid,msg:res.data})
					console.log('收到服务器内容：' + res.data);
				});

			},
			
			//字符串转为ArrayBuffer进行传输
			string2buffer: function (str) {
			    // 首先将字符串转为16进制
			    let val = ""
			    for (let i = 0; i < str.length; i++) {
			      if (val === '') {
			        val = str.charCodeAt(i).toString(16)
			      } else {
			        val += ',' + str.charCodeAt(i).toString(16)
			      }
			    }
			    // 将16进制转化为ArrayBuffer
			    return new Uint8Array(val.match(/[\da-f]{2}/gi).map(function (h) {
			      return parseInt(h, 16)
			    })).buffer
			  }

		}}
</script>

<style>
	view {
		/* border: 1px solid red; */
	}

	.content {
		height: 100%;
		/* display: flex; 
		flex-direction: column;
		align-items: center;
		justify-content: center; */
	}

	.msgShow {
		/* height: 80vh; */
		width: 100%;
		display: flex;
		justify-content: flex-start;
		margin-bottom: 20rpx;
	}

	.msg_group .username {
		color: #C0C0C0;
		font-size: 12px;
	}

/* .msg_group .msg{
	font-size: ;
} */
	.imgShow {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		margin-right: 10rpx;
	}

	.input_group {
		position: fixed;
		bottom: 0px;
		width: 100%;
		/* height: 100%; */
		display: flex;
		justify-content: space-between;
	}

	.inputView {
		border: 1px solid #C0C0C0;
		/* width: 100%; */
		flex: 1;
		height: 100%;
		font-size: 36rpx;
		margin-right: 10rpx;
	}

	.mybtn {
		/* height: 36rpx; */
	}
</style>
