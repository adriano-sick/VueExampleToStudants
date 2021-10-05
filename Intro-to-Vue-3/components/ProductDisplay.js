app.component('product-display', {
    template: 
    /*html*/
    `
    <div class="product-display">
        <div class="product-container">
            <div class="product-image">
                <!-- image goes here -->
                <img :src="image">
            </div>
            <div class="product-info">
                <h1>{{ title }}</h1>
                <p v-if="inStock">In Stock</p>
                <p v-else>Out of Stock</p>

                <div class="form-premium">
                    <p>Shipping: {{ shipping }}</p>
                    <form>
                        Premium: <input type="checkbox" name="PREMIUM" value="Premium" v-model="premium">
                    </form>
                </div>
                
                <product-details :details="details" />

              <div v-for="(variant, index) in variants" 
                :key="variant.id"
                @mouseover="updateVariant(index)">
                {{variant.type}}
                </div>

                <button class="button" v-on:click="addToCart" :disabled="!inStock ? '' : disabled">Add to Cart</button>
            </div>
        </div>   

        <review-list  :reviews="reviews" />
        <review-form @reviews-submitted="addReview" />

    </div>
    `,
    data(){
        return {
            premium: false,
            product: 'Dark Chocolate',
            details: ['60% cocoa', '30% sugar', '10% chocolate butter'],
            variants: [
                { id: 2234, type:'dark', image: './assets/images/dark_choc.jpg', quantity: 50 },
                { id: 2235, type:'white', image: './assets/images/white_choc.jpg', quantity: 0 }
            ],
            brand: 'Our Brand',
            selectedVariant: 0,
            reviews: []
        }
    },
    methods:{
        addToCart(){
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        updateVariant(index){
            this.selectedVariant = index
        },
        addReview(review){
            this.reviews.push(review)
        }
    },
    computed:{
        title(){
            return this.brand + ' ' + this.product
        },
        image(){
            return this.variants[this.selectedVariant].image
        },
        inStock(){
            return this.variants[this.selectedVariant].quantity
        },
        shipping(){
            if(this.premium){
                return 'Free'
            }
            return "B$10.00"
        }
    }    
})