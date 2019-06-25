<template>
    <div class="test">
		<h1>这是测试页面</h1>
		<div ref="wrap" class="wrap">
			<div>
				<p>1</p>
				<p>2</p>
				<p>3</p>
				<p>4</p>
				<p>5</p>
				<p>6</p>
				<p>7</p>
				<p>8</p>
				<p>9</p>
				<p>0</p>
				<p>1</p>
				<p>2</p>
				<p>3</p>
				<p>4</p>
				<p>5</p>
				<p>6</p>
				<p>7</p>
				<p>8</p>
				<p>9</p>
				<p>9</p>
				<p>0</p>
				<p>1</p>
				<p>2</p>
				<p ref="dom">3zcy</p>
				<p>4</p>
				<p>5</p>
				<p>6</p>
				<p>7</p>
				<p>8</p>
				<p>9</p>
				<p>9</p>
				<p>0</p>
				<p>1</p>
				<p>2</p>
				<p>3</p>
				<p>4</p>
				<p>5</p>
				<p>6</p>
				<p>7</p>
				<p>8</p>
				<p>9</p>
				<p>9</p>
				<p>0</p>
				<p>1</p>
				<p>2</p>
				<p>3</p>
				<p>4</p>
				<p>5</p>
				<p>6</p>
				<p>7</p>
				<p>8</p>
				<p>9</p>
			</div>
		</div>
		<button @click="demo">9875646</button>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
    export default {
        name: "Test",
        data() {
            return{
				
            }
        },
		
		methods: {
			demo() {
				// this.$nextTick(() => {
				// 	scroll.scrollToElement(this.$refs.dom, 0.5, false, true)	
				// })	
				// let dom = this.$refs.dom
				// console.log(dom)
				// scroll.scrollToElement(this.$refs.dom, 0.5, false, true)
				this.scroll.scrollToElement(this.$refs.dom, 0.5);
			}
			
		},
		
		

        created() {
			// this.$nextTick(()=> {
			// 	this.scroll = new BScroll(this.$refs.wrap ,{
			// 		click: true,
			// 		stateY: -150
			//  	})
			// })
		},
		
		mounted() {
			this.scroll = new BScroll(this.$refs.wrap ,{
				click: true,
				// stateY: -150
			})

			// setTimeout(() => {
				// scroll.scrollToElement(this.$refs.dom, 0.5, false, true)
				// scroll.scrollTo(0,-125,0.5)
			// }, 1000);
		},
    }
</script>

<style scoped>
   .wrap {
	   width: 300px;
	   height: 400px;
	   border: 1px solid #000;
	   overflow: hidden;
   }

   .wrap p{
	   width: 100%;
	   height: 25px;
	   line-height: 25px;
	   background-color: blue;
   }
</style>