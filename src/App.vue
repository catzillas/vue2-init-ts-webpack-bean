<script lang="ts">
import Vue from 'vue'; import Component from 'vue-class-component';
@Component({
  template: ` <div>   <input type="text" v-model="name" />   <button @click="sayHello(name)">Say Hello!</button></div>`
})
export default class App extends Vue { name: string = 'Paul'; sayHello(name: string): void { alert(`Hello ${name}`) } }

</script>


