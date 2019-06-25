<template>
    <div class="loading">
        <div class="Box">
			<van-row class="head">
				<van-col span="4"><img src="../assets/music/左箭头.png" alt="返回" class="back" @click="Goback()"></van-col>
			</van-row>
            <div class="welcome">
                <p>Welcome</p>
                <div class="inp">
                    <input type="text" class="tex" ref="tex" placeholder="手机号"/>
                    <input type="password" class="pwd" ref="pwd" placeholder="密码"/>
                    <div class="btn" :class="{'btn_lod' : Load}" ref="Loa" @click="Enter()">Land</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';

    export default {
        name: "Loading",
        data() {
            return {
                Load: false,
            }
        },
		
		created() {
			this.$store.state.bottom_Show = false
		},
		
        methods: {
			Goback() {
				this.$router.go(-1)
				if(this.$store.state.music.length != 0) {
					this.$store.state.bottom_Show = true
				}
			},
            //点击登录按钮
            Enter() {
                let tex = this.$refs.tex.value
                let pwd = this.$refs.pwd.value

                let validPhone = /^1[3456789]\d{9}$/
                if (tex.length != 0 && pwd.length != 0) {
                    if (!validPhone.test(tex)) {
                        Toast('手机号格式不正确');
                    }else {
                        this.axios({
                            type: "GET",
                            url: "http://localhost:3000/login/cellphone?phone=" + tex + "&password=" + pwd, 
                        }).then(response => {
							let name = 'pid'
							let value = response.data.bindings[0].userId
							var cookieText = encodeURIComponent(name) + "=" + 
											 encodeURIComponent(value) + "; expires=" 
											 + 1
							document.cookie = cookieText;		
							this.$store.state.user_infor.push(response.data.profile) 
							this.$store.state.user = true
							this.$router.push({name: "My"})
							if(this.$store.state.music.length != 0) {
								this.$store.state.bottom_Show = true
							}
						}).catch(()=> {
							 Toast('手机号或密码不正确');
						})
                    }
                }else {
                    Toast('手机号或密码为空');
                }
            }
			
			
        },
        mounted() {
            //给load按钮添加事件
            this.$refs.Loa.addEventListener("touchstart", () => {
                this.Load = true
            });
            this.$refs.Loa.addEventListener("touchend", () => {
                this.Load = false
            });

        },
        components: {
            [Toast.name]: Toast
        }
    }
</script>

<style lang="less" scoped>
    .Box{
        width: 100vw;
        height: 100vh;
        background-image: url("../assets/Loading/bg.jpg");
        background-size: cover;
        position: relative;
		overflow: hidden;
    }
	.head{
		padding-top: calc(~"1.7rem / 2 - 1.341333rem / 2");
		.back {
		   width: 0.8rem;
		   height: 0.8rem;
		   margin-top: calc(~"1.333333rem / 2 - 0.8rem / 2");
		   margin-left: calc(~"1.667466rem / 2 - 0.8rem / 2");
		   animation: op 1s ease-out;
		}
	}
    .welcome {
        width: 7rem;
        height: 8rem;
        background-color: rgba(0, 0, 0, 0.3);
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -3.5rem;
        margin-top: -4rem;
        text-align: center;
        animation: we 1s ease-out;
        p{
            height: 20%;
            font-size: 3.5em;
            letter-spacing: 1px;
            margin: 5% 0 0 0;
            color: rgba(255, 255, 255, 0.3);
            background-image: url("../assets/Loading/water.png");
            background-size: cover;
            text-transform: uppercase;
            -webkit-background-clip: text;
            animation: wave 30s linear infinite;
        }
        .inp {
            height: 75%;
            border: 1px solid rgba(255, 255, 255, 0);
            input{
                width: 65%;
                height: 10%;
                border-radius: 15px;
                border: none;
                background-color: rgba(255, 255, 255, 0.6);
                padding: 0.1rem 0.1rem 0.1rem 0.2rem;
                font-size: 14px;
            }
            input:nth-child(1){
                display: block;
                margin: 0.8rem auto 0.8rem;
                animation: inpo 1s ease-in;
            }
            input:nth-child(2){
                animation: inpt 1s ease-in;
            }
            .btn{
                width: 69%;
                height: .85rem;
                line-height: .85rem;
                border-radius: 15px;
                border: none;
                margin: 0.8rem auto 0;
                background-color: rgb(255, 103, 0);
                font-size: 16px;
                letter-spacing: 0.1px;
                color: white;
                animation: btn 1s ease-in;
            }
            .btn_lod{
                background-color: red;
            }
        }
    }
    @keyframes wave{
        from{
            background-position: 0 0;
        }
        to{
            background-position: 1000px 0;
        }
    }
    
    @keyframes we {
        from{
            top: -5rem;
            opacity: 0;
        }
        to{
            opacity: 1;
        }
    }

    @keyframes inpo {
        from{
            transform: translateX(-15rem);
        }
        to{
            transform: translateX(0);
        }
    }

    @keyframes inpt {
        from{
            transform: translateX(15rem);
        }
        to{
            transform: translateX(0);
        }
    }

    @keyframes btn {
        from{
            opacity: 0;
        }
        to{
            opacity: 1;
        }
    }
	
	@keyframes op{
	    from{
	        opacity: 0;
	    }
	    to{
	        opacity: 0.8;
	    }
	}
</style>